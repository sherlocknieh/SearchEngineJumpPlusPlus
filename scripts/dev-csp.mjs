/**
 * 严格 CSP 站点的调试服务。
 *
 * 常规 `pnpm dev` 靠页面加载 http://localhost:5173 的模块脚本，
 * 站点 CSP 的 script-src 不含该地址时脚本完全不运行。
 * 这里改成 watch 构建自包含产物，由脚本管理器直连本服务拉取并在自己的沙箱里执行：
 * 页面不加载任何外部脚本，因此不受站点 CSP 限制。
 *
 * 构建时注入 VITE_SEJ_ROLE=dev，让实例角色落到 dev，宿主 id 与正式版互不冲突。
 */
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const bundlePath = path.join(root, '.dev', 'SearchEngineJump++.user.js');
const HEADER_END = '// ==/UserScript==';

function readPort() {
  const flag = process.argv.indexOf('--port');
  const value = flag > -1 ? process.argv[flag + 1] : process.env.SEJ_DEV_PORT;
  const port = Number(value);
  // 默认避开常规 `pnpm dev` 的 5173，两者可以同时开着
  return Number.isInteger(port) && port > 0 ? port : 5180;
}

const port = readPort();
const origin = `http://127.0.0.1:${port}`;

/** watch 构建自包含产物，页面侧的脚本管理器负责取最新一份 */
function startBuild() {
  const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
  return spawn(process.execPath, [viteBin, 'build', '--watch'], {
    cwd: root,
    env: { ...process.env, SEJ_DEV_BUNDLE: '1', VITE_SEJ_ROLE: 'dev' },
    stdio: 'inherit',
  });
}

function readBundle() {
  return readFile(bundlePath, 'utf8');
}

function bundleHash(text) {
  return createHash('sha1').update(text).digest('hex').slice(0, 12);
}

/** 复用构建产物的 userscript 头，改名成 dev 版以便与正式版同时安装 */
function devHeader(text) {
  const end = text.indexOf(HEADER_END);
  if (!text.startsWith('// ==UserScript==') || end < 0) return '';
  const header = text.slice(0, end + HEADER_END.length);
  return header.replace(/^\/\/ @name .*$/m, '// @name               SearchEngineJump++ (dev)');
}

/**
 * 加载器：拉取产物后在脚本管理器沙箱内直接 eval。
 * 必须用直接 eval，间接 eval 会跑在全局作用域里而看不到 GM_*。
 */
function loaderSource() {
  return `
(() => {
  const ORIGIN = '${origin}';
  const POLL_MS = 1500;
  let version = '';
  let warned = false;

  function request(pathname, onload) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: ORIGIN + pathname,
      onload,
      onerror() {
        if (warned) return;
        warned = true;
        console.error('[SEJ dev] 无法连接 ' + ORIGIN + '，请确认 pnpm dev:csp 已启动');
      },
    });
  }

  // 产物变化后整页刷新，替代 HMR
  function watch() {
    const readHash = (onload) =>
      request('/__hash', (res) => onload(String(res.responseText || '').trim()));
    readHash((value) => {
      version = value;
    });
    setInterval(() => {
      readHash((value) => {
        if (!version || value === version) return;
        location.reload();
      });
    }, POLL_MS);
  }

  request('/sej.dev.js?t=' + Date.now(), (res) => {
    if (res.status !== 200) {
      console.error('[SEJ dev] 拉取调试产物失败：' + res.status);
      return;
    }
    try {
      eval(res.responseText);
    } catch (e) {
      console.error('[SEJ dev] 执行调试产物失败', e);
      return;
    }
    watch();
  });
})();
`;
}

const installHtml = `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>SearchEngineJump++ 调试脚本</title>
    <style>body{font:14px/1.6 system-ui,sans-serif;margin:40px;max-width:40em}a{color:#2563eb}</style>
  </head>
  <body>
    <h1>SearchEngineJump++ 调试脚本</h1>
    <p>点击安装 <a href="/install.user.js">install.user.js</a>（脚本名为 SearchEngineJump++ (dev)，与正式版共存）。</p>
    <p>安装后任意页面都会加载最新构建产物，产物变化时整页刷新。</p>
  </body>
</html>`;

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, origin);
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-headers', '*');
  res.setHeader('cache-control', 'no-store');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (pathname === '/install.user.js') {
      const text = await readBundle();
      res.writeHead(200, { 'content-type': 'application/javascript; charset=utf-8' });
      res.end(`${devHeader(text)}\n\n${loaderSource()}`);
      return;
    }
    if (pathname === '/sej.dev.js' || pathname === '/__hash') {
      const text = await readBundle();
      res.writeHead(200, {
        'content-type':
          pathname === '/__hash'
            ? 'text/plain; charset=utf-8'
            : 'application/javascript; charset=utf-8',
      });
      res.end(pathname === '/__hash' ? bundleHash(text) : text);
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(installHtml);
  } catch (e) {
    res.writeHead(503, { 'content-type': 'text/plain; charset=utf-8' });
    res.end(`构建产物还没生成（${bundlePath}），等 watch 构建完成后刷新本页。`);
  }
});

const build = startBuild();

server.on('error', (e) => {
  console.error(`[SEJ dev] 端口 ${port} 不可用：${e.message}（用 --port 或 SEJ_DEV_PORT 换一个）`);
  build.kill();
  process.exit(1);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`\n[SEJ dev] 调试脚本已就绪：${origin}/install.user.js`);
  console.log('[SEJ dev] 首次安装后无需重装，改代码会自动重建并刷新页面\n');
});

function shutdown() {
  build.kill();
  server.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

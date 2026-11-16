/**
 * 调试服务：本仓库唯一的 dev 入口（`nub run dev`）。
 *
 * watch 构建自包含产物到 .dev/build/，由脚本管理器直连本服务拉取、在自己的沙箱里执行：
 * 页面不加载任何外部脚本，因此严格 CSP 的站点也能调试，也不依赖 Vite dev server。
 * 脚本只在页面加载时取一次产物、不轮询，改完代码手动刷新。
 *
 * 构建时注入 VITE_SEJ_ROLE=dev，让实例角色落到 dev，宿主 id 与正式版互不冲突。
 */
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { Script } from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const bundlePath = path.join(root, '.dev', 'build', 'SearchEngineJump++.user.js');

function readPort() {
  const flag = process.argv.indexOf('--port');
  const value = flag > -1 ? process.argv[flag + 1] : process.env.SEJ_DEV_PORT;
  const port = Number(value);
  // 默认 5180（避开常见的 5173），可用 --port 或 SEJ_DEV_PORT 改
  return Number.isInteger(port) && port > 0 ? port : 5180;
}

const port = readPort();
const origin = `http://127.0.0.1:${port}`;
const noOpen = process.argv.includes('--no-open');

/** 用系统默认浏览器打开安装页，和 `nub run dev` 一样不落在 VS Code 内部浏览器里 */
function openInBrowser(url) {
  const [command, args] =
    process.platform === 'darwin'
      ? ['open', [url]]
      : process.platform === 'win32'
        ? ['cmd', ['/c', 'start', '', url]]
        : ['xdg-open', [url]];
  // 打不开只影响这一下，服务继续跑；地址已经打印在终端里
  spawn(command, args, { detached: true, stdio: 'ignore' }).on('error', () => {}).unref();
}

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

/**
 * 加载器：拉取产物后在脚本管理器沙箱内直接 eval。
 * 只在页面加载时取一次最新产物，改完代码手动刷新页面即可；不轮询，
 * 避免页面持续访问本地服务（Chrome 142+ 会对本地地址请求弹授权）。
 * 必须用直接 eval，间接 eval 会跑在全局作用域里而看不到 GM_*。
 */
function loaderSource() {
  return `
(() => {
  const ORIGIN = '${origin}';
  let warned = false;

  function request(pathname, onload) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: ORIGIN + pathname,
      onload,
      onerror() {
        if (warned) return;
        warned = true;
        console.error('[SEJ dev] 无法连接 ' + ORIGIN + '，请确认 nub run dev 已启动');
      },
    });
  }

  request('/sej.dev.js?t=' + Date.now(), (res) => {
    if (res.status !== 200) {
      console.error('[SEJ dev] 拉取调试产物失败：' + res.status);
      return;
    }
    try {
      // eval 的代码默认归到调用者名下，补 sourceURL 让 DevTools 单独列出这份产物
      // 这段是模板字符串，任何转义序列都会在生成阶段生效：换行必须双写反斜杠才会留到运行期
      eval(res.responseText + '\\n//# sourceURL=sej.dev.bundle.js');
    } catch (e) {
      console.error('[SEJ dev] 执行调试产物失败', e);
    }
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
    <p>点击安装 <a href="/install.user.js">install.user.js</a>（脚本名为 server:SearchEngineJump++，与正式版共存）。</p>
    <p>安装后每次打开/刷新页面都会拉取最新构建产物；改完代码手动刷新即可。</p>
  </body>
</html>`;

// 加载器由模板字符串拼出，转义写坏时只有在管理器里才会暴露成「语法错误」：启动时先解析一遍
function assertLoaderParses() {
  try {
    new Script(loaderSource());
  } catch (e) {
    console.error(`[SEJ dev] 生成的加载器代码无法解析，请检查模板字符串里的转义：${e.message}`);
    process.exit(1);
  }
}

assertLoaderParses();

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
      // 构建时已写入调试用的 @name，这里只需拼上加载器
      res.end(`${text}\n\n${loaderSource()}`);
      return;
    }
    if (pathname === '/sej.dev.js') {
      const text = await readBundle();
      res.writeHead(200, { 'content-type': 'application/javascript; charset=utf-8' });
      res.end(text);
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
  console.log('[SEJ dev] 首次安装后无需重装，改完代码刷新页面即可\n');
  if (noOpen) return;
  // 直接打开安装地址，由脚本管理器接管并弹出安装框，不用再点页内链接
  openInBrowser(`${origin}/install.user.js`);
});

function shutdown() {
  build.kill();
  server.close();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

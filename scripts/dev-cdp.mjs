/**
 * 带 CSP 豁免的调试浏览器。
 *
 * 三种调试方式的差别只在「怎么让脚本进到页面里」：
 * - `pnpm dev`：往页面插 localhost:5173 的模块脚本，有 HMR；站点 CSP 的 script-src
 *   不含该地址时脚本完全不运行。
 * - `pnpm dev:csp`：脚本管理器沙箱内 eval 自包含产物，绕开 CSP，代价是没有 HMR。
 * - 本脚本：自己拉起 Chrome，用 CDP 的 Page.setBypassCSP 关掉页面 CSP，
 *   于是 dev server 的模块脚本能正常加载，HMR、源码断点、Vue Devtools 都保留。
 *
 * 用独立的 user-data-dir：既保住该浏览器的登录态，也避开 Chrome 136+ 不允许
 * 默认 profile 开远程调试的限制。
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const opts = parseArgs(process.argv.slice(2));
const debugPort = Number(opts.port ?? process.env.SEJ_DEBUG_PORT ?? 9333);
const profileDir = path.resolve(root, opts.profile ?? '.dev/chrome-profile');
const devOrigin = opts['dev-origin'] ?? process.env.SEJ_DEV_ORIGIN ?? 'http://localhost:5173';
const targetUrl = opts.url ?? 'about:blank';
const injectEntry = !opts['no-inject'];

/** 拆出 `--key value` 与位置参数，便于 `pnpm dev:cdp --url https://...` 传值 */
function parseArgs(argv) {
  const values = {};
  const rest = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      rest.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      values[key] = true;
    } else {
      values[key] = next;
      i += 1;
    }
  }
  if (!values.url && rest[0]) values.url = rest[0];
  return values;
}

function findChrome() {
  const candidates = [
    process.env.SEJ_CHROME,
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDebugger() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      const info = await res.json();
      if (info.webSocketDebuggerUrl) return info.webSocketDebuggerUrl;
    } catch (e) {
      // 端口还没起来，继续等
    }
    await sleep(250);
  }
  throw new Error(`调试端口 ${debugPort} 没有响应`);
}

/** 极简 CDP 连接：只实现命令收发与事件订阅 */
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  const listeners = new Set();
  let nextId = 0;
  const opened = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('连接调试端口失败')), { once: true });
  });
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const task = message.id && pending.get(message.id);
    if (task) {
      pending.delete(message.id);
      if (message.error) task.reject(new Error(message.error.message));
      else task.resolve(message.result);
      return;
    }
    for (const listener of listeners) listener(message);
  });
  return {
    opened,
    send(method, params = {}, sessionId) {
      const id = (nextId += 1);
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
    on(listener) {
      listeners.add(listener);
    },
    close() {
      ws.close();
    },
  };
}

/**
 * 新文档里补上 dev server 的入口模块。
 *
 * 装了脚本管理器时页面已有同一入口，重复插入会跑两份脚本，所以先检查再插。
 * 没有脚本管理器时没有 GM_*，存储自动退回 localStorage，够调 UI。
 */
function injectExpression() {
  return `(() => {
  if (window.top !== window.self) return 'frame';
  const src = ${JSON.stringify(`${devOrigin}/__vite-plugin-monkey.entry.js`)};
  const load = () => {
    if (document.querySelector('script[src*="__vite-plugin-monkey.entry.js"]')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = src;
    document.documentElement.appendChild(script);
  };
  if (!document.documentElement) {
    document.addEventListener('DOMContentLoaded', load, { once: true });
    return 'deferred';
  }
  load();
  return 'injected';
})()`;
}

/**
 * 往当前文档补入口。
 *
 * 不带 contextId，让 CDP 用主框架当前的默认上下文：
 * 站点在解析阶段跳转时上下文会被替换，带 id 求值就会报 Cannot find context with specified id。
 * 仍然失败则稍后重试，注入表达式自身会判断是否已经插过。
 */
async function inject(sessionId, origin, attempt = 1) {
  try {
    const result = await cdp.send(
      'Runtime.evaluate',
      { expression: injectExpression(), returnByValue: true },
      sessionId,
    );
    if (opts.verbose) console.log(`[SEJ dev] ${origin} 注入：${result.result.value}`);
  } catch (e) {
    if (attempt >= 3) {
      console.warn(`[SEJ dev] 注入 ${origin} 失败：${e.message}`);
      return;
    }
    await sleep(200);
    await inject(sessionId, origin, attempt + 1);
  }
}

const chromePath = findChrome();
if (!chromePath) {
  console.error('[SEJ dev] 找不到 Chrome，用 SEJ_CHROME=/path/to/chrome 指定');
  process.exit(1);
}

mkdirSync(profileDir, { recursive: true });

// 先停在 about:blank：目标页面要在 autoAttach 就绪后再打开，才来得及关 CSP
const chrome = spawn(chromePath, [
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profileDir}`,
  '--no-first-run',
  '--no-default-browser-check',
  // 页面从 localhost 取模块会触发本地网络访问授权，调试浏览器里直接关掉
  '--disable-features=LocalNetworkAccessChecks',
  ...(opts.headless ? ['--headless=new'] : []),
  'about:blank',
]);
chrome.on('exit', (code) => process.exit(code ?? 0));

const cdp = connect(await waitForDebugger());
await cdp.opened;

cdp.on(async (message) => {
  // 页面一挂上就先关 CSP，再放行调试器，保证首屏脚本也在豁免范围内
  if (message.method === 'Target.attachedToTarget') {
    const { sessionId, targetInfo, waitingForDebugger } = message.params;
    if (targetInfo.type !== 'page') return;
    try {
      await cdp.send('Page.setBypassCSP', { enabled: true }, sessionId);
      await cdp.send('Runtime.enable', {}, sessionId);
    } catch (e) {
      console.warn(`[SEJ dev] 初始化 ${targetInfo.url} 失败：${e.message}`);
    }
    if (waitingForDebugger) await cdp.send('Runtime.runIfWaitingForDebugger', {}, sessionId);
    return;
  }

  // 每个新文档的默认执行上下文里注入一次；注入本身走调试通道，不受页面 CSP 限制
  if (message.method === 'Runtime.executionContextCreated' && injectEntry) {
    const { context } = message.params;
    if (!context.auxData?.isDefault || !/^https?:/.test(context.origin)) return;
    inject(message.sessionId, context.origin);
  }
});

await cdp.send('Target.setAutoAttach', {
  autoAttach: true,
  waitForDebuggerOnStart: true,
  flatten: true,
});

// 新标签在暂停态打开，等上面的 attachedToTarget 处理完关掉 CSP 再放行
await cdp.send('Target.createTarget', { url: targetUrl });

console.log(`[SEJ dev] 已启动 ${chromePath}`);
console.log(`[SEJ dev] 调试 profile：${profileDir}`);
console.log(`[SEJ dev] 该窗口内页面 CSP 已关闭，${devOrigin} 的 HMR 脚本可正常加载并热更新`);
if (injectEntry)
  console.log('[SEJ dev] 未装脚本管理器时自动补入口（无 GM_*，存储走 localStorage）');
console.log('[SEJ dev] 关闭浏览器即退出本脚本\n');

function shutdown() {
  cdp.close();
  chrome.kill();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

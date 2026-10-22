import { createApp } from 'vue';
import { GM_info, GM_registerMenuCommand } from '$';
import App from './App.vue';
import globalCss from './assets/global.css?raw';
import { initialize, getRoot, getHost, addStyle, reset } from './core/shadow.js';
import { applyDarkModeIfNeeded, watchDarkModeChanges } from './core/darkMode.js';
import { onRestartRequest } from './core/appControl.js';
import { useSettings, STORAGE_KEY } from './stores/settings.js';
import { openSettingPanel, closeSettingPanel, showToast, ui } from './stores/ui.js';
import { initStorage, pullLatest, watchValue } from './core/storage.js';

// 严格 CSP 页面的兼容样式
const CSP_COMPAT_STYLE = `
  .sej-engine-icon { width: 16px; height: 16px; flex: 0 0 auto; object-fit: cover; display: inline-block; }
  .sej-engine-icon:not([src]) { display: none; }
  .sej-category-title { font-weight: 600; padding: 0 12px; opacity: 0.8; }
  #newSearchBox #iqxin-newTarget { border-radius: 8px; border: 1px solid var(--border-color-sej); padding: 7px 9px; }
  .iqxin-help-link { color: #999; }
  #iqxin-editCodeBox textarea { overflow: auto; border-radius: 10px; }
  .iqxin-warning { color: red; font-size: 1.2em; }
  #sej-drop-lists { display: contents; }
`;

// 关闭跳转条动画（transtion: false）
const NON_TRANSITION_STYLE = `
  .sej-engine, .sej-drop-list-trigger, .sej-drop-list { transition: none !important; animation: none !important; }
  #sej-container { animation: none !important; }
  .sej-drop-list { backdrop-filter: none !important; }
`;

// 关闭设置面板动画（transtion: false）
const SETTINGS_NON_TRANSITION_STYLE = `
  #settingLayer, #btnEle span, .iqxin-set-del,
  span.iqxin-additem, #newSearchBox, .addItemBoxBtn, #settingLayerMask {
    transition: none;
  }
  #settingLayerMask { animation: none; }
  #settingLayerMask { backdrop-filter: none; }
  #settingLayer { animation: none; }
  .sej-panel-close {
    transition: none;
  }
`;

// 这些站点需要等待页面内容渲染后再初始化
const DELAY_LIST = [
  /^https?:\/\/google\.infinitynewtab\.com\/\?q/,
  /^https?:\/\/www\.zhihu\.com\/search\?/,
  /^https?:\/\/www\.iciba\.com\/word\?/,
  /^https?:\/\/neeva\.com\/search\?/i,
  /^https?:\/\/s\.taobao\.com\/search/,
  /^https?:\/\/y\.qq\.com\/n\/ryqq\/search/i,
  /^https?:\/\/www\.quora\.com\/search\?/i,
  /^https?:\/\/search\.bilibili\.com\/*/,
  /^https?:\/\/github\.com/i,
  /^https?:\/\/(www\.)?baidu\.com/i,
];

let app = null;
let menuRegistered = false;

function isRunning() {
  return Boolean(document.querySelector('#sej-shadow-host'));
}

function printBanner() {
  try {
    const name = GM_info?.script?.name;
    const version = GM_info?.script?.version;
    if (!name) return;
    console.info(
      `\n%c ${name} v${version} \n%c 问题反馈(GitHub):\t\thttps://github.com/MUTED64/SearchEngineJumpPlus/issues/new\t\t\t\t\t\t\t\n%c 问题反馈(GreasyFork):\thttps://greasyfork.org/scripts/454280-searchenginejumpplus-搜索引擎快捷跳转/feedback\t\n`,
      'color:#eee;background:#444;padding:6px 0;border-radius:6px 6px 0 0;',
      'color:#444;background:#eee;padding:6px 0;border-radius:0 6px 0 0',
      'color:#444;background:#eee;padding:6px 0;border-radius:0 0 6px 6px;',
    );
  } catch (e) {
    // ignore
  }
}

function boot() {
  if (isRunning()) return;

  if (app) {
    try {
      app.unmount();
    } catch (e) {
      // ignore
    }
    app = null;
  }

  reset();

  initialize();
  addStyle(globalCss);
  addStyle(CSP_COMPAT_STYLE);

  const { settingData } = useSettings();
  if (!settingData.transtion) {
    addStyle(NON_TRANSITION_STYLE);
    addStyle(SETTINGS_NON_TRANSITION_STYLE);
  }

  applyDarkModeIfNeeded();
  watchDarkModeChanges();

  // 未匹配到规则时，宿主默认挂到 body 末尾（划词搜索等场景会在后续按需移动）
  document.body.appendChild(getHost());

  app = createApp(App);
  app.mount(getRoot());

  if (!menuRegistered) {
    const gmNamespace =
      typeof globalThis !== 'undefined' ? globalThis.GM : undefined;
    const gmMenu =
      gmNamespace && typeof gmNamespace['registerMenuCommand'] === 'function'
        ? gmNamespace['registerMenuCommand'].bind(gmNamespace)
        : null;
    const registerMenu =
      typeof GM_registerMenuCommand === 'function'
        ? GM_registerMenuCommand
        : gmMenu;
    if (registerMenu) {
      try {
        registerMenu('设置菜单', openSettingPanel);
        menuRegistered = true;
      } catch (e) {
        console.warn('[SEJ] 注册菜单命令失败', e);
      }
    } else {
      menuRegistered = true;
      console.info('[SEJ] 当前脚本管理器不支持菜单命令，可使用跳转条右侧的设置按钮');
    }
  }
}

async function startScript() {
  if (window.self != window.top) return;

  printBanner();

  // 先探测存储后端并预加载配置（兼容仅提供异步 GM.getValue 的管理器）
  await initStorage([STORAGE_KEY]);

  const needDelay = DELAY_LIST.some((re) => location.href.search(re) !== -1);
  if (needDelay) {
    setTimeout(() => {
      if (!isRunning()) boot();
    }, 1000);
  } else {
    boot();
  }
}

// 设置保存后原地重建脚本 DOM，避免刷新页面
function restart() {
  closeSettingPanel();
  if (app) {
    try {
      app.unmount();
    } catch (e) {
      // ignore
    }
    app = null;
  }
  reset();
  boot();
}

function normalizeURL(urlString) {
  try {
    const url = new URL(urlString);
    // Bilibili: 移除 vt 参数（时间戳）防止错误更新
    if (url.hostname.includes('bilibili.com')) {
      url.searchParams.delete('vt');
    }
    return url.toString();
  } catch (e) {
    return urlString;
  }
}

// 单页应用路由变化后重建跳转条
function listenUrlChange() {
  if (window.onurlchange !== null) return;

  let lastURL = normalizeURL(decodeURI(location.href).replaceAll(' ', '+'));
  window.addEventListener('urlchange', (e) => {
    const newURL = normalizeURL(decodeURI(e.url).replaceAll(' ', '+'));
    if (lastURL === newURL) return;
    lastURL = newURL;

    if (app) {
      try {
        app.unmount();
      } catch (err) {
        // ignore
      }
      app = null;
    }
    reset();
    startScript();
  });
}

let settingsSyncStarted = false;
let settingsSyncTimer = null;
let pollTimer = null;

function applyRemoteSettings() {
  if (ui.settingPanelOpen) {
    showToast('SearchEngineJump++: 其他页面已更新设置，关闭设置面板后刷新页面生效', 3000);
    return;
  }
  if (!useSettings().reload()) return;
  restart();
  showToast('SearchEngineJump++: 已从其他页面同步配置');
}

function setupSettingsSync() {
  if (settingsSyncStarted) return;
  settingsSyncStarted = true;

  watchValue(STORAGE_KEY, () => {
    clearTimeout(settingsSyncTimer);
    settingsSyncTimer = setTimeout(applyRemoteSettings, 200);
  });

  // 部分管理器（如 Greasemonkey 4）没有变更监听，靠轮询兜底
  const poll = async () => {
    if (!app || ui.settingPanelOpen || document.hidden) return;
    const latest = await pullLatest(STORAGE_KEY);
    if (latest) applyRemoteSettings();
  };

  clearInterval(pollTimer);
  pollTimer = setInterval(poll, 2000);

  // 切回标签页时立即检查一次，避免最多 2 秒的等待
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
  window.addEventListener('focus', poll);
}

onRestartRequest(restart);
startScript();
listenUrlChange();
setupSettingsSync();

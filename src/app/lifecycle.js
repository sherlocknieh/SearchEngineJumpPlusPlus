import { createApp, watch } from 'vue';
import App from '../App.vue';
import globalCss from '../assets/global.css?raw';
import {
  addStyle,
  getHost,
  HOST_ID,
  HOST_ROLE_FLOAT,
  HOST_ROLE_MAIN,
  initialize,
  reset,
} from '../core/shadowDom.js';
import { applyDarkModeIfNeeded, watchDarkModeChanges } from '../core/darkMode.js';
import { imageSearch } from '../stores/imageSearch.js';
import { useSettings } from '../stores/settings.js';
import { closeSettingPanel } from '../stores/ui.js';
import { registerMenu } from './menu.js';

// 内嵌条与设置面板共用一个应用实例；划词条是独立实例，互不影响
let mainApp = null;
let floatApp = null;
// 图片模式结束后，若未开启划词搜索就卸载浮层条，避免留一个空实例
let stopFloatWatch = null;

/**
 * 判断当前脚本实例是否已经挂载。
 *
 * 只检查自己的 HOST_ID，因此开发版和正式版可以同时运行、互不影响。
 */
export function isRunning() {
  return Boolean(document.getElementById(HOST_ID));
}

function unmountApp(app) {
  if (!app) return;
  try {
    app.unmount();
  } catch (e) {
    // 卸载失败也要继续清理，避免阻塞重启
  }
}

/**
 * 卸载当前 Vue 应用并清空 Shadow DOM 状态。
 *
 * 重启、SPA 路由变化和重新初始化前都会调用，
 * 保证不会残留旧的 DOM、样式或事件监听。
 */
export function teardown() {
  stopFloatWatch?.();
  stopFloatWatch = null;
  unmountApp(floatApp);
  unmountApp(mainApp);
  floatApp = null;
  mainApp = null;
  reset();
}

/**
 * 按需挂载划词条：只在开启划词搜索或正在搜图时才有意义。
 * 已挂载时直接复用，避免重复创建 Vue 应用。
 */
export function ensureFloatBar() {
  if (floatApp) return;
  const settings = useSettings();
  if (!settings.settingData?.selectSearch && !imageSearch.active) return;

  const root = initialize(HOST_ROLE_FLOAT);
  document.body.appendChild(getHost(HOST_ROLE_FLOAT));
  // 宿主可能晚于主题初始化创建，补一次主题属性
  applyDarkModeIfNeeded();

  floatApp = createApp(App, { role: HOST_ROLE_FLOAT });
  floatApp.mount(root);

  // 只靠长按搜图唤起的浮层条在图片模式结束后不再有用
  stopFloatWatch?.();
  stopFloatWatch = watch(
    () => imageSearch.active,
    (active) => {
      if (active || useSettings().settingData?.selectSearch) return;
      disposeFloatBar();
    },
  );
}

/** 卸载浮层条并移除宿主：关闭划词搜索后不留空 DOM */
export function disposeFloatBar() {
  stopFloatWatch?.();
  stopFloatWatch = null;
  unmountApp(floatApp);
  floatApp = null;
  getHost(HOST_ROLE_FLOAT).remove();
}

/**
 * 启动脚本：创建 Shadow DOM、注入全局样式并挂载 Vue 应用。
 *
 * @param {object} options
 * @param {boolean} options.force 是否强制替换当前实例。
 *   设置保存后的原地重启需要 true；普通启动保持 false，避免重复挂载。
 */
export function boot({ force = false } = {}) {
  // 普通启动时如果已经运行，只需补齐按需挂载的部分（如划词条）
  if (!force && isRunning()) {
    ensureFloatBar();
    return;
  }

  // 先彻底清理旧实例，保证 initialize() 创建的是全新的宿主和 Shadow Root
  teardown();
  const root = initialize(HOST_ROLE_MAIN);

  // 全局主题变量等基础样式
  addStyle(globalCss);

  // 根据页面主题设置宿主属性，并持续监听主题变化
  applyDarkModeIfNeeded();
  watchDarkModeChanges();

  // 先挂到 body 末尾；匹配到站点规则后，JumpBar 会把宿主移动到目标位置
  document.body.appendChild(getHost(HOST_ROLE_MAIN));

  mainApp = createApp(App, { role: HOST_ROLE_MAIN });
  mainApp.mount(root);
  // 划词条独立挂载，不影响内嵌条与设置面板
  ensureFloatBar();
  registerMenu();
}

/**
 * 设置保存后的原地重启。
 *
 * 关闭设置面板后强制重新 boot：卸载旧 Vue 应用、重建 Shadow DOM，
 * 这样新设置无需刷新整个页面即可生效。
 */
export function restart() {
  closeSettingPanel();
  boot({ force: true });
}

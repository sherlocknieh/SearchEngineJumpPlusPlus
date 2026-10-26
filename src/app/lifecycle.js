import { createApp } from 'vue';
import App from '../App.vue';
import globalCss from '../assets/global.css?raw';
import { addStyle, getHost, HOST_ID, initialize, reset } from '../core/shadowDom.js';
import { applyDarkModeIfNeeded, watchDarkModeChanges } from '../core/darkMode.js';
import { closeSettingPanel } from '../stores/ui.js';
import { registerMenu } from './menu.js';

let app = null; // 当前挂载的 Vue 应用实例

/**
 * 判断当前脚本实例是否已经挂载。
 *
 * 只检查自己的 HOST_ID，因此开发版和正式版可以同时运行、互不影响。
 */
export function isRunning() {
  return Boolean(document.getElementById(HOST_ID));
}

/**
 * 卸载当前 Vue 应用并清空 Shadow DOM 状态。
 *
 * 重启、SPA 路由变化和重新初始化前都会调用，
 * 保证不会残留旧的 DOM、样式或事件监听。
 */
export function teardown() {
  if (app) {
    try {
      app.unmount();
    } catch (e) {
      // 卸载失败也要继续清理，避免阻塞重启
    }
    app = null;
  }
  reset();
}

/**
 * 启动脚本：创建 Shadow DOM、注入全局样式并挂载 Vue 应用。
 *
 * @param {object} options
 * @param {boolean} options.force 是否强制替换当前实例。
 *   设置保存后的原地重启需要 true；普通启动保持 false，避免重复挂载。
 */
export function boot({ force = false } = {}) {
  // 普通启动时如果已经运行，直接跳过；force 用于重启时替换旧实例
  if (!force && isRunning()) return;

  // 先彻底清理旧实例，保证 initialize() 创建的是全新的宿主和 Shadow Root
  teardown();
  const root = initialize();

  // 全局主题变量等基础样式
  addStyle(globalCss);

  // 根据页面主题设置宿主属性，并持续监听主题变化
  applyDarkModeIfNeeded();
  watchDarkModeChanges();

  // 先挂到 body 末尾；匹配到站点规则后，JumpBar 会把宿主移动到目标位置
  document.body.appendChild(getHost());

  app = createApp(App);
  app.mount(root);
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

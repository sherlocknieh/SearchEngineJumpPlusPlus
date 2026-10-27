import { initStorage } from '../core/storage.js';
import { STORAGE_KEY, useSettings } from '../stores/settings.js';
import { printBanner } from './banner.js';
import { DELAY_START_MS, shouldDelayStart } from './delay.js';
import { boot } from './lifecycle.js';
import { registerMenu } from './menu.js';
import { getSelectedText } from '../core/selection.js';

let startTimer = 0;
let lazyListeners = null;

/**
 * 脚本启动流程。
 *
 * 只允许运行在顶层页面；随后初始化存储、打印版本信息，
 * 最后决定是立即启动、延迟启动，还是等用户第一次划词再启动。
 */
export async function startScript() {
  // iframe 内不运行，避免同一页面出现多个跳转条
  if (window.self !== window.top) return;

  printBanner();

  // 先探测存储后端并预加载配置。
  // 某些管理器的 GM.getValue 是异步的，必须先等这里完成再读取设置。
  await initStorage([STORAGE_KEY]);

  // 菜单命令要在挂载之前就可用：延迟启动时先按需启动，再打开设置面板
  registerMenu(requestBoot);

  armStart();
}

/**
 * 根据当前页面选择启动方式：
 * - 命中站点规则：按延迟策略直接挂载跳转条；
 * - 没有站点规则：只按需挂载（划词或打开设置菜单时）。
 */
function armStart() {
  disarmLazyStart();

  const settings = useSettings();

  // 没有站点规则：
  // - 开启划词搜索时等第一次划词再挂载；
  // - 连划词条也关闭时完全不挂载，只在打开设置菜单时按需启动。
  if (!settings.getMatchedRule()) {
    if (settings.settingData.selectSearch) {
      armLazyStart(settings.settingData.selectSearchInInput);
    }
    return;
  }

  scheduleBoot();
}

function scheduleBoot() {
  if (startTimer) return;

  if (shouldDelayStart()) {
    // 延迟站点：等页面把输入框渲染出来后再启动
    startTimer = setTimeout(() => {
      startTimer = 0;
      boot();
    }, DELAY_START_MS);
  } else {
    boot();
  }
}

/**
 * 立即启动（菜单命令等场景使用），并取消待执行的延迟启动。
 */
export function requestBoot() {
  disarmLazyStart();
  if (startTimer) {
    clearTimeout(startTimer);
    startTimer = 0;
  }
  boot();
}

function armLazyStart(includeInput) {
  const onSelectionChange = () => {
    // 懒启动期间页面的鼠标/键盘事件都会走到这里，先做最廉价的判断
    const text = getSelectedText({ includeInput });
    if (!text.trim()) return;
    requestBoot();
  };

  document.addEventListener('selectionchange', onSelectionChange);
  // 部分站点/浏览器的 selectionchange 时机不稳定，补充鼠标与键盘兜底
  document.addEventListener('mouseup', onSelectionChange);
  document.addEventListener('keyup', onSelectionChange);

  lazyListeners = () => {
    document.removeEventListener('selectionchange', onSelectionChange);
    document.removeEventListener('mouseup', onSelectionChange);
    document.removeEventListener('keyup', onSelectionChange);
  };
}

function disarmLazyStart() {
  if (lazyListeners) {
    lazyListeners();
    lazyListeners = null;
  }
}

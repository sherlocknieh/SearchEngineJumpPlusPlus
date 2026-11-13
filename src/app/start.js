import { initStorage } from '../core/storage.js';
import { STORAGE_KEY, useSettings } from '../stores/settings.js';
import { printBanner } from './banner.js';
import { DELAY_START_MS, shouldDelayStart } from './delay.js';
import { boot } from './lifecycle.js';
import { registerMenu } from './menu.js';
import { getSelectedText } from '../core/selection.js';
import { isPointerPressed, trackSelectionPointer } from '../core/selectionGesture.js';
import { findSelectionBlocker, removeSelectionBlockers } from '../core/overlayGuard.js';
import { showToast } from '../stores/ui.js';
import { t } from '../assets/i18n.js';
import { armImageContextMenu } from './imageContextMenu.js';

let startTimer = 0;
let lazyListeners = null;
// 已提示过的遮罩：同一层只提示一次，广告刷新换成新节点后才会再提示
let promptedBlocker = null;

// 广告插屏常常在页面加载后才注入，隔一段时间探测一次
const OVERLAY_PROBE_INTERVAL_MS = 3000;
// 连续命中说明这层遮罩不是一闪而过的弹层，探测也有个上限
const OVERLAY_PROBE_MAX_TRIES = 10;

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

  // 右键图片搜图同样要在挂载前就可用：命中时先启动脚本再弹浮层
  armImageContextMenu(requestBoot);

  armStart();
}

/**
 * 根据当前页面选择启动方式：
 * - 命中站点规则：按延迟策略直接挂载跳转条；
 * - 没有站点规则：只按需挂载划词条（划词、搜图或打开设置菜单时）。
 */
function armStart() {
  disarmLazyStart();

  const settings = useSettings();

  // 没有站点规则：
  // - 开启划词搜索时等第一次划词再启动；
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
  // 划词条要等松手再出现，懒启动也必须等到松手
  trackSelectionPointer();

  const onSelectionChange = () => {
    // 拖动选区的中间态不启动，等 pointerup/mouseup 后的最终选区
    if (isPointerPressed()) return;
    // 懒启动期间页面的鼠标/键盘事件都会走到这里，先做最廉价的判断
    const text = getSelectedText({ includeInput });
    if (!text.trim()) return;
    requestBoot();
  };

  document.addEventListener('selectionchange', onSelectionChange);
  // 部分站点/浏览器的 selectionchange 时机不稳定，补充鼠标与键盘兜底
  document.addEventListener('mouseup', onSelectionChange);
  document.addEventListener('keyup', onSelectionChange);

  // 全屏透明遮罩会接走鼠标事件，页面连选区都不会有，上面的事件压根不会触发；
  // 只能在旁边持续探测，确认遮罩稳定存在后给用户移除入口
  let probedBlocker = null;
  let probeTries = 0;
  const probeTimer = setInterval(() => {
    probeTries += 1;
    const blocker = findSelectionBlocker();
    const confirmed = Boolean(blocker) && blocker === probedBlocker;
    probedBlocker = blocker;
    if (confirmed) promptOverlayBlocked(blocker);
    else if (probeTries >= OVERLAY_PROBE_MAX_TRIES) clearInterval(probeTimer);
  }, OVERLAY_PROBE_INTERVAL_MS);

  lazyListeners = () => {
    clearInterval(probeTimer);
    document.removeEventListener('selectionchange', onSelectionChange);
    document.removeEventListener('mouseup', onSelectionChange);
    document.removeEventListener('keyup', onSelectionChange);
  };
}

/** 提示页面被遮罩挡住，并提供一键移除；Toast 属于脚本自己的应用，先挂载再提示 */
function promptOverlayBlocked(blocker) {
  if (blocker === promptedBlocker) return;
  promptedBlocker = blocker;
  requestBoot();
  showToast(t('toast.overlayBlocked'), 8000, {
    label: t('toast.overlayBlockedAction'),
    onClick: () => {
      if (removeSelectionBlockers()) showToast(t('toast.overlayRemoved'));
    },
  });
}

function disarmLazyStart() {
  if (lazyListeners) {
    lazyListeners();
    lazyListeners = null;
  }
}

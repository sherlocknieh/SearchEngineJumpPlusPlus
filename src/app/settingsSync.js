import { pullLatest, watchValue } from '../core/storage.js';
import { STORAGE_KEY, useSettings } from '../stores/settings.js';
import { showToast, ui } from '../stores/ui.js';
import { t } from '../assets/i18n.js';
import { isRunning, restart } from './lifecycle.js';

/** GM 存储变化后的防抖时间，避免连续写入导致多次重启 */
const SYNC_DEBOUNCE_MS = 200;
/** 没有变更监听时的轮询间隔 */
const SYNC_POLL_MS = 2000;

// 只初始化一次，避免重复注册监听与定时器
let started = false;
let syncTimer = null;

/**
 * 应用其他标签页写入的新设置。
 *
 * - 设置面板打开时，不直接重启，只递增 revision，
 *   让面板自己决定能安全合并哪些修改；
 * - 面板关闭时，只有设置确实变化才重启并提示用户。
 */
function applyRemoteSettings() {
  if (ui.settingPanelOpen) {
    ui.settingsRevision++;
    return;
  }
  if (!useSettings().reload()) return;
  restart();
  showToast(t('toast.syncedFromOtherPages'));
}

/**
 * 初始化设置同步。
 *
 * 优先使用 GM 存储的变更监听；部分管理器（如 Greasemonkey 4）
 * 没有该能力，因此额外用轮询兜底。
 * 切回标签页或窗口获得焦点时立即检查一次，减少等待感。
 */
export function setupSettingsSync() {
  if (started) return;
  started = true;

  watchValue(STORAGE_KEY, () => {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(applyRemoteSettings, SYNC_DEBOUNCE_MS);
  });

  // 轮询兜底：未挂载、面板打开或页面在后台时跳过，减少无意义读取
  const poll = async () => {
    if (!isRunning() || ui.settingPanelOpen || document.hidden) return;
    const latest = await pullLatest(STORAGE_KEY);
    if (latest) applyRemoteSettings();
  };

  setInterval(poll, SYNC_POLL_MS);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) poll();
  });
  window.addEventListener('focus', poll);
}

/**
 * 跨标签页设置同步。
 *
 * 其他页面保存后递增 ui.settingsRevision，这里判断面板内是否有未提交的
 * 修改：没有冲突就直接刷新草稿，有冲突则提示用户手动同步。
 */
import { watch } from 'vue';
import { isSameValue } from '../core/storage.js';
import { showToast, ui } from '../stores/ui.js';
import { t } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {object} options.settings 设置实例
 * @param {() => object} options.source 当前已生效配置
 * @param {() => object} options.buildResult 生成完整配置
 * @param {() => void} options.refreshDraft 刷新草稿
 * @param {object} options.saving 自动保存进行中标记
 * @param {object} options.remoteSynced 是否已从远端同步过（关闭面板时据此重启）
 * @param {() => boolean} options.isOverlayOpen 是否有弹窗/配置编辑器打开
 * @param {() => void} options.cancelAutoSave 取消待执行的自动保存
 * @param {() => void} options.closeOverlays 关闭全部弹窗与配置编辑器
 */
export function useRemoteSettingsSync({
  settings,
  source,
  buildResult,
  refreshDraft,
  saving,
  remoteSynced,
  isOverlayOpen,
  cancelAutoSave,
  closeOverlays,
}) {
  function trySyncFromRemote() {
    if (saving.value) return;
    const hasLocalChanges = !isSameValue(buildResult(), source.value);
    if (isOverlayOpen() || hasLocalChanges) {
      showToast(t('toast.remoteConflict'), 6000, {
        label: t('toast.syncAction'),
        onClick: forceSyncFromRemote,
      });
      return;
    }
    if (!settings.reload()) return;
    refreshDraft();
    remoteSynced.value = true;
    showToast(t('toast.synced'), 3000);
  }

  // 放弃面板内未提交的修改，直接采用存储中的最新设置
  function forceSyncFromRemote() {
    closeOverlays();
    cancelAutoSave();
    settings.reload();
    refreshDraft();
    remoteSynced.value = true;
    showToast(t('toast.synced'), 3000);
  }

  watch(() => ui.settingsRevision, trySyncFromRemote);

  return { trySyncFromRemote, forceSyncFromRemote };
}

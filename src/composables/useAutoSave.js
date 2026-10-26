/**
 * 设置面板的自动保存。
 *
 * 重要编辑（增删改引擎、调整排序、开关选项）后会节流写回存储；
 * 文本输入仍由组件在提交时显式保存，避免逐字写入。
 */
import { ref } from 'vue';
import { isSameValue } from '../core/storage.js';
import { showToast } from '../stores/ui.js';
import { t } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {() => object} options.buildResult 生成待写入的完整配置
 * @param {() => object} options.getCurrent 当前已生效的配置
 * @param {{ savePartial: (config: object) => string, applySettings: (config: object) => string }} options.settings
 * @param {number} [options.delay] 节流时间
 */
export function useAutoSave({ buildResult, getCurrent, settings, delay = 500 }) {
  const saving = ref(false);
  // 自动保存成功后，在底部关闭按钮上短暂显示 ✓ 反馈
  const saveFlash = ref(false);

  let autosaveTimer = null;
  let autosaveQueued = false;
  let autosaveWarnedLocal = false;
  let saveFlashTimer = null;
  let settingsChanged = false;

  function pulseSaveFeedback() {
    saveFlash.value = true;
    clearTimeout(saveFlashTimer);
    saveFlashTimer = setTimeout(() => {
      saveFlashTimer = null;
      saveFlash.value = false;
    }, 900);
  }

  function cancelAutoSave() {
    autosaveQueued = false;
    clearTimeout(autosaveTimer);
    autosaveTimer = null;
  }

  function flushAutoSave() {
    autosaveTimer = null;
    if (!autosaveQueued || saving.value) return;
    autosaveQueued = false;

    const next = buildResult();
    if (isSameValue(next, getCurrent())) return;

    const backend = settings.savePartial(next);
    if (backend === 'memory') {
      showToast(t('toast.autoSaveFailed'), 5000);
      return;
    }
    settingsChanged = true;
    pulseSaveFeedback();
    if (backend === 'local' && !autosaveWarnedLocal) {
      autosaveWarnedLocal = true;
      showToast(t('toast.autoSavedLocal'), 3000);
    }
  }

  function scheduleAutoSave() {
    if (saving.value) return;
    autosaveQueued = true;
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(flushAutoSave, delay);
  }

  /** 关闭面板前调用：把尚未触发的自动保存立即落盘 */
  function flushPending() {
    if (!autosaveQueued) return;
    clearTimeout(autosaveTimer);
    flushAutoSave();
  }

  /**
   * 立即保存（底部主按钮）。
   * @returns {boolean} 是否成功；失败时调用方不应关闭面板
   */
  function saveNow() {
    if (saving.value) return false;
    cancelAutoSave();
    saving.value = true;
    try {
      if (!isSameValue(buildResult(), getCurrent())) {
        const backend = settings.applySettings(buildResult());
        if (backend === 'memory') {
          showToast(t('toast.saveFailed'), 5000);
          return false;
        }
        settingsChanged = true;
        if (backend === 'local') {
          showToast(t('toast.savedLocal'), 4000);
        }
      }
      return true;
    } finally {
      saving.value = false;
    }
  }

  function markSettingsChanged() {
    settingsChanged = true;
  }

  function takeSettingsChanged() {
    const changed = settingsChanged;
    settingsChanged = false;
    return changed;
  }

  function dispose() {
    cancelAutoSave();
    clearTimeout(saveFlashTimer);
    saveFlashTimer = null;
  }

  return {
    saving,
    saveFlash,
    cancelAutoSave,
    flushAutoSave,
    scheduleAutoSave,
    flushPending,
    saveNow,
    pulseSaveFeedback,
    markSettingsChanged,
    takeSettingsChanged,
    dispose,
  };
}

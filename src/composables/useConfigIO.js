/**
 * 设置面板的配置导入/导出与配置编辑器状态。
 *
 * 包含文本预览、文件导入、合并预览、覆盖应用与导出下载。
 */
import { computed, ref } from 'vue';
import { configToText } from '../core/configSchema.js';
import { mergeIntoCategories } from '../core/configMerge.js';
import { showToast } from '../stores/ui.js';
import { t } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {object} options.draft 设置面板草稿
 * @param {() => number} options.nextId 生成草稿内部 id
 * @param {(categories?: Array) => object} options.buildResult 生成完整配置
 * @param {() => object} options.getCurrent 当前已生效配置
 * @param {() => object} options.getSettings 设置实例
 * @param {() => void} options.refreshDraft 应用后刷新草稿
 * @param {() => void} options.cancelAutoSave 取消待执行的自动保存
 * @param {() => void} options.markSettingsChanged 标记设置已修改
 * @param {() => void} options.notifySaved 保存成功后的 toast 提示
 * @param {() => void} options.resetRemoteSynced 重置“已同步远端”标记
 */
export function useConfigIO({
  draft,
  nextId,
  buildResult,
  getCurrent,
  getSettings,
  refreshDraft,
  cancelAutoSave,
  markSettingsChanged,
  notifySaved,
  resetRemoteSynced,
}) {
  const configOpen = ref(false);
  const pendingImport = ref(null);
  const configFileInput = ref(null);

  const configText = computed(() => configToText(getCurrent()));
  const defaultConfigText = computed(() => configToText(getSettings().scriptSettingData));

  function openConfig() {
    pendingImport.value = null;
    configOpen.value = true;
  }

  function pickConfigFile() {
    configFileInput.value?.click();
  }

  async function importConfigFile(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      pendingImport.value = JSON.parse(await file.text());
      // 窗口先展示当前配置，等用户选择覆盖或合并后再切换内容
      configOpen.value = true;
    } catch (e) {
      alert(t('config.parseFailed'));
    }
  }

  function exportConfig() {
    const blob = new Blob([configText.value], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SearchEngineJump.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t('config.exported'));
  }

  function parseConfigInput(input) {
    if (typeof input !== 'string') return input;
    try {
      return JSON.parse(input);
    } catch (e) {
      alert(t('config.parseFailed'));
      return null;
    }
  }

  // 合并预览：在草稿的副本上合并，返回供文本框展示的配置，不写入设置
  function mergePreview(input, silent = false) {
    const parsed = parseConfigInput(input);
    if (!parsed) return '';

    const categories = draft.categories.map((cat) => ({
      ...cat,
      engines: cat.engines.map((engine) => ({ ...engine })),
    }));
    const stats = mergeIntoCategories(categories, parsed, nextId);
    if (!stats) {
      if (!silent) alert(t('config.mergeUnrecognized'));
      return '';
    }

    if (!stats.engines) {
      // 没有新增条目时仍然返回完整配置，避免切换模式后只剩导入文件内容
      if (!silent) showToast(t('toast.mergeNothing'), 3000);
    } else {
      const parts = [t('toast.mergedEngines', { count: stats.engines })];
      if (stats.categories) {
        parts.push(t('toast.mergedCategories', { count: stats.categories }));
      }
      if (stats.skipped) {
        parts.push(t('toast.mergedSkipped', { count: stats.skipped }));
      }
      if (!silent) {
        showToast(
          t('toast.mergeImported', {
            summary: parts.join(t('toast.listSeparator')),
          }),
          4000,
        );
      }
    }
    return configToText(buildResult(categories));
  }

  function applyConfig(text) {
    const parsed = parseConfigInput(text);
    if (!parsed) return;
    cancelAutoSave();
    resetRemoteSynced();
    const backend = getSettings().applySettings(parsed);
    pendingImport.value = null;
    refreshDraft();
    if (backend === 'memory') {
      showToast(t('toast.saveFailed'), 5000);
    } else {
      markSettingsChanged();
      notifySaved();
    }
    configOpen.value = false;
  }

  function cancelConfig() {
    pendingImport.value = null;
    configOpen.value = false;
  }

  return {
    configOpen,
    pendingImport,
    configFileInput,
    configText,
    defaultConfigText,
    openConfig,
    pickConfigFile,
    importConfigFile,
    exportConfig,
    mergePreview,
    applyConfig,
    cancelConfig,
  };
}

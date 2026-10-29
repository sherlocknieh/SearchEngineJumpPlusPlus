/**
 * 设置面板中分类/引擎编辑弹窗的处理逻辑。
 *
 * 弹窗状态由调用方创建并传入：撤销、图标、拖拽等模块都需要判断
 * 「是否有弹窗打开」，把状态留在面板外壳里可以避免循环依赖。
 */
import { t } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {object} options.draft 设置面板草稿
 * @param {() => number} options.nextId 生成草稿内部 id
 * @param {object} options.categoryDialog 分类弹窗状态
 * @param {object} options.engineDialog 引擎弹窗状态
 * @param {object} options.engineSaving 引擎保存中标记
 * @param {() => void} options.scheduleAutoSave 触发自动保存
 * @param {(index: number) => void} options.deleteCategory 删除分类（可撤销）
 * @param {(ci: number, ei: number) => void} options.deleteEngine 删除引擎（可撤销）
 * @param {(engine: object, original: string) => void} options.refreshIconInBackground 后台补图标
 * @param {() => boolean} options.consumeClickSuppression 是否忽略这次点击
 */
export function useSettingsDialogs({
  draft,
  nextId,
  categoryDialog,
  engineDialog,
  engineSaving,
  scheduleAutoSave,
  deleteCategory,
  deleteEngine,
  refreshIconInBackground,
  consumeClickSuppression,
}) {
  function openCategoryDialog(index) {
    if (consumeClickSuppression()) return;
    categoryDialog.value = { index };
  }

  function submitCategory(name) {
    const ctx = categoryDialog.value;
    if (!ctx) return;
    const category = draft.categories[ctx.index];
    if (category) {
      const nextName = name || t('category.emptyName');
      if (category.name !== nextName) {
        category.name = nextName;
        scheduleAutoSave();
      }
    }
    categoryDialog.value = null;
  }

  function cancelCategoryDialog() {
    categoryDialog.value = null;
  }

  function deleteCategoryFromDialog() {
    const ctx = categoryDialog.value;
    if (!ctx) return;
    categoryDialog.value = null;
    deleteCategory(ctx.index);
  }

  function addEngine(ci) {
    engineDialog.value = { mode: 'add', ci, initial: {} };
  }

  function editEngine(ci, ei) {
    if (consumeClickSuppression()) return;
    engineDialog.value = {
      mode: 'edit',
      ci,
      ei,
      initial: { ...draft.categories[ci].engines[ei] },
    };
  }

  function cancelEngineDialog() {
    if (!engineSaving.value) engineDialog.value = null;
  }

  function deleteEngineFromDialog() {
    const ctx = engineDialog.value;
    if (!ctx || ctx.mode !== 'edit') return;
    engineDialog.value = null;
    deleteEngine(ctx.ci, ctx.ei);
  }

  async function submitEngine(engine) {
    const ctx = engineDialog.value;
    if (!ctx || engineSaving.value) return;
    if (!engine.name || (!engine.action && !engine.url)) {
      alert(t(engine.action ? 'engine.requiredAction' : 'engine.required'));
      return;
    }
    engineSaving.value = true;
    try {
      const list = draft.categories[ctx.ci].engines;
      const existing = ctx.mode === 'edit' ? list[ctx.ei] : null;
      const original = engine.favicon;
      const embedded = /^data:/i.test(engine.faviconData || '')
        ? engine.faviconData
        : existing?.faviconData && existing.favicon === original
          ? existing.faviconData
          : '';
      const next = ctx.mode === 'add' ? { ...engine, _id: nextId() } : { ...existing, ...engine };
      // 保留用户填写的原始链接，内嵌结果单独存放
      next.favicon = original;
      if (embedded && embedded !== original) {
        next.faviconData = embedded;
      } else {
        delete next.faviconData;
      }
      if (ctx.mode === 'add') {
        list.push(next);
      } else {
        list[ctx.ei] = next;
      }
      engineDialog.value = null;
      scheduleAutoSave();
      // 图标在后台获取，不阻塞保存；拿到后再更新并自动保存
      refreshIconInBackground(next, original);
    } finally {
      engineSaving.value = false;
    }
  }

  return {
    openCategoryDialog,
    submitCategory,
    cancelCategoryDialog,
    deleteCategoryFromDialog,
    addEngine,
    editEngine,
    cancelEngineDialog,
    deleteEngineFromDialog,
    submitEngine,
  };
}

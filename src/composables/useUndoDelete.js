/**
 * 删除分类/引擎时的撤销：删除后弹出可撤销提示，Ctrl+Z 也能恢复。
 * 只保留最近 20 条记录，撤销会插回原分类/原索引。
 */
import { localizeCategoryName, localizeEngineName, t } from '../assets/i18n.js';
import { showToast } from '../stores/ui.js';

const UNDO_DURATION = 5000;

/**
 * @param {object} options
 * @param {object} options.draft 设置面板草稿
 * @param {() => void} options.scheduleAutoSave
 * @param {() => boolean} options.isDialogOpen 是否有编辑弹窗打开
 * @param {() => void} options.closeCategoryDialog 撤销后关闭分类弹窗
 */
export function useUndoDelete({ draft, scheduleAutoSave, isDialogOpen, closeCategoryDialog }) {
  const undoStack = [];

  function displayCategoryName(category) {
    if (!category) return '';
    return localizeCategoryName(category.name, category.key);
  }

  function pushUndo(entry) {
    undoStack.push(entry);
    if (undoStack.length > 20) undoStack.shift();
  }

  function canUndo() {
    return undoStack.length > 0;
  }

  function undoDelete() {
    if (isDialogOpen()) {
      showToast(t('toast.dialogOpen'));
      return;
    }
    const entry = undoStack.pop();
    if (!entry) return;

    if (entry.type === 'category') {
      const index = Math.min(entry.index, draft.categories.length);
      draft.categories.splice(index, 0, entry.item);
    } else {
      const category = draft.categories.find((item) => item.key === entry.categoryKey);
      if (!category) {
        undoStack.push(entry);
        showToast(t('toast.categoryMissing'));
        return;
      }
      const index = Math.min(entry.index, category.engines.length);
      category.engines.splice(index, 0, entry.item);
    }

    closeCategoryDialog();
    scheduleAutoSave();
    showToast(t('toast.undoDelete', { label: entry.label }));
  }

  function notifyDeleted(entry, label) {
    pushUndo({ ...entry, label });
    showToast(t('toast.deleted', { label }), UNDO_DURATION, {
      label: t('common.undo'),
      onClick: undoDelete,
    });
  }

  function deleteCategory(index) {
    const category = draft.categories[index];
    if (!category) return;
    notifyDeleted(
      {
        type: 'category',
        index,
        item: JSON.parse(JSON.stringify(category)),
      },
      t('category.label', { name: displayCategoryName(category) }),
    );
    draft.categories.splice(index, 1);
    scheduleAutoSave();
  }

  function deleteEngine(ci, ei) {
    const category = draft.categories[ci];
    const engine = category?.engines?.[ei];
    if (!engine) return;
    notifyDeleted(
      {
        type: 'engine',
        categoryKey: category.key,
        index: ei,
        item: JSON.parse(JSON.stringify(engine)),
      },
      t('engine.label', { name: localizeEngineName(engine.name) }),
    );
    category.engines.splice(ei, 1);
    scheduleAutoSave();
  }

  return { deleteCategory, deleteEngine, undoDelete, canUndo };
}

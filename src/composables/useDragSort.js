/**
 * 设置面板中的分类/引擎拖拽排序。
 *
 * 分类与引擎共用一套指针事件：分类只能在分类之间换位，
 * 引擎可在分类内排序，也可拖到某个分类的加号上复刻一份。
 * 触屏使用长按启动，桌面端超过移动阈值才视为拖动。
 *
 * 几何计算、FLIP 动画、幽灵元素与自动滚动分别放在 ./drag/ 下，
 * 这里只保留指针状态机与顺序变更。
 */
import { ref } from 'vue';
import { showToast } from '../stores/ui.js';
import { cloneValue } from '../core/storageBackend.js';
import { isBuiltinCategory } from '../core/configData.js';
import { localizeEngineName, t } from '../assets/i18n.js';
import { createDragAnimator } from './drag/dragAnimation.js';
import { createDragAutoScroll } from './drag/dragAutoScroll.js';
import { createDragGeometry } from './drag/dragGeometry.js';
import { createDragGhost } from './drag/dragGhost.js';
import { applyOrder, captureOrder } from './drag/dragOrder.js';

const DRAG_THRESHOLD = 4;
// 触屏：长按启动拖动，轻微移动仍视为点击/滚动
const TOUCH_LONG_PRESS_MS = 280;
const TOUCH_MOVE_SLOP = 10;

/**
 * @param {object} options
 * @param {object} options.draft 设置面板草稿（reactive）
 * @param {{ value: HTMLElement | null }} options.layerEl 设置面板根元素
 * @param {() => number} options.nextId 生成草稿内部 id
 * @param {() => void} options.scheduleAutoSave 排序/复刻完成后触发自动保存
 */
export function useDragSort({ draft, layerEl, nextId, scheduleAutoSave }) {
  const dragCtx = ref(null);
  // 拖动搜索引擎时指针所在的“加号”分类，用于复刻提示
  const copyTargetCi = ref(null);
  let dragSnapshot = null;
  let dragDropped = false;
  let pressCtx = null;
  let pressTimer = 0;
  let suppressClick = false;

  const {
    settingsBody,
    sourceElement,
    categoryCards,
    categoryIndexAt,
    addItemIndexAt,
    engineInsertIndex,
    dragElements,
  } = createDragGeometry(() => layerEl.value);
  const animator = createDragAnimator({ dragElements });
  const ghost = createDragGhost({ layerEl });

  const autoScroll = createDragAutoScroll({
    getBody: settingsBody,
    getPoint: () => pressCtx,
    isDragging: () => Boolean(dragCtx.value && pressCtx),
    onScroll: (x, y) => updateDragTarget(x, y),
  });

  function restoreOrder(snapshot) {
    animator.animateReorder(() => applyOrder(draft.categories, snapshot));
    dragCtx.value = null;
  }

  // 拖动开始前先记录按下的位置，移动超过阈值才真正进入拖动，避免影响点击编辑
  // 触屏则改为长按启动，避免与页面/列表滚动冲突
  function onDragPointerDown(e, type, ci, ei = null) {
    // 上一次拖动可能因窗口失焦等原因没有正常结束，先清理残留状态
    resetStaleDrag();
    suppressClick = false;
    const touch = e.pointerType === 'touch';
    if (touch && e.isPrimary === false) return;
    if (!touch && e.button !== 0) return;
    if (e.target?.closest?.('.iqxin-set-toggle, .sej-hover-delete')) return;
    const sourceEl = sourceElement(type, ci, ei);
    if (!sourceEl) return;

    pressCtx = {
      type,
      ci,
      ei: type === 'engine' ? ei : null,
      sourceEl,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      touch,
      activated: !touch,
      started: false,
    };
    document.addEventListener('pointermove', onDragPointerMove);
    document.addEventListener('pointerup', onDragPointerUp);
    document.addEventListener('pointercancel', onDragPointerCancel);

    if (touch) {
      pressTimer = setTimeout(() => {
        pressTimer = 0;
        const p = pressCtx;
        if (!p || p.started) return;
        p.activated = true;
        if (beginDrag()) {
          blockTouchScroll(true);
        } else {
          finishPress();
        }
      }, TOUCH_LONG_PRESS_MS);
    }
  }

  function clearPressTimer() {
    if (!pressTimer) return;
    clearTimeout(pressTimer);
    pressTimer = 0;
  }

  // 触屏开始拖动后拦截 touchmove，阻止浏览器接管手势（滚动/缩放）导致拖动中断
  function onBlockTouchMove(e) {
    if (dragCtx.value) e.preventDefault();
  }

  function blockTouchScroll(block) {
    document.removeEventListener('touchmove', onBlockTouchMove);
    if (block) {
      document.addEventListener('touchmove', onBlockTouchMove, {
        passive: false,
      });
    }
  }

  function resetStaleDrag() {
    if (!pressCtx && !ghost.hasGhost()) return;
    if (dragSnapshot) {
      restoreOrder(dragSnapshot);
      dragSnapshot = null;
    }
    dragDropped = false;
    cleanupDrag();
    finishPress();
  }

  function onWindowBlur() {
    if (!pressCtx) return;
    if (pressCtx.started) {
      resetStaleDrag();
      suppressClick = true;
    } else {
      finishPress();
    }
  }

  function detachDragListeners() {
    document.removeEventListener('pointermove', onDragPointerMove);
    document.removeEventListener('pointerup', onDragPointerUp);
    document.removeEventListener('pointercancel', onDragPointerCancel);
    blockTouchScroll(false);
  }

  function beginDrag() {
    const p = pressCtx;
    const category = draft.categories[p.ci];
    if (!category) return false;
    // 快捷动作条目固定留在内置分类中，只允许分类整体移动
    if (p.type === 'engine' && isBuiltinCategory(category)) return false;
    const item = p.type === 'category' ? category : category.engines[p.ei];
    if (!item) return false;

    const rect = p.sourceEl.getBoundingClientRect();
    dragSnapshot = captureOrder(draft.categories);
    dragDropped = false;
    copyTargetCi.value = null;

    ghost.show(p.sourceEl, rect, p.x, p.y, p.type);

    dragCtx.value = {
      type: p.type,
      ci: p.ci,
      ei: p.ei,
      key: p.type === 'category' ? category.key : item._id,
    };
    p.started = true;
    // 触屏：轻微震动提示已进入拖动（不支持的浏览器会忽略）
    if (p.touch) {
      try {
        navigator.vibrate?.(12);
      } catch (e) {
        // ignore
      }
    }
    autoScroll.start();
    return true;
  }

  function onDragPointerMove(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    p.x = e.clientX;
    p.y = e.clientY;

    if (!p.started) {
      const distance = Math.hypot(p.x - p.startX, p.y - p.startY);
      if (p.touch) {
        // 长按开始前移动超出容差：交给页面滚动，取消拖动准备
        if (!p.activated && distance > TOUCH_MOVE_SLOP) finishPress();
        return;
      }
      if (distance < DRAG_THRESHOLD) return;
      if (!beginDrag()) {
        finishPress();
        return;
      }
    }

    if (e.cancelable) e.preventDefault();
    ghost.position(p.x, p.y);
    updateDragTarget(p.x, p.y);
  }

  function updateDragTarget(x, y) {
    const ctx = dragCtx.value;
    if (!ctx) return;
    const body = settingsBody();
    if (!body) return;

    const bodyRect = body.getBoundingClientRect();
    const inside =
      x >= bodyRect.left && x <= bodyRect.right && y >= bodyRect.top && y <= bodyRect.bottom;
    dragDropped = inside;
    if (!inside) {
      copyTargetCi.value = null;
      return;
    }

    // 搜索引擎拖到加号上：保持原位置不动，改为提示复刻
    if (ctx.type === 'engine') {
      const copyCi = addItemIndexAt(x, y);
      if (copyCi >= 0) {
        copyTargetCi.value = copyCi;
        return;
      }
    }
    copyTargetCi.value = null;

    const ci = categoryIndexAt(x, y);
    if (ci < 0) return;

    if (ctx.type === 'category') {
      moveCategoryTo(ci);
      return;
    }

    // 内置分类不接受其他分类的引擎拖入
    if (isBuiltinCategory(draft.categories[ci])) return;
    const card = categoryCards()[ci];
    if (card) moveEngineTo(ci, engineInsertIndex(card, y));
  }

  function copyEngineToCategory() {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'engine') return;
    const targetCi = copyTargetCi.value;
    if (isBuiltinCategory(draft.categories[targetCi])) return;
    const source = draft.categories[ctx.ci]?.engines?.[ctx.ei];
    const targetKey = draft.categories[targetCi]?.key;
    const copy = source ? { ...cloneValue(source), _id: nextId() } : null;
    // 途中经过其他条目时可能已临时换位，复刻时恢复原有排序
    if (dragSnapshot) {
      restoreOrder(dragSnapshot);
      dragSnapshot = null;
    }
    if (copy) {
      const target = draft.categories.find((category) => category.key === targetKey);
      if (target) {
        target.engines.push(copy);
        scheduleAutoSave();
        showToast(
          t('toast.copied', {
            name: localizeEngineName(source.name),
          }),
        );
      }
    }
  }

  function finishDrag() {
    const snapshot = dragSnapshot;
    if (dragCtx.value?.type === 'engine' && copyTargetCi.value != null) {
      copyEngineToCategory();
    } else if (dragDropped) {
      scheduleAutoSave();
    } else if (snapshot) {
      // 未落在可排序区域：恢复拖动前的顺序
      restoreOrder(snapshot);
    }
    dragSnapshot = null;
    dragDropped = false;
    cleanupDrag();
    suppressClick = true;
    finishPress();
  }

  function cleanupDrag() {
    autoScroll.stop();
    ghost.remove();
    if (pressCtx?.sourceEl) {
      pressCtx.sourceEl.classList.remove('sej-drag-placeholder');
    }
    dragCtx.value = null;
    copyTargetCi.value = null;
  }

  function finishPress() {
    clearPressTimer();
    detachDragListeners();
    pressCtx = null;
  }

  function onDragPointerUp(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    if (!p.started) {
      finishPress();
      return;
    }
    finishDrag();
  }

  function onDragPointerCancel(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    if (p.started) {
      if (dragSnapshot) restoreOrder(dragSnapshot);
      dragSnapshot = null;
      dragDropped = false;
      cleanupDrag();
      suppressClick = true;
    }
    finishPress();
  }

  // 拖动结束时浏览器仍会补发 click，忽略这次点击，避免误打开编辑框
  function consumeClickSuppression() {
    if (!suppressClick) return false;
    suppressClick = false;
    return true;
  }

  function moveCategoryTo(index) {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'category' || ctx.ci === index) return;
    const category = draft.categories[ctx.ci];
    if (!category) return;

    animator.animateReorder(() => {
      draft.categories.splice(ctx.ci, 1);
      draft.categories.splice(index, 0, category);
      ctx.ci = index;
    });
  }

  function moveEngineTo(ci, insertBefore) {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'engine') return;
    const source = draft.categories[ctx.ci];
    const target = draft.categories[ci];
    const engine = source?.engines?.[ctx.ei];
    if (!engine || !target) return;

    const from = ctx.ei;
    let insert = Math.max(0, Math.min(insertBefore, target.engines.length));
    if (source === target) {
      // 落在自身原位或紧随其后时无需移动
      if (insert === from || insert === from + 1) return;
      if (from < insert) insert -= 1;
    }

    animator.animateReorder(() => {
      source.engines.splice(from, 1);
      target.engines.splice(insert, 0, engine);
      ctx.ci = ci;
      ctx.ei = insert;
    });
  }

  function dispose() {
    detachDragListeners();
    clearPressTimer();
    autoScroll.stop();
    ghost.remove();
    dragCtx.value = null;
    copyTargetCi.value = null;
  }

  return {
    dragCtx,
    copyTargetCi,
    onDragPointerDown,
    onWindowBlur,
    consumeClickSuppression,
    dispose,
  };
}

/**
 * 设置面板中的分类/引擎拖拽排序。
 *
 * 分类与引擎共用一套指针事件：分类只能在分类之间换位，
 * 引擎可在分类内排序，也可拖到某个分类的加号上复刻一份。
 * 触屏使用长按启动，桌面端超过移动阈值才视为拖动。
 */
import { nextTick, ref } from 'vue';
import { showToast } from '../stores/ui.js';
import { localizeEngineName, t } from '../assets/i18n.js';

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
  const dragAnimations = new WeakMap();
  const DRAG_ANIMATION_MS = 160;
  const DRAG_THRESHOLD = 4;
  const DRAG_EDGE = 40;
  // 触屏：长按启动拖动，轻微移动仍视为点击/滚动
  const TOUCH_LONG_PRESS_MS = 280;
  const TOUCH_MOVE_SLOP = 10;
  let dragSnapshot = null;
  let dragDropped = false;
  let pressCtx = null;
  let pressTimer = 0;
  let ghostEl = null;
  let ghostOffset = { x: 0, y: 0 };
  let suppressClick = false;
  let scrollFrame = 0;

  function dragElements() {
    const root = layerEl.value;
    return root ? Array.from(root.querySelectorAll('[data-sej-drag-el]')) : [];
  }

  function snapshotRects() {
    const rects = new Map();
    for (const el of dragElements()) {
      rects.set(el.dataset.sejDragEl, el.getBoundingClientRect());
    }
    return rects;
  }

  function cancelDragAnimations() {
    for (const el of dragElements()) {
      const animation = dragAnimations.get(el);
      if (animation) {
        animation.cancel();
        dragAnimations.delete(el);
      }
    }
  }

  // FLIP：记录改动前后的位置，让被挤开的元素平滑移动到新位置
  async function animateReorder(mutate) {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const before = reduceMotion ? null : snapshotRects();
    mutate();
    if (reduceMotion) return;
    await nextTick();
    cancelDragAnimations();
    const after = snapshotRects();

    for (const el of dragElements()) {
      const key = el.dataset.sejDragEl;
      const prev = before.get(key);
      const next = after.get(key);
      if (!prev || !next) continue;

      let dx = prev.left - next.left;
      let dy = prev.top - next.top;
      if (!dx && !dy) continue;

      // 嵌套元素（分类内的搜索引擎）需减去父级位移，避免重复偏移
      const parent = el.parentElement?.closest('[data-sej-drag-el]');
      if (parent) {
        const parentPrev = before.get(parent.dataset.sejDragEl);
        const parentNext = after.get(parent.dataset.sejDragEl);
        if (parentPrev && parentNext) {
          dx -= parentPrev.left - parentNext.left;
          dy -= parentPrev.top - parentNext.top;
        }
      }

      const animation = el.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        {
          duration: DRAG_ANIMATION_MS,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
        },
      );
      dragAnimations.set(el, animation);
      animation.addEventListener('finish', () => {
        if (dragAnimations.get(el) === animation) {
          dragAnimations.delete(el);
        }
      });
    }
  }

  function captureOrder() {
    return {
      categories: draft.categories.map((category) => category._id),
      engines: Object.fromEntries(
        draft.categories.map((category) => [
          category._id,
          category.engines.map((engine) => engine._id),
        ]),
      ),
    };
  }

  function restoreOrder(snapshot) {
    const categories = new Map(draft.categories.map((category) => [category._id, category]));
    const engines = new Map();
    for (const category of draft.categories) {
      for (const engine of category.engines) engines.set(engine._id, engine);
    }

    animateReorder(() => {
      for (const category of draft.categories) {
        const ids = snapshot.engines[category._id] || [];
        category.engines.splice(
          0,
          category.engines.length,
          ...ids.map((id) => engines.get(id)).filter(Boolean),
        );
      }
      const ordered = snapshot.categories.map((id) => categories.get(id)).filter(Boolean);
      draft.categories.splice(0, draft.categories.length, ...ordered);
    });
    dragCtx.value = null;
  }

  function sourceElement(type, ci, ei) {
    if (type === 'category') return categoryCards()[ci] || null;
    const card = categoryCards()[ci];
    if (!card) return null;
    return card.querySelectorAll(':scope > .sejcon > .drag')[ei] || null;
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
    if (!pressCtx && !ghostEl) return;
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
    const item = p.type === 'category' ? category : category.engines[p.ei];
    if (!item) return false;

    const rect = p.sourceEl.getBoundingClientRect();
    ghostOffset = { x: p.x - rect.left, y: p.y - rect.top };

    dragSnapshot = captureOrder();
    dragDropped = false;
    copyTargetCi.value = null;

    // 用整块元素做跟手副本：拖动类别时整个类别框跟随鼠标，且保持不透明
    const ghost = p.sourceEl.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.removeAttribute('data-sej-drag-el');
    ghost.querySelectorAll('[data-sej-drag-el]').forEach((el) => {
      el.removeAttribute('data-sej-drag-el');
    });
    ghost.classList.remove('sej-drag-placeholder');
    ghost.classList.add('sej-drag-ghost', `sej-drag-ghost-${p.type}`);
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    // 挂在设置面板内，保证副本沿用面板与条目的样式
    (layerEl.value || p.sourceEl.getRootNode()).appendChild(ghost);
    ghostEl = ghost;

    dragCtx.value = {
      type: p.type,
      ci: p.ci,
      ei: p.ei,
      key: p.type === 'category' ? category.key : item._id,
    };
    p.started = true;
    positionGhost(p.x, p.y);
    // 触屏：轻微震动提示已进入拖动（不支持的浏览器会忽略）
    if (p.touch) {
      try {
        navigator.vibrate?.(12);
      } catch (e) {
        // ignore
      }
    }
    startAutoScroll();
    return true;
  }

  function positionGhost(x, y) {
    if (!ghostEl) return;
    ghostEl.style.transform = `translate3d(${x - ghostOffset.x}px, ${y - ghostOffset.y}px, 0)`;
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
    positionGhost(p.x, p.y);
    updateDragTarget(p.x, p.y);
  }

  function addItemIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
      const add = cards[i].querySelector(':scope > .sejcon > .iqxin-additem');
      if (!add) continue;
      const rect = layoutRect(add);
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i;
      }
    }
    return -1;
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

    const card = categoryCards()[ci];
    if (card) moveEngineTo(ci, engineInsertIndex(card, y));
  }

  function copyEngineToCategory() {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'engine') return;
    const targetCi = copyTargetCi.value;
    const source = draft.categories[ctx.ci]?.engines?.[ctx.ei];
    const targetKey = draft.categories[targetCi]?.key;
    const copy = source ? { ...JSON.parse(JSON.stringify(source)), _id: nextId() } : null;
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
    stopAutoScroll();
    if (ghostEl) {
      ghostEl.remove();
      ghostEl = null;
    }
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

  function startAutoScroll() {
    if (scrollFrame) return;
    const tick = () => {
      scrollFrame = 0;
      if (!dragCtx.value || !pressCtx) return;
      const body = settingsBody();
      if (body) {
        const rect = body.getBoundingClientRect();
        const { x, y } = pressCtx;
        let dy = 0;
        if (x >= rect.left && x <= rect.right) {
          if (y < rect.top + DRAG_EDGE && y >= rect.top - DRAG_EDGE) {
            dy = -Math.ceil(((rect.top + DRAG_EDGE - y) / DRAG_EDGE) * 14);
          } else if (y > rect.bottom - DRAG_EDGE && y <= rect.bottom + DRAG_EDGE) {
            dy = Math.ceil(((y - rect.bottom + DRAG_EDGE) / DRAG_EDGE) * 14);
          }
        }
        if (dy) {
          body.scrollTop += dy;
          updateDragTarget(x, y);
        }
      }
      if (dragCtx.value) scrollFrame = requestAnimationFrame(tick);
    };
    scrollFrame = requestAnimationFrame(tick);
  }

  function stopAutoScroll() {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  }

  function moveCategoryTo(index) {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'category' || ctx.ci === index) return;
    const category = draft.categories[ctx.ci];
    if (!category) return;

    animateReorder(() => {
      draft.categories.splice(ctx.ci, 1);
      draft.categories.splice(index, 0, category);
      ctx.ci = index;
    });
  }

  function settingsBody() {
    return layerEl.value?.querySelector('#sej-settings-body') || null;
  }

  function categoryCards() {
    const body = settingsBody();
    return body
      ? Array.from(body.querySelectorAll('.iqxin-items[data-sej-drag-el^="category-"]'))
      : [];
  }

  function layoutOffset(el) {
    let x = 0;
    let y = 0;
    let node = el;
    while (node) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent;
    }
    return { x, y };
  }

  // 用布局位置（不含 FLIP transform）计算矩形：
  // 动画进行中命中测试会落在过渡中的位置，导致来回抖动
  function layoutRect(el) {
    const body = settingsBody();
    if (!body || !body.contains(el)) return el.getBoundingClientRect();
    const base = body.getBoundingClientRect();
    const bodyPos = layoutOffset(body);
    const elPos = layoutOffset(el);
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const left = base.left + elPos.x - bodyPos.x - body.scrollLeft;
    const top = base.top + elPos.y - bodyPos.y - body.scrollTop;
    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    };
  }

  function categoryIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
      const rect = layoutRect(cards[i]);
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i;
      }
    }
    return -1;
  }

  function engineInsertIndex(card, y) {
    const items = Array.from(card.querySelectorAll(':scope > .sejcon > .drag'));
    for (let i = 0; i < items.length; i++) {
      const rect = layoutRect(items[i]);
      if (y < rect.top + rect.height / 2) return i;
    }
    return items.length;
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

    animateReorder(() => {
      source.engines.splice(from, 1);
      target.engines.splice(insert, 0, engine);
      ctx.ci = ci;
      ctx.ei = insert;
    });
  }

  function dispose() {
    detachDragListeners();
    clearPressTimer();
    stopAutoScroll();
    if (ghostEl) {
      ghostEl.remove();
      ghostEl = null;
    }
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

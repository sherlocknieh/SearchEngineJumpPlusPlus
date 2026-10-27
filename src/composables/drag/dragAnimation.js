/**
 * 拖拽排序的 FLIP 动画：记录改动前后的位置，让被挤开的元素平滑移动到新位置。
 */
import { nextTick } from 'vue';

const ANIMATION_MS = 160;

/**
 * @param {object} options
 * @param {() => HTMLElement[]} options.dragElements 参与排序动画的元素
 */
export function createDragAnimator({ dragElements }) {
  const animations = new WeakMap();

  function snapshotRects() {
    const rects = new Map();
    for (const el of dragElements()) {
      rects.set(el.dataset.sejDragEl, el.getBoundingClientRect());
    }
    return rects;
  }

  function cancel() {
    for (const el of dragElements()) {
      const animation = animations.get(el);
      if (animation) {
        animation.cancel();
        animations.delete(el);
      }
    }
  }

  /**
   * @param {() => void} mutate 实际改变顺序的操作
   */
  async function animateReorder(mutate) {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const reduceMotion = Boolean(mediaQuery?.matches);
    const before = reduceMotion ? null : snapshotRects();
    mutate();
    if (reduceMotion) return;
    await nextTick();
    cancel();
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
          duration: ANIMATION_MS,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
        },
      );
      animations.set(el, animation);
      animation.addEventListener('finish', () => {
        if (animations.get(el) === animation) {
          animations.delete(el);
        }
      });
    }
  }

  return { snapshotRects, cancel, animateReorder };
}

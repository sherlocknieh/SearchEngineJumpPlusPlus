/**
 * 跳转条类别区的横向拖动滚动。
 *
 * 桌面端按住左键横向拖动，并在结束后短暂抑制 click，避免误触类别菜单；
 * 触屏与触控笔不接管，交给浏览器原生 overflow 滚动，从而保留惯性滑动。
 */
export function useScrollDrag({ scrollEl, threshold = 6 }) {
  let dragState = null;
  let suppressClickUntil = 0;
  let hintsRaf = 0;

  function updateScrollHints() {
    const el = scrollEl.value;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.classList.toggle('sej-scroll-more-left', el.scrollLeft > 1);
    el.classList.toggle('sej-scroll-more-right', el.scrollLeft < maxScroll - 1);
  }

  // 拖动时每次 pointermove 都同步读 scrollWidth/clientWidth 会反复触发布局，
  // 合并到一帧里只读一次
  function scheduleScrollHints() {
    if (hintsRaf) return;
    hintsRaf = requestAnimationFrame(() => {
      hintsRaf = 0;
      updateScrollHints();
    });
  }

  function onScrollPointerDown(e) {
    // 触屏/触控笔交给浏览器原生滚动，才有松开后继续滑的惯性
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    suppressClickUntil = 0;
    const el = scrollEl.value;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    el.classList.remove('sej-scroll-dragging');
    dragState = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: el.scrollLeft,
      moved: false,
    };
  }

  function onWindowPointerMove(e) {
    const state = dragState;
    if (!state || e.pointerId !== state.pointerId) return;
    if (e.pointerType !== 'touch' && e.buttons === 0) {
      endScrollDrag(e);
      return;
    }
    const el = scrollEl.value;
    if (!el) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (!state.moved) {
      // 纵向手势留给页面滚动，横向移动超过阈值才开始拖动
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return;
      state.moved = true;
      el.classList.add('sej-scroll-dragging');
    }

    // 监听器是 passive 的：鼠标横向拖动由 user-select: none 保证，
    // 无需在这里阻止默认行为
    el.scrollLeft = state.startLeft - dx;
    scheduleScrollHints();
  }

  function endScrollDrag(e) {
    const state = dragState;
    if (!state || (e && e.pointerId !== state.pointerId)) return;
    if (state.moved) {
      // 拖动结束后的 click 不应触发类别
      suppressClickUntil = performance.now() + 400;
      scrollEl.value?.classList.remove('sej-scroll-dragging');
    }
    dragState = null;
  }

  function onScrollClickCapture(e) {
    if (performance.now() >= suppressClickUntil) return;
    suppressClickUntil = 0;
    e.preventDefault();
    e.stopPropagation();
  }

  function dispose() {
    dragState = null;
    scrollEl.value?.classList.remove('sej-scroll-dragging');
    if (hintsRaf) cancelAnimationFrame(hintsRaf);
    hintsRaf = 0;
  }

  return {
    updateScrollHints,
    onScrollPointerDown,
    onWindowPointerMove,
    endScrollDrag,
    onScrollClickCapture,
    dispose,
  };
}

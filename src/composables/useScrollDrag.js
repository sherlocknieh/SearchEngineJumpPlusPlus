const WHEEL_LINE_HEIGHT = 16;
/*
 * scrollWidth 向上取整、clientWidth 向下取整，两者都是整数：内容只比可视区宽出
 * 零点几像素时差值也能到 1~2px，高 DPI 屏幕上明明放得下却会露出溢出箭头。
 * 因此溢出的判定改用小数精度实测内容宽度，容差只用来吃掉亚像素误差。
 */
const OVERFLOW_TOLERANCE = 0.5;
// 取整误差最坏上界：内容向上取整、可视宽向下取整，各多算不超过 1px
const ROUNDING_SLACK = 2;

/** 内容实际占用的横向宽度（含内边距与间距），未布局时返回 null */
function measureContentWidth(el) {
  const children = el.children;
  if (!children.length || typeof getComputedStyle !== 'function') return null;
  const style = getComputedStyle(el);
  let total = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
  const gap = parseFloat(style.columnGap) || 0;
  let measured = false;
  for (const child of children) {
    const width = child.getBoundingClientRect().width;
    if (width > 0) measured = true;
    total += width;
  }
  if (!measured) return null;
  return total + gap * (children.length - 1);
}

/** 内容是否真的装不下（超出容差才算溢出） */
export function hasScrollOverflow(el) {
  const overflow = el.scrollWidth - el.clientWidth;
  if (overflow <= 0) return false;
  // 整数差超过取整误差上界时必定真的溢出：滚动过程中不额外触发逐项测量
  if (overflow > ROUNDING_SLACK) return true;
  const content = measureContentWidth(el);
  if (content === null) return true;
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const viewWidth =
    rect.width -
    (parseFloat(style.borderLeftWidth) || 0) -
    (parseFloat(style.borderRightWidth) || 0);
  return content - viewWidth > OVERFLOW_TOLERANCE;
}

/** 真正可滚动的横向距离；亚像素的取整误差不算溢出 */
export function maxScrollLeft(el) {
  if (!hasScrollOverflow(el)) return 0;
  return Math.max(0, el.scrollWidth - el.clientWidth);
}

/**
 * 跳转条类别区的横向滚动交互。
 *
 * 桌面端按住左键横向拖动，并在结束后短暂抑制 click，避免误触类别菜单；
 * 触屏与触控笔不接管，交给浏览器原生 overflow 滚动，从而保留惯性滑动。
 * 鼠标滚轮同样可以横向滚动类别区，见 onScrollWheel。
 */
export function useScrollDrag({ scrollEl, threshold = 6 }) {
  let dragState = null;
  let suppressClickUntil = 0;
  let hintsRaf = 0;

  function updateScrollHints() {
    const el = scrollEl.value;
    if (!el) return;
    const maxScroll = maxScrollLeft(el);
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
    if (!el || !maxScrollLeft(el)) return;
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

  /**
   * 实现鼠标滚轮横向滚动类别区:
   * .sej-scroll 只开了 overflow-x, 纵向滚轮量在元素上无处消费会直接滚走页面,
   * 溢出时把滚轮量转成横向位移; 已到两端则放行, 让页面继续滚动而不是"吃掉"滚轮。
   */
  function onScrollWheel(e) {
    const el = scrollEl.value;
    // Ctrl/Cmd + 滚轮是缩放, 不拦截
    if (!el || e.ctrlKey || e.metaKey) return;
    const maxScroll = maxScrollLeft(el);
    if (!maxScroll) return;
    // 触控板的横向手势 deltaX 更大, 直接用它的方向
    const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!raw) return;
    const unit = e.deltaMode === 1 ? WHEEL_LINE_HEIGHT : e.deltaMode === 2 ? el.clientWidth : 1;
    const next = Math.min(maxScroll, Math.max(0, el.scrollLeft + raw * unit));
    if (next === el.scrollLeft) return;
    e.preventDefault();
    el.scrollLeft = next;
    scheduleScrollHints();
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
    onScrollWheel,
    dispose,
  };
}

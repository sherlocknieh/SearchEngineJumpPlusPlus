/**
 * 跳转条的视口约束。
 *
 * constrainBarToViewport：站点容器比视口宽时，按视口收窄并水平移入可见区域；
 * 站点也可通过 patches.alignTo 指定对齐元素（如 Bing 导航条），跟随其横向位置。
 */
const VIEWPORT_GAP = 4;
// 窄屏下即使类别很少也占满可用宽度
const NARROW_BAR_MAX = 640;

// 部分移动浏览器的 pointer/hover 媒体查询不可靠，直接用 UA 识别
const MOBILE_UA_RE =
  /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile/i;

function clearTimers(timers) {
  timers.forEach(clearTimeout);
  timers.length = 0;
}

/**
 * 当前视口的横向度量。
 * 移动端优先用 visualViewport，兼顾横向平移/缩放后真正可见的区域。
 */
function getViewportMetrics() {
  const vw = document.documentElement.clientWidth;
  const mobile = MOBILE_UA_RE.test(navigator.userAgent || '');
  const vv = mobile ? window.visualViewport : null;
  return {
    vw,
    narrow: vw <= NARROW_BAR_MAX || mobile,
    viewLeft: vv?.offsetLeft ?? 0,
    viewWidth: vv?.width ?? vw,
  };
}

// 居中位移只在窄屏/移动端生效，重新测量前先撤销
function clearCenterOffset(el) {
  el.style.removeProperty('translate');
  delete el.dataset.sejCentered;
}

function centerInViewport(el, { viewLeft, viewWidth }) {
  const rect = el.getBoundingClientRect();
  const delta = Math.round(viewLeft + viewWidth / 2 - (rect.left + rect.width / 2));
  if (Math.abs(delta) <= 1) return;
  el.style.setProperty('translate', `${delta}px 0`, 'important');
  el.dataset.sejCentered = '1';
}

/**
 * @param {object} options
 * @param {{ value: HTMLElement | null }} options.containerEl
 * @param {{ value: boolean }} options.isSelectSearch
 * @param {object} options.sitePatches 站点补丁（constrainToViewport / narrowFullWidth / alignTo 等）
 * @param {boolean} [options.forceCenter] 用户开启了强制居中，此时居中优先于站点的横向对齐
 * @param {() => void} options.updateScrollHints
 */
export function useBarViewport({
  containerEl,
  isSelectSearch,
  sitePatches,
  updateScrollHints,
  forceCenter = false,
}) {
  let constrainTimers = [];

  /** 站点指定对齐元素的左边缘（视口坐标），未指定或元素不存在时返回 null */
  function getAlignLeft(alignTo) {
    if (!alignTo) return null;
    const target = typeof alignTo === 'string' ? document.querySelector(alignTo) : alignTo();
    if (!(target instanceof Element)) return null;
    const rect = target.getBoundingClientRect();
    // 元素隐藏（如无导航的版式）时不参与对齐
    return rect.width > 0 ? rect.left : null;
  }

  /**
   * 站点的内容容器可能比视口更宽（如 Bing），跳转条按宿主居中时会偏出屏幕。
   * 窄屏下对所有站点都以视口中心对齐；站点也可通过 patches.constrainToViewport
   * 在桌面端按视口限制宽度并水平移入可见区域，或用 patches.alignTo 指定一个
   * 元素（如 Bing 导航条）让跳转条跟随它的左边缘。
   */
  function constrainBarToViewport() {
    const el = containerEl.value;
    if (!el || isSelectSearch.value) return;

    clearCenterOffset(el);

    const { vw, narrow, viewLeft, viewWidth } = getViewportMetrics();
    const { constrainToViewport, narrowFullWidth, narrowMaxWidthInPixels } = sitePatches;
    // 开启强制居中时，居中优先于站点的横向对齐
    const alignTo = forceCenter ? null : sitePatches.alignTo;
    // 移动端/窄屏：抵消站点规则里的 left、grid-column 等横向偏移
    el.classList.toggle('sej-mobile-centered', narrow);
    if (!narrow && !constrainToViewport && !narrowFullWidth && !alignTo) return;

    ['max-width', 'margin-left', 'width', 'left'].forEach((prop) => el.style.removeProperty(prop));

    const gap = VIEWPORT_GAP;
    const available = Math.max(120, viewWidth - gap * 2);
    if (narrow && narrowFullWidth) {
      el.style.setProperty('width', `${available}px`, 'important');
      // 部分站点（如 Google）按网格列计算百分比 max-width，改用像素上限
      if (narrowMaxWidthInPixels) el.style.maxWidth = `${available}px`;
    }
    let rect = el.getBoundingClientRect();

    if (rect.width > available) {
      el.style.maxWidth = `${available}px`;
      rect = el.getBoundingClientRect();
    }

    if (narrow) {
      // 布局可能比视口更宽，用位移把跳转条对齐到真正可见的中心
      centerInViewport(el, { viewLeft, viewWidth });
      return;
    }

    // 对齐元素（如站点导航条）可能随视口宽度改变偏移，用它计算目标左边缘
    const alignLeft = getAlignLeft(alignTo);
    if (!alignLeft && !constrainToViewport) return;
    // 未指定对齐元素时，原本已经在可见区域内的跳转条保持站点布局
    if (!alignLeft && rect.left >= gap && rect.right <= vw - gap) return;

    // 取消站点规则的水平偏移，按目标左边缘（或视口边界）重新定位
    el.style.left = 'auto';
    rect = el.getBoundingClientRect();
    const maxLeft = Math.max(gap, vw - gap - rect.width);
    const desiredLeft = alignLeft ?? rect.left;
    el.style.marginLeft = `${Math.round(Math.min(Math.max(desiredLeft, gap), maxLeft) - rect.left)}px`;
  }

  function onViewportResize() {
    constrainBarToViewport();
    updateScrollHints();
  }

  /** 入场动画/布局稳定后再校准一次，避免首帧测量偏小 */
  function scheduleConstrainCheck(delays = [180, 400]) {
    clearTimers(constrainTimers);
    constrainTimers = delays.map((delay) =>
      setTimeout(() => {
        constrainBarToViewport();
        updateScrollHints();
      }, delay),
    );
  }

  function dispose() {
    clearTimers(constrainTimers);
  }

  return {
    constrainBarToViewport,
    onViewportResize,
    scheduleConstrainCheck,
    dispose,
  };
}

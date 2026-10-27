/**
 * 跳转条的视口约束与吸顶（fixedTop）行为。
 *
 * 包含三部分：
 * - constrainBarToViewport：站点容器比视口宽时，按视口收窄并水平移入可见区域；
 * - getFixedHeaderBottom：检测页面顶部吸顶/固定头部的高度，固定时向下避让；
 * - fixedToTop：滚动越过分隔线后固定跳转条，并在多实例时向下层叠。
 */
const FIXED_GAP = 8;
const VIEWPORT_GAP = 4;
// 窄屏下即使类别很少也占满可用宽度
const NARROW_BAR_MAX = 640;
const HEADER_CACHE_MS = 120;

// 横屏手机/平板等宽视口设备同样按移动端处理
function isMobilePointer() {
  if (typeof window.matchMedia !== 'function') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches
  );
}

/**
 * @param {object} options
 * @param {{ value: HTMLElement | null }} options.containerEl
 * @param {{ value: boolean }} options.isSelectSearch
 * @param {boolean} options.inlineStyleBlocked
 * @param {object} options.sitePatches 站点补丁（constrainToViewport / narrowFullWidth 等）
 * @param {object | null} options.matchedRule
 * @param {() => string} options.getResolvedStyle 当前生效的内联样式
 * @param {() => HTMLElement} options.getHost
 * @param {() => number} options.getStackOffset
 * @param {() => void} options.updateScrollHints
 * @param {() => any} options.getInsertTarget
 * @param {() => any} options.getInputTarget
 */
export function useFixedTop({
  containerEl,
  isSelectSearch,
  inlineStyleBlocked,
  sitePatches,
  matchedRule,
  getResolvedStyle,
  getHost,
  getStackOffset,
  updateScrollHints,
  getInsertTarget,
  getInputTarget,
}) {
  let originalContainerDistanceTop = 0;
  let headerBottomCache = { key: '', bottom: 0, at: 0 };
  let scrollRaf = 0;
  let fixedTopTimers = [];
  let constrainTimers = [];

  /**
   * 站点的内容容器可能比视口更宽（如 Bing），跳转条按宿主居中时会偏出屏幕。
   * 窄屏下对所有站点都以视口中心对齐；站点也可通过 patches.constrainToViewport
   * 在桌面端按视口限制宽度并水平移入可见区域。
   */
  function constrainBarToViewport() {
    const el = containerEl.value;
    if (!el || isSelectSearch.value) return;

    // 每次重新测量前先撤销上一次的居中位移（固定态下也不应残留）
    if (el.dataset.sejCentered) {
      el.style.removeProperty('translate');
      delete el.dataset.sejCentered;
    }
    if (getHost().style.position === 'fixed') return;

    const vw = document.documentElement.clientWidth;
    // 宽视口设备（横屏手机、平板）也视为移动端，避免 media query 失效
    const mobile = isMobilePointer();
    const narrow = vw <= NARROW_BAR_MAX || mobile;
    if (!sitePatches.constrainToViewport && !sitePatches.narrowFullWidth && !narrow) return;

    el.style.maxWidth = '';
    el.style.marginLeft = '';
    el.style.removeProperty('width');
    if (el.dataset.sejLeftConstrained) {
      el.style.left = '';
      delete el.dataset.sejLeftConstrained;
    }

    const gap = VIEWPORT_GAP;
    const available = Math.max(120, vw - gap * 2);
    if (narrow && sitePatches.narrowFullWidth) {
      el.style.setProperty('width', `${available}px`, 'important');
      // 部分站点（如 Google）按网格列计算百分比 max-width，改用像素上限
      if (sitePatches.narrowMaxWidthInPixels) {
        el.style.maxWidth = `${available}px`;
      }
    }
    let rect = el.getBoundingClientRect();

    if (rect.width > available) {
      el.style.maxWidth = `${available}px`;
      rect = el.getBoundingClientRect();
    }

    if (narrow) {
      // 站点内容容器可能比视口更宽，用位移把跳转条对齐到视口中心。
      // 用 translate 而不是改外边距，避免与页面自身的布局/居中互相影响。
      // 移动端优先按可视视口计算，兼顾横向平移/缩放后的可见区域。
      const vv = mobile ? window.visualViewport : null;
      const viewLeft = vv ? vv.offsetLeft : 0;
      const viewWidth = vv ? vv.width : vw;
      const delta = Math.round(viewLeft + viewWidth / 2 - (rect.left + rect.width / 2));
      if (Math.abs(delta) > 1) {
        el.style.setProperty('translate', `${delta}px 0`, 'important');
        el.dataset.sejCentered = '1';
      }
      return;
    }

    if (!sitePatches.constrainToViewport) return;
    if (rect.left >= gap && rect.right <= vw - gap) return;

    // 取消站点规则的水平偏移，按视口把跳转条移入可见区域
    el.dataset.sejLeftConstrained = '1';
    el.style.left = 'auto';
    rect = el.getBoundingClientRect();
    const maxLeft = Math.max(gap, vw - gap - rect.width);
    const desiredLeft = Math.min(Math.max(rect.left, gap), maxLeft);
    el.style.marginLeft = `${Math.round(desiredLeft - rect.left)}px`;
  }

  // 查找视口顶部是否存在吸顶/固定头部，返回其底边高度
  function getFixedHeaderBottom(barLeft, barWidth) {
    let bottom = 0;
    const consider = (el) => {
      // 其他脚本实例的宿主单独处理，避免重复避让
      if (!el || el === getHost() || el.dataset?.sejInstance) return;
      const style = getComputedStyle(el);
      if (style.position !== 'fixed' && style.position !== 'sticky') return;
      const rect = el.getBoundingClientRect();
      const overlapsBar = rect.right > barLeft && rect.left < barLeft + barWidth;
      if (!overlapsBar && rect.width < window.innerWidth * 0.3) {
        return;
      }
      if (rect.top <= FIXED_GAP && rect.bottom > bottom && rect.bottom < window.innerHeight * 0.5) {
        bottom = rect.bottom;
      }
    };

    if (document.elementsFromPoint) {
      // 固定后的跳转条可能盖住自己所在位置，多点取样才能找到被遮住的头部
      const points = [
        barLeft + barWidth / 2,
        barLeft - 8,
        barLeft + barWidth + 8,
        window.innerWidth / 2,
        window.innerWidth - 8,
      ];
      for (const x of points) {
        if (x < 0 || x > window.innerWidth - 1) continue;
        document.elementsFromPoint(x, FIXED_GAP).forEach(consider);
      }
    }

    let el = getInsertTarget();
    while (el && el !== document.documentElement) {
      consider(el);
      el = el.parentElement;
    }

    // 站点可通过 patches.getFixedHeaderBottom 接管吸顶头部底部计算
    const getBottom = sitePatches.getFixedHeaderBottom;
    if (typeof getBottom === 'function') {
      return getBottom({ bottom, barLeft, barWidth, inputTarget: getInputTarget() });
    }
    return bottom;
  }

  // 吸顶头部检测要遍历祖先的 getComputedStyle 并做多点命中测试，
  // 比普通布局读取贵得多；顶部结构在滚动过程中基本不变，按时间缓存结果。
  function invalidateHeaderCache() {
    headerBottomCache = { key: '', bottom: 0, at: 0 };
  }

  function getFixedHeaderBottomCached(barLeft, barWidth) {
    const now = performance.now();
    const key = `${Math.round(barLeft)}:${Math.round(barWidth)}`;
    const cache = headerBottomCache;
    if (cache.key === key && now - cache.at < HEADER_CACHE_MS) {
      return cache.bottom;
    }
    const bottom = getFixedHeaderBottom(barLeft, barWidth);
    headerBottomCache = { key, bottom, at: now };
    return bottom;
  }

  function scheduleFixedTopRefresh() {
    fixedTopTimers.forEach(clearTimeout);
    fixedTopTimers = [80, 250, 600].map((delay) =>
      setTimeout(() => {
        if (getHost().style.position === 'fixed') {
          fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
        }
      }, delay),
    );
  }

  function fixedToTop(fixedTopValue, color) {
    if (!containerEl.value || inlineStyleBlocked) return;
    const resolvedStyle = getResolvedStyle();
    if (resolvedStyle.includes('sticky') || resolvedStyle.includes('fixed')) {
      return;
    }

    const fixedTop = fixedTopValue ? fixedTopValue : 0;
    const host = getHost();
    const container = containerEl.value;
    const vw = document.documentElement.clientWidth;
    const mobile = isMobilePointer();
    const narrow = (vw <= NARROW_BAR_MAX || mobile) && Boolean(sitePatches.narrowFullWidth);
    const gap = VIEWPORT_GAP;

    // 先撤销窄屏居中位移，否则量到的是位移后的位置，固定时会重复偏移
    if (container.dataset.sejCentered) {
      container.style.removeProperty('translate');
      delete container.dataset.sejCentered;
    }

    const rect = container.getBoundingClientRect();
    // 窄屏固定后同样占满可用宽度，避免沿用站点偏移导致被裁切；
    // 其余移动端设备把跳转条按视口居中
    const centeredOnMobile = mobile && !narrow;
    const left = narrow
      ? gap
      : centeredOnMobile
        ? Math.max(0, Math.round((vw - rect.width) / 2))
        : Math.max(0, parseFloat(host.dataset.originalLeft) || rect.left);
    const width = narrow
      ? Math.max(120, vw - gap * 2)
      : parseFloat(host.dataset.originalWidth) || rect.width;
    const headerBottom = getFixedHeaderBottomCached(left, width);
    const baseTop = headerBottom > 0 ? headerBottom + FIXED_GAP : FIXED_GAP;
    // 跳转条滚到吸顶头部下沿时就固定，避免中途被头部遮挡
    const threshold = Math.max(fixedTop, headerBottom > 0 ? baseTop : 0);

    if (originalContainerDistanceTop - window.scrollY <= threshold) {
      if (host.style.position !== 'fixed') {
        host.dataset.originalLeft = narrow ? gap : rect.left;
        host.dataset.originalWidth = narrow ? width : rect.width;
        // 站点头部可能在本条固定后才变为吸顶，稍后再校准一次位置
        scheduleFixedTopRefresh();
      }
      // 另一个实例的固定跳转条也在视口顶部时，向下让位
      const top = baseTop + getStackOffset();

      host.style.display = 'block';
      // 站点样式可能约束宿主宽度，固定后按固定前的实际宽度撑开，
      // 避免 max-width: 100% 与宿主收缩宽度互相影响导致跳转条换行
      host.style.width = width > 0 ? `${Math.ceil(width)}px` : 'max-content';
      host.style.maxWidth = narrow ? `${Math.ceil(width)}px` : `calc(100vw - ${left + 12}px)`;
      host.style.position = 'fixed';
      host.style.top = `${Math.round(top)}px`;
      host.style.left = `${left}px`;
      host.style.zIndex = '100000';

      container.style.position = 'static';
      container.style.left = '0';
      container.style.top = '0';
      container.style.gridColumn = 'auto';
      container.style.margin = '0';
      if (narrow) {
        container.style.setProperty('width', `${Math.ceil(width)}px`, 'important');
      }
      container.style.backgroundColor = color;
      updateScrollHints();
    } else {
      // 已经处于非固定状态时不要再清理样式，否则会抹掉视口校正留下的偏移
      if (host.style.position !== 'fixed') return;

      host.style.position = '';
      host.style.top = '';
      host.style.left = '';
      host.style.zIndex = '';
      host.style.display = '';
      host.style.width = '';
      host.style.maxWidth = '';
      delete host.dataset.originalLeft;
      delete host.dataset.originalWidth;

      container.style.position = '';
      container.style.left = '';
      container.style.top = '';
      container.style.gridColumn = '';
      container.style.margin = '';
      container.style.backgroundColor = '';
      constrainBarToViewport();
    }
  }

  function onScroll() {
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0;
      fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
    });
  }

  function onWheel(e) {
    if (e.wheelDelta > 0) {
      fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
    }
  }

  function onViewportResize() {
    // 视口或布局变化后，缓存的吸顶头部高度可能失效
    invalidateHeaderCache();
    if (getHost().style.position === 'fixed') {
      fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
    } else {
      constrainBarToViewport();
    }
    updateScrollHints();
  }

  /** 记录挂载时跳转条与文档顶部的距离，作为吸顶阈值基准 */
  function captureOriginTop() {
    if (!containerEl.value) return;
    originalContainerDistanceTop = containerEl.value.getBoundingClientRect().top + window.scrollY;
  }

  /** 入场动画/布局稳定后再校准一次，避免首帧测量偏小 */
  function scheduleConstrainCheck(delays = [180, 400]) {
    constrainTimers = delays.map((delay) =>
      setTimeout(() => {
        constrainBarToViewport();
        updateScrollHints();
      }, delay),
    );
  }

  function dispose() {
    fixedTopTimers.forEach(clearTimeout);
    constrainTimers.forEach(clearTimeout);
    fixedTopTimers = [];
    constrainTimers = [];
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    scrollRaf = 0;
  }

  return {
    constrainBarToViewport,
    fixedToTop,
    onScroll,
    onWheel,
    onViewportResize,
    captureOriginTop,
    scheduleConstrainCheck,
    dispose,
  };
}

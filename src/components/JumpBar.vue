<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSettings } from '../stores/settings.js';
import { ui } from '../stores/ui.js';
import { localizeCategoryName } from '../i18n/index.js';
import { isInlineStyleBlocked } from '../core/csp.js';
import { addStyle, getHost, insertHost, getStackOffset, refreshStackLayout } from '../core/shadow.js';
import {
  getInputTarget,
  getInsertTarget,
  getInsertPositionLabel,
  resolveRuleStyle,
  applyStylish,
} from '../core/applyRule.js';
import {
  extractKeyword,
  performJump,
  openAllEngines,
} from '../core/jump.js';
import EngineItem from './EngineItem.vue';
import EngineCategory from './EngineCategory.vue';
import SettingButton from './SettingButton.vue';

const settings = useSettings();
const data = settings.settingData;
const matchedRule = settings.getMatchedRule();
const inlineStyleBlocked = isInlineStyleBlocked();

const ready = ref(false);
const isSelectSearch = ref(false);
const selectionText = ref('');
const barVisible = ref(false);
const containerEl = ref(null);
const scrollEl = ref(null);
const containerClass = ref('rwl-exempt');

let inputTarget = null;
let insertTarget = null;
let insertPosition = 'beforeend';
let resolvedStyle = '';
let originalContainerDistanceTop = 0;

const categories = computed(() =>
  data.engineCategories
    .filter(([, , enabled]) => enabled)
    .map(([name, key]) => ({
      name: localizeCategoryName(name, key),
      key,
      engines: (data.engineList[key] || []).filter((engine) => {
        if (engine.disable) return false;
        if (data.HideTheSameLink && matchedRule?.url?.test(engine.url)) {
          return false;
        }
        return true;
      }),
    }))
    .filter((category) => category.engines.length),
);

function getCurrentKeyword() {
  if (isSelectSearch.value) return selectionText.value;
  return extractKeyword(inputTarget);
}

function onJump(engine) {
  performJump(engine, getCurrentKeyword(), data);
}

function onJumpAll(engines) {
  openAllEngines(engines, getCurrentKeyword(), data, matchedRule);
}

function initSelectSearch() {
  // 划词条本身靠 Shadow DOM 样式定位，不依赖内联样式，CSP 下也可工作
  if (inlineStyleBlocked) {
    console.warn('[SEJ] 检测到 CSP 阻止内联样式，划词条仍会尝试显示');
  }
  isSelectSearch.value = true;
  inputTarget = () => selectionText.value;
  insertTarget = document.body;
  insertPosition = 'beforeend';
  return true;
}

function initTargets() {
  // 此类站点（如 Wikipedia）的规则只适合作为标题跳转，
  // 开启划词搜索时优先使用划词模式，避免规则目标失效或无输入框
  if (data.selectSearch && matchedRule?.enabled && matchedRule.selectSearchPriority) {
    return initSelectSearch();
  }

  if (matchedRule?.enabled) {
    inputTarget = getInputTarget(matchedRule);
    insertTarget = getInsertTarget(matchedRule);
    insertPosition = getInsertPositionLabel(matchedRule) || 'beforeend';
    if (!inputTarget || !insertTarget) {
      console.warn(
        `[SEJ] 未找到输入框或插入位置：\n输入框：${inputTarget}\n插入位置：${insertTarget}`,
      );
      // 站点结构可能已改版（如 Wikipedia 的 #mw-head），回退到划词搜索
      if (data.selectSearch) {
        return initSelectSearch();
      }
      return false;
    }
    return true;
  }

  if (data.selectSearch) {
    return initSelectSearch();
  }

  console.info('[SEJ] 未启用搜索跳转，跳过初始化');
  return false;
}

function injectHost() {
  if (isSelectSearch.value) {
    insertHost(document.body, 'beforeend');
    return;
  }

  insertHost(insertTarget, insertPosition);

  const needsWrapper =
    !resolvedStyle.includes('sticky') && !resolvedStyle.includes('fixed');
  if (needsWrapper && matchedRule?.wrapperClass) {
    getHost().className += ` ${matchedRule.wrapperClass}`;
  }
}

const FIXED_GAP = 8;
const VIEWPORT_GAP = 4;

// 部分站点（如 Bing）的内容容器比视口更宽，跳转条按宿主居中时会偏出屏幕。
// 溢出时按视口限制宽度并水平移入可见区域，保证右侧设置按钮可点击。
function constrainBarToViewport() {
  const el = containerEl.value;
  if (!el || isSelectSearch.value) return;
  if (getHost().style.position === 'fixed') return;

  el.style.maxWidth = '';
  el.style.marginLeft = '';
  if (el.dataset.sejLeftConstrained) {
    el.style.left = '';
    delete el.dataset.sejLeftConstrained;
  }

  const vw = document.documentElement.clientWidth;
  const gap = VIEWPORT_GAP;
  const available = Math.max(120, vw - gap * 2);
  let rect = el.getBoundingClientRect();

  if (rect.width > available) {
    el.style.maxWidth = `${available}px`;
    rect = el.getBoundingClientRect();
  }

  if (rect.left >= gap && rect.right <= vw - gap) return;

  // 取消站点规则的水平偏移，按视口把跳转条移入可见区域
  el.dataset.sejLeftConstrained = '1';
  el.style.left = 'auto';
  rect = el.getBoundingClientRect();
  const maxLeft = Math.max(gap, vw - gap - rect.width);
  const desiredLeft = Math.min(Math.max(rect.left, gap), maxLeft);
  el.style.marginLeft = `${Math.round(desiredLeft - rect.left)}px`;
}

// 类别区使用鼠标/触屏拖动横向滑动，不显示滚动条
const DRAG_THRESHOLD = 6;
let dragState = null;
let suppressClickUntil = 0;

function updateScrollHints() {
  const el = scrollEl.value;
  if (!el) return;
  const maxScroll = el.scrollWidth - el.clientWidth;
  el.classList.toggle('sej-scroll-more-left', el.scrollLeft > 1);
  el.classList.toggle(
    'sej-scroll-more-right',
    el.scrollLeft < maxScroll - 1,
  );
}

function onScrollPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
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
    if (Math.abs(dx) < DRAG_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    state.moved = true;
    el.classList.add('sej-scroll-dragging');
  }

  if (e.cancelable) e.preventDefault();
  el.scrollLeft = state.startLeft - dx;
  updateScrollHints();
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

function onViewportResize() {
  constrainBarToViewport();
  updateScrollHints();
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
    const overlapsBar =
      rect.right > barLeft && rect.left < barLeft + barWidth;
    if (
      !overlapsBar &&
      rect.width < window.innerWidth * 0.3
    ) {
      return;
    }
    if (
      rect.top <= FIXED_GAP &&
      rect.bottom > bottom &&
      rect.bottom < window.innerHeight * 0.5
    ) {
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

  let el = insertTarget;
  while (el && el !== document.documentElement) {
    consider(el);
    el = el.parentElement;
  }
  return bottom;
}

function fixedToTop(fixedTopValue, color) {
  if (!containerEl.value || inlineStyleBlocked) return;
  if (resolvedStyle.includes('sticky') || resolvedStyle.includes('fixed')) {
    return;
  }

  const fixedTop = fixedTopValue ? fixedTopValue : 0;
  const host = getHost();
  const container = containerEl.value;

  if (originalContainerDistanceTop - window.scrollY <= fixedTop) {
    if (host.style.position !== 'fixed') {
      const rect = container.getBoundingClientRect();
      host.dataset.originalLeft = rect.left;
      host.dataset.originalWidth = rect.width;
      // 站点头部可能在本条固定后才变为吸顶，稍后再校准一次位置
      scheduleFixedTopRefresh();
    }
    const left = Math.max(0, parseFloat(host.dataset.originalLeft) || 0);
    const width = parseFloat(host.dataset.originalWidth) || 0;
    const headerBottom = getFixedHeaderBottom(left, width);
    const baseTop = headerBottom > 0 ? headerBottom + FIXED_GAP : FIXED_GAP;
    // 另一个实例的固定跳转条也在视口顶部时，向下让位
    const top = baseTop + getStackOffset();

    host.style.display = 'block';
    // 站点样式可能约束宿主宽度，固定后按固定前的实际宽度撑开，
    // 避免 max-width: 100% 与宿主收缩宽度互相影响导致跳转条换行
    host.style.width = width > 0 ? `${Math.ceil(width)}px` : 'max-content';
    host.style.maxWidth = `calc(100vw - ${left + 12}px)`;
    host.style.position = 'fixed';
    host.style.top = `${Math.round(top)}px`;
    host.style.left = `${left}px`;
    host.style.zIndex = '100000';

    container.style.position = 'static';
    container.style.left = '0';
    container.style.top = '0';
    container.style.gridColumn = 'auto';
    container.style.margin = '0';
    container.style.backgroundColor = color;
  } else {
    const wasFixed = host.style.position === 'fixed';
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
    if (wasFixed) constrainBarToViewport();
  }
}

let scrollRaf = 0;
let fixedTopTimers = [];
let constrainTimers = [];

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

function onSelectionChange() {
  const selection = getSelection();
  if (selection.isCollapsed) {
    barVisible.value = false;
  } else {
    selectionText.value = selection.toString();
    barVisible.value = true;
  }
}

// 另一个实例可能稍后才挂载，短暂轮询 + 窗口尺寸变化时重新计算避让间距
let stackTimer = 0;
let stackTries = 0;

function startStackSync() {
  refreshStackLayout();
  window.addEventListener('resize', refreshStackLayout);

  clearInterval(stackTimer);
  stackTries = 0;
  stackTimer = setInterval(() => {
    refreshStackLayout();
    if (++stackTries >= 20) stopStackSync();
  }, 500);
}

function stopStackSync() {
  clearInterval(stackTimer);
  stackTimer = 0;
  window.removeEventListener('resize', refreshStackLayout);
}

onMounted(async () => {
  if (!initTargets()) return;
  ready.value = true;

  if (matchedRule) {
    applyStylish(matchedRule);
    resolvedStyle = resolveRuleStyle(matchedRule, data) || '';
    if (matchedRule.class) {
      containerClass.value = `rwl-exempt ${matchedRule.class}`;
    }
  }

  await nextTick();
  injectHost();
  startStackSync();
  constrainBarToViewport();
  updateScrollHints();
  // 入场动画的 scale 会让首帧测量偏小，动画结束后重新校准
  constrainTimers = [180, 400].map((delay) =>
    setTimeout(() => {
      constrainBarToViewport();
      updateScrollHints();
    }, delay),
  );
  window.addEventListener('resize', onViewportResize);
  window.addEventListener('pointermove', onWindowPointerMove, {
    passive: false,
  });
  window.addEventListener('pointerup', endScrollDrag);
  window.addEventListener('pointercancel', endScrollDrag);

  if (isSelectSearch.value) {
    document.addEventListener('selectionchange', onSelectionChange);
    // 部分站点/浏览器中 selectionchange 时机不稳定，补充鼠标与键盘事件兜底
    document.addEventListener('mouseup', onSelectionChange);
    document.addEventListener('keyup', onSelectionChange);
  }

  if (
    data.fixedTop &&
    matchedRule &&
    !inlineStyleBlocked &&
    !isSelectSearch.value
  ) {
    originalContainerDistanceTop =
      containerEl.value.getBoundingClientRect().top + window.scrollY;
    if (data.fixedTopUpward) {
      window.addEventListener('wheel', onWheel);
    } else {
      window.addEventListener('scroll', onScroll);
    }
  }

});

onBeforeUnmount(() => {
  document.removeEventListener('selectionchange', onSelectionChange);
  document.removeEventListener('mouseup', onSelectionChange);
  document.removeEventListener('keyup', onSelectionChange);
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('resize', onViewportResize);
  window.removeEventListener('pointermove', onWindowPointerMove);
  window.removeEventListener('pointerup', endScrollDrag);
  window.removeEventListener('pointercancel', endScrollDrag);
  dragState = null;
  scrollEl.value?.classList.remove('sej-scroll-dragging');
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  fixedTopTimers.forEach(clearTimeout);
  constrainTimers.forEach(clearTimeout);
  stopStackSync();
});
</script>

<template>
  <div
    v-if="ready"
    ref="containerEl"
    id="sej-container"
    :class="[
      containerClass,
      { selectSearch: isSelectSearch, 'sej-select-visible': barVisible },
    ]"
    :aria-hidden="isSelectSearch && !barVisible ? 'true' : undefined"
  >
    <div
      ref="scrollEl"
      class="sej-scroll"
      @pointerdown="onScrollPointerDown"
      @click.capture="onScrollClickCapture"
      @dragstart.prevent
      @scroll.passive="updateScrollHints"
    >
      <template v-for="category in categories" :key="category.key">
        <template v-if="inlineStyleBlocked">
          <span class="sej-category-title">
            {{ category.name }}
          </span>
          <EngineItem
            v-for="engine in category.engines"
            :key="engine.url + engine.name"
            :engine="engine"
            @jump="onJump"
          />
        </template>
        <EngineCategory
          v-else
          :name="category.name"
          :engines="category.engines"
          :show-icon="ui.categoryIcon"
          @jump="onJump"
          @jump-all="onJumpAll(category.engines)"
        />
      </template>
    </div>

    <SettingButton />
  </div>
</template>

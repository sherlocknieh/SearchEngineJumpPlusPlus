<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSettings } from '../stores/settings.js';
import { isInlineStyleBlocked } from '../core/csp.js';
import { addStyle, getHost, insertHost } from '../core/shadow.js';
import {
  getInputTarget,
  getInsertTarget,
  getInsertPositionLabel,
  resolveRuleStyle,
  applyStylish,
} from '../core/rule.js';
import {
  extractKeyword,
  encodeKeyword,
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
      name,
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
  performJump(engine, getCurrentKeyword(), data, isSelectSearch.value);
}

function onJumpAll(engines) {
  const encoded = encodeKeyword(getCurrentKeyword(), engines[0]?.gbk);
  openAllEngines(engines, encoded, matchedRule);
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

// 查找视口顶部是否存在吸顶/固定头部，返回其底边高度
function getFixedHeaderBottom(barLeft, barWidth) {
  let bottom = 0;
  const consider = (el) => {
    if (!el || el === getHost()) return;
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
    const top = headerBottom > 0 ? headerBottom + FIXED_GAP : FIXED_GAP;

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
  }
}

let scrollRaf = 0;
let fixedTopTimers = [];

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
  if (scrollRaf) cancelAnimationFrame(scrollRaf);
  fixedTopTimers.forEach(clearTimeout);
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
    <template v-for="category in categories" :key="category.key">
      <template v-if="inlineStyleBlocked">
        <span v-if="inlineStyleBlocked" class="sej-category-title">
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
        :icon-mode="data.icon"
        @jump="onJump"
        @jump-all="onJumpAll(category.engines)"
      />
    </template>

    <SettingButton />
  </div>
</template>

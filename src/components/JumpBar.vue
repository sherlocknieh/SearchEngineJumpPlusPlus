<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSettings } from '../stores/settings.js';
import { ui } from '../stores/ui.js';
import { localizeCategoryName, t } from '../assets/i18n.js';
import { isInlineStyleBlocked } from '../core/csp.js';
import { getHost, insertHost, getStackOffset } from '../core/shadowDom.js';
import {
  getInputTarget,
  getInsertTarget,
  getInsertPositionLabel,
  resolveRuleStyle,
  applyStylish,
} from '../core/applyRule.js';
import { extractKeyword, performJump, openAllEngines } from '../core/jump.js';
import { getSelectedText } from '../core/selection.js';
import { useFixedTop } from '../composables/useFixedTop.js';
import { useScrollDrag } from '../composables/useScrollDrag.js';
import { useStackSync } from '../composables/useStackSync.js';
import EngineItem from './EngineItem.vue';
import EngineCategory from './EngineCategory.vue';
import SettingButton from './SettingButton.vue';

const settings = useSettings();
const data = settings.settingData;
const matchedRule = settings.getMatchedRule();
// 记录本实例实际使用的规则，供 SPA 路由变化时判断能否复用
settings.activeRule = matchedRule;
settings.barMounted = false;
// 站点行为补丁由 siteStyles 模块提供
const sitePatches = matchedRule?.patches ?? {};
const inlineStyleBlocked = isInlineStyleBlocked();

const ready = ref(false);
const isSelectSearch = ref(false);
const selectionText = ref('');
const barVisible = ref(false);
const containerEl = ref(null);
const scrollEl = ref(null);
const containerClass = ref('rwl-exempt');

const {
  updateScrollHints,
  onScrollPointerDown,
  onWindowPointerMove,
  endScrollDrag,
  onScrollClickCapture,
  dispose: disposeScrollDrag,
} = useScrollDrag({ scrollEl });

const { start: startStackSync, stop: stopStackSync } = useStackSync();

const {
  constrainBarToViewport,
  onScroll,
  onWheel,
  onViewportResize,
  captureOriginTop,
  scheduleConstrainCheck,
  dispose: disposeFixedTop,
} = useFixedTop({
  containerEl,
  isSelectSearch,
  inlineStyleBlocked,
  sitePatches,
  matchedRule,
  getResolvedStyle: () => resolvedStyle,
  getHost,
  getStackOffset,
  updateScrollHints,
  getInsertTarget: () => insertTarget,
  getInputTarget: () => inputTarget,
});

let inputTarget = null;
let insertTarget = null;
let insertPosition = 'beforeend';
let resolvedStyle = '';

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

// 与浏览器 PageDown 一致：每次滚动 7/8 屏，保留少量上下文
const PAGE_STEP_RATIO = 0.875;
// 实测 Chrome 的 PageDown 动画约 150ms，而 behavior: 'smooth' 会按距离滚动约 600ms
const PAGE_SCROLL_DURATION = 150;
let scrollAnimRaf = 0;

// 缓入缓出，接近系统分页滚动的加减速
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function cancelScrollAnim() {
  if (!scrollAnimRaf) return;
  cancelAnimationFrame(scrollAnimRaf);
  scrollAnimRaf = 0;
}

function animateScrollTo(el, target) {
  cancelScrollAnim();
  const from = el.scrollLeft;
  const distance = target - from;
  if (!distance) return;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / PAGE_SCROLL_DURATION);
    el.scrollLeft = from + distance * easeInOutQuad(progress);
    scrollAnimRaf = progress < 1 ? requestAnimationFrame(step) : 0;
  };
  scrollAnimRaf = requestAnimationFrame(step);
}

function scrollBar(direction) {
  const el = scrollEl.value;
  if (!el) return;
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) return;
  const step = direction * el.clientWidth * PAGE_STEP_RATIO;
  const target = Math.min(maxScroll, Math.max(0, el.scrollLeft + step));
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    cancelScrollAnim();
    el.scrollLeft = target;
    return;
  }
  animateScrollTo(el, target);
}

// 开始拖动或滚轮滚动时让出控制权，避免和动画互相抢滚动位置
function onBarPointerDown(e) {
  cancelScrollAnim();
  onScrollPointerDown(e);
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

  const needsWrapper = !resolvedStyle.includes('sticky') && !resolvedStyle.includes('fixed');
  if (needsWrapper && matchedRule?.wrapperClass) {
    getHost().className += ` ${matchedRule.wrapperClass}`;
  }
}

function onSelectionChange() {
  // 输入框内的选区默认忽略，可在设置面板中单独开启
  const text = getSelectedText({ includeInput: data.selectSearchInInput });
  if (!text) {
    barVisible.value = false;
    return;
  }
  selectionText.value = text;
  barVisible.value = true;
}

onMounted(async () => {
  if (!initTargets()) return;
  settings.barMounted = true;
  ready.value = true;

  // 划词条可能是在用户划词后才延迟挂载的，先把当前选区同步进来
  if (isSelectSearch.value) onSelectionChange();

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
  scheduleConstrainCheck();
  window.addEventListener('resize', onViewportResize);
  window.addEventListener('pointermove', onWindowPointerMove, {
    passive: true,
  });
  window.addEventListener('pointerup', endScrollDrag);
  window.addEventListener('pointercancel', endScrollDrag);

  if (isSelectSearch.value) {
    document.addEventListener('selectionchange', onSelectionChange);
    // 部分站点/浏览器中 selectionchange 时机不稳定，补充鼠标与键盘事件兜底
    document.addEventListener('mouseup', onSelectionChange);
    document.addEventListener('keyup', onSelectionChange);
  }

  if (data.fixedTop && matchedRule && !inlineStyleBlocked && !isSelectSearch.value) {
    captureOriginTop();
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
  cancelScrollAnim();
  disposeScrollDrag();
  disposeFixedTop();
  stopStackSync();
});
</script>

<template>
  <div
    v-if="ready"
    ref="containerEl"
    id="sej-container"
    :class="[containerClass, { selectSearch: isSelectSearch, 'sej-select-visible': barVisible }]"
    :aria-hidden="isSelectSearch && !barVisible ? 'true' : undefined"
  >
    <div class="sej-scroll-viewport">
      <div
        ref="scrollEl"
        class="sej-scroll"
        @pointerdown="onBarPointerDown"
        @click.capture="onScrollClickCapture"
        @dragstart.prevent
        @wheel.passive="cancelScrollAnim"
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
      <button
        type="button"
        class="sej-scroll-hint sej-scroll-hint-left"
        :title="t('bar.scrollLeft')"
        :aria-label="t('bar.scrollLeft')"
        @click.stop="scrollBar(-1)"
      ></button>
      <button
        type="button"
        class="sej-scroll-hint sej-scroll-hint-right"
        :title="t('bar.scrollRight')"
        :aria-label="t('bar.scrollRight')"
        @click.stop="scrollBar(1)"
      ></button>
    </div>

    <SettingButton />
  </div>
</template>

<style>
#sej-container {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2px;
  gap: 2px;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  transform-origin: top center;
  animation: sejopen 0.14s ease-out;
  color: var(--font-color-qxin);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  width: max-content !important;
  max-width: min(100%, calc(100vw - 8px));
  box-sizing: border-box;
  border-radius: var(--sej-radius-bar, 12px);
  border: 1px solid var(--border-color-sej);
  overflow: hidden;
  box-shadow: var(
    --sej-shadow-bar,
    0 1px 2px hsla(0, 0%, 0%, 0.06),
    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)
  );
  height: fit-content;
  flex-wrap: nowrap;
  justify-content: center;
  user-select: none;
}

/* 滚动区容器：内容不足时让类别和设置按钮作为整体居中，溢出时再收缩滚动 */
#sej-container > .sej-scroll-viewport {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
}

/* 类别区单行显示，超出可用宽度时横向滚动；设置按钮固定在右侧 */
#sej-container > .sej-scroll-viewport > .sej-scroll {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  /*
   * 不显示滚动条：桌面端用鼠标拖动，触屏不拦截手势，
   * 让浏览器原生处理横向滚动，保留松手后的惯性滑动。
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
  touch-action: auto;
  cursor: grab;
}

#sej-container > .sej-scroll-viewport > .sej-scroll::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging * {
  cursor: grabbing;
}

/* 左右仍有隐藏内容时，用渐隐边缘 + 圆形箭头提示可以继续拖动 */
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left {
  -webkit-mask-image: linear-gradient(to right, transparent, #000 28px);
  mask-image: linear-gradient(to right, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(to left, transparent, #000 28px);
  mask-image: linear-gradient(to left, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
}

/*
 * 圆形箭头按钮：点击滚动一屏。
 * 按钮本身铺满滚动区高度并加宽为透明命中区，鼠标从边缘移到箭头上时
 * 不会先掠过底下的分类/引擎条目；可见的圆形与箭头由伪元素绘制。
 */
#sej-container .sej-scroll-hint {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  appearance: none;
  color: var(--sej-accent);
  background: none;
  border: 0;
  font: inherit;
  line-height: 0;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.16s ease-out;
}

/* 可见的圆形底 */
#sej-container .sej-scroll-hint::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 22px;
  height: 22px;
  margin: auto;
  box-sizing: border-box;
  border-radius: 50%;
  background: var(--sej-bar-bg, var(--background-color-qxin));
  border: 1px solid var(--border-color-sej);
  box-shadow: 0 2px 6px hsla(0, 0%, 0%, 0.22);
  transition:
    box-shadow 0.08s ease-out,
    transform 0.08s ease-out;
}

#sej-container .sej-scroll-hint::after {
  content: '';
  position: relative;
  z-index: 1;
  width: 6px;
  height: 6px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  border-radius: 1px;
}

#sej-container .sej-scroll-hint-left {
  left: 0;
}

#sej-container .sej-scroll-hint-left::after {
  margin-left: 2px;
  transform: rotate(-135deg);
}

#sej-container .sej-scroll-hint-right {
  right: 0;
}

#sej-container .sej-scroll-hint-right::after {
  margin-right: 2px;
  transform: rotate(45deg);
}

#sej-container .sej-scroll-hint:hover::before {
  box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.32);
}

#sej-container .sej-scroll-hint:active::before {
  transform: scale(0.92);
}

#sej-container .sej-scroll-hint:focus-visible {
  outline: none;
}

#sej-container .sej-scroll-hint:focus-visible::before {
  outline: 2px solid var(--sej-accent);
  outline-offset: 1px;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left ~ .sej-scroll-hint-left,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right ~ .sej-scroll-hint-right {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

#sej-container > #setBtn {
  flex: 0 0 auto;
  margin-left: 2px;
}

/* 滑词搜索样式 */
#sej-container.selectSearch {
  position: fixed;
  top: 2px;
  left: 0;
  right: 0;
  z-index: 99999999;
  margin: 0 auto;
  transform: translateY(calc(-100% - 10px));
  visibility: hidden;
  pointer-events: none;
  transition:
    transform 0.3s,
    visibility 0s linear 0.3s;
}

#sej-container.selectSearch.sej-select-visible {
  transform: none;
  visibility: visible;
  pointer-events: auto;
  transition:
    transform 0.3s,
    visibility 0s linear 0s;
}

.sej-category-title {
  font-weight: 600;
  padding: 0 12px;
  opacity: 0.8;
}

@keyframes sejopen {
  0% {
    transform: translateY(-4px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}
</style>

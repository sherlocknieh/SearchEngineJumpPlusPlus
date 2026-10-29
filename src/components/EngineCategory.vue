<script>
// 模块级共享，确保所有类别实例共用同一固定/展开状态
let pinnedCategory = null;
let openCategory = null;
// 每个分类的下拉面板都需要一个在本 Shadow Root 内唯一的锚点名称
let anchorSeq = 0;
</script>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { getFaviconSrc } from '../core/favicon.js';
import { getDropRoot, getHost } from '../core/shadowDom.js';
import { t } from '../assets/i18n.js';
import { subscribePointer } from '../composables/sharedPointer.js';
import EngineItem from './EngineItem.vue';

const props = defineProps({
  name: { type: String, required: true },
  engines: { type: Array, required: true },
  showIcon: { type: Boolean, default: true },
});

const emit = defineEmits(['jump', 'jumpAll']);

// 分类标题只显示首个引擎的图标；计算一次，避免模板内重复读取
const firstIconSrc = computed(() =>
  props.showIcon && props.engines[0] ? getFaviconSrc(props.engines[0]) : '',
);

// 支持 CSS Anchor Positioning 时，面板位置完全交给浏览器；
// 否则回退到下面的 JS 坐标计算。
const supportsAnchorPositioning = Boolean(
  typeof CSS !== 'undefined' &&
  CSS.supports?.('position-anchor: --sej-anchor') &&
  CSS.supports?.('top: anchor(bottom)'),
);
anchorSeq += 1;
const anchorId = `--sej-anchor-${anchorSeq}`;

const dropRoot = getDropRoot();
const triggerEl = ref(null);
const listEl = ref(null);
const shown = ref(false);
const active = ref(false);
const pinned = ref(false);
const top = ref(supportsAnchorPositioning ? '' : '-10000px');
const left = ref(supportsAnchorPositioning ? '' : '0px');
const listPosition = ref('fixed');
const halfWidth = ref('64px');

const pointer = { x: -1, y: -1 };
// 点击收起（再次点击固定项、点开引擎）后指针通常仍停在触发项上，
// 标记为抑制状态，等指针离开触发项再恢复悬停展开
let hoverSuppressed = false;

function hitTest(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    pointer.x >= rect.left &&
    pointer.x <= rect.right &&
    pointer.y >= rect.top &&
    pointer.y <= rect.bottom
  );
}

// 指针落在触发项与菜单之间的空隙时也保持展开，避免穿缝时闪断
function hitTestBridge() {
  const trigger = triggerEl.value;
  const list = listEl.value;
  if (!trigger || !list) return false;
  const t = trigger.getBoundingClientRect();
  const l = list.getBoundingClientRect();
  if (!l.width || !l.height) return false;
  const gapTop = Math.min(t.bottom, l.top);
  const gapBottom = Math.max(t.bottom, l.top);
  return (
    pointer.x >= Math.min(t.left, l.left) &&
    pointer.x <= Math.max(t.right, l.right) &&
    pointer.y >= gapTop &&
    pointer.y <= gapBottom
  );
}

// 指针是否仍在触发项/菜单范围内。
// 有事件路径时要求触发项或菜单确实在路径中，避免被滚动按钮等浮层遮住时
// 仍按几何位置误判为“还在面板内”，导致移开后菜单不关闭。
function isPointerInside(path) {
  const trigger = triggerEl.value;
  const list = listEl.value;
  const overTrigger = hitTest(trigger) && (!path || path.includes(trigger));
  const overList = hitTest(list) && (!path || path.includes(list));
  return overTrigger || overList || hitTestBridge();
}

// 指针是否真正落在触发项上。
// 只用几何命中会误判：鼠标从边缘进入时坐标恰好落在触发项边界，
// elementFromPoint 会命中相邻元素；被其他面板遮住时几何上又仍然“命中”。
// 因此以事件命中路径为准，几何判定只作为廉价的预筛选。
function isPointerOverTrigger(path) {
  const trigger = triggerEl.value;
  if (!trigger || !hitTest(trigger)) return false;
  if (!path) return true;
  return path.includes(trigger);
}

// 正常文档流里让面板相对 Shadow 宿主做 absolute 定位，页面滚动时由浏览器
// 天然跟随跳转条；划词条或站点规则使容器 fixed/sticky 时才退回视口定位。
function getPositioningMode() {
  const trigger = triggerEl.value;
  if (!trigger) return 'fixed';
  const container = trigger.closest('#sej-container');
  const containerPosition = container ? getComputedStyle(container).position : '';
  if (containerPosition === 'fixed' || containerPosition === 'sticky') return 'fixed';
  // 宿主没有定位上下文时 absolute 会相对更外层的祖先定位，位置会错
  if (getComputedStyle(getHost()).position === 'static') return 'fixed';
  return 'absolute';
}

function measureAndPosition() {
  const trigger = triggerEl.value;
  const list = listEl.value;
  if (!trigger || !list) return;

  if (supportsAnchorPositioning) {
    // 位置由 CSS anchor()/position-try 计算，这里只同步用于视口钳制的半宽
    listPosition.value = 'fixed';
    top.value = '';
    left.value = '';
    halfWidth.value = `${list.getBoundingClientRect().width / 2}px`;
    return;
  }

  const mode = getPositioningMode();
  listPosition.value = mode;
  // 先同步切换定位方式，下面量到的宽高才是最终布局下的
  if (list.style.position !== mode) list.style.position = mode;

  const rect = trigger.getBoundingClientRect();
  const listRect = list.getBoundingClientRect();
  const listWidth = listRect.width;
  const listHeight = listRect.height;

  // absolute 以宿主 padding box 为原点，fixed 以视口为原点
  let originLeft = 0;
  let originTop = 0;
  if (mode === 'absolute') {
    const host = getHost();
    const hostRect = host.getBoundingClientRect();
    originLeft = hostRect.left + host.clientLeft;
    originTop = hostRect.top + host.clientTop;
  }

  const GAP = 2;
  let posLeft = rect.left - originLeft - (listWidth - rect.width) / 2;
  // 8px 视口留白换算到当前定位坐标系
  posLeft = Math.max(
    8 - originLeft,
    Math.min(posLeft, window.innerWidth - listWidth - 8 - originLeft),
  );

  let posTop = rect.bottom - originTop + GAP;
  if (rect.bottom + GAP + listHeight > window.innerHeight - 8 && rect.top - listHeight - GAP > 8) {
    posTop = rect.top - listHeight - GAP - originTop;
  }

  top.value = posTop + 'px';
  left.value = posLeft + 'px';
}

// 类别区横向滚动时让已展开的面板跟随触发项
let scrollEl = null;

function onScrollArea() {
  if (shown.value) measureAndPosition();
}

// absolute 模式下由宿主天然跟随页面滚动；fixed 模式（划词条/吸顶容器）
// 仍需在滚动时重新贴合触发项。
let pageListenersOn = false;

function onPageViewportChange(event) {
  if (!shown.value) return;
  if (supportsAnchorPositioning) {
    // 位置由浏览器跟随，只有视口变化可能改变面板宽度时才重新量一次
    if (event.type === 'resize') measureAndPosition();
    return;
  }
  if (event.type === 'scroll' && listPosition.value === 'absolute') return;
  measureAndPosition();
}

// 只在面板展开期间监听页面滚动，避免每个分类都常驻全局监听
function setPageListeners(on) {
  if (on === pageListenersOn) return;
  pageListenersOn = on;
  if (on) {
    window.addEventListener('scroll', onPageViewportChange, { passive: true });
    window.addEventListener('resize', onPageViewportChange, { passive: true });
    return;
  }
  window.removeEventListener('scroll', onPageViewportChange);
  window.removeEventListener('resize', onPageViewportChange);
}

function isDragScrolling() {
  return Boolean(scrollEl?.classList.contains('sej-scroll-dragging'));
}

async function show() {
  if (isDragScrolling()) return;
  if (shown.value) {
    active.value = true;
    return;
  }
  if (!triggerEl.value) return;
  // 同一时间只保留一个悬停展开的面板，避免多行布局下叠加
  if (openCategory && openCategory !== hide) openCategory();
  openCategory = hide;
  shown.value = true;
  setPageListeners(true);
  await nextTick();
  if (!shown.value) return;
  measureAndPosition();
  active.value = true;
}

function scheduleHide(path) {
  if (pinned.value || isPointerInside(path)) return;
  hide();
}

function hide() {
  if (openCategory === hide) openCategory = null;
  active.value = false;
  shown.value = false;
  setPageListeners(false);
}

// 点击类别固定下拉面板，再次点击收起；固定后不再响应指针离开
function pin() {
  if (pinnedCategory && pinnedCategory !== unpin) pinnedCategory();
  pinnedCategory = unpin;
  pinned.value = true;
  show();
}

function unpin() {
  if (pinnedCategory === unpin) pinnedCategory = null;
  pinned.value = false;
  hoverSuppressed = true;
  hide();
}

function onTriggerClick() {
  // 图标出现（已固定）后，整个分类触发项都是一键搜索的触发区域
  if (pinned.value) {
    onTriggerAction();
    return;
  }
  pin();
}

// 进入触发项即可展开。这里不再用进入瞬间的坐标做命中检测：
// 指针从触发项边缘进入时坐标正好落在边界上，命中检测会误判为被遮挡
function onHoverShow() {
  if (pinnedCategory && pinnedCategory !== unpin) return;
  if (hoverSuppressed) return;
  show();
}

function onHoverLeave() {
  hoverSuppressed = false;
  scheduleHide();
}

// 常驻后标题图标会变成“在新标签打开”图标；
// 此时点击分类触发项的任意位置都会执行一键搜索全部分类
function onTriggerAction() {
  unpin();
  emit('jumpAll');
}

function onTriggerKeydown() {
  // 面板展开时回车/空格执行一键搜索，收起时作为普通触发键展开
  onTriggerClick();
}

function onEngineJump(engine) {
  unpin();
  emit('jump', engine);
}

// 用指针坐标统一判定是否仍在触发器/子菜单范围内，
// 不依赖 enter/leave 事件顺序，避免间隙、裁剪或事件丢失导致误关闭。
// 事件由 sharedPointer 统一以 rAF 合并，避免每个分类各挂一个 document mousemove。
function onDocMouseMove(e, path) {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  if (isDragScrolling()) {
    if (shown.value) hide();
    return;
  }
  const overTrigger = isPointerOverTrigger(path);
  if (!overTrigger) hoverSuppressed = false;

  if (!shown.value) {
    // mouseenter 只在进入瞬间触发一次：若那次因边缘命中误差或被面板遮挡而放弃，
    // 指针再在触发项内移动也不会重新触发，面板就一直不显示。这里用移动事件兜底。
    if (!overTrigger || hoverSuppressed) return;
    if (pinnedCategory && pinnedCategory !== unpin) return;
    show();
    return;
  }

  if (pinned.value || isPointerInside(path)) {
    active.value = true;
  } else {
    scheduleHide(path);
  }
}

function onDocPointerDown(e) {
  if (!pinned.value) return;
  const path = e.composedPath ? e.composedPath() : [];
  if (path.includes(triggerEl.value) || path.includes(listEl.value)) return;
  unpin();
}

let unsubscribePointer = null;

onMounted(() => {
  unsubscribePointer = subscribePointer({
    onMove: onDocMouseMove,
    onPointerDown: onDocPointerDown,
  });
  scrollEl = triggerEl.value?.closest('.sej-scroll') || null;
  scrollEl?.addEventListener('scroll', onScrollArea, { passive: true });
});

onBeforeUnmount(() => {
  if (openCategory === hide) openCategory = null;
  unsubscribePointer?.();
  unsubscribePointer = null;
  scrollEl?.removeEventListener('scroll', onScrollArea);
  scrollEl = null;
  setPageListeners(false);
  if (pinnedCategory === unpin) pinnedCategory = null;
});
</script>

<template>
  <span class="sej-category" @mouseenter="onHoverShow" @mouseleave="onHoverLeave">
    <a
      ref="triggerEl"
      class="sej-engine sej-drop-list-trigger"
      :class="{ 'sej-drop-list-trigger-shown': active }"
      :style="{ anchorName: anchorId }"
      role="button"
      tabindex="0"
      aria-haspopup="true"
      :aria-expanded="shown"
      :title="pinned ? t('jump.searchAll', { name }) : null"
      @click.prevent.stop="onTriggerClick"
      @keydown.enter.prevent="onTriggerKeydown"
      @keydown.space.prevent="onTriggerKeydown"
    >
      <!--
        固定 16×16 的图标槽：图标与一键搜索图标互换时文字位置不变。
        开启分类图标时始终保留槽位，即使当前分类没有可用图标；
        关闭图标时只在需要显示一键搜索图标时出现，避免所有分类都缩进。
      -->
      <span v-if="showIcon || pinned" class="sej-category-icon">
        <span v-if="pinned" class="sej-category-search-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M6.5 3H4.3A1.3 1.3 0 0 0 3 4.3v7.4A1.3 1.3 0 0 0 4.3 13h7.4a1.3 1.3 0 0 0 1.3-1.3V9.5"
            />
            <path d="M9.6 2.6h3.8v3.8" />
            <path d="M13.4 2.6 8.6 7.4" />
          </svg>
        </span>
        <img v-else-if="firstIconSrc" class="sej-category-icon-img" :src="firstIconSrc" alt="" />
      </span>
      <span>{{ name }}</span>
    </a>

    <Teleport :to="dropRoot">
      <div
        ref="listEl"
        class="sej-drop-list"
        :class="{ 'sej-drop-list-anchored': supportsAnchorPositioning }"
        :style="{
          display: shown ? 'block' : 'none',
          position: listPosition,
          positionAnchor: supportsAnchorPositioning ? anchorId : undefined,
          '--sej-half-width': halfWidth,
          top,
          left,
          opacity: active ? 1 : 0.2,
          pointerEvents: shown ? 'auto' : 'none',
          transition: 'opacity 0s',
          animation: 'none',
          zIndex: 100000000,
        }"
        @mouseenter="show"
        @mouseleave="scheduleHide"
      >
        <EngineItem
          v-for="engine in engines"
          :key="engine.name + engine.url"
          :engine="engine"
          @jump="onEngineJump"
        />
      </div>
    </Teleport>
  </span>
</template>

<style>
.sej-category {
  display: inline-flex;
  align-items: center;
  position: relative;
}

/*
 * 图标槽固定 16×16、不收缩、无外边距，与原 .sej-engine-icon 占位一致。
 * 分类触发项内的尺寸在这里定义，不再依赖 EngineItem 的样式是否已注入。
 */
.sej-category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin: 0;
  flex: 0 0 auto;
  pointer-events: none;
}

.sej-category-icon-img {
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  object-fit: cover;
}

/* 一键搜索图标只是状态展示，所有操作都由所在的分类触发项承担 */
.sej-category-search-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--font-color-qxin);
}

.sej-category-search-icon svg {
  display: block;
  width: 14px;
  height: 14px;
  margin: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sej-engine.sej-drop-list-trigger-shown {
  background-color: var(--trigger-shown-qxin);
}

.sej-drop-list > .sej-engine {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  gap: 8px;
  border-radius: var(--sej-radius-item, 8px);
  font-weight: 400;
}

.sej-drop-list > .sej-engine + .sej-engine {
  margin-top: 1px;
}

.sej-drop-list {
  /* 默认 fixed；正常文档流下会切换为 absolute，相对 Shadow 宿主定位 */
  position: fixed;
  display: none;
  opacity: 0.2;
  top: -10000px;
  left: 0;
  min-width: 128px;
  padding: 4px;
  box-sizing: border-box;
  text-align: left;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  box-shadow: var(
    --sej-shadow-menu,
    0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)
  );
  background-color: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  transition: opacity 0.08s ease-out;
  animation: sej-drop-menu-in 0.1s ease-out;
  overflow: hidden;
  border-radius: var(--sej-radius-menu, 12px);
  border: 1px solid var(--border-color-sej);
  user-select: none;
}

/*
 * 支持 CSS Anchor Positioning 时，面板锚定到自己的分类触发项：
 * 位置、页面滚动跟随、横向钳制和上翻全部由浏览器计算，不走 JS 坐标。
 */
.sej-drop-list.sej-drop-list-anchored {
  top: anchor(bottom);
  left: clamp(
    calc(8px + var(--sej-half-width, 64px)),
    anchor(center),
    calc(100vw - 8px - var(--sej-half-width, 64px))
  );
  translate: -50% 0;
  margin-top: 2px;
  position-try-fallbacks: --sej-drop-above;
}

@position-try --sej-drop-above {
  /* 下方空间不足时翻到触发项上方 */
  top: auto;
  bottom: anchor(top);
  margin-top: 0;
  margin-bottom: 2px;
}

@keyframes sej-drop-menu-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
}
</style>

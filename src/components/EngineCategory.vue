<script>
// 模块级共享，确保所有类别实例共用同一固定/展开状态
let pinnedCategory = null;
let openCategory = null;
</script>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { getFaviconSrc } from '../core/favicon.js';
import { getDropRoot } from '../core/shadow.js';
import { t } from '../i18n/index.js';
import EngineItem from './EngineItem.vue';

const props = defineProps({
  name: { type: String, required: true },
  engines: { type: Array, required: true },
  showIcon: { type: Boolean, default: true },
});

const emit = defineEmits(['jump', 'jumpAll']);

const dropRoot = getDropRoot();
const triggerEl = ref(null);
const listEl = ref(null);
const shown = ref(false);
const active = ref(false);
const pinned = ref(false);
const top = ref('-10000px');
const left = ref('0px');

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

function isPointerInside() {
  return hitTest(triggerEl.value) || hitTest(listEl.value) || hitTestBridge();
}

// 指针是否真正落在触发项上。
// 只用几何命中会误判：鼠标从边缘进入时坐标恰好落在触发项边界，
// elementFromPoint 会命中相邻元素；被其他面板遮住时几何上又仍然“命中”。
// 因此以事件命中路径为准，几何判定只作为廉价的预筛选。
function isPointerOverTrigger(e) {
  const trigger = triggerEl.value;
  if (!trigger || !hitTest(trigger)) return false;
  const path = e?.composedPath?.();
  if (!path) return true;
  return path.includes(trigger);
}

function measureAndPosition() {
  if (!triggerEl.value || !listEl.value) return;
  const rect = triggerEl.value.getBoundingClientRect();
  const listRect = listEl.value.getBoundingClientRect();
  const listWidth = listRect.width;
  const listHeight = listRect.height;
  // 面板紧贴分类标题，避免多行布局下鼠标下移时从缝隙掠过其他分类
  const GAP = 2;

  let posLeft = rect.left - (listWidth - rect.width) / 2;
  posLeft = Math.max(8, Math.min(posLeft, window.innerWidth - listWidth - 8));

  let posTop = rect.bottom + GAP;
  if (
    posTop + listHeight > window.innerHeight - 8 &&
    rect.top - listHeight - GAP > 8
  ) {
    posTop = rect.top - listHeight - GAP;
  }

  top.value = posTop + 'px';
  left.value = posLeft + 'px';
}

async function show() {
  if (shown.value) {
    active.value = true;
    return;
  }
  if (!triggerEl.value) return;
  // 同一时间只保留一个悬停展开的面板，避免多行布局下叠加
  if (openCategory && openCategory !== hide) openCategory();
  openCategory = hide;
  shown.value = true;
  await nextTick();
  if (!shown.value) return;
  measureAndPosition();
  active.value = true;
}

function scheduleHide() {
  if (pinned.value || isPointerInside()) return;
  hide();
}

function hide() {
  if (openCategory === hide) openCategory = null;
  active.value = false;
  shown.value = false;
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
  if (pinned.value) {
    unpin();
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

// 常驻后标题图标会变成“在新标签打开”图标，点击它执行一键搜索全部分类
function onTriggerAction() {
  unpin();
  emit('jumpAll');
}

function onEngineJump(engine) {
  unpin();
  emit('jump', engine);
}

// 用指针坐标统一判定是否仍在触发器/子菜单范围内，
// 不依赖 enter/leave 事件顺序，避免间隙、裁剪或事件丢失导致误关闭
function onDocMouseMove(e) {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  const overTrigger = isPointerOverTrigger(e);
  if (!overTrigger) hoverSuppressed = false;

  if (!shown.value) {
    // mouseenter 只在进入瞬间触发一次：若那次因边缘命中误差或被面板遮挡而放弃，
    // 指针再在触发项内移动也不会重新触发，面板就一直不显示。这里用移动事件兜底。
    if (!overTrigger || hoverSuppressed) return;
    if (pinnedCategory && pinnedCategory !== unpin) return;
    show();
    return;
  }

  if (pinned.value || isPointerInside()) {
    active.value = true;
  } else {
    scheduleHide();
  }
}

function onDocPointerDown(e) {
  if (!pinned.value) return;
  const path = e.composedPath ? e.composedPath() : [];
  if (path.includes(triggerEl.value) || path.includes(listEl.value)) return;
  unpin();
}

onMounted(() => {
  document.addEventListener('mousemove', onDocMouseMove);
  document.addEventListener('pointerdown', onDocPointerDown);
});

onBeforeUnmount(() => {
  if (openCategory === hide) openCategory = null;
  document.removeEventListener('mousemove', onDocMouseMove);
  document.removeEventListener('pointerdown', onDocPointerDown);
  if (pinnedCategory === unpin) pinnedCategory = null;
});
</script>

<template>
  <span class="sej-category" @mouseenter="onHoverShow" @mouseleave="onHoverLeave">
    <a
      ref="triggerEl"
      class="sej-engine sej-drop-list-trigger"
      :class="{ 'sej-drop-list-trigger-shown': active }"
      aria-haspopup="true"
      :aria-expanded="shown"
      @click.prevent.stop="onTriggerClick"
    >
      <span
        v-if="pinned"
        class="sej-category-search-icon"
        role="button"
        tabindex="0"
        :title="t('jump.searchAll', { name })"
        :aria-label="t('jump.searchAll', { name })"
        @click.stop.prevent="onTriggerAction"
        @keydown.enter.stop.prevent="onTriggerAction"
        @keydown.space.stop.prevent="onTriggerAction"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6.5 3H4.3A1.3 1.3 0 0 0 3 4.3v7.4A1.3 1.3 0 0 0 4.3 13h7.4a1.3 1.3 0 0 0 1.3-1.3V9.5" />
          <path d="M9.6 2.6h3.8v3.8" />
          <path d="M13.4 2.6 8.6 7.4" />
        </svg>
      </span>
      <img
        v-else-if="showIcon && getFaviconSrc(engines[0])"
        class="sej-engine-icon"
        :src="getFaviconSrc(engines[0])"
        alt=""
      />
      <span>{{ name }}</span>
    </a>

    <Teleport :to="dropRoot">
      <div
        ref="listEl"
        class="sej-drop-list"
        :style="{
          display: shown ? 'block' : 'none',
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

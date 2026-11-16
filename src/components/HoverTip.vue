<script setup>
import { inject, ref, watch } from 'vue';
import { getDropRoot, getHost, HOST_ROLE_KEY, HOST_ROLE_MAIN } from '../core/shadowDom.js';
import { HOVER_TIP_KEY } from '../composables/useHoverTip.js';

const hoverTip = inject(HOVER_TIP_KEY, null);
// 控制器里的 tip 才是响应式状态；组件只负责渲染它
const tip = hoverTip?.tip ?? null;
const role = inject(HOST_ROLE_KEY, HOST_ROLE_MAIN);
// 与分类下拉面板共用宿主的挂载容器，提示不会被子组件裁切
const dropRoot = getDropRoot(role);
const tipEl = ref(null);

// 提示与锚点、视口边界之间的间距
const GAP = 6;
const VIEW_GAP = 8;

const position = ref({ position: 'fixed', top: '-10000px', left: '0px' });

/**
 * 提示采用哪套坐标系：正常文档流里按宿主 padding box 绝对定位，
 * 划词条或站点规则让容器脱离文档流时退回视口定位（与分类下拉面板同一判断）。
 */
function resolveMode(anchor) {
  const container = anchor.closest?.('#sej-container');
  const containerPosition = container ? getComputedStyle(container).position : '';
  if (containerPosition === 'fixed' || containerPosition === 'sticky') return 'fixed';
  if (getComputedStyle(getHost(role)).position === 'static') return 'fixed';
  return 'absolute';
}

/**
 * 提示贴在锚点右侧并垂直居中；右侧空间不足时翻到左侧，左右与上下都收进视口。
 * 坐标按宿主的 padding box 换算，绝对定位时页面滚动由浏览器天然跟随。
 */
function place() {
  const anchor = tip?.anchor;
  const el = tipEl.value;
  if (!tip?.visible || !anchor?.isConnected || !el) return;

  const anchorRect = anchor.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  const mode = resolveMode(anchor);

  // absolute 以宿主 padding box 为原点，fixed 以视口为原点
  let originLeft = 0;
  let originTop = 0;
  if (mode === 'absolute') {
    const host = getHost(role);
    const hostRect = host.getBoundingClientRect();
    originLeft = hostRect.left + host.clientLeft;
    originTop = hostRect.top + host.clientTop;
  }

  const right = anchorRect.right + GAP;
  const leftSide = anchorRect.left - GAP - box.width;
  const preferred = right + box.width <= window.innerWidth - VIEW_GAP ? right : leftSide;
  const maxLeft = Math.max(VIEW_GAP, window.innerWidth - VIEW_GAP - box.width);
  const left = Math.min(Math.max(preferred, VIEW_GAP), maxLeft);
  const centeredTop = anchorRect.top + (anchorRect.height - box.height) / 2;
  const maxTop = Math.max(VIEW_GAP, window.innerHeight - VIEW_GAP - box.height);
  const top = Math.min(Math.max(centeredTop, VIEW_GAP), maxTop);

  position.value = {
    position: mode,
    top: `${Math.round(top - originTop)}px`,
    left: `${Math.round(left - originLeft)}px`,
  };
}

// 文案或锚点变化后先让新内容完成渲染再量尺寸，避免按旧宽度定位而偏出屏幕
watch(
  () => [tip?.visible, tip?.text, tip?.anchor],
  () => {
    if (tip?.visible) place();
  },
  { flush: 'post' },
);
</script>

<template>
  <Teleport :to="dropRoot">
    <div v-if="tip?.visible" ref="tipEl" class="sej-hover-tip" role="tooltip" :style="position">
      {{ tip.text }}
    </div>
  </Teleport>
</template>

<style>
.sej-hover-tip {
  z-index: 100000000;
  max-width: min(320px, calc(100vw - 16px));
  padding: 6px 10px;
  border-radius: var(--sej-radius-menu, 12px);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-color-sej);
  box-shadow: var(
    --sej-shadow-menu,
    0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)
  );
  color: var(--font-color-qxin);
  font-family: var(--sej-font-family);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.45;
  text-align: left;
  white-space: normal;
  overflow-wrap: anywhere;
  pointer-events: none;
  user-select: none;
}
</style>

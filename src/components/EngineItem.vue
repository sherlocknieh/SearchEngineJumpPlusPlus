<script setup>
import { computed } from 'vue';
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName } from '../assets/i18n.js';

const props = defineProps({
  engine: { type: Object, required: true },
  showIcon: { type: Boolean, default: true },
  // 紧凑模式：只保留图标，文字收进悬停提示
  compact: { type: Boolean, default: false },
  // 情景专属的悬停提示，优先于名称；为空时按紧凑模式回退到名称
  hint: { type: String, default: '' },
});

const iconSrc = computed(() => (props.showIcon ? getFaviconSrc(props.engine) : ''));
const label = computed(() => localizeEngineName(props.engine.name));
// 没有图标时用名称首字兜底，避免紧凑模式下条目不可见
const glyph = computed(() => Array.from(label.value)[0] || '');

const emit = defineEmits(['jump']);
</script>

<template>
  <a
    class="sej-engine"
    :title="hint || (compact ? label : null)"
    @click.prevent.stop="emit('jump', engine)"
  >
    <img v-if="iconSrc" class="sej-engine-icon" :src="iconSrc" alt="" />
    <span v-else-if="compact" class="sej-engine-glyph" aria-hidden="true">{{ glyph }}</span>
    <span v-if="!compact">{{ label }}</span>
  </a>
</template>

<style>
.sej-engine {
  padding: 0 13px;
  transition:
    background-color 0.08s ease-out,
    opacity 0.08s ease-out;
  font-size: 13px;
  font-family: var(--sej-font-family);
  display: inline-flex;
  gap: 8px;
  align-items: center;
  height: 2.6em;
  box-sizing: border-box;
  text-decoration: none !important;
  color: var(--font-color-qxin) !important;
  cursor: pointer;
  white-space: nowrap;
}

#sej-container > .sej-engine,
#sej-container .sej-category > .sej-engine {
  height: 30px;
  padding: 0 11px;
  gap: 6px;
  border-radius: var(--sej-radius-item, 999px);
  font-weight: 500;
}

.sej-drop-list a:visited,
.sej-drop-list a:hover,
.sej-engine a:visited,
.sej-engine a:hover,
#sej-container a:link,
#sej-container a:visited,
#sej-container a:hover {
  color: var(--font-color-qxin);
}

.sej-engine:hover {
  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));
}

.sej-engine:active {
  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));
}

#sej-container .sej-engine:focus-visible {
  outline: 2px solid var(--sej-accent, #4285f4);
  outline-offset: -2px;
}

.sej-engine-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  object-fit: cover;
  display: inline-block;
  margin: 0;
  /*
   * 行盒居中后，文字着墨中心实际比 16px 图标槽中心低约 0.5px，图标跟随后才与文字齐平。
   * 用 0.5px 而不是更细的值：2 倍屏上它正好是一个物理像素，不会因为条目落在半像素位置
   * 而吸附到不同整像素上，导致对齐结果随页面位置跳动。
   */
  translate: 0 0.5px;
}

.sej-engine-icon:not([src]) {
  display: none;
}

/* 紧凑模式没有图标时的首字兜底，占据与图标槽相同的 16px */
.sej-engine-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  border-radius: 4px;
  background: var(--sej-surface-2, rgba(127, 127, 127, 0.16));
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.sej-engine-icon {
  pointer-events: none;
}
</style>

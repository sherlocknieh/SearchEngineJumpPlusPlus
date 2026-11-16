<script setup>
import { computed } from 'vue';
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName } from '../assets/i18n.js';

const props = defineProps({
  engine: { type: Object, required: true },
  showIcon: { type: Boolean, default: true },
  // 紧凑模式：只保留图标；动作条目的目标内容仍在文字右侧常显
  compact: { type: Boolean, default: false },
  // 情景专属的提示内容，显示在动作条目右侧
  hint: { type: String, default: '' },
});

const iconSrc = computed(() => (props.showIcon ? getFaviconSrc(props.engine) : ''));
const label = computed(() => localizeEngineName(props.engine.name));
// 没有图标时用名称首字兜底，避免紧凑模式下条目不可见
const glyph = computed(() => Array.from(label.value)[0] || '');

const emit = defineEmits(['jump']);

// 动作条目的目标内容直接跟在文字右侧常显，桌面与触屏一致，不再依赖悬停浮层
const inlineTip = computed(() => props.hint);
</script>

<template>
  <a
    class="sej-engine"
    :aria-label="compact ? label : null"
    @click.prevent.stop="emit('jump', engine)"
  >
    <img v-if="iconSrc" class="sej-engine-icon" :src="iconSrc" alt="" />
    <span v-else-if="compact" class="sej-engine-glyph" aria-hidden="true">{{ glyph }}</span>
    <span v-if="!compact" class="sej-engine-label">{{ label }}</span>
    <span v-if="inlineTip" class="sej-engine-tip">{{ inlineTip }}</span>
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
}

.sej-engine-icon:not([src]) {
  display: none;
}

/* 动作条目的目标内容：常显在文字右侧，像贴在该条目上的子菜单，过长时尾部省略 */
.sej-engine-tip {
  max-width: min(40vw, 200px);
  padding: 1px 7px;
  border-radius: var(--sej-radius-menu, 12px);
  border: 1px solid var(--border-color-sej);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  color: inherit;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

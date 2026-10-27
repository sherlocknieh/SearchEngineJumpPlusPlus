<script setup>
import { computed } from 'vue';
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName } from '../assets/i18n.js';

const props = defineProps({
  engine: { type: Object, required: true },
  showIcon: { type: Boolean, default: true },
});

const iconSrc = computed(() => (props.showIcon ? getFaviconSrc(props.engine) : ''));

const emit = defineEmits(['jump']);
</script>

<template>
  <a class="sej-engine" @click.prevent.stop="emit('jump', engine)">
    <img v-if="iconSrc" class="sej-engine-icon" :src="iconSrc" alt="" />
    <span>{{ localizeEngineName(engine.name) }}</span>
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
  border-radius: var(--sej-radius-item, 8px);
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

.sej-engine-icon {
  pointer-events: none;
}
</style>

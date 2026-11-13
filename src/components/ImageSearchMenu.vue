<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSettings } from '../stores/settings.js';
import { closeImageSearch, imageSearch } from '../stores/imageSearch.js';
import { getImageEngines } from '../core/imageSearch.js';
import { performJump } from '../core/jump.js';
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName, t } from '../assets/i18n.js';
import { useEventIsolation } from '../composables/useEventIsolation.js';

const settings = useSettings();
const data = settings.settingData;
// 图标只取一次，避免模板里重复计算
const engines = computed(() =>
  getImageEngines(data).map((engine) => ({ ...engine, icon: getFaviconSrc(engine) })),
);

const rootEl = ref(null);
const position = ref({ left: `${imageSearch.x}px`, top: `${imageSearch.y}px` });

useEventIsolation(rootEl);

// 浮层贴着光标弹出，超出视口时向内收，避免被裁掉
async function placeAtCursor() {
  await nextTick();
  const el = rootEl.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const gap = 8;
  const left = Math.max(gap, Math.min(imageSearch.x, window.innerWidth - rect.width - gap));
  const top = Math.max(gap, Math.min(imageSearch.y, window.innerHeight - rect.height - gap));
  position.value = { left: `${Math.round(left)}px`, top: `${Math.round(top)}px` };
}

function onJump(engine) {
  performJump(engine, imageSearch.imageUrl, data);
  closeImageSearch();
}

// 点击浮层外部、按 Escape、滚动或缩放时收起，避免浮层停在过期位置
function onDocumentPointerDown(e) {
  const path = e.composedPath?.();
  if (path ? path.includes(rootEl.value) : rootEl.value?.contains(e.target)) return;
  closeImageSearch();
}

function onKeydown(e) {
  if (e.key === 'Escape') closeImageSearch();
}

onMounted(() => {
  placeAtCursor();
  document.addEventListener('pointerdown', onDocumentPointerDown, true);
  document.addEventListener('keydown', onKeydown, true);
  window.addEventListener('scroll', closeImageSearch, true);
  window.addEventListener('resize', closeImageSearch);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown, true);
  document.removeEventListener('keydown', onKeydown, true);
  window.removeEventListener('scroll', closeImageSearch, true);
  window.removeEventListener('resize', closeImageSearch);
});
</script>

<template>
  <div
    ref="rootEl"
    id="sej-image-menu"
    role="menu"
    :aria-label="t('imageSearch.title')"
    :style="position"
    @contextmenu.prevent
  >
    <div class="sej-image-menu-head">
      <img class="sej-image-menu-thumb" :src="imageSearch.imageUrl" alt="" />
      <span>{{ t('imageSearch.title') }}</span>
    </div>
    <a
      v-for="engine in engines"
      :key="engine.name + engine.url"
      class="sej-engine sej-image-menu-item"
      role="menuitem"
      @click.prevent.stop="onJump(engine)"
    >
      <img v-if="engine.icon" class="sej-engine-icon" :src="engine.icon" alt="" />
      <span>{{ localizeEngineName(engine.name) }}</span>
    </a>
  </div>
</template>

<style>
#sej-image-menu {
  position: fixed;
  z-index: 100000001;
  min-width: 148px;
  max-width: min(280px, calc(100vw - 16px));
  padding: 4px;
  box-sizing: border-box;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  color: var(--font-color-qxin);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-color-sej);
  border-radius: var(--sej-radius-menu, 12px);
  box-shadow: var(
    --sej-shadow-menu,
    0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)
  );
  overflow: hidden;
  user-select: none;
  animation: sej-image-menu-in 0.1s ease-out;
}

#sej-image-menu .sej-image-menu-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 6px;
  font-weight: 600;
  opacity: 0.75;
}

#sej-image-menu .sej-image-menu-thumb {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  object-fit: cover;
  border-radius: 6px;
  background: var(--sej-surface-2);
}

#sej-image-menu .sej-image-menu-item {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  gap: 8px;
  border-radius: var(--sej-radius-item, 8px);
  font-weight: 400;
}

#sej-image-menu .sej-image-menu-item + .sej-image-menu-item {
  margin-top: 1px;
}

@keyframes sej-image-menu-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
}
</style>

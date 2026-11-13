<script setup>
import { onBeforeUnmount, ref, watch } from 'vue';
import { runToastAction, ui } from '../stores/ui.js';

const tipEl = ref(null);

/**
 * 同步提示的 top layer 状态。
 * 页面用全屏广告层（z-index 拉满）盖住内容时，普通定位的提示会被压住、按钮点不到；
 * popover 让提示进入浏览器 top layer，始终盖在页面之上。
 */
function syncTopLayer(visible) {
  const el = tipEl.value;
  if (!el || typeof el.showPopover !== 'function') return;
  try {
    const open = el.matches(':popover-open');
    if (visible && !open) el.showPopover();
    else if (!visible && open) el.hidePopover();
  } catch (e) {
    // 元素刚卸载或已处于目标状态，忽略
  }
}

watch(() => ui.toastVisible, syncTopLayer, { immediate: true });
onBeforeUnmount(() => syncTopLayer(false));
</script>

<template>
  <div
    id="iqixn-global-tip"
    ref="tipEl"
    popover="manual"
    :class="{ 'sej-toast-visible': ui.toastVisible }"
    :style="{ opacity: ui.toastVisible ? 1 : 0 }"
  >
    <span>{{ ui.toastText }}</span>
    <button
      v-if="ui.toastActionLabel"
      type="button"
      class="sej-toast-action"
      @click="runToastAction"
    >
      {{ ui.toastActionLabel }}
    </button>
  </div>
</template>

<style>
/* 给用户的提示 */
#iqixn-global-tip {
  box-sizing: content-box !important;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  height: 25px;
  line-height: 25px;
  letter-spacing: 1px;
  font-size: 14px;
  color: #fff;
  padding: 5px 20px;
  border-radius: 8px;
  background-color: #666;
  position: fixed;
  z-index: 200000001;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%);
  pointer-events: none;
  transition: opacity 0.15s ease-out;
}

#iqixn-global-tip.sej-toast-visible {
  pointer-events: auto;
}

/*
 * popover 把提示放进 top layer，才能盖在页面自己的全屏遮罩之上；
 * UA 的 inset:0 / margin:auto / border 会改掉位置和外观，这里只保留自己的坐标与样式。
 * 不支持 popover 的浏览器会忽略这些选择器，仍由 sej-toast-visible 控制显隐。
 */
#iqixn-global-tip[popover]:not(:popover-open) {
  display: none;
}

#iqixn-global-tip[popover] {
  top: auto;
  right: auto;
  margin: 0;
  border: none;
}

#iqixn-global-tip .sej-toast-action {
  pointer-events: auto;
  border: none;
  border-radius: 6px;
  padding: 2px 10px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font: inherit;
  letter-spacing: inherit;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.12s ease-out;
}

#iqixn-global-tip .sej-toast-action:hover {
  background: rgba(255, 255, 255, 0.34);
}
</style>

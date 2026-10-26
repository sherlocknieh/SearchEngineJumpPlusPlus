<script setup>
import { runToastAction, ui } from '../stores/ui.js';
</script>

<template>
  <div
    id="iqixn-global-tip"
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

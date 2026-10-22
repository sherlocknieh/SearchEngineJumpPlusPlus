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

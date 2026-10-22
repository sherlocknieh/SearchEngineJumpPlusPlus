<script setup>
import { getFaviconSrc } from '../core/favicon.js';

defineProps({
  engine: { type: Object, required: true },
  showIcon: { type: Boolean, default: true },
});

const emit = defineEmits(['jump']);
</script>

<template>
  <a class="sej-engine" @click.prevent.stop="emit('jump', engine)">
    <img
      v-if="showIcon && getFaviconSrc(engine)"
      class="sej-engine-icon"
      :src="getFaviconSrc(engine)"
      alt=""
    />
    <span>{{ engine.name }}</span>
  </a>
</template>

<script setup>
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName } from '../i18n/index.js';

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
    <span>{{ localizeEngineName(engine.name) }}</span>
  </a>
</template>

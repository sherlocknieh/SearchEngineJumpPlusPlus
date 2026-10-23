<script setup>
import { SETTING } from '../data/icons.js';
import { openSettingPanel } from '../stores/ui.js';
</script>

<template>
  <span
    id="setBtn"
    role="button"
    tabindex="0"
    title="设置菜单"
    aria-label="设置菜单"
    @click="openSettingPanel"
    @keydown.enter.prevent="openSettingPanel"
    @keydown.space.prevent="openSettingPanel"
    v-html="SETTING"
  ></span>
</template>

<script setup>
import { SETTING } from '../data/icons.js';
import { openSettingPanel } from '../stores/ui.js';
</script>

<template>
  <span
    id="setBtn"
    title="设置菜单"
    @click="openSettingPanel"
    v-html="SETTING"
  ></span>
</template>

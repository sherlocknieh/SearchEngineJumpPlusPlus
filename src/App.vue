<script setup>
import { ui } from './stores/ui.js';
import JumpBar from './components/JumpBar.vue';
import SettingPanel from './components/SettingPanel.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <JumpBar />
  <SettingPanel v-if="ui.settingPanelOpen" />
  <Toast />
</template>

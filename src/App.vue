<script setup>
import { ui } from './stores/ui.js';
import JumpBar from './components/JumpBar.vue';
import SettingPanel from './components/SettingPanel.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <!-- 核心组件 -->
  <JumpBar />
  <!-- 设置面板组件, 外置 v-if 实现按需挂载, 减少资源占用 -->
  <SettingPanel v-if="ui.settingPanelOpen" />
  <!-- 气泡通知组件 -->
  <Toast />
</template>

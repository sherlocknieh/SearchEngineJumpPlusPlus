<script setup>
import { ui } from './stores/ui.js';
import { HOST_ROLE_FLOAT } from './core/shadowDom.js';
import JumpBar from './components/JumpBar.vue';
import SettingPanel from './components/SettingPanel.vue';
import Toast from './components/Toast.vue';

const props = defineProps({
  // 划词条独立成应用：只渲染跳转条本身，不带设置面板与提示条
  role: { type: String, default: 'main' },
});

const isFloat = props.role === HOST_ROLE_FLOAT;
</script>

<template>
  <!-- 核心组件：内嵌条与划词条同源，靠 role 区分挂载位置与行为 -->
  <JumpBar :role="role" />
  <template v-if="!isFloat">
    <!-- 设置面板组件, 外置 v-if 实现按需挂载, 减少资源占用 -->
    <SettingPanel v-if="ui.settingPanelOpen" />
    <!-- 气泡通知组件 -->
    <Toast />
  </template>
</template>

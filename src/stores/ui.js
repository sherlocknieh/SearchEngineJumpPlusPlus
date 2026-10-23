import { reactive } from 'vue';

export const ui = reactive({
  // 分类标签是否显示首个引擎的图标；纯运行时状态，不写入配置也不导出
  categoryIcon: true,
  // 添加/编辑引擎时默认 favicon 的来源：0 站点 /favicon.ico、
  // 1 站点 /favicon.ico、其他字符串作为 %s 模板；同样不持久化
  iconSource: 0,
  settingPanelOpen: false,
  // 其他页面写入设置时递增，供已打开的设置面板尝试同步
  settingsRevision: 0,
  toastText: '',
  toastVisible: false,
  toastActionLabel: '',
});

let toastTimer = null;
let toastActionHandler = null;

export function showToast(text, duration = 1500, action = null) {
  ui.toastText = text;
  ui.toastVisible = true;
  ui.toastActionLabel = action?.label || '';
  toastActionHandler = action?.onClick || null;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    ui.toastVisible = false;
    ui.toastActionLabel = '';
    toastActionHandler = null;
  }, duration);
}

export function runToastAction() {
  const handler = toastActionHandler;
  if (!handler) return;
  clearTimeout(toastTimer);
  ui.toastVisible = false;
  ui.toastActionLabel = '';
  toastActionHandler = null;
  handler();
}

export function openSettingPanel() {
  ui.settingPanelOpen = true;
}

export function closeSettingPanel() {
  ui.settingPanelOpen = false;
}

import { reactive } from 'vue';

export const ui = reactive({
  settingPanelOpen: false,
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

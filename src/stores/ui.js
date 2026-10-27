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
let toastPriority = 0;

/** 带操作按钮的提示默认优先级：普通提示不能覆盖它，保证「撤销」等操作有时间被点击 */
export const ACTION_TOAST_PRIORITY = 1;

function hideToast() {
  ui.toastVisible = false;
  ui.toastActionLabel = '';
  toastActionHandler = null;
  toastPriority = 0;
}

/**
 * @param {number} [options.priority] 提示优先级，数值小的提示会被当前可见的更高优先级提示挡住；
 *   默认普通提示为 0，带操作按钮的提示为 ACTION_TOAST_PRIORITY
 */
export function showToast(text, duration = 1500, action = null, { priority } = {}) {
  const nextPriority = priority ?? (action ? ACTION_TOAST_PRIORITY : 0);
  if (ui.toastVisible && nextPriority < toastPriority) return;
  ui.toastText = text;
  ui.toastVisible = true;
  ui.toastActionLabel = action?.label || '';
  toastActionHandler = action?.onClick || null;
  toastPriority = nextPriority;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, duration);
}

export function runToastAction() {
  const handler = toastActionHandler;
  if (!handler) return;
  clearTimeout(toastTimer);
  hideToast();
  handler();
}

export function openSettingPanel() {
  ui.settingPanelOpen = true;
}

export function closeSettingPanel() {
  ui.settingPanelOpen = false;
}

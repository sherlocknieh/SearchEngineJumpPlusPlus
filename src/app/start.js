import { initStorage } from '../core/storage.js';
import { STORAGE_KEY } from '../stores/settings.js';
import { printBanner } from './banner.js';
import { DELAY_START_MS, shouldDelayStart } from './delay.js';
import { boot } from './lifecycle.js';

/**
 * 脚本启动流程。
 *
 * 只允许运行在顶层页面；随后初始化存储、打印版本信息，
 * 最后根据站点是否需要延迟，选择立即或延后启动。
 */
export async function startScript() {
  // iframe 内不运行，避免同一页面出现多个跳转条
  if (window.self !== window.top) return;

  printBanner();

  // 先探测存储后端并预加载配置。
  // 某些管理器的 GM.getValue 是异步的，必须先等这里完成再读取设置。
  await initStorage([STORAGE_KEY]);

  if (shouldDelayStart()) {
    // 延迟站点：等页面把输入框渲染出来后再启动
    setTimeout(() => boot(), DELAY_START_MS);
  } else {
    boot();
  }
}

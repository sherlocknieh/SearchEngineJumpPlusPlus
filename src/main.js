/**
 * 脚本入口。
 *
 * 只做装配：把各模块串起来，具体实现放在 src/app/ 下。
 * - lifecycle.js    启动 / 卸载 / 重启、Shadow DOM 挂载
 * - start.js        完整启动流程（存储探测 + 延迟策略）
 * - menu.js         脚本管理器菜单命令
 * - urlChange.js    SPA 路由变化
 * - settingsSync.js 跨标签页设置同步
 * - banner.js       控制台版本信息
 * - delay.js        需要延迟启动的站点
 */
import { onRestartRequest } from './core/appControl.js';

import { restart } from './app/lifecycle.js';
import { startScript } from './app/start.js';
import { listenUrlChange } from './app/urlChange.js';
import { setupSettingsSync } from './app/settingsSync.js';

// 设置面板等模块通过 appControl 请求重启，避免直接依赖入口文件
onRestartRequest(restart);
// 立即启动脚本
startScript();
// 监听 SPA 路由变化，重新启动脚本
listenUrlChange(startScript);
// 监听跨标签页设置变化
setupSettingsSync();

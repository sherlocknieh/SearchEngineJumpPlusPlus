import { GM_registerMenuCommand } from '$';
import { INSTANCE_ROLE } from '../core/shadowDom.js';
import { openSettingPanel } from '../stores/ui.js';
import { t } from '../assets/i18n.js';

// 菜单命令只需注册一次，重启时不能重复注册
let registered = false;

/**
 * 注册脚本管理器菜单命令。
 *
 * 同时兼容两种 API：
 * - 传统 GM_registerMenuCommand
 * - Greasemonkey 4 的 GM.registerMenuCommand
 *
 * @param {() => void} [beforeOpen] 打开设置面板前的准备工作。
 *   划词条延迟挂载时用它先启动脚本，否则面板没有宿主可以渲染。
 *
 * 不支持菜单命令时只提示一次，用户仍可使用跳转条右侧的设置按钮。
 */
export function registerMenu(beforeOpen) {
  if (registered) return;

  const gm = globalThis.GM;
  const gmMenu =
    typeof gm?.registerMenuCommand === 'function' ? gm.registerMenuCommand.bind(gm) : null;
  const register = typeof GM_registerMenuCommand === 'function' ? GM_registerMenuCommand : gmMenu;

  if (!register) {
    // 标记为已处理，避免每次重启都重复输出提示
    registered = true;
    console.info('[SEJ] 当前脚本管理器不支持菜单命令，可使用跳转条右侧的设置按钮');
    return;
  }

  try {
    register(t(INSTANCE_ROLE === 'dev' ? 'menu.settingsDev' : 'menu.settings'), () => {
      beforeOpen?.();
      openSettingPanel();
    });
    registered = true;
  } catch (e) {
    console.warn('[SEJ] 注册菜单命令失败', e);
  }
}

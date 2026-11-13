/**
 * 右键图片搜图的入口。
 *
 * 用户脚本无法往浏览器原生右键菜单里加项，所以这里在捕获阶段接管
 * contextmenu：命中图片且当前设置允许时阻止原生菜单，改为弹出脚本自己的浮层。
 * 监听器挂在 document 上并只注册一次，脚本懒启动时也能先启动再弹面板。
 */
import { useSettings } from '../stores/settings.js';
import { openImageSearch } from '../stores/imageSearch.js';
import {
  getImageEngines,
  isTouchOnlyDevice,
  resolveImageUrl,
  shouldHandleImageContextMenu,
} from '../core/imageSearch.js';

let armed = false;

/**
 * @param {() => void} ensureBoot 脚本尚未挂载时先启动，保证浮层有宿主可渲染
 */
export function armImageContextMenu(ensureBoot) {
  if (armed) return;
  armed = true;

  document.addEventListener(
    'contextmenu',
    (e) => {
      const settings = useSettings();
      const imageUrl = resolveImageUrl(e.target);
      const handled = shouldHandleImageContextMenu({
        mode: settings.settingData.imageSearch,
        altKey: e.altKey,
        imageUrl,
        touchOnly: isTouchOnlyDevice(),
      });
      // 没有可用引擎时保持原生菜单，避免右键后什么也做不了
      if (!handled || !getImageEngines(settings.settingData).length) return;

      e.preventDefault();
      e.stopPropagation();
      // 先启动脚本再打开浮层：启动会重建 Shadow DOM 并清空旧的浮层状态
      ensureBoot?.();
      openImageSearch({ x: e.clientX, y: e.clientY, imageUrl });
    },
    true,
  );
}

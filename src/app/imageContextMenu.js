/**
 * 图片搜图的入口。
 *
 * 用户脚本无法往浏览器原生菜单里加项，iOS 长按图片又不会派发可靠的 contextmenu，
 * 所以这里自己识别长按手势：按住图片超过 LONG_PRESS_MS 且没有明显位移时，
 * 把图片地址交给跳转条，由它以图片模式弹出。
 *
 * 桌面右键同样会弹出跳转条，但不拦截原生菜单：两者并存，用户各取所需。
 *
 * 监听器挂在 document 上并只注册一次，脚本懒启动时也能先启动再弹跳转条。
 */
import { useSettings } from '../stores/settings.js';
import { openImageSearch } from '../stores/imageSearch.js';
import { HOST_ID } from '../core/shadowDom.js';
import {
  LONG_PRESS_MS,
  getImageEngines,
  isLongPressMove,
  resolveImageUrl,
} from '../core/imageSearch.js';

let armed = false;

/**
 * @param {() => void} ensureBoot 脚本尚未挂载时先启动，保证跳转条有宿主可渲染
 */
export function armImageContextMenu(ensureBoot) {
  if (armed) return;
  armed = true;

  let timer = 0;
  let startX = 0;
  let startY = 0;
  let pressed = null;
  // 长按已触发时，随后的 click / contextmenu 要一并吞掉，避免页面误响应
  let suppressUntil = 0;

  function cancel() {
    clearTimeout(timer);
    timer = 0;
    pressed = null;
  }

  function onPointerDown(e) {
    // 只处理主键/单指；右键走 onContextMenu，与原生菜单并存
    if (e.button !== 0 || !e.isPrimary) return;
    if (!imageSearchEnabled()) return;

    const imageUrl = resolveImageUrl(e.target);
    if (!imageUrl) return;

    startX = e.clientX;
    startY = e.clientY;
    pressed = imageUrl;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = 0;
      if (!pressed) return;
      suppressUntil = performance.now() + 800;
      showImageSearch(pressed);
      pressed = null;
      // 触屏设备给一次轻震动，确认长按已生效
      navigator.vibrate?.(10);
    }, LONG_PRESS_MS);
  }

  function onPointerMove(e) {
    if (!pressed) return;
    if (isLongPressMove(startX, startY, e.clientX, e.clientY)) cancel();
  }

  /** 把图片地址交给跳转条；先写状态再启动，挂载时才能进入图片模式 */
  function showImageSearch(imageUrl) {
    if (!imageUrl) return;
    openImageSearch(imageUrl);
    ensureBoot?.();
  }

  function imageSearchEnabled() {
    const settings = useSettings();
    if (!settings.settingData?.imageSearch) return false;
    return getImageEngines(settings.settingData).length > 0;
  }

  function onSuppress(e) {
    if (performance.now() > suppressUntil) return;
    e.preventDefault();
    e.stopPropagation();
  }

  function onContextMenu(e) {
    // 长按已弹出跳转条时，浏览器补发的 contextmenu 一并吞掉，避免重复触发
    if (performance.now() <= suppressUntil) {
      onSuppress(e);
      return;
    }
    // 右键不拦截原生菜单：跳转条与系统菜单同时出现
    if (!imageSearchEnabled()) return;
    // 跳转条自身的右键交给浏览器，避免在浮层里再弹一次
    const path = e.composedPath?.() || [];
    if (path.some((node) => node?.id === HOST_ID)) return;
    showImageSearch(resolveImageUrl(e.target));
  }

  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('pointermove', onPointerMove, true);
  document.addEventListener('pointerup', cancel, true);
  document.addEventListener('pointercancel', cancel, true);
  // 长按后浏览器仍可能补发 click，统一在捕获阶段截断
  document.addEventListener('click', onSuppress, true);
  document.addEventListener('contextmenu', onContextMenu, true);
}

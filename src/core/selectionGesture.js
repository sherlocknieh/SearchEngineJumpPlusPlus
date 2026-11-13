/**
 * 划词手势状态。
 *
 * 拖动选区时 selectionchange 会连续触发，此时弹出划词条会打断选择；
 * 这里记录左键是否按住，让调用方等到松手后再按最终选区决定是否显示。
 */

let pressed = false;
// 同一目标只注册一次，组件重建不会叠加监听器
const trackedTargets = new WeakSet();

function onPointerDown(event) {
  // 只有主键按下才是划词，右键与中键不参与
  if (event.button === 0) pressed = true;
}

function onPointerEnd() {
  pressed = false;
}

/** 页面上的左键是否仍按着，用于暂缓响应拖动过程中的选区变化 */
export function isPointerPressed() {
  return pressed;
}

/** 开始跟踪页面上的左键拖动；同一目标重复调用不会叠加监听 */
export function trackSelectionPointer(target = window) {
  if (!target || trackedTargets.has(target)) return;
  trackedTargets.add(target);
  // 捕获阶段注册，站点在冒泡阶段拦截事件也不影响判断
  target.addEventListener('pointerdown', onPointerDown, true);
  target.addEventListener('pointerup', onPointerEnd, true);
  target.addEventListener('pointercancel', onPointerEnd, true);
  // 指针在窗口外松开时收不到 pointerup，失焦后同样视为结束
  target.addEventListener('blur', onPointerEnd);
}

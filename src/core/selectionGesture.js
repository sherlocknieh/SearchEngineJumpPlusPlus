/**
 * 划词手势状态。
 *
 * 拖动选区时 selectionchange 会连续触发，此时弹出划词条会打断选择；
 * 这里记录左键是否按住，让调用方等到松手后再按最终选区决定是否显示。
 *
 * 同时为每次输入操作分配序号：同一次点击产生的残余选区变化
 * 不应让刚收起的划词条重新出现，而拖动选区属于新的划词。
 */

let pressed = false;
let dragged = false;
let gestureId = 0;
let pointerStart = null;
// 同一目标只注册一次，组件重建不会叠加监听器
const trackedTargets = new WeakSet();
// 超过该位移即视为拖动而非点击
const DRAG_THRESHOLD = 4;

function onPointerDown(event) {
  // 只有主键按下才是划词，右键与中键不参与
  if (event.button !== 0) return;
  pressed = true;
  dragged = false;
  pointerStart = { x: event.clientX, y: event.clientY };
  gestureId += 1;
}

function onPointerMove(event) {
  if (!pressed || dragged || !pointerStart) return;
  const dx = Math.abs((event.clientX ?? 0) - pointerStart.x);
  const dy = Math.abs((event.clientY ?? 0) - pointerStart.y);
  if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) dragged = true;
}

function onPointerEnd() {
  pressed = false;
  pointerStart = null;
}

// 键盘同样可能改变选区，按下即视为新的操作
function onKeyDown() {
  gestureId += 1;
  dragged = false;
}

/** 页面上的左键是否仍按着，用于暂缓响应拖动过程中的选区变化 */
export function isPointerPressed() {
  return pressed;
}

/**
 * 本次操作是否为拖动选区（而非单纯点击）。
 * 松手后仍保留，供同一操作的 mouseup 判断是划词还是点击空白。
 */
export function isSelectionDrag() {
  return dragged;
}

/** 当前输入操作的序号，用于识别同一次点击/按键 */
export function currentGestureId() {
  return gestureId;
}

/** 开始跟踪页面上的左键拖动；同一目标重复调用不会叠加监听 */
export function trackSelectionPointer(target = window) {
  if (!target || trackedTargets.has(target)) return;
  trackedTargets.add(target);
  // 捕获阶段注册，站点在冒泡阶段拦截事件也不影响判断
  target.addEventListener('pointerdown', onPointerDown, true);
  target.addEventListener('pointermove', onPointerMove, true);
  target.addEventListener('pointerup', onPointerEnd, true);
  target.addEventListener('pointercancel', onPointerEnd, true);
  target.addEventListener('keydown', onKeyDown, true);
  // 指针在窗口外松开时收不到 pointerup，失焦后同样视为结束
  target.addEventListener('blur', onPointerEnd);
}

/**
 * 分类菜单共享的 document 指针事件桥接。
 *
 * 每个分类各自监听会让页面上每次 mousemove 触发 N 份命中测试；
 * 这里统一注册一次，并用 rAF 合并同一帧内的多次移动。
 */

const moveHandlers = new Set();
const downHandlers = new Set();
let pendingMove = null;
let moveFrame = 0;

function flushMove() {
  moveFrame = 0;
  const pending = pendingMove;
  pendingMove = null;
  if (!pending) return;
  for (const handler of moveHandlers) handler(pending.event, pending.path);
}

function onDocumentMove(event) {
  // composedPath 只在事件派发期间有效，必须同步取快照，
  // 否则 rAF 回调里拿到的是空路径，无法判断指针是否落在 Shadow DOM 内。
  const path = typeof event.composedPath === 'function' ? event.composedPath() : null;
  pendingMove = { event, path };
  if (moveFrame) return;
  moveFrame = requestAnimationFrame(flushMove);
}

function onDocumentDown(event) {
  for (const handler of downHandlers) handler(event);
}

/**
 * 订阅共享指针事件。
 *
 * @param {object} [options]
 * @param {(event: MouseEvent, path: EventTarget[] | null) => void} [options.onMove]
 * @param {(event: PointerEvent) => void} [options.onPointerDown]
 * @returns {() => void} 取消订阅
 */
export function subscribePointer({ onMove, onPointerDown } = {}) {
  if (onMove) {
    moveHandlers.add(onMove);
    if (moveHandlers.size === 1) {
      document.addEventListener('mousemove', onDocumentMove, { passive: true });
    }
  }

  if (onPointerDown) {
    downHandlers.add(onPointerDown);
    if (downHandlers.size === 1) {
      document.addEventListener('pointerdown', onDocumentDown);
    }
  }

  let subscribed = true;
  return () => {
    if (!subscribed) return;
    subscribed = false;

    if (onMove) {
      moveHandlers.delete(onMove);
      if (!moveHandlers.size) {
        document.removeEventListener('mousemove', onDocumentMove);
        pendingMove = null;
        if (moveFrame) cancelAnimationFrame(moveFrame);
        moveFrame = 0;
      }
    }

    if (onPointerDown) {
      downHandlers.delete(onPointerDown);
      if (!downHandlers.size) {
        document.removeEventListener('pointerdown', onDocumentDown);
      }
    }
  };
}

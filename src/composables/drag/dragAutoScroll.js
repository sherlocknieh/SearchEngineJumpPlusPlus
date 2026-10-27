/**
 * 拖到设置列表上下边缘时自动滚动。
 */

const DRAG_EDGE = 40;
const MAX_STEP = 14;

/**
 * @param {object} options
 * @param {() => HTMLElement | null} options.getBody 滚动容器
 * @param {() => { x: number, y: number } | null} options.getPoint 当前指针位置
 * @param {() => boolean} options.isDragging 是否仍在拖动
 * @param {(x: number, y: number) => void} options.onScroll 滚动后重新计算落点
 */
export function createDragAutoScroll({ getBody, getPoint, isDragging, onScroll }) {
  let frame = 0;

  function tick() {
    frame = 0;
    if (!isDragging()) return;
    const body = getBody();
    const point = getPoint();
    if (body && point) {
      const rect = body.getBoundingClientRect();
      const { x, y } = point;
      let dy = 0;
      if (x >= rect.left && x <= rect.right) {
        if (y < rect.top + DRAG_EDGE && y >= rect.top - DRAG_EDGE) {
          dy = -Math.ceil(((rect.top + DRAG_EDGE - y) / DRAG_EDGE) * MAX_STEP);
        } else if (y > rect.bottom - DRAG_EDGE && y <= rect.bottom + DRAG_EDGE) {
          dy = Math.ceil(((y - rect.bottom + DRAG_EDGE) / DRAG_EDGE) * MAX_STEP);
        }
      }
      if (dy) {
        body.scrollTop += dy;
        onScroll(x, y);
      }
    }
    if (isDragging()) frame = requestAnimationFrame(tick);
  }

  function start() {
    if (frame) return;
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }

  return { start, stop };
}

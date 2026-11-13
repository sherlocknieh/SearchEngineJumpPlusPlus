/**
 * 全屏遮罩检测。
 *
 * 部分站点用广告脚本在 body 上叠一个透明、固定定位、z-index 极大的 iframe，
 * 鼠标事件全被它接走，页面永远拿不到选区，划词搜索因此完全没有反应。
 * 这里只负责识别与移除，是否处理由调用方决定。
 */

// 覆盖视口达到该比例才算遮罩，右下角的小广告位不参与判断
const MIN_COVERAGE = 0.9;

// 只有压在最上层的元素才会抢走鼠标事件，普通浮动层不参与判断
export const OVERLAY_MIN_Z_INDEX = 100000;

/** 元素是否是盖住整个视口的固定 iframe */
function isViewportOverlay(el, view) {
  if (el.tagName !== 'IFRAME') return false;
  const style = view.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  if (style.pointerEvents === 'none') return false;
  if (style.position !== 'fixed' || !(Number(style.zIndex) >= OVERLAY_MIN_Z_INDEX)) return false;
  const rect = el.getBoundingClientRect();
  return rect.width >= view.innerWidth * MIN_COVERAGE && rect.height >= view.innerHeight * MIN_COVERAGE;
}

function viewportOverlays(doc, view) {
  return Array.from(doc.querySelectorAll('iframe')).filter((el) => isViewportOverlay(el, view));
}

/**
 * 找出真正挡住页面选区的遮罩；没有时返回 null。
 * @param {Document} [doc]
 */
export function findSelectionBlocker(doc = document) {
  const view = doc.defaultView;
  if (!view) return null;
  const overlays = viewportOverlays(doc, view);
  if (!overlays.length) return null;
  // 命中测试可用时只认压在内容正上方的那个，避免误判被压在下面的同尺寸广告位
  if (typeof doc.elementFromPoint === 'function') {
    const hit = doc.elementFromPoint(view.innerWidth / 2, view.innerHeight / 2);
    return overlays.includes(hit) ? hit : null;
  }
  return overlays[0];
}

/**
 * 移除盖住视口的遮罩层。
 * @param {Document} [doc]
 * @returns {number} 移除的数量
 */
export function removeSelectionBlockers(doc = document) {
  const view = doc.defaultView;
  if (!view) return 0;
  const overlays = viewportOverlays(doc, view);
  overlays.forEach((el) => el.remove());
  return overlays.length;
}

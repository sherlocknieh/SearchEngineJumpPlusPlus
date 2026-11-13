/**
 * 划词条跟随选区的定位计算。
 *
 * 跳转条与选区/图片的右上角对齐，并收进视口：
 * 上方放不下时改到下方，右侧放不下时向左对齐，始终留出最小边距。
 * 图片条优先放进图片内部顶部，图片尺寸不足时再退回外部定位。
 */

/** 跳转条与锚点矩形之间的间距 */
export const PLACEMENT_GAP = 6;

/**
 * @param {object} options
 * @param {{top:number, left:number, right:number, bottom:number}} options.rect 选区或图片的视口矩形
 * @param {{width:number, height:number}} options.bar 跳转条实测尺寸
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {number} [options.gap] 与锚点、视口边界的间距
 * @returns {{top:number, left:number}} 跳转条的视口坐标
 */
export function placeNearRect({ rect, bar, viewport, gap = PLACEMENT_GAP }) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  const barWidth = Math.max(0, bar?.width ?? 0);
  const barHeight = Math.max(0, bar?.height ?? 0);

  // 左边缘贴住锚点右上角，超出右边界时整体左移
  const maxLeft = Math.max(gap, viewWidth - gap - barWidth);
  const left = Math.min(Math.max(rect.right, gap), maxLeft);

  // 默认浮在锚点上方；上方空间不足时落到锚点下方
  let top = rect.top - gap - barHeight;
  if (top < gap) top = rect.bottom + gap;
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  top = Math.min(Math.max(top, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

/**
 * 把跳转条放进锚点矩形内部顶部，右边缘贴住锚点右边缘并留出间距。
 * 图片放不下时返回 null，调用方退回 placeNearRect 的外部定位。
 *
 * @param {object} options
 * @param {{top:number, left:number, right:number, bottom:number}} options.rect 选区或图片的视口矩形
 * @param {{width:number, height:number}} options.bar 跳转条实测尺寸
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {number} [options.gap] 与锚点、视口边界的间距
 * @returns {{top:number, left:number} | null} 跳转条的视口坐标
 */
export function placeInsideRect({ rect, bar, viewport, gap = PLACEMENT_GAP }) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  const barWidth = Math.max(0, bar?.width ?? 0);
  const barHeight = Math.max(0, bar?.height ?? 0);

  // 图片宽度或高度容不下跳转条时无法放进内部
  const rectWidth = Math.max(0, rect.right - rect.left);
  const rectHeight = Math.max(0, rect.bottom - rect.top);
  if (rectWidth < barWidth + gap * 2 || rectHeight < barHeight + gap * 2) return null;

  // 右边缘与图片右边缘对齐，图片贴住视口右侧时整体收进视口
  const maxLeft = Math.max(gap, viewWidth - gap - barWidth);
  const left = Math.min(Math.max(rect.right - gap - barWidth, gap), maxLeft);

  // 顶部与图片顶部留出间距，图片顶部超出视口时收进视口
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(rect.top + gap, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}
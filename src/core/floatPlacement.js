/**
 * 贴内容的浮层条定位计算。
 *
 * 文字/链接触发的跳转条放在锚点正上方居中；图片条优先放进图片内部顶部居中，
 * 图片尺寸不足时放到图片上方居中。放不下时都会收进视口，始终留出最小边距。
 */

/** 跳转条与锚点矩形之间的间距 */
export const PLACEMENT_GAP = 6;

/** 锚点矩形在水平方向居中并收进视口后的左坐标 */
function centeredLeft(rect, barWidth, viewWidth, gap) {
  const rectWidth = Math.max(0, rect.right - rect.left);
  const center = rect.left + (rectWidth - barWidth) / 2;
  const maxLeft = Math.max(gap, viewWidth - gap - barWidth);
  return Math.min(Math.max(center, gap), maxLeft);
}

/**
 * 把跳转条放进锚点矩形内部顶部居中。
 * 图片放不下时返回 null，调用方退回 placeCenteredRect 的外部定位。
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

  const left = centeredLeft(rect, barWidth, viewWidth, gap);

  // 顶部与图片顶部留出间距，图片顶部超出视口时收进视口
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(rect.top + gap, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

/**
 * 把跳转条放到锚点矩形正上方居中；上方空间不足时翻到锚点下方。
 *
 * @param {object} options
 * @param {{top:number, left:number, right:number, bottom:number}} options.rect 选区、链接或图片的视口矩形
 * @param {{width:number, height:number}} options.bar 跳转条实测尺寸
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {number} [options.gap] 与锚点、视口边界的间距
 * @returns {{top:number, left:number}} 跳转条的视口坐标
 */
export function placeCenteredRect({ rect, bar, viewport, gap = PLACEMENT_GAP }) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  const barWidth = Math.max(0, bar?.width ?? 0);
  const barHeight = Math.max(0, bar?.height ?? 0);

  const left = centeredLeft(rect, barWidth, viewWidth, gap);

  // 上方放得下就放上方，否则翻到锚点下方；两种情况都收进视口
  const above = rect.top - gap - barHeight;
  const candidate = above >= gap ? above : rect.bottom + gap;
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(candidate, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

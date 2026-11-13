/**
 * 贴内容的浮层条定位计算。
 *
 * 文字/链接触发的跳转条放在锚点正上方、左侧贴住锚点开头；极简模式收起时图标贴在
 * 文字/链接同一行的开头；图片条优先放进图片内部顶部居中，
 * 图片尺寸不足时放到图片上方居中。放不下时都会收进视口，始终留出最小边距。
 */

/** 跳转条与锚点矩形之间的间距 */
export const PLACEMENT_GAP = 6;

/**
 * 锚点矩形在水平方向对齐后收进视口的左坐标。
 * @param {'center'|'left'} align center 居中；left 左边缘贴住锚点左边缘
 */
function alignedLeft(rect, barWidth, viewWidth, gap, align) {
  const rectLeft = Math.max(0, rect.left ?? 0);
  const rectRight = Math.max(rectLeft, rect.right ?? 0);
  const preferred = align === 'left' ? rectLeft : rectLeft + (rectRight - rectLeft - barWidth) / 2;
  const maxLeft = Math.max(gap, viewWidth - gap - barWidth);
  return Math.min(Math.max(preferred, gap), maxLeft);
}

/**
 * 把跳转条放进锚点矩形内部顶部居中。
 * 图片放不下时返回 null，调用方退回 placeAboveRect 的外部定位。
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

  const left = alignedLeft(rect, barWidth, viewWidth, gap, 'center');

  // 顶部与图片顶部留出间距，图片顶部超出视口时收进视口
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(rect.top + gap, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

/**
 * 把跳转条放到锚点矩形正上方；上方空间不足时翻到锚点下方。
 *
 * @param {object} options
 * @param {{top:number, left:number, right:number, bottom:number}} options.rect 选区、链接或图片的视口矩形
 * @param {{width:number, height:number}} options.bar 跳转条实测尺寸
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {number} [options.gap] 与锚点、视口边界的间距
 * @param {'center'|'left'} [options.align] 水平对齐方式，默认居中
 * @returns {{top:number, left:number}} 跳转条的视口坐标
 */
export function placeAboveRect({ rect, bar, viewport, gap = PLACEMENT_GAP, align = 'center' }) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  const barWidth = Math.max(0, bar?.width ?? 0);
  const barHeight = Math.max(0, bar?.height ?? 0);

  const left = alignedLeft(rect, barWidth, viewWidth, gap, align);

  // 上方放得下就放上方，否则翻到锚点下方；两种情况都收进视口
  const above = rect.top - gap - barHeight;
  const candidate = above >= gap ? above : rect.bottom + gap;
  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(candidate, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

/**
 * 极简模式收起态图标：与锚点同一行，贴在锚点左侧的开头位置。
 * 左侧放不下时压住锚点开头；多行锚点按第一行对齐。
 *
 * @param {object} options
 * @param {{top:number, left:number, right:number, bottom:number}} options.rect 选区或链接的视口矩形
 * @param {number} options.iconSize 收起态图标边长
 * @param {number} options.barHeight 展开后整条的高度，用于把图标圆心对齐到这一行
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {number} [options.gap] 与锚点、视口边界的间距
 * @returns {{top:number, left:number}} 跳转条的视口坐标
 */
export function placeInlineIcon({ rect, iconSize, barHeight, viewport, gap = PLACEMENT_GAP }) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  // 多行锚点只取第一行的高度，图标始终贴在这一行的开头
  const lineHeight = Math.min(Math.max(0, rect.bottom - rect.top), iconSize);
  const centerY = rect.top + lineHeight / 2;

  // 优先贴在锚点左侧，左侧放不下就压住锚点开头
  const beforeLeft = rect.left - gap - iconSize;
  const maxLeft = Math.max(gap, viewWidth - gap - iconSize);
  const left = Math.min(Math.max(beforeLeft >= gap ? beforeLeft : rect.left, gap), maxLeft);

  const maxTop = Math.max(gap, viewHeight - gap - barHeight);
  const top = Math.min(Math.max(centerY - barHeight / 2, gap), maxTop);

  return { top: Math.round(top), left: Math.round(left) };
}

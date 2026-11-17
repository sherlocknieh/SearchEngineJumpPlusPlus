/**
 * 分类下拉面板的视口适配。
 *
 * 屏幕高度不足以完整显示列表时，不再让面板溢出视口被裁切：
 * 高度压到上下两侧空间更宽裕那一侧的可用高度，多出来的条目由列表内部滚动。
 * CSS 锚点定位与 JS 坐标定位共用这里的间距、方向判断，避免两种模式表现不一致。
 */

/** 面板与触发项之间的间距 */
export const DROP_LIST_GAP = 2;
/** 面板与视口上下边缘的最小留白 */
export const DROP_LIST_VIEWPORT_PADDING = 8;

/**
 * 触发项上下两侧可用的垂直空间。
 *
 * @param {object} options
 * @param {number} options.triggerTop 触发项视口上边
 * @param {number} options.triggerBottom 触发项视口下边
 * @param {number} options.viewportHeight 视口高度
 * @param {number} [options.gap] 与触发项的间距
 * @param {number} [options.padding] 与视口边缘的留白
 * @returns {{spaceAbove:number, spaceBelow:number, maxHeight:number}}
 *   maxHeight 是两侧中更宽裕的一侧，面板超过它就滚动
 */
export function dropListSpace({
  triggerTop,
  triggerBottom,
  viewportHeight,
  gap = DROP_LIST_GAP,
  padding = DROP_LIST_VIEWPORT_PADDING,
}) {
  const height = Math.max(0, viewportHeight ?? 0);
  const spaceAbove = Math.max(0, triggerTop - gap - padding);
  const spaceBelow = Math.max(0, height - padding - (triggerBottom + gap));
  return { spaceAbove, spaceBelow, maxHeight: Math.max(spaceAbove, spaceBelow) };
}

/**
 * 面板在触发项下方的默认落点，下方装不下且上方更宽裕时翻到上方。
 *
 * @param {object} options
 * @param {{top:number, bottom:number, left:number, width:number}} options.triggerRect 触发项视口矩形
 * @param {{width:number, height:number}} options.list 面板实测尺寸（已按 maxHeight 压缩）
 * @param {{width:number, height:number}} options.viewport 视口尺寸
 * @param {{left:number, top:number}} [options.origin] 当前定位坐标系原点
 * @param {number} [options.gap] 与触发项的间距
 * @param {number} [options.padding] 与视口边缘的留白
 * @returns {{top:number, left:number}} 相对定位坐标系的落点
 */
export function placeDropList({
  triggerRect,
  list,
  viewport,
  origin = { left: 0, top: 0 },
  gap = DROP_LIST_GAP,
  padding = DROP_LIST_VIEWPORT_PADDING,
}) {
  const viewWidth = Math.max(0, viewport?.width ?? 0);
  const viewHeight = Math.max(0, viewport?.height ?? 0);
  const listWidth = Math.max(0, list?.width ?? 0);
  const listHeight = Math.max(0, list?.height ?? 0);
  const originLeft = origin?.left ?? 0;
  const originTop = origin?.top ?? 0;
  const { spaceAbove, spaceBelow } = dropListSpace({
    triggerTop: triggerRect.top,
    triggerBottom: triggerRect.bottom,
    viewportHeight: viewHeight,
    gap,
    padding,
  });

  // 与触发项水平居中，两侧留白换算到当前定位坐标系
  const preferredLeft = triggerRect.left - originLeft - (listWidth - triggerRect.width) / 2;
  const left = Math.max(
    padding - originLeft,
    Math.min(preferredLeft, viewWidth - listWidth - padding - originLeft),
  );

  // 下方够放就留在下方；两边都放不下时留在空间更大的一侧，靠列表滚动补齐
  const below = triggerRect.bottom - originTop + gap;
  const above = triggerRect.top - originTop - listHeight - gap;
  const top = listHeight > spaceBelow && spaceAbove > spaceBelow ? above : below;

  return { top, left };
}

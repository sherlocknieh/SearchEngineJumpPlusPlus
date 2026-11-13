/**
 * 长按/右键页面内容（图片、链接）时复用的上下文操作条。
 *
 * 每个模式只提供两件事：命中的元素如何解析成关键词、浮层显示哪个分类。
 * 长按手势、浮层呈现与关闭时机由调用方共用，模式之间只差这两项配置。
 */
import { BUILTIN_CATEGORY_KEY, IMAGE_CATEGORY_KEY } from './configData.js';
import { resolveImageHit } from './imageSearch.js';
import { resolveLinkHit } from './linkAction.js';

/** 长按判定：按住时长与允许的手指/鼠标位移 */
export const LONG_PRESS_MS = 450;
export const LONG_PRESS_MOVE_TOLERANCE = 10;

/** 模式到命中解析与专属分类的映射 */
export const CONTEXT_MODES = {
  image: { categoryKey: IMAGE_CATEGORY_KEY, resolveHit: resolveImageHit },
  link: { categoryKey: BUILTIN_CATEGORY_KEY, resolveHit: resolveLinkHit },
};

/** 位移是否已超出长按允许的范围（滚动、拖拽时取消） */
export function isLongPressMove(startX, startY, x, y) {
  return Math.hypot(x - startX, y - startY) > LONG_PRESS_MOVE_TOLERANCE;
}

/** 模式的分类键名；未知模式返回空串，调用方按普通跳转条处理 */
export function contextCategoryKey(mode) {
  return CONTEXT_MODES[mode]?.categoryKey || '';
}

/** 模式对应的引擎：至少要有链接或快捷动作；全部隐藏时该模式不接管 */
export function getContextEngines(settingData, mode) {
  const list = settingData?.engineList?.[contextCategoryKey(mode)];
  if (!Array.isArray(list)) return [];
  return list.filter((engine) => !engine.disable && (engine.url || engine.action));
}

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

/** 动作引擎在各情景下的悬停提示文案；text 为划词条，input 为站点内嵌条的搜索框 */
const CONTEXT_ACTION_HINTS = {
  link: { copy: 'action.hintCopyLink', open: 'action.hintOpenLink' },
  image: { copy: 'action.hintCopyImage', open: 'action.hintOpenImage' },
  text: { copy: 'action.hintCopyText', open: 'action.hintOpenLink' },
  input: { copy: 'action.hintCopyKeyword', open: 'action.hintOpenLink' },
};

/** 提示里展示目标内容的长度上限，避免长标题把悬停提示撑得过宽 */
export const HINT_TARGET_MAX = 80;

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

/**
 * 命中内容交给动作引擎的目标：链接复制为 Markdown 链接，图片复制图片本身；打开统一用地址。
 * @param {'image' | 'link'} mode 命中类型
 * @param {'copy' | 'open'} action 动作类型
 * @param {{keyword?: string, url?: string}} hit 命中的关键词与地址
 * @returns {string | { text: string, url: string, image?: string }}
 */
export function contextActionTarget(mode, action, hit = {}) {
  const url = hit.url || '';
  const keyword = hit.keyword || url;
  if (action !== 'copy') return url || keyword;
  if (mode === 'image') return { text: url || keyword, url, image: url || keyword };
  // 纯图片链接没有文字，关键词就是地址，此时只复制地址
  return keyword && keyword !== url ? `[${keyword}](${url})` : url || keyword;
}

/**
 * 动作引擎的悬停提示键：同名的「复制」「打开」在链接与图片情景下含义不同。
 * @param {'image' | 'link'} mode 命中类型
 * @param {'copy' | 'open'} action 动作类型
 */
export function contextActionHintKey(mode, action) {
  return CONTEXT_ACTION_HINTS[mode]?.[action] || '';
}

/** 提示里展示的目标内容：划词与搜索框都是「文字 + 可选地址」，其余沿用动作目标 */
function hintTargetText(mode, action, hit) {
  if (mode === 'text' || mode === 'input') return (action === 'copy' ? hit.keyword : hit.url) || '';
  const target = contextActionTarget(mode, action, hit);
  return typeof target === 'string' ? target : target?.text || '';
}

/** 折叠空白并截断，保证单行提示不被长标题撑开 */
function shortenHintTarget(value) {
  const text = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > HINT_TARGET_MAX ? `${text.slice(0, HINT_TARGET_MAX - 1)}…` : text;
}

/**
 * 动作引擎完整的悬停提示：说明这次到底复制或打开什么内容。
 * @param {'image' | 'link' | 'text' | 'input'} mode 命中情景：text 为划词条，input 为内嵌条搜索框
 * @param {'copy' | 'open'} action 动作类型
 * @param {{keyword?: string, url?: string}} hit 命中的关键词与地址
 * @param {(key: string, params?: object) => string} t 文案函数
 */
export function actionEngineHint(mode, action, hit = {}, t) {
  const key = contextActionHintKey(mode, action);
  if (!key) return '';
  const label = t(key);
  const target = shortenHintTarget(hintTargetText(mode, action, hit));
  return target ? t('action.hintWithTarget', { action: label, target }) : label;
}

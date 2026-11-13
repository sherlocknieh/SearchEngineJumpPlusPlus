/**
 * 长按图片搜图：从按下的位置取出图片链接，并判断当前设置下是否接管这次长按。
 *
 * 图片链接直接作为关键词交给引擎模板（%s 会被 encodeURIComponent 编码），
 * 因此这里只负责拿到可被识图引擎接受的 http(s) 地址。
 */
import { IMAGE_CATEGORY_KEY } from './configData.js';

// 懒加载站点常把真实地址放在 data-* 上，src 只是占位图
const LAZY_SRC_ATTRS = ['data-src', 'data-original', 'data-lazy-src', 'data-actualsrc'];

// 背景图向上查找的层数上限：再往外通常是整页背景，不是用户想搜的图
const MAX_BG_DEPTH = 4;
// 背景图容器的最小边长，过滤图标、装饰线这类小元素
const MIN_BG_SIZE = 32;

const BG_URL_RE = /url\((['"]?)(.*?)\1\)/g;

/** 长按判定：按住时长与允许的手指/鼠标位移 */
export const LONG_PRESS_MS = 450;
export const LONG_PRESS_MOVE_TOLERANCE = 10;

function toHttpUrl(raw, base) {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return '';
  try {
    const url = new URL(value, base);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  } catch (e) {
    return '';
  }
}

/** 取 <img> 自身的可搜索地址：currentSrc 是浏览器实际选中的候选（含 srcset） */
function imgUrl(img, base) {
  const primary = toHttpUrl(img.currentSrc, base) || toHttpUrl(img.getAttribute?.('src'), base);
  if (primary) return primary;

  for (const attr of LAZY_SRC_ATTRS) {
    const url = toHttpUrl(img.getAttribute?.(attr), base);
    if (url) return url;
  }
  return '';
}

/** 取元素计算样式里的第一张背景图；渐变与 data: 图片会被忽略 */
function backgroundUrl(el, base) {
  const value = getComputedStyle(el)?.backgroundImage;
  if (!value || value === 'none') return '';
  for (const match of value.matchAll(BG_URL_RE)) {
    const url = toHttpUrl(match[2], base);
    if (url) return url;
  }
  return '';
}

/**
 * 取按下位置对应的图片地址与元素；不是图片或地址不可用时返回 null。
 * 先看 <img>，再向上找带 background-image 的容器（头像、卡片封面等）。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 * @returns {{url: string, element: Element} | null}
 */
export function resolveImageHit(target, base = globalThis.location?.href) {
  const img = typeof target?.closest === 'function' ? target.closest('img') : null;
  if (img) {
    const url = imgUrl(img, base);
    if (url) return { url, element: img };
  }

  const doc = target?.ownerDocument;
  let el = target?.nodeType === 1 ? target : target?.parentElement;
  for (let depth = 0; el && depth < MAX_BG_DEPTH; depth += 1, el = el.parentElement) {
    if (el === doc?.body || el === doc?.documentElement) break;
    const rect = el.getBoundingClientRect?.();
    if (!rect || rect.width < MIN_BG_SIZE || rect.height < MIN_BG_SIZE) continue;
    const url = backgroundUrl(el, base);
    if (url) return { url, element: el };
  }
  return null;
}

/**
 * 取按下位置对应的图片地址；不是图片或地址不可用时返回空串。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 */
export function resolveImageUrl(target, base = globalThis.location?.href) {
  return resolveImageHit(target, base)?.url || '';
}

/** 位移是否已超出长按允许的范围（滚动、拖拽时取消） */
export function isLongPressMove(startX, startY, x, y) {
  return Math.hypot(x - startX, y - startY) > LONG_PRESS_MOVE_TOLERANCE;
}

/** 「图片」分类下可用的搜图引擎；没有可用引擎时长按不接管 */
export function getImageEngines(settingData) {
  const list = settingData?.engineList?.[IMAGE_CATEGORY_KEY];
  if (!Array.isArray(list)) return [];
  return list.filter((engine) => !engine.disable && engine.url);
}

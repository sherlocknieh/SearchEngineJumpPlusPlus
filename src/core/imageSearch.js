/**
 * 右键图片搜图：从右键目标取出图片链接，并判断当前设置下是否接管这次右键。
 *
 * 图片链接直接作为关键词交给引擎模板（%s 会被 encodeURIComponent 编码），
 * 因此这里只负责拿到可被识图引擎接受的 http(s) 地址。
 */
import { IMAGE_CATEGORY_KEY, normalizeImageSearchMode } from './configData.js';

// 懒加载站点常把真实地址放在 data-* 上，src 只是占位图
const LAZY_SRC_ATTRS = ['data-src', 'data-original', 'data-lazy-src', 'data-actualsrc'];

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

/**
 * 取右键目标所在图片的可搜索地址；不是图片或地址不可用时返回空串。
 * @param {Element | null} target 右键事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 */
export function resolveImageUrl(target, base = globalThis.location?.href) {
  const img = typeof target?.closest === 'function' ? target.closest('img') : null;
  if (!img) return '';

  // currentSrc 是浏览器实际选中的候选（含 srcset），优先使用
  const primary = toHttpUrl(img.currentSrc, base) || toHttpUrl(img.getAttribute?.('src'), base);
  if (primary) return primary;

  for (const attr of LAZY_SRC_ATTRS) {
    const url = toHttpUrl(img.getAttribute?.(attr), base);
    if (url) return url;
  }
  return '';
}

/**
 * 当前设置下是否接管这次右键。
 * @param {{mode?: string, altKey?: boolean, imageUrl?: string, touchOnly?: boolean}} input
 *   touchOnly 表示设备没有实体键盘（手机/平板）：长按图片不会带 Alt，
 *   此时 alt 模式按直接触发处理，否则移动端等于关闭。
 */
export function shouldHandleImageContextMenu({ mode, altKey, imageUrl, touchOnly } = {}) {
  const normalized = normalizeImageSearchMode(mode);
  if (normalized === 'off' || !imageUrl) return false;
  if (normalized === 'menu') return true;
  return Boolean(altKey) || Boolean(touchOnly);
}

/** 是否为没有实体键盘的触屏设备 */
export function isTouchOnlyDevice() {
  if (typeof window === 'undefined') return false;
  const noHover = window.matchMedia?.('(hover: none)')?.matches;
  return Boolean(noHover) && (navigator.maxTouchPoints || 0) > 0;
}

/** 「图片」分类下可用的搜图引擎；没有可用引擎时右键不接管 */
export function getImageEngines(settingData) {
  const list = settingData?.engineList?.[IMAGE_CATEGORY_KEY];
  if (!Array.isArray(list)) return [];
  return list.filter((engine) => !engine.disable && engine.url);
}

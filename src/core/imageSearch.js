/**
 * 长按图片搜图：从按下的位置取出图片链接。
 *
 * 图片链接直接作为关键词交给引擎模板（%s 会被 encodeURIComponent 编码），
 * 目标是 http(s) 地址；Google 图片这类站点会把缩略图直接内联成 data:image，
 * 这种图同样按图片处理（可复制、可打开），地址原样交给引擎。
 */

// 懒加载站点常把真实地址放在 data-* 上，src 只是占位图
const LAZY_SRC_ATTRS = ['data-src', 'data-original', 'data-lazy-src', 'data-actualsrc'];
// 内联图片（base64 或 SVG）本身就是可渲染的图片资源
const INLINE_IMAGE_RE = /^data:image\//i;

// 背景图向上查找的层数上限：再往外通常是整页背景，不是用户想搜的图
const MAX_BG_DEPTH = 4;
// 被浮层/链接盖住的图片向上查找的层数上限：卡片结构通常不会更深
const MAX_IMAGE_DEPTH = 6;
// 背景图容器的最小边长，过滤图标、装饰线这类小元素
const MIN_BG_SIZE = 32;

const BG_URL_RE = /url\((['"]?)(.*?)\1\)/g;

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

/**
 * 取 <img> 内联的 data:image 地址；懒加载属性里的真实地址优先，不算内联图。
 * 尺寸按已解码的自然尺寸判断：懒加载站点常用 1x1 透明占位图，那不是用户想搜的图。
 */
function inlineImageUrl(img) {
  if ((img.naturalWidth || 0) < MIN_BG_SIZE || (img.naturalHeight || 0) < MIN_BG_SIZE) return '';
  for (const raw of [img.currentSrc, img.getAttribute?.('src')]) {
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (INLINE_IMAGE_RE.test(value)) return value;
  }
  return '';
}

/** 是否为内联图片地址（data:image）：引擎服务器取不到这种地址 */
export function isInlineImageAddress(value) {
  return INLINE_IMAGE_RE.test(String(value ?? '').trim());
}

/**
 * 图片的命中结果：优先用可搜索的 http(s) 地址，内联图退到自身的 data:image。
 * @returns {{url: string, element: Element} | null}
 */
function imageHit(img, base) {
  const url = imgUrl(img, base) || inlineImageUrl(img);
  return url ? { url, element: img } : null;
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
 * 图片被链接、标题浮层等元素盖住时，按下目标不是 img 本身：
 * 向上找第一个「矩形包住按下位置」的图片，避免只把外层链接当成命中目标。
 * 只认大到不像图标的图片，且必须落在按下坐标上，避免误抓旁边的缩略图。
 * @param {Element | null} target 按下事件的目标元素
 * @param {{x: number, y: number}} point 按下位置
 * @param {string} base 相对地址的基准
 */
function coveredImage(target, point, base) {
  const doc = target?.ownerDocument;
  let el = target?.nodeType === 1 ? target : target?.parentElement;
  for (let depth = 0; el && depth < MAX_IMAGE_DEPTH; depth += 1, el = el.parentElement) {
    if (el === doc?.body || el === doc?.documentElement) break;
    for (const image of el.querySelectorAll?.('img') || []) {
      const rect = image.getBoundingClientRect?.();
      if (!rect || rect.width < MIN_BG_SIZE || rect.height < MIN_BG_SIZE) continue;
      if (
        point.x < rect.left ||
        point.x > rect.right ||
        point.y < rect.top ||
        point.y > rect.bottom
      ) {
        continue;
      }
      const hit = imageHit(image, base);
      if (hit) return hit;
    }
  }
  return null;
}

/**
 * 取按下位置对应的图片地址与元素；不是图片或地址不可用时返回 null。
 * 先看 <img>，再按坐标找被链接/浮层盖住的图片，最后向上找带 background-image 的容器。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 * @param {{x: number, y: number} | null} [point] 按下位置，用于识别被盖住的图片
 * @returns {{url: string, element: Element} | null} url 可能是内联图片的 data:image
 */
export function resolveImageHit(target, base = globalThis.location?.href, point = null) {
  const img = typeof target?.closest === 'function' ? target.closest('img') : null;
  if (img) {
    const hit = imageHit(img, base);
    if (hit) return hit;
  }

  if (point) {
    const covered = coveredImage(target, point, base);
    if (covered) return covered;
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

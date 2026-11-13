/**
 * 长按/右键链接：取出可交给「复制 / 打开」动作的地址。
 *
 * 只接受浏览器能直接打开的协议；页内锚点与 javascript: 伪链接不接管，
 * 避免把当前页地址或脚本地址当成用户想操作的链接。
 */
const LINK_PROTOCOLS = /^(https?|mailto|tel):$/i;

function toLinkUrl(raw, base) {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return '';
  try {
    const url = new URL(value, base);
    return LINK_PROTOCOLS.test(url.protocol) ? url.href : '';
  } catch (e) {
    return '';
  }
}

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';

function collapse(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

/**
 * 链接可复制的文字：优先取链接内的标题，避免把站点名、面包屑等附注一起复制。
 * 没有标题时回退到 aria-label，再回退到整段文字。
 */
function linkText(link) {
  const heading = link.querySelector?.(HEADING_SELECTOR);
  const candidates = [
    heading?.textContent,
    link.getAttribute?.('aria-label'),
    link.textContent,
  ];
  return candidates.map(collapse).find(Boolean) || '';
}

/**
 * 取按下位置对应的链接文字、地址与 <a>/<area> 元素；不是可操作链接时返回 null。
 * 文字用于复制，地址用于打开；纯图片链接的文字为空，由调用方回退到地址。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 * @returns {{url: string, text: string, element: Element} | null}
 */
export function resolveLinkHit(target, base = globalThis.location?.href) {
  const link = typeof target?.closest === 'function' ? target.closest('a[href], area[href]') : null;
  if (!link) return null;

  const raw = link.getAttribute?.('href')?.trim() || '';
  // 页内锚点不改变地址，不是用户想复制或打开的独立链接
  if (!raw || raw.startsWith('#')) return null;

  const url = toLinkUrl(raw, base) || toLinkUrl(link.href, base);
  if (!url) return null;
  return { url, text: linkText(link), element: link };
}

/**
 * 取按下位置对应的链接地址；不是可操作链接时返回空串。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 */
export function resolveLinkUrl(target, base = globalThis.location?.href) {
  return resolveLinkHit(target, base)?.url || '';
}

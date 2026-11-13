/**
 * 长按/右键链接：取出可交给「复制 / 打开链接」动作的地址。
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
  const text = (link.textContent || '').replace(/\s+/g, ' ').trim();
  return { url, text, element: link };
}

/**
 * 取按下位置对应的链接地址；不是可操作链接时返回空串。
 * @param {Element | null} target 按下事件的目标元素
 * @param {string} [base] 相对地址的基准，默认当前页面
 */
export function resolveLinkUrl(target, base = globalThis.location?.href) {
  return resolveLinkHit(target, base)?.url || '';
}

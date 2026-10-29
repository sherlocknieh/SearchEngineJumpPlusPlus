/**
 * 复制文本到剪贴板。
 * 优先使用异步剪贴板 API；不可用时回退到临时 textarea + execCommand，
 * 以兼容非安全上下文（http 页面）中的旧浏览器。
 */
import { getCSPNonce } from './csp.js';

const FALLBACK_STYLE_ID = 'sej-copy-fallback-style';

function ensureFallbackStyle() {
  if (document.getElementById(FALLBACK_STYLE_ID)) return;
  const style = document.createElement('style');
  const nonce = getCSPNonce();
  if (nonce) style.setAttribute('nonce', nonce);
  style.id = FALLBACK_STYLE_ID;
  style.textContent =
    '.sej-copy-fallback{position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;}';
  (document.head || document.documentElement).appendChild(style);
}

function copyWithTextarea(value) {
  if (typeof document === 'undefined') return false;
  ensureFallbackStyle();
  const area = document.createElement('textarea');
  area.className = 'sej-copy-fallback';
  area.value = value;
  area.setAttribute('readonly', '');
  document.body.appendChild(area);
  const selection = document.getSelection?.();
  const savedRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
  area.select();
  area.setSelectionRange?.(0, value.length);
  let ok;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  area.remove();
  if (savedRange && selection) {
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }
  return ok;
}

export async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (e) {
    // 权限被拒绝或页面不支持时继续尝试兼容方案
  }
  return copyWithTextarea(value);
}

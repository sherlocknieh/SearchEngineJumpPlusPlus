let inlineStyleBlocked = null;
let cspNonce = null;

export function isInlineStyleBlocked() {
  if (inlineStyleBlocked !== null) return inlineStyleBlocked;

  try {
    const probe = document.createElement('div');
    document.documentElement.appendChild(probe);
    probe.style.setProperty('position', 'fixed');
    inlineStyleBlocked = !probe.getAttribute('style');
    probe.remove();
  } catch (e) {
    inlineStyleBlocked = false;
  }

  return inlineStyleBlocked;
}

export function getCSPNonce() {
  if (cspNonce) return cspNonce;
  const nonceElement = document.querySelector('style[nonce], script[nonce]');
  const value = nonceElement?.nonce || nonceElement?.getAttribute('nonce') || '';
  // 只缓存成功找到的 nonce：页面可能在脚本启动后才注入带 nonce 的标签
  if (value) cspNonce = value;
  return value;
}

/** 清空 nonce 缓存：SPA 重建后页面可能换成另一份 CSP 策略 */
export function resetCSPNonce() {
  cspNonce = null;
}

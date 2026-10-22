let inlineStyleBlocked = null;

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
  const nonceElement = document.querySelector('style[nonce], script[nonce]');
  return nonceElement?.nonce || nonceElement?.getAttribute('nonce') || '';
}

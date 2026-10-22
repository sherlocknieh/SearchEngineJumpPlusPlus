import { getCSPNonce } from './csp.js';

let shadowHost = null;
let shadowRoot = null;
const constructableSheets = [];

function supportsConstructableStylesheets() {
  return (
    typeof CSSStyleSheet !== 'undefined' &&
    typeof ShadowRoot !== 'undefined' &&
    'replaceSync' in CSSStyleSheet.prototype &&
    'adoptedStyleSheets' in ShadowRoot.prototype
  );
}

export function initialize() {
  if (shadowHost) return shadowRoot;

  shadowHost = document.createElement('div');
  shadowHost.id = 'sej-shadow-host';
  shadowRoot = shadowHost.attachShadow({ mode: 'open' });

  return shadowRoot;
}

export function getHost() {
  if (!shadowHost) initialize();
  return shadowHost;
}

let dropRoot = null;

export function getDropRoot() {
  if (!shadowRoot) initialize();
  if (!dropRoot) {
    dropRoot = document.createElement('div');
    dropRoot.id = 'sej-drop-lists';
    shadowRoot.appendChild(dropRoot);
  }
  return dropRoot;
}

export function getRoot() {
  if (!shadowRoot) initialize();
  return shadowRoot;
}

export function insertHost(target, position = 'beforeend') {
  if (!shadowHost) initialize();

  if (shadowHost.parentNode) {
    shadowHost.parentNode.removeChild(shadowHost);
  }

  if (position === 'beforebegin') {
    target.parentNode.insertBefore(shadowHost, target);
  } else if (position === 'afterbegin') {
    if (target.firstChild) {
      target.insertBefore(shadowHost, target.firstChild);
    } else {
      target.appendChild(shadowHost);
    }
  } else if (position === 'beforeend') {
    target.appendChild(shadowHost);
  } else if (position === 'afterend') {
    if (target.nextSibling) {
      target.parentNode.insertBefore(shadowHost, target.nextSibling);
    } else {
      target.parentNode.appendChild(shadowHost);
    }
  } else {
    document.body.appendChild(shadowHost);
  }

  return shadowHost;
}

export function addStyle(cssText) {
  if (!cssText) return;
  if (!shadowRoot) initialize();

  if (supportsConstructableStylesheets()) {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      constructableSheets.push(sheet);
      shadowRoot.adoptedStyleSheets = [
        ...shadowRoot.adoptedStyleSheets,
        sheet,
      ];
      return;
    } catch (e) {
      console.warn('Constructable stylesheet 注入失败，回退到 <style> 注入', e);
    }
  }

  const style = document.createElement('style');
  const nonce = getCSPNonce();
  if (nonce) style.setAttribute('nonce', nonce);
  style.textContent = cssText;
  shadowRoot.appendChild(style);
}

// 重置 Shadow DOM 状态，用于 SPA 路由变化后重建
export function reset() {
  if (shadowHost?.parentNode) {
    shadowHost.parentNode.removeChild(shadowHost);
  }
  shadowHost = null;
  shadowRoot = null;
  dropRoot = null;
  constructableSheets.length = 0;
}

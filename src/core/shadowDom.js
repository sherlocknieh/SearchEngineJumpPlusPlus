import { getCSPNonce } from './csp.js';

// 开发脚本(server:)与正式版可能同时注入同一页面，用不同的宿主 id 共存
export const INSTANCE_ROLE = import.meta.env.DEV ? 'dev' : 'prod';
export const HOST_ID = INSTANCE_ROLE === 'dev' ? 'sej-shadow-host-dev' : 'sej-shadow-host';
export const HOST_SELECTOR = '#sej-shadow-host, #sej-shadow-host-dev';

const ROLE_RANK = { prod: 0, dev: 1 };
const STACK_GAP = 8;
const TOAST_STACK_STEP = 43;

let shadowHost = null;
let shadowRoot = null;
const constructableSheets = [];
const injectedStyles = new Set();

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
  shadowHost.id = HOST_ID;
  shadowHost.dataset.sejInstance = INSTANCE_ROLE;
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
  if (!cssText || injectedStyles.has(cssText)) return;
  injectedStyles.add(cssText);
  if (!shadowRoot) initialize();

  if (supportsConstructableStylesheets()) {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      constructableSheets.push(sheet);
      shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
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
  injectedStyles.clear();
  stackSheet = null;
  stackSheetText = '';
}

export function getInstanceHosts() {
  return Array.from(document.querySelectorAll(HOST_SELECTOR));
}

function getContainerEl(host) {
  return host.shadowRoot?.querySelector('#sej-container') || null;
}

// 浮层指跳转条固定到视口顶部，或划词条的容器是 fixed
function isOverlayHost(host) {
  if (host.style.position === 'fixed') return true;
  const container = getContainerEl(host);
  return Boolean(container) && getComputedStyle(container).position === 'fixed';
}

function renderedHeight(host) {
  const rect = host.getBoundingClientRect();
  if (rect.height > 0.5) return rect.height;
  // 划词条容器脱离文档流，宿主自身没有高度
  const container = getContainerEl(host);
  return container ? container.getBoundingClientRect().height : 0;
}

// 正式版排在开发版之前，靠后的实例为前面的浮层让出竖直空间
export function getStackOffset() {
  if (!shadowHost) return 0;
  const selfRank = ROLE_RANK[INSTANCE_ROLE] ?? 0;
  let offset = 0;
  for (const host of getInstanceHosts()) {
    if (host === shadowHost) continue;
    const rank = ROLE_RANK[host.dataset.sejInstance] ?? 0;
    if (rank >= selfRank || !isOverlayHost(host)) continue;
    offset += renderedHeight(host) + STACK_GAP;
  }
  return Math.round(offset);
}

let stackSheet = null;
let stackSheetText = '';

function writeStackSheet(cssText) {
  if (cssText === stackSheetText) return;
  if (!shadowRoot) initialize();

  if (!stackSheet) {
    if (supportsConstructableStylesheets()) {
      try {
        stackSheet = new CSSStyleSheet();
        stackSheet.replaceSync('');
        shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, stackSheet];
      } catch (e) {
        stackSheet = null;
      }
    }
    if (!stackSheet) {
      stackSheet = document.createElement('style');
      const nonce = getCSPNonce();
      if (nonce) stackSheet.setAttribute('nonce', nonce);
      shadowRoot.appendChild(stackSheet);
    }
  }

  if (typeof stackSheet.replaceSync === 'function') {
    stackSheet.replaceSync(cssText);
  } else {
    stackSheet.textContent = cssText;
  }
  stackSheetText = cssText;
}

// 多个实例共存时，让划词条和提示条也错开，避免互相遮挡
export function refreshStackLayout() {
  if (!shadowRoot) return;
  const offset = getStackOffset();
  const toastOffset = getInstanceHosts().length > 1 ? TOAST_STACK_STEP : 0;

  const rules = [];
  if (offset > 0) {
    rules.push(`#sej-container.selectSearch { top: calc(2px + ${offset}px); }`);
  }
  if (toastOffset > 0) {
    rules.push(`#iqixn-global-tip { bottom: calc(5% + ${toastOffset}px); }`);
  }
  writeStackSheet(rules.join('\n'));
}

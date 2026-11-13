import { getCSPNonce, resetCSPNonce } from './csp.js';

// 开发脚本(server:)与正式版可能同时注入同一页面，用不同的宿主 id 共存
export const INSTANCE_ROLE = import.meta.env.DEV ? 'dev' : 'prod';

/** 宿主角色：站点内嵌的跳转条（设置面板也挂在这里） */
export const HOST_ROLE_MAIN = 'main';
/** 宿主角色：划词条 / 图片条，独立挂载，不影响内嵌条 */
export const HOST_ROLE_FLOAT = 'float';
/** 组件通过 provide 传入该键，让下拉面板等子组件使用所属宿主的根节点 */
export const HOST_ROLE_KEY = Symbol('sejHostRole');

const HOST_IDS = {
  main: { prod: 'sej-shadow-host', dev: 'sej-shadow-host-dev' },
  float: { prod: 'sej-shadow-host-float', dev: 'sej-shadow-host-float-dev' },
};

export const HOST_ID = HOST_IDS.main[INSTANCE_ROLE];
export const FLOAT_HOST_ID = HOST_IDS.float[INSTANCE_ROLE];
export const HOST_SELECTOR = Object.values(HOST_IDS)
  .flatMap((ids) => Object.values(ids))
  .map((id) => `#${id}`)
  .join(', ');

const ROLE_RANK = { prod: 0, dev: 1 };
const STACK_GAP = 8;
const TOAST_STACK_STEP = 43;

// role -> { host, root, dropRoot }；两种角色各自拥有独立的 Shadow Root
const roots = new Map();
// 已注入的样式文本，后创建的宿主需要补齐：null 表示注入到全部宿主
const styleTexts = [];
// role -> 层叠样式所在的样式表
const stackSheets = new Map();

function hostIdFor(role) {
  return HOST_IDS[role]?.[INSTANCE_ROLE] ?? HOST_ID;
}

function supportsConstructableStylesheets() {
  return (
    typeof CSSStyleSheet !== 'undefined' &&
    typeof ShadowRoot !== 'undefined' &&
    'replaceSync' in CSSStyleSheet.prototype &&
    'adoptedStyleSheets' in ShadowRoot.prototype
  );
}

/** 把样式写入宿主：支持 constructable stylesheet 时复用（可后续改写），否则建 <style> */
function injectStyle(entry, cssText, reusable = false) {
  if (supportsConstructableStylesheets()) {
    try {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      entry.root.adoptedStyleSheets = [...entry.root.adoptedStyleSheets, sheet];
      return reusable ? sheet : null;
    } catch (e) {
      console.warn('Constructable stylesheet 注入失败，回退到 <style> 注入', e);
    }
  }

  const style = document.createElement('style');
  const nonce = getCSPNonce();
  if (nonce) style.setAttribute('nonce', nonce);
  style.textContent = cssText;
  entry.root.appendChild(style);
  return style;
}

/**
 * 初始化指定角色的 Shadow DOM。
 * @param {string} [role] 见 HOST_ROLE_MAIN / HOST_ROLE_FLOAT
 */
export function initialize(role = HOST_ROLE_MAIN) {
  const existing = roots.get(role);
  if (existing) return existing.root;

  const host = document.createElement('div');
  host.id = hostIdFor(role);
  host.dataset.sejInstance = INSTANCE_ROLE;
  host.dataset.sejRole = role;
  const root = host.attachShadow({ mode: 'open' });
  const entry = { host, root, dropRoot: null };
  roots.set(role, entry);
  // 宿主可能晚于样式创建，补齐此前注入的内容
  for (const { cssText, scope } of styleTexts) {
    if (scope && scope !== role) continue;
    injectStyle(entry, cssText);
  }

  return root;
}

export function getHost(role = HOST_ROLE_MAIN) {
  initialize(role);
  return roots.get(role)?.host ?? null;
}

/** 已创建的全部宿主（内嵌条与划词条） */
export function getHosts() {
  return Array.from(roots.values(), (entry) => entry.host);
}

/** 节点是否属于本脚本的任意宿主 */
export function isOwnHostNode(node) {
  return Boolean(node?.dataset?.sejRole);
}

export function getDropRoot(role = HOST_ROLE_MAIN) {
  const root = initialize(role);
  const entry = roots.get(role);
  if (!entry.dropRoot) {
    entry.dropRoot = document.createElement('div');
    entry.dropRoot.id = 'sej-drop-lists';
    root.appendChild(entry.dropRoot);
  }
  return entry.dropRoot;
}

export function insertHost(target, position = 'beforeend', role = HOST_ROLE_MAIN) {
  const host = getHost(role);

  if (host.parentNode) {
    host.parentNode.removeChild(host);
  }

  if (position === 'beforebegin') {
    target.parentNode.insertBefore(host, target);
  } else if (position === 'afterbegin') {
    if (target.firstChild) {
      target.insertBefore(host, target.firstChild);
    } else {
      target.appendChild(host);
    }
  } else if (position === 'beforeend') {
    target.appendChild(host);
  } else if (position === 'afterend') {
    if (target.nextSibling) {
      target.parentNode.insertBefore(host, target.nextSibling);
    } else {
      target.parentNode.appendChild(host);
    }
  } else {
    document.body.appendChild(host);
  }

  return host;
}

/**
 * 注入样式，之后创建的宿主也会补齐。
 * @param {string} cssText
 * @param {string} [role] 只注入指定角色的宿主；省略时注入全部宿主。
 *   站点规则样式只应作用于内嵌条，否则会改写划词条的定位。
 */
export function addStyle(cssText, role = null) {
  if (!cssText) return;
  if (styleTexts.some((item) => item.cssText === cssText && item.scope === (role || null))) return;
  styleTexts.push({ cssText, scope: role || null });
  for (const [hostRole, entry] of roots) {
    if (role && hostRole !== role) continue;
    injectStyle(entry, cssText);
  }
}

// 重置 Shadow DOM 状态，用于 SPA 路由变化后重建
export function reset() {
  for (const entry of roots.values()) {
    if (entry.host.parentNode) entry.host.parentNode.removeChild(entry.host);
  }
  roots.clear();
  styleTexts.length = 0;
  stackSheets.clear();
  resetCSPNonce();
}

export function getInstanceHosts(role) {
  const hosts = Array.from(document.querySelectorAll(HOST_SELECTOR));
  return role ? hosts.filter((host) => host.dataset.sejRole === role) : hosts;
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

// 正式版排在开发版之前，靠后的实例为前面的浮层让出竖直空间。
// 浮层条可能与另一实例的任意浮层（内嵌条被站点固定时也是浮层）重叠，按宿主全体计算。
export function getStackOffset(role = HOST_ROLE_MAIN) {
  const selfHost = roots.get(role)?.host;
  if (!selfHost) return 0;
  const selfRank = ROLE_RANK[INSTANCE_ROLE] ?? 0;
  let offset = 0;
  for (const host of getInstanceHosts()) {
    if (host === selfHost) continue;
    const rank = ROLE_RANK[host.dataset.sejInstance] ?? 0;
    if (rank >= selfRank || !isOverlayHost(host)) continue;
    offset += renderedHeight(host) + STACK_GAP;
  }
  return Math.round(offset);
}

function stackRulesFor(role) {
  const rules = [];
  const offset = getStackOffset(role);
  // 只有顶部居中的划词条会与其他实例重叠，跟随选区时由内联坐标决定；
  // 选择器要与 JumpBar 的定位规则同权重，才能覆盖 top
  if (offset > 0 && role === HOST_ROLE_FLOAT) {
    rules.push(`#sej-container.selectSearch.sej-top { top: calc(2px + ${offset}px); }`);
  }
  if (role === HOST_ROLE_MAIN) {
    // 每个脚本实例只挂一个内嵌条，用它判断是否存在并存的另一个实例
    const toastOffset = getInstanceHosts(HOST_ROLE_MAIN).length > 1 ? TOAST_STACK_STEP : 0;
    if (toastOffset > 0) {
      rules.push(`#iqixn-global-tip { bottom: calc(5% + ${toastOffset}px); }`);
    }
  }
  return rules.join('\n');
}

function writeStackSheet(role) {
  const entry = roots.get(role);
  if (!entry) return;

  const cssText = stackRulesFor(role);
  let sheet = stackSheets.get(role);

  if (!sheet) {
    const injected = injectStyle(entry, cssText, true);
    if (injected) stackSheets.set(role, injected);
    return;
  }

  if (typeof sheet.replaceSync === 'function') {
    sheet.replaceSync(cssText);
  } else {
    sheet.textContent = cssText;
  }
}

// 多个实例共存时，让划词条和提示条也错开，避免互相遮挡
export function refreshStackLayout() {
  if (!roots.size) return;
  writeStackSheet(HOST_ROLE_MAIN);
  writeStackSheet(HOST_ROLE_FLOAT);
}

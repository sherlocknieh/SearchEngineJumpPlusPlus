/**
 * 划词文本读取。
 *
 * window.getSelection() 读不到输入框内的选区，需要改用输入框自身的
 * selectionStart/selectionEnd；contenteditable 的选区仍属于文档选区。
 *
 * 选区落在 open Shadow DOM 里时（B站评论等组件），浏览器把文档级 Selection
 * 钳制到宿主外层：isCollapsed 为 true、范围矩形归零，但 toString() 仍有文字。
 * 真实范围只存在于对应 ShadowRoot.getSelection() 上，文本与定位都靠它。
 */

import { HOST_SELECTOR } from './shadowDom.js';

/** 输入框/可编辑区域：其中的选区默认不参与划词搜索 */
export function isEditableElement(el) {
  if (!el || el.nodeType !== 1) return false;
  if (el.isContentEditable) return true;
  if (el.tagName === 'TEXTAREA') return true;
  // 只有支持 selectionStart 的 input 类型才有输入框内选区
  return el.tagName === 'INPUT' && typeof el.selectionStart === 'number';
}

/** 读取输入框内的选中文本；无可读选区时返回空字符串 */
export function getElementSelectionText(el) {
  if (!el || !isEditableElement(el)) return '';
  if (typeof el.selectionStart !== 'number' || typeof el.selectionEnd !== 'number') return '';
  return String(el.value ?? '').slice(el.selectionStart, el.selectionEnd);
}

/** 该宿主是否属于脚本自己的 UI（设置面板、跳转条） */
function isOwnUiHost(host) {
  return Boolean(host) && typeof host.matches === 'function' && host.matches(HOST_SELECTOR);
}

/** 选区端点是否落在脚本自己的 Shadow DOM 里 */
function isOwnUiSelection(selection) {
  return isOwnUiHost(selection?.anchorNode?.getRootNode?.()?.host);
}

/**
 * 在 open Shadow DOM 里找真正持有选区的那个 ShadowRoot。
 * 只在文档选区被钳制到的那棵子树里下钻，命中即停，避免整页扫描。
 * @param {Document} doc 文档
 * @returns {{selection: Selection, host: Element} | null}
 */
export function findShadowSelection(doc = document) {
  const selection = typeof doc?.getSelection === 'function' ? doc.getSelection() : null;
  const anchor = selection?.anchorNode;
  // 钳制后的端点落在宿主一侧的文档节点上，从它开始下钻即可覆盖真实选区
  const scope = anchor?.nodeType === 1 ? anchor : (anchor?.parentElement ?? doc);
  let hit = null;

  const scan = (root) => {
    if (hit || typeof root?.querySelectorAll !== 'function') return;
    for (const el of root.querySelectorAll('*')) {
      const shadow = el.shadowRoot;
      if (!shadow) continue;
      const inner = shadow.getSelection?.();
      if (inner && !inner.isCollapsed && inner.toString()) {
        hit = { selection: inner, host: shadow.host };
        return;
      }
      scan(shadow);
      if (hit) return;
    }
  };

  scan(scope);
  return hit;
}

/**
 * 把页面上某个元素内部的文字变成浏览器选区（右键链接「选中链接标题」用）。
 * 选区落到真实 DOM 上，之后可以直接 Ctrl+C 或沿用系统操作；元素不可选时返回 false。
 * @param {Element | null} el 要选中的元素
 */
export function selectElementText(el) {
  if (!el || el.nodeType !== 1) return false;
  const doc = el.ownerDocument || document;
  const selection = typeof doc.getSelection === 'function' ? doc.getSelection() : null;
  if (!selection) return false;
  const range = doc.createRange();
  range.selectNodeContents(el);
  selection.removeAllRanges();
  selection.addRange(range);
  return Boolean(selection.toString().trim());
}

/**
 * 读取当前划词结果：文本 + 可用于定位的选区对象。
 *
 * 输入框内的选区默认忽略；Shadow DOM 内的选区回退到真实选区，
 * 否则 caller 只能拿到被钳制、矩形为零的文档选区。
 * @param {{includeInput?: boolean, doc?: Document}} [options]
 * @returns {{text: string, selection: Selection | null}}
 */
export function getSelectionInfo({ includeInput = false, doc = document } = {}) {
  const active = doc.activeElement;
  if (isEditableElement(active)) {
    if (!includeInput) return { text: '', selection: null };
    // contenteditable 没有 selectionStart，继续回退到文档选区
    const text = getElementSelectionText(active);
    if (text) return { text, selection: null };
  }

  const selection = typeof doc.getSelection === 'function' ? doc.getSelection() : null;
  if (!selection) return { text: '', selection: null };
  if (isOwnUiSelection(selection)) return { text: '', selection: null };

  let resolved = selection;
  // 折叠但仍有文字：选区在 Shadow DOM 内，文档层拿不到范围
  if (selection.isCollapsed && selection.toString()) {
    const hit = findShadowSelection(doc);
    if (hit) {
      if (isOwnUiHost(hit.host)) return { text: '', selection: null };
      resolved = hit.selection;
    }
  }

  const text = resolved.toString();
  // 面板内的选文属于本地操作，不能当成页面的划词
  return text ? { text, selection: resolved } : { text: '', selection: null };
}

/**
 * 读取当前划词文本。
 * @param {{includeInput?: boolean, doc?: Document}} [options]
 *   includeInput 为 false 时忽略输入框等可编辑区域内的选区。
 */
export function getSelectedText(options) {
  return getSelectionInfo(options).text;
}

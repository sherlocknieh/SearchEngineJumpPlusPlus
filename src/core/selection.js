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

/**
 * 当前可剪切的选区：只认可编辑内容（页面普通文字删不掉，剪切没有意义）。
 * 输入框/文本域用自身的 selectionStart/End，contenteditable 用文档选区里的真实 Range。
 * @param {{doc?: Document, only?: Element | null}} [options]
 *   only 限定选区必须属于该元素（站点内嵌条只剪自己的搜索框）
 * @returns {{text: string, element: Element, start: number, end: number} |
 *   {text: string, range: Range} | null}
 */
export function getEditableSelection({ doc = document, only = null } = {}) {
  const active = doc?.activeElement;
  if (!isEditableElement(active)) return null;
  if (only && active !== only && !only.contains?.(active)) return null;

  if (typeof active.selectionStart === 'number' && typeof active.selectionEnd === 'number') {
    const start = active.selectionStart;
    const end = active.selectionEnd;
    if (end <= start) return null;
    const text = String(active.value ?? '').slice(start, end);
    return text ? { text, element: active, start, end } : null;
  }

  // contenteditable 没有 selectionStart，选区仍在文档 Selection 上
  let selection = typeof doc.getSelection === 'function' ? doc.getSelection() : null;
  if (!selection || isOwnUiSelection(selection)) return null;
  if (selection.isCollapsed && selection.toString()) {
    const hit = findShadowSelection(doc);
    if (!hit || isOwnUiHost(hit.host)) return null;
    selection = hit.selection;
  }
  if (selection.isCollapsed || !selection.rangeCount || typeof selection.getRangeAt !== 'function') {
    return null;
  }
  const text = selection.toString();
  if (!text) return null;
  try {
    return { text, range: selection.getRangeAt(0).cloneRange() };
  } catch (e) {
    return null;
  }
}

/** 最近的 contenteditable 宿主，用于在删除后把 input 事件发给真正可编辑的元素 */
function editableHost(node) {
  let el = node?.nodeType === 1 ? node : (node?.parentElement ?? null);
  while (el) {
    if (el.isContentEditable) return el;
    el = el.parentElement;
  }
  return null;
}

/** 通知站点输入内容已变：受控输入框（React 等）靠原生 setter + input 事件同步状态 */
function dispatchEditableInput(el, inputType) {
  if (!el?.dispatchEvent) return;
  const init = { bubbles: true, composed: true, inputType };
  const event =
    typeof InputEvent === 'function'
      ? new InputEvent('input', init)
      : new Event('input', { bubbles: true });
  el.dispatchEvent(event);
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * 用原生 setter 写回输入框的值：直接给 el.value 赋值时，
 * React 的 value tracker 看不到变化，随后补发的 input 事件会被当成没改过。
 */
function setInputValue(el, value) {
  const ctor =
    el.tagName === 'TEXTAREA' ? globalThis.HTMLTextAreaElement : globalThis.HTMLInputElement;
  const setter = ctor && Object.getOwnPropertyDescriptor(ctor.prototype, 'value')?.set;
  if (setter) setter.call(el, value);
  else el.value = value;
}

/**
 * 删除 getEditableSelection 记下的选区，返回是否删除成功。
 * 输入框按记录的 start/end 截掉文字并触发 input/change；
 * contenteditable 先恢复选区再交给 execCommand，站点自己的编辑历史与事件都能接上。
 * @param {{element?: Element, start?: number, end?: number, range?: Range, text?: string} | null} source
 * @param {Document} [doc]
 */
export function removeEditableSelection(source, doc = document) {
  if (!source) return false;

  if (source.element) {
    const el = source.element;
    if (!el.isConnected) return false;
    const value = String(el.value ?? '');
    const start = Math.max(0, Math.min(source.start, value.length));
    const end = Math.max(start, Math.min(source.end, value.length));
    if (end <= start) return false;
    // 记录之后内容被站点改写或用户继续输入过，就不按旧位置删，避免剪错文字
    if (value.slice(start, end) !== source.text) return false;
    setInputValue(el, value.slice(0, start) + value.slice(end));
    try {
      el.focus({ preventScroll: true });
    } catch (e) {
      // 输入框不可聚焦时跳过，只改内容
    }
    try {
      el.setSelectionRange?.(start, start);
    } catch (e) {
      // 不支持 setSelectionRange 的输入框类型
    }
    dispatchEditableInput(el, 'deleteByCut');
    return true;
  }

  const range = source.range;
  if (!range || !range.startContainer?.isConnected) return false;
  const host = editableHost(range.commonAncestorContainer ?? range.startContainer);
  const selection = typeof doc?.getSelection === 'function' ? doc.getSelection() : null;
  try {
    host?.focus?.({ preventScroll: true });
  } catch (e) {
    // 富文本编辑器可能拒绝聚焦，选区仍可用 Range 删除
  }
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  let handled;
  try {
    handled = Boolean(doc.execCommand?.('delete'));
  } catch (e) {
    handled = false;
  }
  if (!handled) {
    // execCommand 不可用时退回 Range 删除，并补发 input 事件让站点同步内容
    range.deleteContents();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    dispatchEditableInput(host || doc.body, 'deleteByCut');
  }
  return true;
}


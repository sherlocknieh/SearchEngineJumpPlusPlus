/**
 * 划词文本读取。
 *
 * window.getSelection() 读不到输入框内的选区，需要改用输入框自身的
 * selectionStart/selectionEnd；contenteditable 的选区仍属于文档选区。
 */

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

/**
 * 读取当前划词文本。
 * @param {{includeInput?: boolean, doc?: Document}} [options]
 *   includeInput 为 false 时忽略输入框等可编辑区域内的选区。
 */
export function getSelectedText({ includeInput = false, doc = document } = {}) {
  const active = doc.activeElement;
  if (isEditableElement(active)) {
    if (!includeInput) return '';
    // contenteditable 没有 selectionStart，继续回退到文档选区
    const text = getElementSelectionText(active);
    if (text) return text;
  }

  const selection = typeof doc.getSelection === 'function' ? doc.getSelection() : null;
  if (!selection || selection.isCollapsed) return '';
  return selection.toString();
}

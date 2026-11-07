/**
 * 模态弹窗的无障碍行为：初始焦点、Tab 焦点陷阱、Escape 关闭、关闭后恢复焦点。
 *
 * 键盘监听器挂在弹窗根元素而不是 document 上：嵌套弹窗自己的处理器先触发并
 * 阻止冒泡，因此打开编辑弹窗时 Escape 只会关闭当前弹窗。
 *
 * 可选的“点击外部关闭”只能监听 document：外部的点击根本不会经过弹窗根元素。
 * 判断是否在内部用 composedPath，因为 Shadow DOM 会重定向事件目标。
 */
import { nextTick, onBeforeUnmount, onMounted } from 'vue';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function isVisible(el) {
  if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false;
  const style = getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

/**
 * @param {object} options
 * @param {{ value: HTMLElement | null }} options.containerEl 弹窗根元素
 * @param {() => void} [options.onClose] Escape 触发
 * @param {{ value: HTMLElement | null }} [options.initialFocus] 初始焦点元素
 * @param {boolean} [options.closeOnOutsideClick] 点击弹窗外部是否同样触发 onClose
 */
export function useModalA11y({ containerEl, onClose, initialFocus, closeOnOutsideClick = false }) {
  let container = null;
  let previousFocus = null;

  function focusableElements() {
    if (!container) return [];
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isVisible);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (e.defaultPrevented) return;
      e.preventDefault();
      e.stopPropagation();
      onClose?.();
      return;
    }
    if (e.key !== 'Tab') return;

    const items = focusableElements();
    if (!items.length) {
      e.preventDefault();
      container?.focus();
      return;
    }

    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    const inside = container?.contains(active);

    if (e.shiftKey) {
      if (!inside || active === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (!inside || active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // 捕获阶段在 document 上判断：点击落在弹窗外部时关闭弹窗，并截断这次点击，
  // 避免关闭的同时又触发弹窗背后的按钮/链接。
  function onDocumentClick(e) {
    if (!container) return;
    const path = e.composedPath?.();
    if (path ? path.includes(container) : container.contains(e.target)) return;
    e.stopPropagation();
    onClose?.();
  }

  onMounted(async () => {
    container = containerEl.value;
    previousFocus = document.activeElement;
    if (!container) return;

    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
    container.addEventListener('keydown', onKeydown);
    if (closeOnOutsideClick) document.addEventListener('click', onDocumentClick, true);

    await nextTick();
    const target = initialFocus?.value || focusableElements()[0] || container;
    target?.focus?.();
  });

  onBeforeUnmount(() => {
    container?.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onDocumentClick, true);
    if (previousFocus?.isConnected && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  });
}

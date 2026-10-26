/**
 * 模态弹窗的无障碍行为：初始焦点、Tab 焦点陷阱、Escape 关闭、关闭后恢复焦点。
 *
 * 监听器挂在弹窗根元素而不是 document 上：嵌套弹窗自己的处理器先触发并
 * 阻止冒泡，因此打开编辑弹窗时 Escape 只会关闭当前弹窗。
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
 */
export function useModalA11y({ containerEl, onClose, initialFocus }) {
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

  onMounted(async () => {
    container = containerEl.value;
    previousFocus = document.activeElement;
    if (!container) return;

    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
    container.addEventListener('keydown', onKeydown);

    await nextTick();
    const target = initialFocus?.value || focusableElements()[0] || container;
    target?.focus?.();
  });

  onBeforeUnmount(() => {
    container?.removeEventListener('keydown', onKeydown);
    if (previousFocus?.isConnected && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  });
}

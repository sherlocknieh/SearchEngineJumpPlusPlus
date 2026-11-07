// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useModalA11y } from '../src/composables/useModalA11y.js';

const Dialog = defineComponent({
  props: { onClose: { type: Function, required: true } },
  setup(props) {
    const rootEl = ref(null);
    useModalA11y({ containerEl: rootEl, onClose: () => props.onClose() });
    return () =>
      h('div', { ref: rootEl, role: 'dialog' }, [
        h('button', { id: 'first' }, 'first'),
        h('input', { id: 'middle' }),
        h('button', { id: 'last' }, 'last'),
      ]);
  },
});

const OutsideCloseDialog = defineComponent({
  props: { onClose: { type: Function, required: true } },
  setup(props) {
    const rootEl = ref(null);
    useModalA11y({
      containerEl: rootEl,
      closeOnOutsideClick: true,
      onClose: () => props.onClose(),
    });
    return () =>
      h('div', { ref: rootEl, role: 'dialog' }, [h('button', { id: 'inside' }, 'inside')]);
  },
});

function fire(el, key, options = {}) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...options }));
}

function click(el) {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

describe('useModalA11y', () => {
  it('挂载后聚焦首个可聚焦元素', async () => {
    const wrapper = mount(Dialog, { props: { onClose: () => {} }, attachTo: document.body });
    await nextTick();
    await nextTick();
    expect(document.activeElement?.id).toBe('first');
    wrapper.unmount();
  });

  it('Escape 关闭弹窗并阻止冒泡', async () => {
    const onClose = vi.fn();
    const parentHandler = vi.fn();
    document.addEventListener('keydown', parentHandler);
    const wrapper = mount(Dialog, { props: { onClose }, attachTo: document.body });
    await nextTick();
    await nextTick();

    fire(document.activeElement, 'Escape');
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(parentHandler).not.toHaveBeenCalled();

    document.removeEventListener('keydown', parentHandler);
    wrapper.unmount();
  });

  it('Tab 在首尾之间循环', async () => {
    const wrapper = mount(Dialog, { props: { onClose: () => {} }, attachTo: document.body });
    await nextTick();
    await nextTick();

    const last = wrapper.find('#last').element;
    last.focus();
    fire(last, 'Tab');
    expect(document.activeElement?.id).toBe('first');

    const first = wrapper.find('#first').element;
    first.focus();
    fire(first, 'Tab', { shiftKey: true });
    expect(document.activeElement?.id).toBe('last');

    wrapper.unmount();
  });

  it('卸载后恢复之前的焦点', async () => {
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();

    const wrapper = mount(Dialog, { props: { onClose: () => {} }, attachTo: document.body });
    await nextTick();
    await nextTick();
    expect(document.activeElement).not.toBe(outside);

    wrapper.unmount();
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });

  it('默认不因点击外部关闭', async () => {
    const onClose = vi.fn();
    const wrapper = mount(Dialog, { props: { onClose }, attachTo: document.body });
    await nextTick();
    await nextTick();

    click(document.body);
    expect(onClose).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('启用后点击外部关闭，并拦截这次点击不落到背后控件', async () => {
    const onClose = vi.fn();
    const behind = document.createElement('button');
    const behindHandler = vi.fn();
    behind.addEventListener('click', behindHandler);
    document.body.appendChild(behind);

    const wrapper = mount(OutsideCloseDialog, { props: { onClose }, attachTo: document.body });
    await nextTick();
    await nextTick();

    click(behind);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(behindHandler).not.toHaveBeenCalled();

    behind.remove();
    wrapper.unmount();
  });

  it('点击弹窗内部不关闭且事件正常冒泡', async () => {
    const onClose = vi.fn();
    const wrapper = mount(OutsideCloseDialog, { props: { onClose }, attachTo: document.body });
    await nextTick();
    await nextTick();

    const inside = wrapper.find('#inside');
    const insideHandler = vi.fn();
    inside.element.addEventListener('click', insideHandler);
    click(inside.element);

    expect(insideHandler).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();

    wrapper.unmount();
  });
});

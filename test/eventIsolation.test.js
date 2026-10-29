// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useEventIsolation } from '../src/composables/useEventIsolation.js';

function createPanel({ onInnerClick } = {}) {
  return defineComponent({
    setup() {
      const panelEl = ref(null);
      useEventIsolation(panelEl);
      return () =>
        h('div', { ref: panelEl, id: 'panel' }, [
          h('button', { id: 'inner', onClick: onInnerClick }, 'x'),
        ]);
    },
  });
}

describe('useEventIsolation', () => {
  it('面板内的点击不再冒泡到页面 document', async () => {
    const onInnerClick = vi.fn();
    const documentClick = vi.fn();
    document.addEventListener('click', documentClick);

    const wrapper = mount(createPanel({ onInnerClick }));
    wrapper.find('#inner').element.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true }),
    );

    // 面板内部处理器照常执行，页面侧收不到
    expect(onInnerClick).toHaveBeenCalledTimes(1);
    expect(documentClick).not.toHaveBeenCalled();

    document.removeEventListener('click', documentClick);
    wrapper.unmount();
  });

  it('面板外的事件仍能到达页面', () => {
    const documentClick = vi.fn();
    document.addEventListener('click', documentClick);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(documentClick).toHaveBeenCalledTimes(1);

    document.removeEventListener('click', documentClick);
    outside.remove();
  });
});

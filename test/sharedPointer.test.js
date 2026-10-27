// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import { subscribePointer } from '../src/composables/sharedPointer.js';

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function move(clientX, clientY) {
  document.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY, bubbles: true }));
}

describe('subscribePointer', () => {
  it('多个订阅者共享一个 document 监听器', async () => {
    const add = vi.spyOn(document, 'addEventListener');
    const first = vi.fn();
    const second = vi.fn();

    const offFirst = subscribePointer({ onMove: first });
    const offSecond = subscribePointer({ onMove: second });

    const moveListenerCount = add.mock.calls.filter(([type]) => type === 'mousemove').length;
    expect(moveListenerCount).toBe(1);

    move(10, 20);
    await nextFrame();

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    const [, path] = first.mock.calls[0];
    expect(Array.isArray(path)).toBe(true);

    offFirst();
    offSecond();
    expect(add.mock.calls.filter(([type]) => type === 'mousemove')).toHaveLength(1);
    add.mockRestore();
  });

  it('同一帧内的多次移动只处理最后一次', async () => {
    const handler = vi.fn();
    const off = subscribePointer({ onMove: handler });

    move(1, 1);
    move(2, 2);
    move(3, 3);
    await nextFrame();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].clientX).toBe(3);
    off();
  });

  it('取消订阅后不再调用', async () => {
    const handler = vi.fn();
    const off = subscribePointer({ onMove: handler });
    off();

    move(1, 1);
    await nextFrame();
    expect(handler).not.toHaveBeenCalled();
  });

  it('pointerdown 独立订阅与退订', () => {
    const handler = vi.fn();
    const off = subscribePointer({ onPointerDown: handler });

    document.dispatchEvent(new PointerEvent('pointerdown'));
    expect(handler).toHaveBeenCalledTimes(1);

    off();
    document.dispatchEvent(new PointerEvent('pointerdown'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

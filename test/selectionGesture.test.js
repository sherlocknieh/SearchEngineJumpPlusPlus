import { describe, expect, it } from 'vitest';
import {
  currentGestureId,
  isPointerPressed,
  trackSelectionPointer,
} from '../src/core/selectionGesture.js';

/** 最小事件目标：只记录监听器，供测试手动派发 */
function fakeTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    dispatch(type, event) {
      for (const handler of listeners.get(type) ?? []) handler(event);
    },
  };
}

describe('selectionGesture', () => {
  it('主键按下期间视为拖动中，松开后恢复', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    target.dispatch('pointerdown', { button: 0 });
    expect(isPointerPressed()).toBe(true);
    target.dispatch('pointerup', { button: 0 });
    expect(isPointerPressed()).toBe(false);
  });

  it('右键不触发拖动状态', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    target.dispatch('pointerdown', { button: 2 });
    expect(isPointerPressed()).toBe(false);
  });

  it('指针被取消或窗口失焦时同样结束拖动', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    target.dispatch('pointerdown', { button: 0 });
    target.dispatch('pointercancel', {});
    expect(isPointerPressed()).toBe(false);
    target.dispatch('pointerdown', { button: 0 });
    target.dispatch('blur', {});
    expect(isPointerPressed()).toBe(false);
  });
});

describe('selectionGesture 操作序号', () => {
  it('每次按下主键都开启新的操作序号', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    const first = currentGestureId();
    target.dispatch('pointerdown', { button: 0 });
    const second = currentGestureId();
    expect(second).toBeGreaterThan(first);
    target.dispatch('pointerup', { button: 0 });
    expect(currentGestureId()).toBe(second);
  });

  it('同一次点击内的鼠标松开与选区变化保持同一序号', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    target.dispatch('pointerdown', { button: 0 });
    const id = currentGestureId();
    target.dispatch('pointerup', { button: 0 });
    expect(currentGestureId()).toBe(id);
  });

  it('键盘操作也视为新的操作', () => {
    const target = fakeTarget();
    trackSelectionPointer(target);
    const before = currentGestureId();
    target.dispatch('keydown', { key: 'ArrowRight' });
    expect(currentGestureId()).toBeGreaterThan(before);
  });
});

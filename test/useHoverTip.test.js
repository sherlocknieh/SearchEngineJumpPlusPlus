// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createHoverTip } from '../src/composables/useHoverTip.js';

function anchor() {
  return document.createElement('a');
}

describe('useHoverTip', () => {
  let hoverTip;

  beforeEach(() => {
    vi.useFakeTimers();
    hoverTip = createHoverTip();
  });

  afterEach(() => {
    hoverTip.dispose();
    vi.useRealTimers();
  });

  it('悬停后延迟显示，而不是立刻弹出', () => {
    const a = anchor();
    hoverTip.show(a, '复制：标题');
    expect(hoverTip.tip.visible).toBe(false);
    vi.advanceTimersByTime(99);
    expect(hoverTip.tip.visible).toBe(false);
    vi.advanceTimersByTime(1);
    expect(hoverTip.tip.visible).toBe(true);
    expect(hoverTip.tip.text).toBe('复制：标题');
  });

  it('已有提示时移到相邻条目立即换内容', () => {
    const a = anchor();
    const b = anchor();
    hoverTip.show(a, '第一条');
    vi.advanceTimersByTime(100);
    hoverTip.show(b, '第二条');
    expect(hoverTip.tip.visible).toBe(true);
    expect(hoverTip.tip.text).toBe('第二条');
    expect(hoverTip.tip.anchor).toBe(b);
  });

  it('离开条目后留出宽限，相邻条目接管时不闪烁', () => {
    const a = anchor();
    const b = anchor();
    hoverTip.show(a, '第一条');
    vi.advanceTimersByTime(100);
    hoverTip.hide();
    vi.advanceTimersByTime(40);
    hoverTip.show(b, '第二条');
    vi.advanceTimersByTime(100);
    expect(hoverTip.tip.visible).toBe(true);
    expect(hoverTip.tip.text).toBe('第二条');
  });

  it('页面滚动或按下指针时收起提示', () => {
    const a = anchor();
    hoverTip.show(a, '目标');
    vi.advanceTimersByTime(100);
    window.dispatchEvent(new Event('scroll'));
    expect(hoverTip.tip.visible).toBe(false);
  });

  it('卸载时清空状态并移除全局监听', () => {
    const a = anchor();
    hoverTip.show(a, '目标');
    vi.advanceTimersByTime(100);
    hoverTip.dispose();
    expect(hoverTip.tip.visible).toBe(false);
    expect(hoverTip.tip.anchor).toBe(null);
    window.dispatchEvent(new Event('scroll'));
    expect(hoverTip.tip.visible).toBe(false);
  });
});

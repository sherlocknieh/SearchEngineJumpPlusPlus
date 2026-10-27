import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { runToastAction, showToast, ui } from '../src/stores/ui.js';

describe('showToast 优先级', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 让当前提示自然消失，复位模块内的优先级状态，避免影响后续用例
    vi.advanceTimersByTime(20000);
    vi.useRealTimers();
  });

  it('低优先级提示不会覆盖带操作按钮的提示', () => {
    showToast('已删除', 5000, { label: '撤销', onClick: vi.fn() });
    showToast('已保存', 1500, null, { priority: -1 });
    expect(ui.toastText).toBe('已删除');
    expect(ui.toastActionLabel).toBe('撤销');
  });

  it('没有可见提示时低优先级提示正常显示', () => {
    showToast('已保存', 1500, null, { priority: -1 });
    expect(ui.toastVisible).toBe(true);
    expect(ui.toastText).toBe('已保存');
  });

  it('普通提示可以覆盖自动保存提示', () => {
    showToast('已保存', 1500, null, { priority: -1 });
    showToast('已复制', 1500);
    expect(ui.toastText).toBe('已复制');
  });

  it('提示消失后优先级复位', () => {
    showToast('已删除', 1000, { label: '撤销', onClick: vi.fn() });
    vi.advanceTimersByTime(1000);
    showToast('已保存', 1500, null, { priority: -1 });
    expect(ui.toastVisible).toBe(true);
    expect(ui.toastText).toBe('已保存');
  });

  it('点击操作按钮会清除提示并执行回调', () => {
    const onClick = vi.fn();
    showToast('已删除', 5000, { label: '撤销', onClick });
    runToastAction();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(ui.toastVisible).toBe(false);
    expect(ui.toastActionLabel).toBe('');
  });
});

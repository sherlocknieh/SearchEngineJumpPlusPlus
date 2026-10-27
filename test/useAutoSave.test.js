import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAutoSave } from '../src/composables/useAutoSave.js';
import { t } from '../src/assets/i18n.js';
import { showToast, ui } from '../src/stores/ui.js';

function setup({ delay = 500 } = {}) {
  const unchanged = { fixedTop: false, engineList: {} };
  let current = unchanged;
  let built = unchanged;
  const settings = {
    savePartial: vi.fn(() => 'gm'),
    applySettings: vi.fn(() => 'gm'),
  };
  const api = useAutoSave({
    buildResult: () => built,
    getCurrent: () => current,
    settings,
    delay,
  });
  return {
    api,
    settings,
    setBuilt: (next) => (built = next),
    setCurrent: (next) => (current = next),
  };
}

describe('useAutoSave', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // 让残留的 toast 计时器走完，复位提示状态
    vi.advanceTimersByTime(20000);
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('节流后只保存一次', () => {
    const { api, settings, setBuilt } = setup();
    setBuilt({ fixedTop: true, engineList: {} });
    api.scheduleAutoSave();
    api.scheduleAutoSave();
    vi.advanceTimersByTime(499);
    expect(settings.savePartial).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(settings.savePartial).toHaveBeenCalledTimes(1);
    api.dispose();
  });

  it('内容未变化时不写入', () => {
    const { api, settings } = setup();
    api.scheduleAutoSave();
    vi.advanceTimersByTime(500);
    expect(settings.savePartial).not.toHaveBeenCalled();
    expect(api.takeSettingsChanged()).toBe(false);
    api.dispose();
  });

  it('自动保存成功后用 toast 提示', () => {
    const { api, setBuilt } = setup();
    setBuilt({ fixedTop: true, engineList: {} });
    api.scheduleAutoSave();
    vi.advanceTimersByTime(500);
    expect(ui.toastVisible).toBe(true);
    expect(ui.toastText).toBe(t('toast.autoSaved'));
    api.dispose();
  });

  it('自动保存提示不会覆盖「撤销」等带操作的提示', () => {
    const onClick = vi.fn();
    showToast('已删除', 5000, { label: '撤销', onClick });
    const { api, setBuilt } = setup();
    setBuilt({ fixedTop: true, engineList: {} });
    api.scheduleAutoSave();
    vi.advanceTimersByTime(500);
    expect(ui.toastText).toBe('已删除');
    expect(ui.toastActionLabel).toBe('撤销');
    api.dispose();
  });

  it('flushPending 立即落盘待保存的修改', () => {
    const { api, settings, setBuilt } = setup();
    api.scheduleAutoSave();
    setBuilt({ fixedTop: true, engineList: {} });
    api.flushPending();
    expect(settings.savePartial).toHaveBeenCalledTimes(1);
    expect(api.takeSettingsChanged()).toBe(true);
    // 取过一次后重置
    expect(api.takeSettingsChanged()).toBe(false);
    api.dispose();
  });

  it('saveNow 失败时返回 false 且不标记已修改', () => {
    const { api, settings, setBuilt } = setup();
    setBuilt({ fixedTop: true, engineList: {} });
    settings.applySettings.mockReturnValue('memory');
    expect(api.saveNow()).toBe(false);
    expect(api.saving.value).toBe(false);
    expect(api.takeSettingsChanged()).toBe(false);
    api.dispose();
  });

  it('saveNow 成功时标记已修改并清除待保存队列', () => {
    const { api, settings, setBuilt } = setup();
    setBuilt({ fixedTop: true, engineList: {} });
    api.scheduleAutoSave();
    expect(api.saveNow()).toBe(true);
    expect(settings.applySettings).toHaveBeenCalledTimes(1);
    expect(api.takeSettingsChanged()).toBe(true);

    // 主动保存已取消队列，定时器不应再写一次
    vi.advanceTimersByTime(1000);
    expect(settings.savePartial).not.toHaveBeenCalled();
    api.dispose();
  });
});

// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isRunning, teardown } from '../src/app/lifecycle.js';
import { useSettings } from '../src/stores/settings.js';
import { NAV_DEBOUNCE_MS, listenUrlChange, normalizeURL } from '../src/app/urlChange.js';

vi.mock('../src/app/lifecycle.js', () => ({
  isRunning: vi.fn(() => true),
  teardown: vi.fn(),
}));

vi.mock('../src/stores/settings.js', () => ({
  useSettings: vi.fn(),
}));

function dispatchUrlChange(url) {
  const event = new Event('urlchange');
  event.url = url;
  window.dispatchEvent(event);
}

function rule(source, flags = '') {
  return { url: new RegExp(source, flags) };
}

describe('normalizeURL', () => {
  it('移除 bilibili 的 vt 参数', () => {
    expect(normalizeURL('https://search.bilibili.com/all?keyword=x&vt=123')).toBe(
      'https://search.bilibili.com/all?keyword=x',
    );
  });

  it('无法解析时原样返回', () => {
    expect(normalizeURL('not a url')).toBe('not a url');
  });
});

describe('listenUrlChange', () => {
  const originalOnUrlChange = window.onurlchange;
  let disposers = [];

  beforeEach(() => {
    vi.useFakeTimers();
    window.onurlchange = null;
    vi.clearAllMocks();
    isRunning.mockReturnValue(true);
    useSettings.mockReturnValue({
      getMatchedRule: () => ({ url: /b\.test/ }),
      activeRule: { url: /a\.test/ },
      barMounted: true,
    });
    disposers = [];
  });

  afterEach(() => {
    disposers.forEach((dispose) => dispose());
    vi.useRealTimers();
    window.onurlchange = originalOnUrlChange;
  });

  function start(onNavigate) {
    disposers.push(listenUrlChange(onNavigate));
  }

  it('同一 URL 不触发重建', () => {
    start(vi.fn());
    dispatchUrlChange(location.href);
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);
    expect(teardown).not.toHaveBeenCalled();
  });

  it('连续导航合并为一次重建', () => {
    const onNavigate = vi.fn();
    start(onNavigate);

    dispatchUrlChange('https://a.test/1');
    dispatchUrlChange('https://a.test/2');
    dispatchUrlChange('https://a.test/3');
    expect(onNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);
    expect(teardown).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('规则未变且宿主仍在时只更新规则引用', () => {
    const matched = rule('a\\.test');
    const settings = {
      getMatchedRule: vi.fn(() => matched),
      activeRule: rule('a\\.test'),
      barMounted: true,
    };
    useSettings.mockReturnValue(settings);
    const onNavigate = vi.fn();
    start(onNavigate);

    dispatchUrlChange('https://a.test/next');
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);

    expect(teardown).not.toHaveBeenCalled();
    expect(onNavigate).not.toHaveBeenCalled();
    expect(settings.activeRule).toBe(matched);
  });

  it('命中规则变化时重建', () => {
    const settings = {
      getMatchedRule: vi.fn(() => rule('b\\.test')),
      activeRule: rule('a\\.test'),
      barMounted: true,
    };
    useSettings.mockReturnValue(settings);
    const onNavigate = vi.fn();
    start(onNavigate);

    dispatchUrlChange('https://b.test/');
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);

    expect(teardown).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('宿主已移除时直接重建，不读取设置', () => {
    isRunning.mockReturnValue(false);
    const onNavigate = vi.fn();
    start(onNavigate);

    dispatchUrlChange('https://a.test/other');
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);

    expect(useSettings).not.toHaveBeenCalled();
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('上次未成功挂载时路由变化后重试', () => {
    const settings = {
      getMatchedRule: vi.fn(() => rule('a\\.test')),
      activeRule: rule('a\\.test'),
      barMounted: false,
    };
    useSettings.mockReturnValue(settings);
    const onNavigate = vi.fn();
    start(onNavigate);

    dispatchUrlChange('https://a.test/retry');
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);

    expect(teardown).toHaveBeenCalledTimes(1);
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it('取消监听后不再响应路由变化', () => {
    const onNavigate = vi.fn();
    start(onNavigate);
    disposers.forEach((dispose) => dispose());
    disposers = [];

    dispatchUrlChange('https://a.test/after-dispose');
    vi.advanceTimersByTime(NAV_DEBOUNCE_MS);
    expect(onNavigate).not.toHaveBeenCalled();
  });
});

// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { applyDarkModeIfNeeded, isDarkMode } from '../src/core/darkMode.js';
import { getHost, reset } from '../src/core/shadowDom.js';

function clearThemeHints() {
  const els = [document.documentElement, document.body];
  for (const el of els) {
    el.removeAttribute('data-theme');
    el.removeAttribute('data-color-scheme');
    el.removeAttribute('data-color-mode');
    el.removeAttribute('theme');
    el.className = '';
    el.style.colorScheme = '';
  }
  document.body.style.backgroundColor = '';
}

const originalMatchMedia = window.matchMedia;

describe('isDarkMode', () => {
  afterEach(() => {
    clearThemeHints();
    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    } else {
      delete window.matchMedia;
    }
  });

  it('优先使用主题属性', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    expect(isDarkMode()).toBe(true);

    document.documentElement.setAttribute('data-theme', 'light');
    expect(isDarkMode()).toBe(false);

    document.body.setAttribute('data-color-scheme', 'dark');
    document.documentElement.removeAttribute('data-theme');
    expect(isDarkMode()).toBe(true);
  });

  it('属性未命中时使用 class', () => {
    document.documentElement.className = 'theme-dark';
    expect(isDarkMode()).toBe(true);

    document.documentElement.className = 'theme-light';
    expect(isDarkMode()).toBe(false);
  });

  it('color-scheme 为 light dark 时按背景色与系统偏好判断', () => {
    document.documentElement.style.colorScheme = 'light dark';

    document.body.style.backgroundColor = 'rgb(245, 246, 246)';
    window.matchMedia = vi.fn(() => ({ matches: true }));
    expect(isDarkMode()).toBe(false);

    document.body.style.backgroundColor = 'rgb(27, 27, 27)';
    expect(isDarkMode()).toBe(true);
  });

  it('color-scheme 只声明 dark 时判为暗色', () => {
    document.documentElement.style.colorScheme = 'dark';
    document.body.style.backgroundColor = 'rgb(245, 246, 246)';
    window.matchMedia = vi.fn(() => ({ matches: false }));
    expect(isDarkMode()).toBe(true);
  });

  it('没有主题提示时回退到 prefers-color-scheme', () => {
    window.matchMedia = vi.fn(() => ({ matches: true }));
    expect(isDarkMode()).toBe(true);

    window.matchMedia = vi.fn(() => ({ matches: false }));
    expect(isDarkMode()).toBe(false);
  });
});

describe('applyDarkModeIfNeeded', () => {
  afterEach(() => {
    clearThemeHints();
    reset();
  });

  it('按页面主题设置宿主属性并支持来回切换', () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    applyDarkModeIfNeeded();
    expect(getHost().hasAttribute('qxintheme')).toBe(true);

    document.documentElement.setAttribute('data-theme', 'light');
    applyDarkModeIfNeeded();
    expect(getHost().hasAttribute('qxintheme')).toBe(false);
  });
});

// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCSPNonce, resetCSPNonce } from '../src/core/csp.js';

describe('getCSPNonce', () => {
  afterEach(() => {
    document.querySelectorAll('[nonce]').forEach((el) => el.remove());
    resetCSPNonce();
    vi.restoreAllMocks();
  });

  it('找到 nonce 后缓存，避免每次注入样式都查询文档', () => {
    const style = document.createElement('style');
    style.setAttribute('nonce', 'abc123');
    document.head.appendChild(style);

    const query = vi.spyOn(document, 'querySelector');
    expect(getCSPNonce()).toBe('abc123');
    expect(getCSPNonce()).toBe('abc123');
    expect(query).toHaveBeenCalledTimes(1);
  });

  it('未找到时不缓存，后续可重新探测', () => {
    const query = vi.spyOn(document, 'querySelector');
    expect(getCSPNonce()).toBe('');
    expect(getCSPNonce()).toBe('');
    expect(query).toHaveBeenCalledTimes(2);
  });

  it('reset 后重新读取', () => {
    const style = document.createElement('style');
    style.setAttribute('nonce', 'first');
    document.head.appendChild(style);
    expect(getCSPNonce()).toBe('first');

    style.setAttribute('nonce', 'second');
    resetCSPNonce();
    expect(getCSPNonce()).toBe('second');
  });
});

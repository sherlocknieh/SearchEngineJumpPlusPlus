import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LOCAL_PREFIX,
  cloneValue,
  isPresent,
  probeBackend,
  readLocal,
  removeLocal,
  writeLocal,
} from '../src/core/storageBackend.js';

function installLocalStorage() {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
  };
  return store;
}

describe('storageBackend 工具', () => {
  beforeEach(() => {
    installLocalStorage();
  });

  it('isPresent 只把 null/undefined 视为缺失', () => {
    expect(isPresent(0)).toBe(true);
    expect(isPresent('')).toBe(true);
    expect(isPresent(null)).toBe(false);
    expect(isPresent(undefined)).toBe(false);
  });

  it('cloneValue 深拷贝且不因循环引用抛错', () => {
    const source = { list: [1, 2] };
    const copy = cloneValue(source);
    copy.list.push(3);
    expect(source.list).toEqual([1, 2]);

    const circular = {};
    circular.self = circular;
    expect(cloneValue(circular)).toBe(circular);
  });

  it('localStorage 读写带统一前缀', () => {
    expect(writeLocal('k', { a: 1 })).toBe(true);
    expect(localStorage.getItem(LOCAL_PREFIX + 'k')).toBe('{"a":1}');
    expect(readLocal('k')).toEqual({ a: 1 });
    removeLocal('k');
    expect(readLocal('k')).toBeUndefined();
  });

  it('localStorage 不可用时安全降级', () => {
    globalThis.localStorage = {
      getItem() {
        throw new Error('denied');
      },
      setItem() {
        throw new Error('denied');
      },
      removeItem() {
        throw new Error('denied');
      },
    };
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(readLocal('k')).toBeUndefined();
    expect(writeLocal('k', 1)).toBe(false);
    expect(() => removeLocal('k')).not.toThrow();
    warn.mockRestore();
  });

  it('没有可用 GM API 时回退 local 后端', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await expect(probeBackend()).resolves.toBe('local');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

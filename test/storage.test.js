import { describe, expect, it } from 'vitest';
import { isSameValue } from '../src/core/storage.js';

describe('isSameValue', () => {
  it('忽略对象键顺序', () => {
    expect(isSameValue({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
  });

  it('区分数组与对象', () => {
    expect(isSameValue([], {})).toBe(false);
    expect(isSameValue([1, 2], [1, 2])).toBe(true);
    expect(isSameValue([1, 2], [2, 1])).toBe(false);
  });

  it('递归比较嵌套结构', () => {
    const a = { list: [{ name: 'x', url: 'https://a.test' }], flag: true };
    const b = { flag: true, list: [{ url: 'https://a.test', name: 'x' }] };
    expect(isSameValue(a, b)).toBe(true);
    b.list[0].url = 'https://b.test';
    expect(isSameValue(a, b)).toBe(false);
  });

  it('键数量不同即不等', () => {
    expect(isSameValue({ a: 1 }, { a: 1, b: undefined })).toBe(false);
  });

  it('处理原始值与 null', () => {
    expect(isSameValue(null, null)).toBe(true);
    expect(isSameValue(null, {})).toBe(false);
    expect(isSameValue('a', 'a')).toBe(true);
  });
});

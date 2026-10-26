import { describe, expect, it } from 'vitest';
import {
  extractKeyword,
  encodeKeyword,
  prepareJump,
  shouldOpenInNewTab,
} from '../src/core/jump.js';

describe('extractKeyword', () => {
  it('支持函数、输入框与普通元素', () => {
    expect(extractKeyword(() => 'fn')).toBe('fn');
    expect(extractKeyword({ nodeName: 'INPUT', value: 'input' })).toBe('input');
    expect(extractKeyword({ textContent: 'text' })).toBe('text');
    expect(extractKeyword(null)).toBe('');
  });
});

describe('encodeKeyword', () => {
  it('对关键词进行 URL 编码', () => {
    expect(encodeKeyword('a b&c')).toBe('a%20b%26c');
  });
});

describe('prepareJump', () => {
  const engine = { url: 'https://a.test/?q=%s' };

  it('生成 GET 目标并替换全部占位符', () => {
    expect(prepareJump({ url: 'https://a.test/?q=%s&r=%s' }, 'a b', {})).toEqual({
      type: 'get',
      url: 'https://a.test/?q=a%20b&r=a%20b',
    });
  });

  it('支持 $post$ 表单目标', () => {
    expect(prepareJump({ url: 'https://a.test/search$post$q' }, 'a b', {})).toEqual({
      type: 'post',
      action: 'https://a.test/search',
      field: 'q',
      value: 'a b',
    });
  });

  it('HideTheSameLink 为 false 时移除 site: 限定', () => {
    // 现有实现只删除 site: 片段，分隔空格会被编码，断言保持当前行为
    expect(prepareJump(engine, 'site:a.test keyword', { hideTheSameLink: false }).url).toBe(
      'https://a.test/?q=%20keyword',
    );
  });

  it('HideTheSameLink 为 true 时保留 site: 限定', () => {
    expect(prepareJump(engine, 'site:a.test keyword', { hideTheSameLink: true }).url).toBe(
      'https://a.test/?q=site%3Aa.test%20keyword',
    );
  });
});

describe('shouldOpenInNewTab', () => {
  it('批量打开强制新标签页', () => {
    expect(shouldOpenInNewTab({ target: '_self' }, true)).toBe(true);
  });

  it('默认新标签页，_self 例外', () => {
    expect(shouldOpenInNewTab({})).toBe(true);
    expect(shouldOpenInNewTab({ target: '_self' })).toBe(false);
  });
});

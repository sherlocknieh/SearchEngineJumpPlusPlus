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
    expect(prepareJump({ url: 'https://a.test/?q=%s&r=%s' }, 'a b')).toEqual({
      type: 'get',
      url: 'https://a.test/?q=a%20b&r=a%20b',
    });
  });

  it('支持 $post$ 表单目标', () => {
    expect(prepareJump({ url: 'https://a.test/search$post$q' }, 'a b')).toEqual({
      type: 'post',
      action: 'https://a.test/search',
      field: 'q',
      value: 'a b',
    });
  });

  it('关键词原样编码，保留 site: 限定', () => {
    expect(prepareJump(engine, 'site:a.test keyword').url).toBe(
      'https://a.test/?q=site%3Aa.test%20keyword',
    );
  });
});

describe('shouldOpenInNewTab', () => {
  it('批量打开强制新标签页', () => {
    expect(shouldOpenInNewTab({ target: '_self' }, true)).toBe(true);
  });

  it('未配置打开方式时默认新标签页', () => {
    expect(shouldOpenInNewTab({})).toBe(true);
    expect(shouldOpenInNewTab({ url: 'https://a.test/?q=%s', target: '_blank' })).toBe(true);
  });

  it('显式选择当前页时才原地跳转', () => {
    expect(shouldOpenInNewTab({ target: '_self' })).toBe(false);
  });
});

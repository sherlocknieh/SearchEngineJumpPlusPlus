import { describe, expect, it } from 'vitest';
import {
  extractKeyword,
  encodeKeyword,
  isSameSiteUrl,
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

  it('HideTheSameLink 为 false 时移除 site: 限定及多余空格', () => {
    expect(prepareJump(engine, 'site:a.test keyword', { hideTheSameLink: false }).url).toBe(
      'https://a.test/?q=keyword',
    );
    expect(prepareJump(engine, '  site:a.test   keyword', { hideTheSameLink: false }).url).toBe(
      'https://a.test/?q=keyword',
    );
    expect(
      prepareJump(engine, 'site:a.test site:b.test keyword', { hideTheSameLink: false }).url,
    ).toBe('https://a.test/?q=keyword');
  });

  it('不把普通单词中的 site: 当作限定', () => {
    expect(prepareJump(engine, 'website:a.test', { hideTheSameLink: false }).url).toBe(
      'https://a.test/?q=website%3Aa.test',
    );
  });

  it('只有 site: 时生成空关键词', () => {
    expect(prepareJump(engine, 'site:a.test', { hideTheSameLink: false }).url).toBe(
      'https://a.test/?q=',
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

  it('未配置打开方式时默认新标签页（当前页未知）', () => {
    expect(shouldOpenInNewTab({})).toBe(true);
    expect(shouldOpenInNewTab({ target: '_self' })).toBe(false);
  });

  it('本站链接原地跳转，其他站点新标签页', () => {
    const href = 'https://www.a.test/search?q=x';
    expect(shouldOpenInNewTab({ url: 'https://a.test/?q=%s' }, false, href)).toBe(false);
    expect(shouldOpenInNewTab({ url: 'https://m.a.test/?q=%s' }, false, href)).toBe(false);
    expect(shouldOpenInNewTab({ url: 'https://b.test/?q=%s' }, false, href)).toBe(true);
  });

  it('显式打开方式优先于本站判定', () => {
    const href = 'https://a.test/search?q=x';
    expect(shouldOpenInNewTab({ url: 'https://a.test/?q=%s', target: '_blank' }, false, href)).toBe(
      true,
    );
    expect(shouldOpenInNewTab({ url: 'https://b.test/?q=%s', target: '_self' }, false, href)).toBe(
      false,
    );
  });
});

describe('isSameSiteUrl', () => {
  it('按可注册域名比较，忽略子域与协议', () => {
    expect(isSameSiteUrl('https://www.a.test/x', 'http://a.test/y')).toBe(true);
    expect(isSameSiteUrl('https://m.a.test/x', 'https://a.test/y')).toBe(true);
    expect(isSameSiteUrl('https://b.test/x', 'https://a.test/y')).toBe(false);
    expect(isSameSiteUrl('', 'https://a.test/y')).toBe(false);
  });
});

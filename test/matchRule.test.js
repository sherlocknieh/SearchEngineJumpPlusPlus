import { describe, expect, it } from 'vitest';
import { matchRule } from '../src/data/matchRule.js';

describe('matchRule', () => {
  it('按主机名匹配 B 站搜索页', () => {
    const rule = matchRule('https://search.bilibili.com/all?keyword=vue');
    expect(rule).not.toBeNull();
    expect(rule.hosts).toContain('search.bilibili.com');
  });

  it('按后缀匹配子域名', () => {
    const rule = matchRule('https://www.bing.com/search?q=test');
    expect(rule).not.toBeNull();
    expect(rule.hostSuffixes).toContain('bing.com');
  });

  it('同一主机但 URL 不匹配时返回 null', () => {
    expect(matchRule('https://www.bing.com/account')).toBeNull();
  });

  it('未知站点返回 null', () => {
    expect(matchRule('https://example.com/')).toBeNull();
  });

  it('非法 URL 返回 null', () => {
    expect(matchRule('not a url')).toBeNull();
  });

  it('重复调用结果稳定（正则 lastIndex 已重置）', () => {
    const href = 'https://www.google.com/search?q=vitest';
    expect(matchRule(href)?.url.test(href)).toBe(true);
    expect(matchRule(href)?.url.test(href)).toBe(true);
  });
});

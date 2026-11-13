// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { resolveLinkHit, resolveLinkUrl } from '../src/core/linkAction.js';

function link(attrs = {}, text = '') {
  const el = document.createElement('a');
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (text) el.textContent = text;
  document.body.appendChild(el);
  return el;
}

describe('resolveLinkUrl', () => {
  it('取链接的绝对地址，支持相对路径', () => {
    expect(resolveLinkUrl(link({ href: '/post/1' }), 'https://site.test/list')).toBe(
      new URL('/post/1', 'https://site.test/list').href,
    );
    expect(resolveLinkUrl(link({ href: 'https://cdn.test/a' }))).toBe('https://cdn.test/a');
  });

  it('从链接内部元素向上找到 a', () => {
    const a = link({ href: 'https://site.test/a' });
    const span = document.createElement('span');
    a.appendChild(span);
    expect(resolveLinkUrl(span)).toBe('https://site.test/a');
  });

  it('mailto 与 tel 链接同样可用', () => {
    expect(resolveLinkUrl(link({ href: 'mailto:a@test.com' }))).toBe('mailto:a@test.com');
    expect(resolveLinkUrl(link({ href: 'tel:123456' }))).toBe('tel:123456');
  });

  it('页内锚点、脚本链接与非链接元素不接管', () => {
    expect(resolveLinkUrl(link({ href: '#section' }))).toBe('');
    expect(resolveLinkUrl(link({ href: 'javascript:void(0)' }))).toBe('');
    expect(resolveLinkUrl(link({ href: '' }))).toBe('');
    expect(resolveLinkUrl(document.createElement('div'))).toBe('');
    expect(resolveLinkUrl(null)).toBe('');
  });
});

describe('resolveLinkHit', () => {
  it('同时返回链接文字与地址，文字用于复制', () => {
    const a = link({ href: '/p' }, '  示例   链接  ');
    const hit = resolveLinkHit(a, 'https://site.test/');
    expect(hit.url).toBe('https://site.test/p');
    expect(hit.text).toBe('示例 链接');
    expect(hit.element).toBe(a);
  });

  it('链接内含标题时只取标题，忽略站点名与面包屑', () => {
    const a = link({ href: 'https://en.wikipedia.org/wiki/Test' });
    a.innerHTML =
      '<h3>Test</h3><div><span>Wikipedia</span><cite>en.wikipedia.org › wiki › Test</cite></div>';
    expect(resolveLinkHit(a).text).toBe('Test');
  });

  it('没有标题时回退到 aria-label', () => {
    const a = link({ href: 'https://site.test/p', 'aria-label': '  文章   标题 ' });
    a.innerHTML = '<span>图标</span>';
    expect(resolveLinkHit(a).text).toBe('文章 标题');
  });

  it('纯图片链接没有文字时文字留空，由调用方回退到地址', () => {
    const a = link({ href: 'https://site.test/p' });
    a.appendChild(document.createElement('img'));
    expect(resolveLinkHit(a).text).toBe('');
  });
});

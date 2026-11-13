// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { resolveImageUrl } from '../src/core/imageSearch.js';

function img(attrs = {}) {
  const el = document.createElement('img');
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function box(style = {}, size = 120) {
  const el = document.createElement('div');
  Object.assign(el.style, style);
  el.getBoundingClientRect = () => ({
    width: size,
    height: size,
    top: 0,
    left: 0,
    right: size,
    bottom: size,
    x: 0,
    y: 0,
  });
  document.body.appendChild(el);
  return el;
}

describe('resolveImageUrl', () => {
  it('取图片的绝对地址，支持相对路径', () => {
    // 浏览器会把 src 解析成绝对地址，currentSrc 因此优先于原始属性
    expect(resolveImageUrl(img({ src: '/a.png' }), 'https://site.test/post')).toBe(
      new URL('/a.png', document.baseURI).href,
    );
    expect(resolveImageUrl(img({ src: 'https://cdn.test/a.png' }))).toBe('https://cdn.test/a.png');
  });

  it('src 是占位图时回退到懒加载属性', () => {
    const el = img({
      src: 'data:image/gif;base64,R0lGOD',
      'data-src': 'https://cdn.test/real.jpg',
    });
    expect(resolveImageUrl(el)).toBe('https://cdn.test/real.jpg');
  });

  it('从图片内部元素向上找到 img', () => {
    const el = img({ src: 'https://cdn.test/a.png' });
    const inner = document.createElement('span');
    el.appendChild(inner);
    expect(resolveImageUrl(inner)).toBe('https://cdn.test/a.png');
  });

  it('非图片或地址不可用时返回空串', () => {
    expect(resolveImageUrl(document.createElement('div'))).toBe('');
    expect(resolveImageUrl(null)).toBe('');
    expect(resolveImageUrl(img({ src: 'data:image/png;base64,AAA' }))).toBe('');
    expect(resolveImageUrl(img({ src: 'javascript:alert(1)' }))).toBe('');
  });

  it('没有 img 时向上查找背景图容器', () => {
    const card = box({ backgroundImage: 'url("https://cdn.test/cover.jpg")' });
    const inner = document.createElement('span');
    card.appendChild(inner);
    expect(resolveImageUrl(inner)).toBe('https://cdn.test/cover.jpg');
  });

  it('忽略渐变、data: 背景图与过小的容器', () => {
    const gradient = box({ backgroundImage: 'linear-gradient(#fff, #000)' });
    expect(resolveImageUrl(gradient)).toBe('');

    const inline = box({ backgroundImage: 'url("data:image/png;base64,AAA")' });
    expect(resolveImageUrl(inline)).toBe('');

    const tiny = box({ backgroundImage: 'url("https://cdn.test/icon.png")' }, 16);
    expect(resolveImageUrl(tiny)).toBe('');
  });

  it('img 地址不可用时继续向上找背景图', () => {
    const card = box({ backgroundImage: 'url(https://cdn.test/cover.jpg)' });
    const el = img({ src: 'data:image/gif;base64,R0lGOD' });
    card.appendChild(el);
    expect(resolveImageUrl(el)).toBe('https://cdn.test/cover.jpg');
  });
});

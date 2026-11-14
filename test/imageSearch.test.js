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

  it('按下的是盖住图片的链接或浮层时，按坐标找到下面的图片', () => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    link.href = 'https://site.test/page';
    const image = img({ src: 'https://cdn.test/a.png' });
    image.getBoundingClientRect = () => ({
      width: 120,
      height: 120,
      top: 0,
      left: 0,
      right: 120,
      bottom: 120,
      x: 0,
      y: 0,
    });
    link.appendChild(image);
    const overlay = document.createElement('a');
    overlay.href = 'https://site.test/page';
    overlay.textContent = '标题';
    figure.append(link, overlay);
    document.body.appendChild(figure);

    // 链接本身与盖在上面的标题链接都能按坐标找到图片
    expect(resolveImageUrl(link, undefined, { x: 50, y: 50 })).toBe('https://cdn.test/a.png');
    expect(resolveImageUrl(overlay, undefined, { x: 50, y: 50 })).toBe('https://cdn.test/a.png');
    // 坐标不在图片范围内时不去猜
    expect(resolveImageUrl(overlay, undefined, { x: 200, y: 200 })).toBe('');
  });

  it('按坐标兜底时忽略图标大小的小图', () => {
    const card = document.createElement('div');
    const icon = img({ src: 'https://cdn.test/icon.png' });
    icon.getBoundingClientRect = () => ({
      width: 16,
      height: 16,
      top: 0,
      left: 0,
      right: 16,
      bottom: 16,
      x: 0,
      y: 0,
    });
    const inner = document.createElement('span');
    card.append(icon, inner);
    document.body.appendChild(card);
    expect(resolveImageUrl(inner, undefined, { x: 8, y: 8 })).toBe('');
  });
});

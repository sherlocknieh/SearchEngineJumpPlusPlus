// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import { isInlineImageAddress, resolveImageHit } from '../src/core/imageSearch.js';

function img(attrs = {}) {
  const el = document.createElement('img');
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

/** happy-dom 不会解码图片，自然尺寸按需伪造：内联图靠它区分真实缩略图与占位图 */
function setNaturalSize(el, size) {
  Object.defineProperty(el, 'naturalWidth', { value: size, configurable: true });
  Object.defineProperty(el, 'naturalHeight', { value: size, configurable: true });
  return el;
}

/** 测试基本只关心命中的地址 */
function imageUrl(target, base, point) {
  return resolveImageHit(target, base, point)?.url || '';
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

describe('resolveImageHit', () => {
  it('取图片的绝对地址，支持相对路径', () => {
    // 浏览器会把 src 解析成绝对地址，currentSrc 因此优先于原始属性
    expect(imageUrl(img({ src: '/a.png' }), 'https://site.test/post')).toBe(
      new URL('/a.png', document.baseURI).href,
    );
    expect(imageUrl(img({ src: 'https://cdn.test/a.png' }))).toBe('https://cdn.test/a.png');
  });

  it('src 是占位图时回退到懒加载属性', () => {
    const el = img({
      src: 'data:image/gif;base64,R0lGOD',
      'data-src': 'https://cdn.test/real.jpg',
    });
    expect(imageUrl(el)).toBe('https://cdn.test/real.jpg');
  });

  it('从图片内部元素向上找到 img', () => {
    const el = img({ src: 'https://cdn.test/a.png' });
    const inner = document.createElement('span');
    el.appendChild(inner);
    expect(imageUrl(inner)).toBe('https://cdn.test/a.png');
  });

  it('非图片或地址不可用时返回空串', () => {
    expect(imageUrl(document.createElement('div'))).toBe('');
    expect(imageUrl(null)).toBe('');
    expect(imageUrl(img({ src: 'javascript:alert(1)' }))).toBe('');
  });

  it('内联缩略图按图片命中，地址就是 data:image 自身', () => {
    // Google 图片把 92px 缩略图直接内联成 data: JPEG
    const inline = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const el = img({ src: inline });
    setNaturalSize(el, 92);
    expect(resolveImageHit(el)).toEqual({ url: inline, element: el });
    // 懒加载属性里有真实地址时仍优先用它
    const lazy = img({ src: inline, 'data-src': 'https://cdn.test/real.jpg' });
    setNaturalSize(lazy, 92);
    expect(imageUrl(lazy)).toBe('https://cdn.test/real.jpg');
  });

  it('内联的 1x1 占位图不算图片，继续交给背景图', () => {
    const card = box({ backgroundImage: 'url("https://cdn.test/cover.jpg")' });
    const el = img({ src: 'data:image/gif;base64,R0lGOD' });
    setNaturalSize(el, 1);
    card.appendChild(el);
    expect(imageUrl(el)).toBe('https://cdn.test/cover.jpg');
  });

  it('没有 img 时向上查找背景图容器', () => {
    const card = box({ backgroundImage: 'url("https://cdn.test/cover.jpg")' });
    const inner = document.createElement('span');
    card.appendChild(inner);
    expect(imageUrl(inner)).toBe('https://cdn.test/cover.jpg');
  });

  it('忽略渐变、data: 背景图与过小的容器', () => {
    const gradient = box({ backgroundImage: 'linear-gradient(#fff, #000)' });
    expect(imageUrl(gradient)).toBe('');

    const inline = box({ backgroundImage: 'url("data:image/png;base64,AAA")' });
    expect(imageUrl(inline)).toBe('');

    const tiny = box({ backgroundImage: 'url("https://cdn.test/icon.png")' }, 16);
    expect(imageUrl(tiny)).toBe('');
  });

  it('内联占位图没有可用地址时继续向上找背景图', () => {
    const card = box({ backgroundImage: 'url(https://cdn.test/cover.jpg)' });
    const el = img({ src: 'data:image/gif;base64,R0lGOD' });
    card.appendChild(el);
    expect(imageUrl(el)).toBe('https://cdn.test/cover.jpg');
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
    expect(imageUrl(link, undefined, { x: 50, y: 50 })).toBe('https://cdn.test/a.png');
    expect(imageUrl(overlay, undefined, { x: 50, y: 50 })).toBe('https://cdn.test/a.png');
    // 坐标不在图片范围内时不去猜
    expect(imageUrl(overlay, undefined, { x: 200, y: 200 })).toBe('');
  });

  it('被链接盖住的内联缩略图同样按坐标命中', () => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    link.href = 'https://site.test/page';
    const inline = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const image = setNaturalSize(img({ src: inline }), 92);
    image.getBoundingClientRect = () => ({
      width: 92,
      height: 92,
      top: 0,
      left: 0,
      right: 92,
      bottom: 92,
      x: 0,
      y: 0,
    });
    link.appendChild(image);
    const overlay = document.createElement('a');
    overlay.href = 'https://site.test/page';
    overlay.textContent = '标题';
    figure.append(link, overlay);
    document.body.appendChild(figure);

    expect(resolveImageHit(overlay, undefined, { x: 40, y: 40 })).toMatchObject({
      url: inline,
      element: image,
    });
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
    expect(imageUrl(inner, undefined, { x: 8, y: 8 })).toBe('');
  });
});

describe('内联图片地址识别', () => {
  it('只把 data:image 认作内联图片', () => {
    expect(isInlineImageAddress('data:image/png;base64,iVBORw0KGgo=')).toBe(true);
    expect(isInlineImageAddress('  data:image/jpeg;base64,AAA  ')).toBe(true);
    expect(isInlineImageAddress('https://cdn.test/a.png')).toBe(false);
    expect(isInlineImageAddress('')).toBe(false);
    expect(isInlineImageAddress(null)).toBe(false);
  });
});

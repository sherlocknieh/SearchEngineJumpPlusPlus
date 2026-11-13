// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import {
  getImageEngines,
  resolveImageUrl,
  shouldHandleImageContextMenu,
} from '../src/core/imageSearch.js';

function img(attrs = {}) {
  const el = document.createElement('img');
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

describe('resolveImageUrl', () => {
  it('取图片的绝对地址，支持相对路径与 srcset 选中的地址', () => {
    // 浏览器会把 src 解析成绝对地址，currentSrc 因此优先于原始属性
    expect(resolveImageUrl(img({ src: '/a.png' }), 'https://site.test/post')).toBe(
      new URL('/a.png', document.baseURI).href,
    );
    expect(resolveImageUrl(img({ src: 'https://cdn.test/a.png' }))).toBe('https://cdn.test/a.png');
  });

  it('src 是占位图时回退到懒加载属性', () => {
    const el = img({ src: 'data:image/gif;base64,R0lGOD', 'data-src': 'https://cdn.test/real.jpg' });
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
});

describe('shouldHandleImageContextMenu', () => {
  const imageUrl = 'https://cdn.test/a.png';

  it('关闭时不接管', () => {
    expect(shouldHandleImageContextMenu({ mode: 'off', imageUrl })).toBe(false);
  });

  it('menu 模式直接接管，alt 模式只在按住 Alt 时接管', () => {
    expect(shouldHandleImageContextMenu({ mode: 'menu', imageUrl })).toBe(true);
    expect(shouldHandleImageContextMenu({ mode: 'alt', imageUrl })).toBe(false);
    expect(shouldHandleImageContextMenu({ mode: 'alt', altKey: true, imageUrl })).toBe(true);
  });

  it('触屏设备没有 Alt 键，alt 模式按直接触发处理', () => {
    expect(shouldHandleImageContextMenu({ mode: 'alt', imageUrl, touchOnly: true })).toBe(true);
    expect(shouldHandleImageContextMenu({ mode: 'off', imageUrl, touchOnly: true })).toBe(false);
  });

  it('没有图片地址时一律不接管', () => {
    expect(shouldHandleImageContextMenu({ mode: 'menu', imageUrl: '' })).toBe(false);
  });
});

describe('getImageEngines', () => {
  it('只返回图片分类下启用且带链接的引擎', () => {
    const engines = getImageEngines({
      engineList: {
        image: [
          { name: 'A', url: 'https://a.test/?url=%s' },
          { name: 'B', url: 'https://b.test/?url=%s', disable: true },
          { name: 'C', url: '' },
        ],
      },
    });
    expect(engines.map((engine) => engine.name)).toEqual(['A']);
  });

  it('缺少图片分类时返回空数组', () => {
    expect(getImageEngines({})).toEqual([]);
    expect(getImageEngines(null)).toEqual([]);
  });
});

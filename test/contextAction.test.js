// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import {
  LONG_PRESS_MOVE_TOLERANCE,
  contextActionHintKey,
  contextActionTarget,
  contextCategoryKey,
  getContextEngines,
  isLongPressMove,
} from '../src/core/contextAction.js';

describe('isLongPressMove', () => {
  it('小范围抖动不算移动，超过阈值才算', () => {
    expect(isLongPressMove(100, 100, 103, 104)).toBe(false);
    expect(isLongPressMove(100, 100, 100 + LONG_PRESS_MOVE_TOLERANCE + 1, 100)).toBe(true);
  });
});

describe('contextCategoryKey', () => {
  it('图片与链接分别对应搜图、操作分类', () => {
    expect(contextCategoryKey('image')).toBe('image');
    expect(contextCategoryKey('link')).toBe('actions');
    expect(contextCategoryKey('')).toBe('');
    expect(contextCategoryKey('unknown')).toBe('');
  });
});

describe('getContextEngines', () => {
  it('图片模式只取搜图分类下启用且带链接的引擎', () => {
    const engines = getContextEngines(
      {
        engineList: {
          image: [
            { name: 'A', url: 'https://a.test/?url=%s' },
            { name: 'B', url: 'https://b.test/?url=%s', disable: true },
            { name: 'C', url: '' },
          ],
        },
      },
      'image',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['A']);
  });

  it('链接模式取操作分类下启用的复制/打开动作', () => {
    const engines = getContextEngines(
      {
        engineList: {
          actions: [
            { name: '复制', url: '', action: 'copy' },
            { name: '打开', url: '', action: 'open' },
            { name: '隐藏', url: '', action: 'open', disable: true },
            { name: '空项', url: '' },
          ],
        },
      },
      'link',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['复制', '打开']);
  });

  it('缺少分类或模式未知时返回空数组', () => {
    expect(getContextEngines({}, 'image')).toEqual([]);
    expect(getContextEngines(null, 'link')).toEqual([]);
    expect(getContextEngines({ engineList: { web: [{ url: 'https://a.test/?q=%s' }] } })).toEqual(
      [],
    );
  });
});

describe('contextActionTarget', () => {
  const hit = { keyword: '示例标题', url: 'https://site.test/a' };

  it('链接复制标题加地址，打开只用地址', () => {
    expect(contextActionTarget('link', 'copy', hit)).toBe('示例标题\nhttps://site.test/a');
    expect(contextActionTarget('link', 'open', hit)).toBe('https://site.test/a');
  });

  it('纯图片链接没有标题时只复制地址', () => {
    const url = 'https://site.test/a.png';
    expect(contextActionTarget('link', 'copy', { keyword: url, url })).toBe(url);
  });

  it('图片复制图片本身，取不到时回退地址；打开用图片地址', () => {
    const image = { keyword: 'https://cdn.test/a.png', url: 'https://cdn.test/a.png' };
    expect(contextActionTarget('image', 'copy', image)).toEqual({
      text: 'https://cdn.test/a.png',
      url: 'https://cdn.test/a.png',
      image: 'https://cdn.test/a.png',
    });
    expect(contextActionTarget('image', 'open', image)).toBe('https://cdn.test/a.png');
  });
});

describe('contextActionHintKey', () => {
  it('同名动作在链接与图片情景下给出不同提示', () => {
    expect(contextActionHintKey('link', 'copy')).toBe('action.hintCopyLink');
    expect(contextActionHintKey('image', 'copy')).toBe('action.hintCopyImage');
    expect(contextActionHintKey('link', 'open')).toBe('action.hintOpenLink');
    expect(contextActionHintKey('image', 'open')).toBe('action.hintOpenImage');
  });

  it('未知情景或动作没有提示', () => {
    expect(contextActionHintKey('', 'copy')).toBe('');
    expect(contextActionHintKey('image', 'unknown')).toBe('');
  });
});

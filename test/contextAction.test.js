// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import {
  LONG_PRESS_MOVE_TOLERANCE,
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
  it('图片与链接分别对应搜图、功能分类', () => {
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

  it('链接模式取功能分类下启用的复制/打开动作', () => {
    const engines = getContextEngines(
      {
        engineList: {
          actions: [
            { name: '复制', url: '', action: 'copy' },
            { name: '打开链接', url: '', action: 'open' },
            { name: '隐藏', url: '', action: 'open', disable: true },
            { name: '空项', url: '' },
          ],
        },
      },
      'link',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['复制', '打开链接']);
  });

  it('缺少分类或模式未知时返回空数组', () => {
    expect(getContextEngines({}, 'image')).toEqual([]);
    expect(getContextEngines(null, 'link')).toEqual([]);
    expect(getContextEngines({ engineList: { web: [{ url: 'https://a.test/?q=%s' }] } })).toEqual(
      [],
    );
  });
});

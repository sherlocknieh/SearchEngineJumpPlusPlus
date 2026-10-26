import { describe, expect, it } from 'vitest';
import {
  categoryNameKey,
  engineUrlKey,
  mergeIntoCategories,
  uniqueCategoryKey,
} from '../src/core/configMerge.js';

describe('engineUrlKey', () => {
  it('忽略协议与域名大小写、末尾斜杠', () => {
    expect(engineUrlKey('HTTPS://Example.COM/search/?q=%s')).toBe(
      'https://example.com/search/?q=%s',
    );
    expect(engineUrlKey('  https://example.com/search/  ')).toBe(
      'https://example.com/search/'.replace(/\/$/, ''),
    );
  });

  it('保留路径与占位符原样', () => {
    expect(engineUrlKey('https://a.test/?q=%s')).not.toBe(engineUrlKey('https://a.test/?q=%S'));
  });

  it('非字符串返回空串', () => {
    expect(engineUrlKey(null)).toBe('');
    expect(engineUrlKey(42)).toBe('');
  });
});

describe('categoryNameKey / uniqueCategoryKey', () => {
  it('分类名忽略空白与大小写', () => {
    expect(categoryNameKey('  搜索  ')).toBe('搜索');
    expect(categoryNameKey('Web')).toBe('web');
  });

  it('键名冲突时追加序号', () => {
    expect(uniqueCategoryKey('web', new Set())).toBe('web');
    expect(uniqueCategoryKey('web', new Set(['web']))).toBe('web-2');
    expect(uniqueCategoryKey('', new Set())).toBe('imported');
  });
});

describe('mergeIntoCategories', () => {
  const createId = (() => {
    let id = 0;
    return () => ++id;
  })();

  it('只追加新引擎并跳过重复链接', () => {
    const categories = [
      { name: '搜索', key: 'web', enabled: true, engines: [{ name: 'A', url: 'https://a.test' }] },
    ];
    const stats = mergeIntoCategories(
      categories,
      {
        engineCategories: [['搜索', 'web', true]],
        engineList: {
          web: [
            { name: 'A2', url: 'https://A.test/' },
            { name: 'B', url: 'https://b.test/?q=%s' },
          ],
        },
      },
      createId,
    );

    expect(stats).toEqual({ engines: 1, categories: 0, skipped: 1 });
    expect(categories[0].engines.map((e) => e.name)).toEqual(['A', 'B']);
  });

  it('没有匹配分类时新建分类并使用唯一键名', () => {
    const categories = [{ name: '其他', key: 'other', enabled: true, engines: [] }];
    const stats = mergeIntoCategories(
      categories,
      {
        engineCategories: [['导入', 'web', false]],
        engineList: { web: [{ name: 'X', url: 'https://x.test' }] },
      },
      createId,
    );

    expect(stats.categories).toBe(1);
    expect(categories[1]).toMatchObject({ name: '导入', key: 'web', enabled: false });
  });

  it('按名称匹配改名后的分类', () => {
    const categories = [{ name: 'Search', key: 'old-key', enabled: true, engines: [] }];
    mergeIntoCategories(
      categories,
      {
        engineCategories: [['search', 'new-key', true]],
        engineList: { 'new-key': [{ name: 'X', url: 'https://x.test' }] },
      },
      createId,
    );
    expect(categories).toHaveLength(1);
    expect(categories[0].engines).toHaveLength(1);
  });

  it('无法识别时返回 null', () => {
    expect(mergeIntoCategories([], 'nope', createId)).toBeNull();
  });
});

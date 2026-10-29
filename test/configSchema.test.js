import { describe, expect, it } from 'vitest';
import {
  OPTION_KEYS,
  configToText,
  createDefaultConfig,
  normalizeConfig,
  readConfig,
  serializeConfig,
} from '../src/core/configSchema.js';

describe('createDefaultConfig', () => {
  it('每次返回独立副本', () => {
    const a = createDefaultConfig();
    const b = createDefaultConfig();
    a.engineCategories.push(['x', 'x', true]);
    expect(b.engineCategories).toHaveLength(a.engineCategories.length - 1);
  });

  it('默认引擎为深拷贝，修改不会污染后续默认值', () => {
    const a = createDefaultConfig();
    const [key] = Object.keys(a.engineList);
    const originalName = a.engineList[key][0].name;

    a.engineList[key][0].name = 'mutated';

    expect(createDefaultConfig().engineList[key][0].name).toBe(originalName);
  });

  it('包含全部选项与默认引擎', () => {
    const config = createDefaultConfig();
    for (const key of OPTION_KEYS) expect(config).toHaveProperty(key);
    expect(Object.keys(config.engineList).length).toBeGreaterThan(0);
  });
});

describe('normalizeConfig', () => {
  const defaults = createDefaultConfig();

  it('类型错误的选项回退默认值', () => {
    const result = normalizeConfig(
      {
        fixedTop: 'yes',
        selectSearch: 0,
        selectSearchInInput: 'yes',
        language: 'fr',
        engineCategories: [],
      },
      defaults,
    );
    expect(result.fixedTop).toBe(defaults.fixedTop);
    expect(result.selectSearch).toBe(defaults.selectSearch);
    expect(result.selectSearchInInput).toBe(defaults.selectSearchInInput);
    expect(result.language).toBe('auto');
  });

  it('保留字符串 version 并丢弃其他类型', () => {
    expect(normalizeConfig({ version: 'v1' }, defaults).version).toBe('v1');
    expect(normalizeConfig({ version: 2 }, defaults).version).toBe('');
  });

  it('丢弃无效引擎并只保留已知字段', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['搜索', 'web', true]],
        engineList: {
          web: [
            { name: '有效', url: 'https://a.test/?q=%s', extra: 1, target: '_self' },
            { name: '无链接' },
          ],
        },
      },
      defaults,
    );
    expect(result.engineList.web).toEqual([
      { name: '有效', url: 'https://a.test/?q=%s', target: '_self' },
    ]);
  });

  it('保留动作引擎并允许没有链接', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['快捷', 'actions', true]],
        engineList: {
          actions: [
            { name: '复制', action: 'copy' },
            { name: '打开', action: 'open', url: 'https://ignored.test' },
            { name: '未知动作', action: 'paste' },
          ],
        },
      },
      defaults,
    );
    expect(result.engineList.actions).toEqual([
      { name: '复制', action: 'copy' },
      { name: '打开', url: 'https://ignored.test', action: 'open' },
    ]);
  });

  it('始终补回内置快捷动作分类与动作', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['搜索', 'web', true]],
        engineList: { web: [{ name: 'A', url: 'https://a.test' }] },
      },
      defaults,
    );
    expect(result.engineCategories).toContainEqual(['快捷', 'actions', true]);
    expect(result.engineList.actions.map((engine) => engine.action)).toEqual(['copy', 'open']);
  });

  it('保留内置分类的隐藏状态与自定义名称，只补缺失动作', () => {
    const result = normalizeConfig(
      {
        engineCategories: [
          ['快捷', 'actions', false],
          ['搜索', 'web', true],
        ],
        engineList: {
          actions: [{ name: '我的复制', action: 'copy', disable: true }],
          web: [],
        },
      },
      defaults,
    );
    expect(result.engineCategories[0]).toEqual(['快捷', 'actions', false]);
    expect(result.engineList.actions).toEqual([
      { name: '我的复制', action: 'copy', disable: true },
      { name: '打开链接', url: '', action: 'open' },
    ]);
  });

  it('缺少 engineList 时按分类键回退默认引擎', () => {
    const result = normalizeConfig({ engineCategories: [['搜索', 'web', true]] }, defaults);
    expect(result.engineList.web).toEqual(defaults.engineList.web);
  });

  it('分类损坏时整体回退默认分类', () => {
    const result = normalizeConfig({ engineCategories: 'broken' }, defaults);
    expect(result.engineCategories).toEqual(defaults.engineCategories);
  });
});

describe('serializeConfig', () => {
  it('按白名单序列化草稿，并保留草稿内部字段之外的数据', () => {
    const config = serializeConfig({
      options: { fixedTop: true, fixedTopUpward: false, language: 'en' },
      categories: [
        {
          name: '分类',
          key: 'cat',
          enabled: true,
          engines: [
            { _id: 1, name: 'A', url: 'https://a.test/?q=%s', favicon: 'x', disable: true },
            { _id: 2, name: 'B', url: '', target: '_blank' },
            { _id: 3, name: 'C', url: '', action: 'copy' },
          ],
        },
      ],
      version: 'v2',
    });

    expect(config.version).toBe('v2');
    expect(config.fixedTop).toBe(true);
    expect(config.language).toBe('en');
    expect(config.engineCategories).toEqual([['分类', 'cat', true]]);
    expect(config.engineList.cat).toEqual([
      { name: 'A', url: 'https://a.test/?q=%s', favicon: 'x', disable: true },
      // 空 url 的条目在面板阶段仍保留，交由编辑弹窗校验
      { name: 'B', url: '' },
      { name: 'C', url: '', action: 'copy' },
    ]);
    expect(config.engineList.cat[0]).not.toHaveProperty('_id');
  });
});

describe('configToText', () => {
  it('输出缩进 JSON 并清掉历史遗留字段', () => {
    const text = configToText({
      engineCategories: [],
      engineList: { engineCategories: ['legacy'] },
    });
    expect(text).toContain('\n    ');
    expect(JSON.parse(text).engineList).toEqual({});
  });
});

describe('readConfig', () => {
  it('接受标准配置', () => {
    const result = readConfig({
      engineCategories: [['搜索', 'web', true]],
      engineList: { web: [{ name: 'A', url: 'https://a.test' }] },
    });
    expect(result.engineCategories).toEqual([['搜索', 'web', true]]);
    expect(result.engineList.web).toHaveLength(1);
  });

  it('仅提供 engineList 时按同名分类补全', () => {
    const result = readConfig({ engineList: { web: [{ name: 'A', url: 'https://a.test' }] } });
    expect(result.engineCategories).toEqual([['web', 'web', true]]);
  });

  it('无法识别时返回 null', () => {
    expect(readConfig(null)).toBeNull();
    expect(readConfig({ engineList: {} })).toBeNull();
    expect(readConfig({ engineList: { web: 'nope' } })).toBeNull();
  });
});

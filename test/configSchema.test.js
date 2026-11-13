import { describe, expect, it } from 'vitest';
import {
  OPTION_KEYS,
  configToText,
  createDefaultConfig,
  normalizeConfig,
  readConfig,
  serializeConfig,
} from '../src/core/configSchema.js';
import { isBarCategoryVisible } from '../src/core/configData.js';

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

  it('包含全部选项与默认引擎，快捷动作排在首位', () => {
    const config = createDefaultConfig();
    for (const key of OPTION_KEYS) expect(config).toHaveProperty(key);
    expect(Object.keys(config.engineList).length).toBeGreaterThan(0);
    expect(config.engineCategories[0].slice(0, 2)).toEqual(['功能', 'actions']);
  });

  it('默认允许输入框内划词', () => {
    const config = createDefaultConfig();
    expect(config.selectSearchInInput).toBe(true);
  });

  it('默认从顶部滑出划词条，不跟随选区', () => {
    const config = createDefaultConfig();
    expect(config.selectionFollowPointer).toBe(false);
  });

  it('默认不启用只显示图标的简洁模式', () => {
    const config = createDefaultConfig();
    expect(config.selectionCompact).toBe(false);
  });

  it('默认不启用划词图标模式', () => {
    const config = createDefaultConfig();
    expect(config.selectionIcon).toBe(false);
  });

  it('内置搜图分类，长按搜图无需开关', () => {
    const config = createDefaultConfig();
    expect(config).not.toHaveProperty('imageSearch');
    // 搜图分类命名为「搜图」，紧跟「功能」分类，默认不隐藏
    expect(config.engineCategories[1]).toEqual(['搜图', 'image', true]);
    expect(config.engineList.image.length).toBeGreaterThan(0);
  });
});

describe('normalizeConfig', () => {
  const defaults = createDefaultConfig();

  it('类型错误的选项回退默认值', () => {
    const result = normalizeConfig(
      {
        center: 'yes',
        selectSearch: 0,
        selectSearchInInput: 'yes',
        selectionFollowPointer: 'yes',
        selectionCompact: 'yes',
        language: 'fr',
        engineCategories: [],
      },
      defaults,
    );
    expect(result.center).toBe(defaults.center);
    expect(result.selectSearch).toBe(defaults.selectSearch);
    expect(result.selectSearchInInput).toBe(defaults.selectSearchInInput);
    expect(result.selectionFollowPointer).toBe(defaults.selectionFollowPointer);
    expect(result.selectionCompact).toBe(defaults.selectionCompact);
    expect(result.language).toBe('auto');
  });

  it('默认打开方式非法时回退新标签页，合法值原样保留', () => {
    expect(normalizeConfig({ defaultOpenTarget: 'dialog' }, defaults).defaultOpenTarget).toBe(
      '_blank',
    );
    expect(normalizeConfig({ defaultOpenTarget: '_self' }, defaults).defaultOpenTarget).toBe(
      '_self',
    );
    expect(normalizeConfig({}, defaults).defaultOpenTarget).toBe('_blank');
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
    expect(result.engineCategories[0].slice(0, 2)).toEqual(['功能', 'actions']);
    expect(result.engineList.actions.map((engine) => engine.action)).toEqual(['copy', 'open']);
  });

  it('保留内置分类的隐藏状态与自定义名称，只补缺失动作', () => {
    const result = normalizeConfig(
      {
        engineCategories: [
          ['功能', 'actions', false],
          ['搜索', 'web', true],
        ],
        engineList: {
          actions: [{ name: '我的复制', action: 'copy', disable: true }],
          web: [],
        },
      },
      defaults,
    );
    expect(result.engineCategories[0]).toEqual(['功能', 'actions', false]);
    expect(result.engineList.actions).toEqual([
      { name: '我的复制', action: 'copy', disable: true },
      { name: '打开', url: '', action: 'open' },
    ]);
  });

  it('旧版默认名「打开链接」跟随改名，自定义名称保持原样', () => {
    const result = normalizeConfig(
      {
        engineList: {
          actions: [
            { name: '打开链接', action: 'open' },
            { name: '我的复制', action: 'copy' },
          ],
        },
      },
      defaults,
    );
    expect(result.engineList.actions.map((engine) => engine.name)).toEqual(['打开', '我的复制']);
  });

  it('缺少 engineList 时按分类键回退默认引擎', () => {
    const result = normalizeConfig({ engineCategories: [['搜索', 'web', true]] }, defaults);
    expect(result.engineList.web).toEqual(defaults.engineList.web);
  });

  it('分类损坏时整体回退默认分类', () => {
    const result = normalizeConfig({ engineCategories: 'broken' }, defaults);
    expect(result.engineCategories).toEqual(defaults.engineCategories);
  });

  it('旧配置里的搜图开关被忽略', () => {
    expect(normalizeConfig({ imageSearch: false }, defaults)).not.toHaveProperty('imageSearch');
  });

  it('旧配置缺少搜图分类时补回默认分类与引擎', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['搜索', 'web', true]],
        engineList: { web: [{ name: 'A', url: 'https://a.test/?q=%s' }] },
      },
      defaults,
    );
    // 补回的搜图分类紧跟「功能」分类
    expect(result.engineCategories.slice(0, 2).map(([, key]) => key)).toEqual(['actions', 'image']);
    expect(result.engineList.image).toEqual(defaults.engineList.image);
  });

  it('用户清空搜图引擎后保持为空，不强行补回', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['搜图', 'image', false]],
        engineList: { image: [] },
      },
      defaults,
    );
    expect(result.engineList.image).toEqual([]);
  });

  it('搜图分类不参与跳转条显示开关，始终按显示处理', () => {
    const result = normalizeConfig(
      {
        engineCategories: [['搜图', 'image', false]],
        engineList: { image: [{ name: 'A', url: 'https://a.test/?q=%s' }] },
      },
      defaults,
    );
    expect(result.engineCategories.find(([, key]) => key === 'image')[2]).toBe(true);
  });
});

describe('serializeConfig', () => {
  it('按白名单序列化草稿，并保留草稿内部字段之外的数据', () => {
    const config = serializeConfig({
      options: { center: true, language: 'en' },
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
    expect(config.center).toBe(true);
    expect(config.language).toBe('en');
    expect(config.engineCategories).toEqual([['分类', 'cat', true]]);
    expect(config.engineList.cat).toEqual([
      { name: 'A', url: 'https://a.test/?q=%s', favicon: 'x', disable: true },
      // 空 url 的条目在面板阶段仍保留，交由编辑弹窗校验
      { name: 'B', url: '', target: '_blank' },
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

  it('导出时去掉内嵌图标数据，保留 favicon 地址', () => {
    const source = {
      engineList: {
        web: [
          {
            name: 'A',
            url: 'https://a.test',
            favicon: 'https://a.test/f.ico',
            faviconData: 'data:x',
          },
        ],
      },
    };
    const parsed = JSON.parse(configToText(source));
    expect(parsed.engineList.web).toEqual([
      { name: 'A', url: 'https://a.test', favicon: 'https://a.test/f.ico' },
    ]);
    // 不影响原配置
    expect(source.engineList.web[0].faviconData).toBe('data:x');
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

describe('isBarCategoryVisible', () => {
  it('搜图分类只在图片模式下出现，普通跳转条始终不显示', () => {
    expect(isBarCategoryVisible('image', true, '')).toBe(false);
    expect(isBarCategoryVisible('image', false, 'image')).toBe(true);
  });

  it('功能分类在图片模式下按显示开关出现', () => {
    expect(isBarCategoryVisible('actions', true, 'image')).toBe(true);
    expect(isBarCategoryVisible('actions', false, 'image')).toBe(false);
  });

  it('链接模式只显示功能分类，且不受普通跳转条的显示开关影响', () => {
    expect(isBarCategoryVisible('actions', true, 'link')).toBe(true);
    expect(isBarCategoryVisible('actions', false, 'link')).toBe(true);
    expect(isBarCategoryVisible('image', true, 'link')).toBe(false);
    expect(isBarCategoryVisible('web', true, 'link')).toBe(false);
  });

  it('其他分类按显示开关决定', () => {
    expect(isBarCategoryVisible('web', true, '')).toBe(true);
    expect(isBarCategoryVisible('web', false, '')).toBe(false);
    // 图片模式下普通分类同样不显示
    expect(isBarCategoryVisible('web', true, 'image')).toBe(false);
  });
});

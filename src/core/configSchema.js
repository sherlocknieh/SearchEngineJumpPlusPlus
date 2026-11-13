/**
 * 配置文件的唯一形状定义。
 *
 * 设置加载（stores/settings.js）、设置面板草稿序列化（components/SettingPanel.vue）
 * 与合并导入（core/configMerge.js）都必须经过这里，避免同一份配置被多处重复解释。
 */
import defaultConfig from '../data/engines.json';
import { normalizeLanguage } from '../assets/i18n.js';
import {
  BUILTIN_CATEGORY_KEY,
  DEFAULT_OPEN_TARGET,
  IMAGE_CATEGORY_KEY,
  isPlainObject,
  normalizeCategories,
  normalizeEngine,
  normalizeDefaultOpenTarget,
  normalizeEngineAction,
  normalizeEngineTarget,
} from './configData.js';

/** 布尔/枚举类顶层选项；其余字段均由引擎与分类派生 */
export const OPTION_KEYS = [
  'center',
  'selectSearch',
  'selectSearchInInput',
  'selectionFollowPointer',
  'selectionCompact',
  'defaultOpenTarget',
  'language',
];

/** 生成默认配置（每次返回新对象，调用方可安全修改） */
export function createDefaultConfig() {
  return {
    // 默认开启划词搜索，输入框内的选区同样触发
    selectSearch: true,
    selectSearchInInput: true,
    // 划词条默认从页面顶部滑出，不跟随选区位置
    selectionFollowPointer: false,
    // 跟随选区的划词条默认显示文字，不启用只显示图标的精简模式
    selectionCompact: false,
    // 默认跟随各站点规则排版，不强制居中
    center: false,
    // 引擎未单独设置打开方式时，默认在新标签页打开
    defaultOpenTarget: DEFAULT_OPEN_TARGET,
    // 默认跟随浏览器/系统语言
    language: 'auto',
    // [名称, 键名, 是否在跳转条中显示]
    engineCategories: defaultConfig.engineCategories.map((entry) => entry.slice()),
    // 默认引擎列表；逐项复制，避免调用方修改时污染导入的默认数据
    engineList: Object.fromEntries(
      Object.entries(defaultConfig.engineList).map(([key, engines]) => [
        key,
        engines.map((engine) => ({ ...engine })),
      ]),
    ),
  };
}

/** 把任意来源的配置规范化为内部使用的完整配置 */
export function normalizeConfig(raw, defaults) {
  const data = isPlainObject(raw) ? raw : {};
  const settings = {};
  // version 记录配置最近一次写入的时间，读取时原样保留
  settings.version = typeof data.version === 'string' ? data.version : '';

  for (const key of OPTION_KEYS) {
    if (key === 'language') continue;
    // 打开方式是枚举值，需要白名单校验后再回退默认
    if (key === 'defaultOpenTarget') {
      settings[key] = normalizeDefaultOpenTarget(data[key] ?? defaults[key]);
      continue;
    }
    settings[key] = typeof data[key] === 'boolean' ? data[key] : defaults[key];
  }
  // 语言偏好：auto 跟随浏览器，否则限定在支持的语言内
  settings.language = normalizeLanguage(data.language ?? defaults.language);

  // 分类数据损坏时整体回退到默认分类（复制一份，避免修改默认值）
  const categories =
    normalizeCategories(data) || defaults.engineCategories.map((entry) => entry.slice());

  // 没有可用的 engineList 时，全部使用默认引擎
  const rawList = isPlainObject(data.engineList) ? data.engineList : null;
  const engineList = {};
  for (const [, key] of categories) {
    const engines = rawList
      ? Array.isArray(rawList[key])
        ? rawList[key]
        : []
      : defaults.engineList[key] || [];
    engineList[key] = engines.map(normalizeEngine).filter(Boolean);
  }

  // 内置快捷动作分类始终存在：旧配置缺少时补回，分类被删除时重新创建；
  // 内置动作也按 action 补齐，避免手工改配置或旧数据丢失快捷入口
  ensureBuiltinActions(categories, engineList);
  // 搜图分类是右键搜图的入口，同样始终存在
  ensureImageCategory(categories, engineList);
  // 搜图分类只在图片模式下出现，不参与普通跳转条的显示开关，始终视为显示
  for (const category of categories) {
    if (category[1] === IMAGE_CATEGORY_KEY) category[2] = true;
  }

  settings.engineCategories = categories;
  settings.engineList = engineList;
  return settings;
}

/**
 * 保证内置的快捷动作分类与动作引擎存在。
 * 只补缺失项，不改变用户已有的排序、隐藏状态与自定义图标。
 */
function ensureBuiltinActions(categories, engineList) {
  if (!categories.some(([, key]) => key === BUILTIN_CATEGORY_KEY)) {
    const defaultCategory = defaultConfig.engineCategories.find(
      ([, key]) => key === BUILTIN_CATEGORY_KEY,
    );
    categories.unshift([
      defaultCategory?.[0] || BUILTIN_CATEGORY_KEY,
      BUILTIN_CATEGORY_KEY,
      defaultCategory?.[2] ?? true,
    ]);
  }

  const engines = engineList[BUILTIN_CATEGORY_KEY] || [];
  const presentActions = new Set(engines.map((engine) => engine.action).filter(Boolean));
  for (const engine of defaultConfig.engineList[BUILTIN_CATEGORY_KEY] || []) {
    if (!presentActions.has(engine.action)) engines.push({ ...engine });
  }
  engineList[BUILTIN_CATEGORY_KEY] = engines;
}

/**
 * 保证「搜图」分类存在，右键搜图才有可用的引擎列表。
 * 只在分类缺失时补回默认分类与默认识图引擎，并紧跟「功能」分类，与默认设置顺序一致；
 * 用户清空引擎后保持为空，此时右键不接管，原生菜单照常可用。
 */
function ensureImageCategory(categories, engineList) {
  if (categories.some(([, key]) => key === IMAGE_CATEGORY_KEY)) return;

  const defaultCategory = defaultConfig.engineCategories.find(
    ([, key]) => key === IMAGE_CATEGORY_KEY,
  );
  // 有「功能」分类时插在它后面，其余情况追加到末尾
  const actionsIndex = categories.findIndex(([, key]) => key === BUILTIN_CATEGORY_KEY);
  const insertAt = actionsIndex === -1 ? categories.length : actionsIndex + 1;
  categories.splice(insertAt, 0, [
    defaultCategory?.[0] || IMAGE_CATEGORY_KEY,
    IMAGE_CATEGORY_KEY,
    defaultCategory?.[2] ?? true,
  ]);
  engineList[IMAGE_CATEGORY_KEY] = (defaultConfig.engineList[IMAGE_CATEGORY_KEY] || []).map(
    (engine) => ({ ...engine }),
  );
}

/**
 * 单个引擎的存储形态：只保留已知字段，减少冗余。
 * 与旧的面板序列化逻辑保持一致：即使 url 为空也保留条目（由编辑弹窗负责校验）。
 */
export function serializeEngine(raw) {
  if (!isPlainObject(raw)) return null;
  const engine = { name: raw.name, url: raw.url };
  const action = normalizeEngineAction(raw.action);
  if (action) engine.action = action;
  if (typeof raw.favicon === 'string') engine.favicon = raw.favicon;
  if (typeof raw.faviconData === 'string') engine.faviconData = raw.faviconData;
  // 保存显式选择的打开方式，未选择时默认新标签页
  const target = normalizeEngineTarget(raw.target);
  if (target) engine.target = target;
  if (raw.disable === true) engine.disable = true;
  return engine;
}

/**
 * 把设置面板草稿序列化为可写入/导出的配置。
 * @param {{options: object, categories: Array<{name,key,enabled,engines}>, version?: string}} input
 */
export function serializeConfig({ options, categories, version = '' }) {
  const engineCategories = categories.map((category) => [
    category.name,
    category.key,
    category.enabled,
  ]);
  const engineList = {};
  for (const category of categories) {
    engineList[category.key] = (category.engines || []).map(serializeEngine).filter(Boolean);
  }

  const config = {};
  for (const key of OPTION_KEYS) config[key] = options[key];
  // version 由保存时刷新；序列化时沿用当前值，避免无改动也被判为有修改
  config.version = typeof version === 'string' ? version : '';
  config.engineCategories = engineCategories;
  config.engineList = engineList;
  return config;
}

/** 导出/预览用的 JSON 文本：内嵌图标体积大，只保留 favicon 地址 */
export function configToText(config) {
  const clean = JSON.parse(JSON.stringify(config));
  // 历史遗留字段，导出时清掉
  if (clean.engineList) delete clean.engineList.engineCategories;
  for (const engines of Object.values(clean.engineList || {})) {
    if (!Array.isArray(engines)) continue;
    for (const engine of engines) delete engine.faviconData;
  }
  return JSON.stringify(clean, null, 4);
}

/**
 * 读取配置文件为统一结构；无法识别时返回 null。
 * 兼容仅提供 engineList 的配置：按其中的键建立同名分类。
 */
export function readConfig(data) {
  if (!isPlainObject(data)) return null;
  const rawList = isPlainObject(data.engineList) ? data.engineList : {};

  let categories = normalizeCategories(data) || [];
  if (!categories.length) {
    const keys = Object.keys(rawList).filter((key) => Array.isArray(rawList[key]));
    if (!keys.length) return null;
    categories = keys.map((key) => [key, key, true]);
  }

  const engineList = {};
  for (const [, key] of categories) {
    const engines = Array.isArray(rawList[key]) ? rawList[key] : [];
    engineList[key] = engines.map(normalizeEngine).filter(Boolean);
  }

  return { engineCategories: categories, engineList };
}

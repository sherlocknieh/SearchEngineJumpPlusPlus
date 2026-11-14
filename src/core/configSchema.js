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
  'selectSearchInInput',
  'selectionFollowPointer',
  'selectionCompact',
  'selectionIcon',
  'defaultOpenTarget',
  'language',
];

/** 内置快捷动作分类的旧版默认名，读配置时跟随新版改名 */
const LEGACY_ACTIONS_CATEGORY_NAME = '功能';

/** 生成默认配置（每次返回新对象，调用方可安全修改） */
export function createDefaultConfig() {
  return {
    // 输入框内的选区默认同样触发划词
    selectSearchInInput: true,
    // 划词条默认贴在选区旁，而不是从页面顶部滑出
    selectionFollowPointer: true,
    // 划词条默认只显示图标，不显示文字
    selectionCompact: true,
    // 划词后默认只露一个图标，指针悬浮时展开整条搜索条
    selectionIcon: true,
    // 搜索条默认居中显示，优先于站点的横向对齐
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
 * 只补缺失项与跟随旧版默认名改名，不改变用户已有的排序、隐藏状态与自定义图标。
 */
function ensureBuiltinActions(categories, engineList) {
  const defaultCategory = defaultConfig.engineCategories.find(
    ([, key]) => key === BUILTIN_CATEGORY_KEY,
  );
  const category = categories.find(([, key]) => key === BUILTIN_CATEGORY_KEY);
  if (!category) {
    categories.unshift([
      defaultCategory?.[0] || BUILTIN_CATEGORY_KEY,
      BUILTIN_CATEGORY_KEY,
      defaultCategory?.[2] ?? true,
    ]);
  } else if (defaultCategory && category[0] === LEGACY_ACTIONS_CATEGORY_NAME) {
    // 旧版默认名「功能」跟随新版改名，用户自定义的名称保持不变
    category[0] = defaultCategory[0];
  }

  const engines = engineList[BUILTIN_CATEGORY_KEY] || [];
  const presentActions = new Set(engines.map((engine) => engine.action).filter(Boolean));
  for (const engine of defaultConfig.engineList[BUILTIN_CATEGORY_KEY] || []) {
    if (!presentActions.has(engine.action)) engines.push({ ...engine });
  }
  // 旧版默认名「打开链接」跟随新版改名，用户自定义的名称保持不变
  for (const engine of engines) {
    if (engine.action === 'open' && engine.name === '打开链接') engine.name = '打开';
  }
  engineList[BUILTIN_CATEGORY_KEY] = engines;
}

/**
 * 保证「搜图」分类存在：它是右键搜图的固定入口，但位置与其他分类一样由用户拖拽决定。
 * 分类缺失（旧配置）时补回默认分类与默认识图引擎并放在首位，已有分类则完全保留原位置；
 * 用户清空引擎后保持为空，此时右键不接管，原生菜单照常可用。
 */
function ensureImageCategory(categories, engineList) {
  // 已有分类：位置、名称、引擎都由用户决定，不再强制置顶
  if (categories.some(([, key]) => key === IMAGE_CATEGORY_KEY)) return;

  const defaultCategory = defaultConfig.engineCategories.find(
    ([, key]) => key === IMAGE_CATEGORY_KEY,
  );
  categories.unshift([
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

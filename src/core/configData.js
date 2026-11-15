/**
 * 配置文件（engines.json / 导出的 SearchEngineJump.json）的读取与规范化。
 * 设置加载、合并导入共用这里的规则，避免两处解析结果不一致。
 */

export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/**
 * 非搜索类快捷动作：copy 复制命中的内容，copyImageUrl 复制图片地址，
 * copyLinkText 复制链接标题，copyLinkUrl 复制链接地址，
 * selectLinkText 选中页面上的链接标题，open 打开目标地址。
 * 值是设置里的默认名称；清单本身即默认排序，配置缺项时按它补齐，设置面板因此始终列全。
 */
export const ACTION_ENGINE_DEFAULTS = {
  copy: '复制文字',
  copyImage: '复制图片',
  copyImageUrl: '复制图片地址',
  copyLinkText: '复制链接标题',
  copyLinkUrl: '复制链接地址',
  selectLinkText: '选中链接标题',
  open: '打开链接',
  openImage: '打开图片',
};

export const ENGINE_ACTIONS = Object.keys(ACTION_ENGINE_DEFAULTS);

/**
 * 操作条目的触发条件：值为文案键，顺序即设置里的显示顺序。
 * selection/input 是普通条的关键词来源，keyword 是「关键词本身是链接」，
 * image* / link* 区分长按与右键（两者运行时是两条不同的事件路径）。
 */
export const TRIGGER_KEYS = {
  selection: 'trigger.selection',
  input: 'trigger.input',
  keyword: 'trigger.keyword',
  imageLong: 'trigger.imageLong',
  imageMenu: 'trigger.imageMenu',
  linkLong: 'trigger.linkLong',
  linkMenu: 'trigger.linkMenu',
};

/** 每个动作可勾选的触发条件，同时也是默认勾选项；顺序即显示顺序 */
export const ACTION_TRIGGERS = {
  copy: ['selection', 'input'],
  copyImage: ['imageLong', 'imageMenu'],
  copyImageUrl: ['imageLong', 'imageMenu'],
  copyLinkText: ['linkLong', 'linkMenu'],
  copyLinkUrl: ['linkLong', 'linkMenu'],
  selectLinkText: ['linkLong', 'linkMenu'],
  open: ['keyword', 'linkLong', 'linkMenu'],
  openImage: ['imageLong', 'imageMenu'],
};

/**
 * 规范化触发条件：只保留该动作支持的项，并按固定顺序排列。
 * 未配置（不是数组）时返回 null，表示沿用动作默认值；空数组表示用户全部取消。
 */
export function normalizeEngineTriggers(action, raw) {
  const options = ACTION_TRIGGERS[action];
  if (!options || !Array.isArray(raw)) return null;
  const picked = new Set(raw);
  return options.filter((id) => picked.has(id));
}

/** 引擎实际生效的触发条件：配置里没有时用动作默认值 */
export function engineTriggers(engine) {
  const normalized = normalizeEngineTriggers(engine?.action, engine?.triggers);
  return normalized || ACTION_TRIGGERS[engine?.action] || [];
}

/** 内置的快捷动作分类键名：始终存在，只能移动和隐藏 */
export const BUILTIN_CATEGORY_KEY = 'actions';

/** 内置的图片搜索分类键名：供右键图片搜图使用，缺失时自动补回 */
export const IMAGE_CATEGORY_KEY = 'image';

/** 内置分类不能删除，也不提供分类编辑入口；引擎内容与排序仍可调整 */
const BUILTIN_CATEGORY_KEYS = [BUILTIN_CATEGORY_KEY, IMAGE_CATEGORY_KEY];

export function isBuiltinCategory(category) {
  return BUILTIN_CATEGORY_KEYS.includes(category?.key);
}

/**
 * 上下文操作条显示哪些分类：primary 为模式专属分类，始终显示；
 * extras 只在分类显示开关开启时出现。普通跳转条永不显示「搜图」。
 */
export const CONTEXT_BAR_CATEGORIES = {
  image: { primary: IMAGE_CATEGORY_KEY, extras: [BUILTIN_CATEGORY_KEY] },
  link: { primary: BUILTIN_CATEGORY_KEY, extras: [] },
};

/**
 * 分类是否出现在跳转条。
 * @param {string} key 分类键名
 * @param {boolean} enabled 分类的显示开关
 * @param {string} [contextMode] 上下文操作模式（image / link），空串表示普通跳转条
 */
export function isBarCategoryVisible(key, enabled, contextMode = '') {
  if (contextMode) {
    const categories = CONTEXT_BAR_CATEGORIES[contextMode];
    if (key === categories?.primary) return true;
    return Boolean(categories?.extras.includes(key) && enabled);
  }
  if (key === IMAGE_CATEGORY_KEY) return false;
  return Boolean(enabled);
}

export function normalizeEngineAction(value) {
  return ENGINE_ACTIONS.includes(value) ? value : '';
}

/** 打开方式：_blank 新标签页，_background 后台标签页，_self 当前页；引擎未设置时使用全局默认 */
export const ENGINE_TARGETS = ['_blank', '_background', '_self'];

/** 后台打开：用 GM_openInTab 的 inactive 模式，不抢占当前页焦点 */
export const BACKGROUND_OPEN_TARGET = '_background';

/** 全局默认打开方式，默认新标签页 */
export const DEFAULT_OPEN_TARGET = '_blank';

export function normalizeEngineTarget(value) {
  return ENGINE_TARGETS.includes(value) ? value : '';
}

/** 全局默认打开方式的规范化：非法值回退到新标签页 */
export function normalizeDefaultOpenTarget(value) {
  return normalizeEngineTarget(value) || DEFAULT_OPEN_TARGET;
}

// 规范化单个搜索引擎
export function normalizeEngine(raw) {
  if (!isPlainObject(raw)) return null;
  const engine = {};
  const ENGINE_STRINGS = ['name', 'url', 'favicon', 'faviconData'];
  for (const key of ENGINE_STRINGS) {
    if (typeof raw[key] === 'string') engine[key] = raw[key];
  }
  const action = normalizeEngineAction(raw.action);
  if (action) engine.action = action;
  // 搜索类引擎必须有 url；动作引擎只需要名称
  if (!engine.url && !action) return null;
  // 触发条件只对动作条目有意义；未配置时不写字段，运行时按动作默认值处理
  const triggers = normalizeEngineTriggers(action, raw.triggers);
  if (triggers) engine.triggers = triggers;
  // 记录显式选择的打开方式，未选择时不写字段，跳转时再按站点决定
  const target = normalizeEngineTarget(raw.target);
  if (target) engine.target = target;
  // 只有明确为 true 才视为隐藏，其他值一律按显示处理
  if (raw.disable === true) engine.disable = true;

  return engine;
}

// 规范化类别列表，返回 [名称, 键名, 是否启用] 数组
export function normalizeCategories(data) {
  const raw = Array.isArray(data.engineCategories) // 优先使用新字段名: engineCategories
    ? data.engineCategories
    : Array.isArray(data.engineDetails) // 兼容旧字段: engineDetails
      ? data.engineDetails
      : null;
  if (!raw) return null;
  const seen = new Set();
  const categories = [];
  for (const entry of raw) {
    if (!Array.isArray(entry)) continue;
    const [name, key, enabled] = entry;
    if (typeof key !== 'string' || !key || seen.has(key)) continue;
    seen.add(key);
    categories.push([
      typeof name === 'string' ? name : key,
      key,
      typeof enabled === 'boolean' ? enabled : true,
    ]);
  }
  return categories;
}

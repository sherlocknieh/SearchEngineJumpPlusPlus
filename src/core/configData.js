/**
 * 配置文件（engines.json / 导出的 SearchEngineJump.json）的读取与规范化。
 * 设置加载、合并导入共用这里的规则，避免两处解析结果不一致。
 */

export function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

/** 非搜索类快捷动作：copy 复制当前内容，open 打开当前链接 */
export const ENGINE_ACTIONS = ['copy', 'open'];

/** 内置的快捷动作分类键名：始终存在，只能移动和隐藏 */
export const BUILTIN_CATEGORY_KEY = 'actions';

/** 内置的图片搜索分类键名：供右键图片搜图使用，缺失时自动补回 */
export const IMAGE_CATEGORY_KEY = 'image';

/** 内置分类只能编辑内容与排序，不能删除，避免依赖它的功能失去入口 */
const BUILTIN_CATEGORY_KEYS = [BUILTIN_CATEGORY_KEY, IMAGE_CATEGORY_KEY];

export function isBuiltinCategory(category) {
  return BUILTIN_CATEGORY_KEYS.includes(category?.key);
}

/** 长按图片搜图默认开启：桌面按住鼠标、手机长按都能触发 */
export const DEFAULT_IMAGE_SEARCH = true;

/**
 * 长按搜图开关的规范化。
 * 兼容旧配置里的字符串模式：off 视为关闭，其余（menu / alt）视为开启。
 */
export function normalizeImageSearch(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value !== 'off';
  return DEFAULT_IMAGE_SEARCH;
}

export function normalizeEngineAction(value) {
  return ENGINE_ACTIONS.includes(value) ? value : '';
}

/** 打开方式：_blank 新标签页，_self 当前页；引擎未设置时使用全局默认 */
export const ENGINE_TARGETS = ['_blank', '_self'];

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

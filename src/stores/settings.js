import { reactive } from 'vue';
import defaultEngines from '../data/engineList.js';
import rules from '../data/rules.js';
import { getValue, setValue, isSameValue } from '../core/storage.js';

export const STORAGE_KEY = 'searchEngineJumpData';

function createDefaultSettings() {
  return {
    fixedTop: true,
    fixedTopUpward: false,
    HideTheSameLink: true,
    center: 0,
    transtion: true,
    selectSearch: true,
    engineCategories: [
      ['网页', 'web', true],
      ['翻译', 'translate', true],
      ['知识', 'knowledge', true],
      ['图片', 'image', true],
      ['视频', 'video', true],
      ['音乐', 'music', true],
      ['学术', 'scholar', false],
      ['社交', 'sociality', true],
      ['购物', 'shopping', true],
      ['下载', 'download', false],
      ['新闻', 'news', false],
      ['常用', 'mine', false],
    ],
    engineList: defaultEngines,
  };
}

const OPTION_FLAGS = [
  'fixedTop',
  'fixedTopUpward',
  'HideTheSameLink',
  'transtion',
  'selectSearch',
];
const ENGINE_STRINGS = ['name', 'url', 'favicon', 'faviconData'];

// 兼容性白名单：当前字段 ← 旧版本字段名；读取时回退，写出时只用当前字段。
// engineDetails 是 engineCategories 的旧名字，仍需兼容历史配置。
const COMPAT_FIELDS = {
  engineCategories: ['engineDetails'],
};

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

// 只拷贝白名单字段，其余字段（blank、_id 等）在读入时即被丢弃
function normalizeEngine(raw) {
  if (!isObject(raw)) return null;
  const engine = {};
  for (const key of ENGINE_STRINGS) {
    if (typeof raw[key] === 'string') engine[key] = raw[key];
  }
  if (!engine.url) return null;
  if (raw.target === '_self') engine.target = '_self';
  if (raw.disable === true) engine.disable = true;
  return engine;
}

// 新字段优先，缺失时按兼容性白名单回退到旧字段
function readCompat(data, key) {
  if (Array.isArray(data[key])) return data[key];
  for (const legacy of COMPAT_FIELDS[key] || []) {
    if (Array.isArray(data[legacy])) return data[legacy];
  }
  return null;
}

// 返回 null 表示数据不可用，需要回退到默认分类
function normalizeCategories(data) {
  const raw = readCompat(data, 'engineCategories');
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

/**
 * 按白名单重建配置：不认识或已废弃的字段不会进入内存与存储。
 */
function normalizeSettings(raw, defaults) {
  const data = isObject(raw) ? raw : {};
  const settings = {};

  for (const key of OPTION_FLAGS) {
    settings[key] = typeof data[key] === 'boolean' ? data[key] : defaults[key];
  }
  // center 只有两种模式：1 = 强制居中，其余一律按默认布局处理
  settings.center = data.center === 1 || data.center === '1' ? 1 : 0;

  const categories =
    normalizeCategories(data) ||
    defaults.engineCategories.map((entry) => entry.slice());

  const rawList = isObject(data.engineList) ? data.engineList : null;
  const engineList = {};
  for (const [, key] of categories) {
    const engines = rawList
      ? Array.isArray(rawList[key])
        ? rawList[key]
        : []
      : defaults.engineList[key] || [];
    engineList[key] = engines.map(normalizeEngine).filter(Boolean);
  }

  settings.engineCategories = categories;
  settings.engineList = engineList;
  return settings;
}

export class Settings {
  constructor() {
    this.storedSettingData = getValue(STORAGE_KEY, null);
    this.scriptSettingData = createDefaultSettings();
    this.settingData = null;
    this.initSettings();
  }

  initSettings() {
    if (this.storedSettingData) {
      this.settingData = normalizeSettings(
        this.storedSettingData,
        this.scriptSettingData,
      );
      // 旧配置读取后立即回写为规范形式，避免每次启动重复规范化
      if (!isSameValue(this.settingData, this.storedSettingData)) {
        setValue(STORAGE_KEY, this.settingData);
      }
    } else {
      // 不主动写入默认值：存储探测/读取失败时也返回空值，
      // 此时写回会把默认配置覆盖到已有配置上（部分站点曾出现该问题）。
      this.settingData = normalizeSettings(
        this.scriptSettingData,
        this.scriptSettingData,
      );
    }
  }

  // 原地应用设置：保持 settingData 引用不变，供已挂载的组件响应
  applyNormalized(normalized) {
    const plain = JSON.parse(JSON.stringify(normalized));
    for (const key of Object.keys(this.settingData)) {
      if (!Object.prototype.hasOwnProperty.call(plain, key)) {
        delete this.settingData[key];
      }
    }
    Object.assign(this.settingData, plain);
  }

  // 应用新设置：先规范化，再落地
  applySettings(next) {
    this.applyNormalized(normalizeSettings(next, this.scriptSettingData));
    this.storedSettingData = this.settingData;
    return setValue(STORAGE_KEY, this.settingData);
  }

  // 自动保存：把指定字段合并到当前设置后持久化
  savePartial(partial) {
    if (!isObject(partial)) return 'memory';
    const next = Object.assign({}, this.settingData, partial);
    return this.applySettings(next);
  }

  // 从存储重新读取设置（用于其他页面保存后的同步）
  reload() {
    const stored = getValue(STORAGE_KEY, null);
    if (!isObject(stored)) return false;
    const normalized = normalizeSettings(stored, this.scriptSettingData);
    if (this.settingData && isSameValue(normalized, this.settingData)) {
      return false;
    }
    this.applyNormalized(normalized);
    this.storedSettingData = this.settingData;
    return true;
  }

  getMatchedRule() {
    for (const rule of [...rules]) {
      if (rule.url.test(location.href)) return rule;
    }
    return null;
  }
}

let instance = null;

export function useSettings() {
  if (!instance) {
    instance = reactive(new Settings());
  }
  return instance;
}

export function getMatchedRule() {
  return useSettings().getMatchedRule();
}

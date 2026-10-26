/**
 * useSettings: 设置存储模块: 负责配置文件和挂载规则的加载,整理,写入;
 */
import { reactive } from 'vue';
import defaultConfig from '../data/engines.json';
import rules from '../data/rules.js';
import { getValue, setValue, isSameValue } from '../core/storage.js';
import { isPlainObject, normalizeEngine, normalizeCategories } from '../core/configData.js';
import { normalizeLanguage, setLanguagePreference } from '../i18n/index.js';


/** GM 存储中配置数据使用的键名 */
export const STORAGE_KEY = 'searchEngineJumpData';

// 生成人类可读的本地时间：YYYY-MM-DD HH:mm:ss
function nowText() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  );
}


// 生成默认配置
function createDefaultSettings() {
  return {
    HideTheSameLink: true,    // 默认隐藏与当前站点相同的引擎，避免重复跳转
    fixedTop: false,    // 默认不固定跳转条，不启用“仅上拉显示”
    fixedTopUpward: false,
    transtion: true,    // 默认开启动画
    selectSearch: true, // 默认开启划词搜索
    center: false,    // 默认跟随各站点规则排版，不强制居中
    language: 'auto', // 默认跟随浏览器/系统语言
    // 默认分类及顺序；第三项表示该分类是否在跳转条中显示
    engineCategories: defaultConfig.engineCategories.map((entry) => entry.slice()),
    // 默认引擎列表；从 engines.json 导入
    engineList: defaultConfig.engineList,
  };
}

// 检验本地配置格式
const isObject = isPlainObject;

// 加载设置数据
function normalizeSettings(raw, defaults) {
  const data = isObject(raw) ? raw : {};
  const settings = {};
  // version 记录配置最近一次写入的时间，读取时原样保留
  settings.version = typeof data.version === 'string' ? data.version : '';
  // 布尔开关：类型正确才采用，否则回退默认值
  const OPTION_FLAGS = [
    'HideTheSameLink',
    'selectSearch',
    'transtion',
    'center',
    'fixedTop',
    'fixedTopUpward',
  ];
  for (const key of OPTION_FLAGS) {
    settings[key] = typeof data[key] === 'boolean' ? data[key] : defaults[key];
  }
  // 语言偏好：auto 跟随浏览器，否则限定在支持的语言内
  settings.language = normalizeLanguage(data.language ?? defaults.language);

  // 分类数据损坏时整体回退到默认分类（复制一份，避免修改默认值）
  const categories =
    normalizeCategories(data) ||
    defaults.engineCategories.map((entry) => entry.slice());

  // 没有可用的 engineList 时，全部使用默认引擎
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

// 设置管理器
export class Settings {
  // 初始化操作
  constructor() {
    // 加载本地配置
    this.storedSettingData = getValue(STORAGE_KEY, null);
    // 加载默认配置
    this.scriptSettingData = createDefaultSettings();
    // 实际生效的配置
    this.settingData = null;
    this.initSettings();
    setLanguagePreference(this.settingData.language);
  }

  // 初始化设置
  initSettings() {
    if (this.storedSettingData) {
      this.settingData = normalizeSettings(
        this.storedSettingData,
        this.scriptSettingData,
      );
      // 旧配置读取后立即回写为规范形式，避免每次启动重复规范化
      if (!isSameValue(this.settingData, this.storedSettingData)) {
        this.settingData.version = nowText();
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

  // 应用到
  applyNormalized(normalized) {
    // 先复制一份，避免修改原始数据
    const plain = JSON.parse(JSON.stringify(normalized));
    // 合并有效字段
    for (const key of Object.keys(this.settingData)) {
      if (!Object.prototype.hasOwnProperty.call(plain, key)) {
        delete this.settingData[key];
      }
    }
    Object.assign(this.settingData, plain);
    setLanguagePreference(this.settingData.language);
  }

  // 把最新设置写入存储
  applySettings(next) {
    this.applyNormalized(normalizeSettings(next, this.scriptSettingData));
    // 每次写入都刷新 version 为当前时间
    this.settingData.version = nowText();
    this.storedSettingData = this.settingData;
    return setValue(STORAGE_KEY, this.settingData);
  }

  // 自动保存：把指定字段合并到当前设置后持久化。 
  // 用于设置面板的增量修改，未传入的字段保持原值。
  savePartial(partial) {
    if (!isObject(partial)) return 'memory';
    const next = Object.assign({}, this.settingData, partial);
    return this.applySettings(next);
  }

  // 从存储重新读取设置
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

  // 获取当前页面匹配的挂载规则
  getMatchedRule() {
    for (const rule of [...rules]) {
      if (rule.url.test(location.href)) return rule;
    }
    return null;
  }
}


// 创建设置管理器实例
let instance = null;
export function useSettings() {
  if (!instance) {
    instance = reactive(new Settings());
  }
  return instance;
}

/**
 * useSettings: 设置存储模块: 负责配置文件和挂载规则的加载,整理,写入;
 */
import { reactive } from 'vue';
import { matchRule } from '../data/matchRule.js';
import { getValue, setValue, isSameValue } from '../core/storage.js';
import { cloneValue } from '../core/storageBackend.js';
import { createDefaultConfig, normalizeConfig } from '../core/configSchema.js';
import { isPlainObject } from '../core/configData.js';
import { setLanguagePreference } from '../assets/i18n.js';

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

// 设置管理器
export class Settings {
  // 初始化操作
  constructor() {
    // 加载本地配置
    this.storedSettingData = getValue(STORAGE_KEY, null);
    // 加载默认配置
    this.scriptSettingData = createDefaultConfig();
    // 实际生效的配置
    this.settingData = null;
    // 跳转条当前使用的站点规则；SPA 路由变化时用于判断是否需要重建
    this.activeRule = null;
    // 跳转条是否真正完成挂载（未找到输入框等情况下为 false，路由变化时需重试）
    this.barMounted = false;
    this.initSettings();
    setLanguagePreference(this.settingData.language);
  }

  // 初始化设置
  initSettings() {
    if (this.storedSettingData) {
      this.settingData = normalizeConfig(this.storedSettingData, this.scriptSettingData);
      // 旧配置读取后立即回写为规范形式，避免每次启动重复规范化
      if (!isSameValue(this.settingData, this.storedSettingData)) {
        this.settingData.version = nowText();
        setValue(STORAGE_KEY, this.settingData);
      }
    } else {
      // 不主动写入默认值：存储探测/读取失败时也返回空值，
      // 此时写回会把默认配置覆盖到已有配置上（部分站点曾出现该问题）。
      this.settingData = normalizeConfig(this.scriptSettingData, this.scriptSettingData);
    }
  }

  // 应用到
  applyNormalized(normalized) {
    // 先复制一份，避免修改原始数据
    const plain = cloneValue(normalized);
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
    this.applyNormalized(normalizeConfig(next, this.scriptSettingData));
    // 每次写入都刷新 version 为当前时间
    this.settingData.version = nowText();
    this.storedSettingData = this.settingData;
    return setValue(STORAGE_KEY, this.settingData);
  }

  // 自动保存：把指定字段合并到当前设置后持久化。
  // 用于设置面板的增量修改，未传入的字段保持原值。
  savePartial(partial) {
    if (!isPlainObject(partial)) return 'memory';
    const next = Object.assign({}, this.settingData, partial);
    return this.applySettings(next);
  }

  // 从存储重新读取设置
  reload() {
    const stored = getValue(STORAGE_KEY, null);
    if (!isPlainObject(stored)) return false;
    const normalized = normalizeConfig(stored, this.scriptSettingData);
    if (this.settingData && isSameValue(normalized, this.settingData)) {
      return false;
    }
    this.applyNormalized(normalized);
    this.storedSettingData = this.settingData;
    return true;
  }

  // 获取当前页面匹配的挂载规则
  getMatchedRule() {
    return matchRule(location.href);
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

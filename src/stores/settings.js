import { reactive } from 'vue';
import defaultEngines from '../data/engineList.js';
import rules from '../data/rules.js';
import { getValue, setValue, isSameValue } from '../core/storage.js';
import { XIAOHONGSHU, X_ICON, TIEBA } from '../data/favicons.js';

export const STORAGE_KEY = 'searchEngineJumpData';
export const SCRIPT_VERSION = '5.32.7';

function createDefaultSettings() {
  return {
    status: 1,
    version: SCRIPT_VERSION,
    addSearchItems: true,
    modifySearchItems: true,
    newtab: 0,
    debug: false,
    fixedTop: true,
    fixedTopUpward: false,
    baiduOffset: -120,
    getIcon: 0,
    HideTheSameLink: true,
    center: 2,
    icon: 1,
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

// 旧版本使用 engineDetails，读取时迁移为 engineCategories
function migrateLegacyKeys(data) {
  if (!data || typeof data !== 'object') return false;
  const has = (key) => Object.prototype.hasOwnProperty.call(data, key);
  let changed = false;
  if (!has('engineCategories') && has('engineDetails')) {
    data.engineCategories = data.engineDetails;
    changed = true;
  }
  if (has('engineDetails')) {
    delete data.engineDetails;
    changed = true;
  }
  // 旧版本会把分类派生数据写进 engineList，导致每次读取都和内存中的
  // 设置不一致，引起无休止的“跨页面同步”重启。这里顺手清理掉。
  if (
    data.engineList &&
    Object.prototype.hasOwnProperty.call(data.engineList, 'engineCategories')
  ) {
    delete data.engineList.engineCategories;
    changed = true;
  }
  return changed;
}

function pruneUnknownKeys(data, defaults) {
  let changed = false;
  for (const key of Object.keys(data)) {
    if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
      delete data[key];
      changed = true;
    }
  }
  return changed;
}

function isVersionOutdated(storedVersion, currentVersion) {
  const arr1 = storedVersion.toString().split('.');
  const arr2 = currentVersion.toString().split('.');
  const minlength = Math.min(arr1.length, arr2.length);
  let i = 0;

  for (; i < minlength; i++) {
    const a = parseInt(arr1[i]);
    const b = parseInt(arr2[i]);
    if (a > b) return false;
    if (a < b) return true;
  }

  if (arr1.length > arr2.length) {
    for (let j = i; j < arr1.length; j++) {
      if (parseInt(arr1[j]) != 0) return false;
    }
    return false;
  } else if (arr1.length < arr2.length) {
    for (let j = i; j < arr2.length; j++) {
      if (parseInt(arr2[j]) != 0) return true;
    }
    return false;
  }

  return false;
}

export class Settings {
  constructor() {
    this.storedSettingData = getValue(STORAGE_KEY, null);
    this.scriptSettingData = createDefaultSettings();
    this.settingData = null;
    this.initSettings();
  }

  checkSettingDataIntegrity() {
    let changed = migrateLegacyKeys(this.settingData);
    changed =
      pruneUnknownKeys(this.settingData, this.scriptSettingData) || changed;
    for (const value in this.scriptSettingData) {
      if (!Object.prototype.hasOwnProperty.call(this.settingData, value)) {
        console.warn(`[SEJ] 属性不存在：${value}`);
        this.settingData[value] = this.scriptSettingData[value];
        changed = true;
      }
    }
    if (changed) setValue(STORAGE_KEY, this.settingData);
  }

  checkUpdate() {
    if (
      !isVersionOutdated(
        this.storedSettingData.version,
        this.scriptSettingData.version,
      )
    ) {
      return;
    }

    this.settingData.version = this.scriptSettingData.version;

    if (isVersionOutdated(this.storedSettingData.version, '5.30.2')) {
      this.deleteOutdatedSearchItems(['https://so.letv.com/s?wd=%s']);
      this.modifyOutdatedSearchItems(
        'https://s.weibo.com/weibo/%s',
        'https://s.weibo.com/weibo/?q=%s',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.30.4')) {
      this.modifyOutdatedSearchItems(
        'https://www.startpage.com/do/asearch$post$query',
        'https://www.startpage.com/sp/search$post$query',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.31.1')) {
      this.modifyOutdatedSearchItemsTarget('https://zh.moegirl.org/%s');
      this.modifyOutdatedSearchItemsTarget(
        'https://tieba.baidu.com/f?kw=%s&ie=utf-8',
      );
      this.modifyOutdatedSearchItemsTarget(
        'https://github.com/search?utf8=✓&q=%s',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.31.8')) {
      this.modifyOutdatedSearchItems(
        'https://cn.bing.com/search?q=%s',
        'https://www.bing.com/search?q=%s',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.31.11')) {
      this.addSearchItem(
        {
          name: '小红书',
          url: 'https://www.xiaohongshu.com/search_result/?keyword=%s',
          favicon: XIAOHONGSHU,
        },
        'sociality',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.31.16')) {
      this.deleteOutdatedSearchItems(['https://twitter.com/search/%s']);
      this.addSearchItem(
        {
          name: 'X',
          url: 'https://x.com/search?q=%s',
          favicon: X_ICON,
        },
        'sociality',
      );
    }

    if (isVersionOutdated(this.storedSettingData.version, '5.31.17')) {
      this.modifyOutdatedSearchItemsIcon(
        'https://tieba.baidu.com/f?kw=%s&ie=utf-8',
        TIEBA,
      );
    }

    setValue(STORAGE_KEY, this.settingData);
  }

  initSettings() {
    if (this.storedSettingData) {
      this.settingData = Object.assign({}, this.storedSettingData);
      this.checkSettingDataIntegrity();
      this.checkUpdate();
    } else {
      this.settingData = this.scriptSettingData;
      // 不主动写入默认值：存储探测/读取失败时也返回空值，
      // 此时写回会把默认配置覆盖到已有配置上（部分站点曾出现该问题）。
    }
  }

  // 原地应用新设置：保持 settingData 引用不变，供已挂载的组件响应
  applySettings(next) {
    const source = Object.assign({}, next);
    migrateLegacyKeys(source);
    const merged = Object.assign({}, this.scriptSettingData, source);
    pruneUnknownKeys(merged, this.scriptSettingData);
    const plain = JSON.parse(JSON.stringify(merged));
    pruneUnknownKeys(this.settingData, this.scriptSettingData);
    Object.assign(this.settingData, plain);
    this.storedSettingData = this.settingData;
    return setValue(STORAGE_KEY, this.settingData);
  }

  // 从存储重新读取设置（用于其他页面保存后的同步）
  reload() {
    const stored = getValue(STORAGE_KEY, null);
    if (!stored || typeof stored !== 'object') return false;
    migrateLegacyKeys(stored);
    if (this.settingData && isSameValue(stored, this.settingData)) {
      return false;
    }
    this.storedSettingData = stored;
    this.settingData = Object.assign({}, stored);
    this.checkSettingDataIntegrity();
    return true;
  }

  getMatchedRule() {
    for (const rule of [...rules]) {
      if (rule.url.test(location.href)) return rule;
    }
    return null;
  }

  addSearchItem(newItem, category) {
    this.settingData.engineList[category].push(newItem);
  }

  modifyOutdatedSearchItems(oldURL, newURL) {
    for (const value in this.settingData.engineList) {
      const item = this.settingData.engineList[value];
      for (let i = 0; i < item.length; i++) {
        if (item[i].url === oldURL) item[i].url = newURL;
      }
    }
  }

  modifyOutdatedSearchItemsTarget(url) {
    for (const value in this.settingData.engineList) {
      const item = this.settingData.engineList[value];
      for (let i = 0; i < item.length; i++) {
        if (item[i].url === url) delete item[i].blank;
      }
    }
  }

  deleteOutdatedSearchItems(urlList) {
    for (const value in this.settingData.engineList) {
      const item = this.settingData.engineList[value];
      for (let i = 0; i < item.length; i++) {
        if (urlList.includes(item[i].url)) {
          console.warn('[SEJ] 删除搜索引擎：' + item[i].name);
          item.splice(i, 1);
        }
      }
    }
  }

  modifyOutdatedSearchItemsIcon(url, newIcon) {
    for (const value in this.settingData.engineList) {
      const item = this.settingData.engineList[value];
      for (let i = 0; i < item.length; i++) {
        if (item[i].url === url) item[i].favicon = newIcon;
      }
    }
  }

  modifyOutdatedSearchItemsRule(name, value) {
    const oldRule = this.settingData.rules;
    for (const item in oldRule) {
      if (oldRule[item].name == name) oldRule[item] = value;
    }
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

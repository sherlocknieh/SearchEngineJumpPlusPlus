/**
 * 设置面板中的引擎图标处理：
 * - getICON：新建引擎时的默认图标地址；
 * - 保存后在后台获取图标并写回；
 * - 打开设置面板时批量内嵌远程图标。
 */
import { ref } from 'vue';
import { embedFavicon, resolveFavicon } from '../core/favicon.js';
import { siteOrigin } from '../core/engineUrl.js';
import { showToast, ui } from '../stores/ui.js';
import { t } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {object} options.draft 设置面板草稿
 * @param {() => void} options.scheduleAutoSave 图标写回后触发自动保存
 * @param {() => boolean} options.isDisposed 面板是否已关闭
 */
export function useEngineIcons({ draft, scheduleAutoSave, isDisposed }) {
  const loadingIcons = ref(false);
  // 每个条目的图标加载版本号，用于丢弃过期的后台结果
  const iconLoadTokens = new Map();

  function findEngineById(id) {
    for (const category of draft.categories) {
      const engine = category.engines.find((item) => item._id === id);
      if (engine) return engine;
    }
    return null;
  }

  function bumpIconToken(id) {
    const token = (iconLoadTokens.get(id) || 0) + 1;
    iconLoadTokens.set(id, token);
    return token;
  }

  async function loadFaviconInBackground(id, url, token) {
    if (!/^https?:\/\//i.test(url)) return;
    const { data, reason } = await resolveFavicon(url);
    if (iconLoadTokens.get(id) !== token) return;
    const engine = findEngineById(id);
    // 图标在此期间被修改或该条目已删除时丢弃结果
    if (!engine || engine.favicon !== url) return;
    if (!data) {
      console.warn('[SEJ] 后台获取图标失败:', url, reason || t('favicon.backgroundFailed'));
      return;
    }
    engine.faviconData = data;
    scheduleAutoSave();
  }

  /** 保存引擎后调用：版本号 +1，并在缺少图标数据时后台获取 */
  function refreshIconInBackground(engine, url) {
    const token = bumpIconToken(engine._id);
    if (!engine.faviconData) loadFaviconInBackground(engine._id, url, token);
  }

  function getICON(olink) {
    const siteURL = siteOrigin(olink);
    const iconSetting = ui.iconSource;
    // 非数字时视为自定义地址模板，%s 会替换为站点地址；否则用站点自带的 /favicon.ico
    const template = isNaN(iconSetting) ? iconSetting : '';
    if (!template && !siteURL) return '';
    return (template || siteURL + '/favicon.ico').replace('%s', siteURL);
  }

  function remoteFaviconEngines() {
    const list = [];
    for (const category of draft.categories) {
      for (const engine of category.engines) {
        if (!engine.faviconData && /^https?:\/\//i.test(engine.favicon || '')) {
          list.push(engine);
        }
      }
    }
    return list;
  }

  async function embedRemoteFavicons() {
    const pending = remoteFaviconEngines();
    let converted = 0;
    let failed = 0;
    const worker = async () => {
      while (pending.length) {
        const engine = pending.shift();
        const original = engine.favicon;
        const dataUrl = await embedFavicon(original);
        if (dataUrl !== original) {
          engine.faviconData = dataUrl;
          converted++;
        } else {
          failed++;
        }
      }
    };
    const workers = Array.from({ length: Math.min(6, pending.length) }, () => worker());
    await Promise.all(workers);
    return { converted, failed };
  }

  // 打开设置时静默触发一次：把远程图标内嵌为 data 链接并自动保存
  async function loadAllIcons() {
    if (loadingIcons.value) return;
    const pending = remoteFaviconEngines().length;
    if (!pending) return;
    loadingIcons.value = true;
    try {
      const { converted, failed } = await embedRemoteFavicons();
      if (isDisposed() || !converted) return;
      scheduleAutoSave();
      const parts = [t('toast.embeddedIcons', { count: converted })];
      if (failed) parts.push(t('toast.iconsFailed', { count: failed }));
      showToast(`${parts.join(t('toast.listSeparator'))}${t('toast.autoSavedSuffix')}`, 4000);
    } finally {
      loadingIcons.value = false;
    }
  }

  return {
    loadingIcons,
    getICON,
    refreshIconInBackground,
    loadAllIcons,
  };
}

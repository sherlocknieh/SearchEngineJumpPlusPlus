/**
 * 设置面板的草稿模型。
 *
 * 把持久化的扁平配置展开成便于渲染和拖拽的树形草稿，并在保存前重新序列化。
 * 这里只负责数据本身；保存、提示、重启等副作用留在调用方。
 */
import { computed, reactive } from 'vue';
import { OPTION_KEYS, serializeConfig } from '../core/configSchema.js';
import { localizeCategoryName } from '../assets/i18n.js';

/**
 * @param {object} options
 * @param {object} options.settings 设置实例
 */
export function useSettingsDraft({ settings }) {
  const source = computed(() => settings.settingData);

  let uid = 1;
  const nextId = () => uid++;

  function makeDraft() {
    const raw = JSON.parse(JSON.stringify(source.value));
    const d = {};
    for (const key of OPTION_KEYS) d[key] = raw[key];
    d.categories = raw.engineCategories.map(([name, key, enabled]) => ({
      _id: nextId(),
      name,
      key,
      enabled: Boolean(enabled),
      engines: (raw.engineList[key] || []).map((engine) => ({
        ...engine,
        _id: nextId(),
      })),
    }));
    return d;
  }

  const draft = reactive(makeDraft());

  function buildResult(categories = draft.categories) {
    return serializeConfig({
      options: draft,
      categories,
      version: source.value.version,
    });
  }

  function refreshDraft() {
    const next = makeDraft();
    for (const key of OPTION_KEYS) draft[key] = next[key];
    draft.categories.splice(0, draft.categories.length, ...next.categories);
  }

  function displayCategoryName(category) {
    if (!category) return '';
    return localizeCategoryName(category.name, category.key);
  }

  function toggleCategory(index) {
    const category = draft.categories[index];
    category.enabled = !category.enabled;
    return category.enabled;
  }

  function toggleEngine(ci, ei) {
    const engine = draft.categories[ci].engines[ei];
    engine.disable = !engine.disable;
    return !engine.disable;
  }

  function createCategoryKey() {
    const base = 'user' + Date.now();
    let key = base;
    let index = 1;
    while (draft.categories.some((category) => category.key === key)) {
      key = `${base}-${index++}`;
    }
    return key;
  }

  /** 追加一个空分类，返回新分类；滚动到底部和保存由调用方处理。 */
  function appendCategory(name) {
    const category = {
      _id: nextId(),
      name,
      key: createCategoryKey(),
      enabled: true,
      engines: [],
    };
    draft.categories.push(category);
    return category;
  }

  return {
    source,
    draft,
    nextId,
    buildResult,
    refreshDraft,
    displayCategoryName,
    toggleCategory,
    toggleEngine,
    appendCategory,
  };
}

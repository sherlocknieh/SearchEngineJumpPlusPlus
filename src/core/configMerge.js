/**
 * 合并导入：读取一份配置文件，把其中的分类和搜索引擎追加到现有列表中。
 * 只新增内容，不删除也不覆盖现有引擎，便于从其他站点/用户导入备份。
 */
import { readConfig } from './configSchema.js';

/**
 * 引擎去重键：忽略首尾空白、协议/域名大小写与末尾斜杠，
 * 路径与查询参数保持原样（%s 等占位符因此原样参与比较）。
 */
export function engineUrlKey(url) {
  const value = typeof url === 'string' ? url.trim() : '';
  if (!value) return '';
  return value
    .replace(
      /^([a-z][a-z\d+.-]*:\/\/)?([^/?#]+)/i,
      (match, scheme = '', host) => scheme.toLowerCase() + host.toLowerCase(),
    )
    .replace(/\/+$/, '');
}

/** 分类名比较键：忽略首尾空白与大小写 */
export function categoryNameKey(name) {
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
}

/** 生成未被占用的分类键名，供合并时新增分类使用 */
export function uniqueCategoryKey(baseKey, usedKeys) {
  let key = typeof baseKey === 'string' && baseKey ? baseKey : 'imported';
  if (!usedKeys.has(key)) return key;
  let index = 2;
  while (usedKeys.has(`${key}-${index}`)) index += 1;
  return `${key}-${index}`;
}

/**
 * 把导入配置合并进现有分类列表：只追加新分类与引擎，不修改或删除已有条目。
 * categories 为设置面板的草稿分类数组（name/key/enabled/engines），会被原地追加；
 * createId 用于给新增条目分配内部 id。无法识别导入内容时返回 null。
 * @returns {{engines: number, categories: number, skipped: number} | null}
 */
export function mergeIntoCategories(categories, imported, createId) {
  const incoming = readConfig(imported);
  if (!incoming) return null;

  const stats = { engines: 0, categories: 0, skipped: 0 };
  const usedKeys = new Set(categories.map((category) => category.key));

  for (const [name, key, enabled] of incoming.engineCategories) {
    const engines = incoming.engineList[key] || [];
    // 先按键名匹配，再按名称匹配，便于合并改名但语义相同的分类
    const target =
      categories.find((category) => category.key === key) ||
      categories.find((category) => categoryNameKey(category.name) === categoryNameKey(name));

    const seen = new Set(
      (target ? target.engines : []).map((engine) => engineUrlKey(engine.url)).filter(Boolean),
    );
    const additions = [];
    for (const engine of engines) {
      const urlKey = engineUrlKey(engine.url);
      // 没有链接或已存在相同链接时跳过，避免重复条目
      if (!urlKey || seen.has(urlKey)) {
        stats.skipped += 1;
        continue;
      }
      seen.add(urlKey);
      additions.push({ ...engine, _id: createId() });
    }
    if (!additions.length) continue;

    if (target) {
      target.engines.push(...additions);
    } else {
      const newKey = uniqueCategoryKey(key, usedKeys);
      usedKeys.add(newKey);
      categories.push({
        _id: createId(),
        name,
        key: newKey,
        enabled: Boolean(enabled),
        engines: additions,
      });
      stats.categories += 1;
    }
    stats.engines += additions.length;
  }

  return stats;
}

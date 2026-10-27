/**
 * 拖拽排序的快照与还原。
 *
 * 快照只记录草稿内部 id，不持有元素引用，因此可以安全地跨渲染使用。
 */

/**
 * @param {Array<object>} categories 草稿分类列表
 * @returns {{ categories: number[], engines: Record<number, number[]> }}
 */
export function captureOrder(categories) {
  return {
    categories: categories.map((category) => category._id),
    engines: Object.fromEntries(
      categories.map((category) => [category._id, category.engines.map((engine) => engine._id)]),
    ),
  };
}

/**
 * 按快照恢复分类与引擎的顺序；快照中不存在的条目会被丢弃。
 *
 * @param {Array<object>} categories 草稿分类列表（原地修改）
 * @param {{ categories: number[], engines: Record<number, number[]> }} snapshot
 */
export function applyOrder(categories, snapshot) {
  const categoryById = new Map(categories.map((category) => [category._id, category]));
  const engineById = new Map();
  for (const category of categories) {
    for (const engine of category.engines) engineById.set(engine._id, engine);
  }

  for (const category of categories) {
    const ids = snapshot.engines[category._id] || [];
    category.engines.splice(
      0,
      category.engines.length,
      ...ids.map((id) => engineById.get(id)).filter(Boolean),
    );
  }
  const ordered = snapshot.categories.map((id) => categoryById.get(id)).filter(Boolean);
  categories.splice(0, categories.length, ...ordered);
}

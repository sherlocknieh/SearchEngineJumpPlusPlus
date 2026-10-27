import { describe, expect, it } from 'vitest';
import { applyOrder, captureOrder } from '../src/composables/drag/dragOrder.js';

function makeCategories() {
  return [
    { _id: 1, engines: [{ _id: 11 }, { _id: 12 }] },
    { _id: 2, engines: [{ _id: 21 }] },
  ];
}

describe('dragOrder', () => {
  it('快照只记录 id', () => {
    const snapshot = captureOrder(makeCategories());
    expect(snapshot).toEqual({
      categories: [1, 2],
      engines: { 1: [11, 12], 2: [21] },
    });
  });

  it('恢复分类顺序与引擎归属', () => {
    const categories = makeCategories();
    const snapshot = captureOrder(categories);

    // 模拟拖动过程中的临时改动：交换分类、把引擎挪到另一个分类
    const [moved] = categories[0].engines.splice(1, 1);
    categories[1].engines.push(moved);
    categories.reverse();

    applyOrder(categories, snapshot);

    expect(categories.map((category) => category._id)).toEqual([1, 2]);
    expect(categories[0].engines.map((engine) => engine._id)).toEqual([11, 12]);
    expect(categories[1].engines.map((engine) => engine._id)).toEqual([21]);
  });

  it('快照中不存在的条目会被丢弃', () => {
    const categories = makeCategories();
    const snapshot = captureOrder(categories);
    categories[0].engines.push({ _id: 99 });

    applyOrder(categories, snapshot);

    expect(categories[0].engines.map((engine) => engine._id)).toEqual([11, 12]);
  });
});

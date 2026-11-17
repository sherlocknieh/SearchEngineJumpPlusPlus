import { describe, expect, it } from 'vitest';
import { dropListSpace, placeDropList } from '../src/core/dropListPlacement.js';

const viewport = { width: 1200, height: 800 };

function trigger(top, left = 500, width = 80) {
  return { top, bottom: top + 24, left, width };
}

describe('dropListSpace', () => {
  it('上下空间都宽裕时高度上限取更宽的一侧', () => {
    const space = dropListSpace({ triggerTop: 300, triggerBottom: 324, viewportHeight: 800 });
    expect(space).toEqual({ spaceAbove: 290, spaceBelow: 466, maxHeight: 466 });
  });

  it('触发项贴近底部时按上方空间给出高度上限', () => {
    const space = dropListSpace({ triggerTop: 760, triggerBottom: 784, viewportHeight: 800 });
    expect(space).toEqual({ spaceAbove: 750, spaceBelow: 6, maxHeight: 750 });
  });

  it('两侧都放不下时不会给出负高度', () => {
    const space = dropListSpace({ triggerTop: 1, triggerBottom: 798, viewportHeight: 800 });
    expect(space.maxHeight).toBe(0);
  });
});

describe('placeDropList', () => {
  it('空间足够时贴在触发项下方并与它水平居中', () => {
    const placed = placeDropList({
      triggerRect: trigger(100),
      list: { width: 200, height: 260 },
      viewport,
    });
    expect(placed).toEqual({ top: 100 + 24 + 2, left: 500 + (80 - 200) / 2 });
  });

  it('下方放不下且上方更宽裕时翻到上方', () => {
    const placed = placeDropList({
      triggerRect: trigger(600),
      list: { width: 200, height: 360 },
      viewport,
    });
    expect(placed.top).toBe(600 - 360 - 2);
  });

  it('下方放得下时即使上方更宽也不上翻', () => {
    const placed = placeDropList({
      triggerRect: trigger(700),
      list: { width: 200, height: 60 },
      viewport,
    });
    expect(placed.top).toBe(700 + 24 + 2);
  });

  it('两侧都放不下时留在空间更大的一侧', () => {
    const placed = placeDropList({
      triggerRect: trigger(120),
      list: { width: 200, height: 700 },
      viewport,
    });
    expect(placed.top).toBe(120 + 24 + 2);
  });

  it('absolute 定位时落点扣除宿主原点', () => {
    const placed = placeDropList({
      triggerRect: trigger(100),
      list: { width: 200, height: 260 },
      viewport,
      origin: { left: 30, top: 50 },
    });
    expect(placed).toEqual({
      top: 100 + 24 + 2 - 50,
      left: 500 - 30 + (80 - 200) / 2,
    });
  });

  it('超出左右边界时收进视口', () => {
    const placed = placeDropList({
      triggerRect: trigger(300, 1150, 40),
      list: { width: 300, height: 120 },
      viewport,
    });
    expect(placed.left).toBe(1200 - 300 - 8);
  });
});

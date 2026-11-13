import { describe, expect, it } from 'vitest';
import { placeNearRect } from '../src/core/floatPlacement.js';

const viewport = { width: 1200, height: 800 };
const bar = { width: 300, height: 32 };

function rect(top, right, bottom) {
  return { top, left: right - 100, right, bottom };
}

describe('placeNearRect', () => {
  it('默认贴在选区右上角上方', () => {
    expect(placeNearRect({ rect: rect(300, 500, 320), bar, viewport })).toEqual({
      top: 300 - 6 - 32,
      left: 500,
    });
  });

  it('上方空间不足时落到选区下方', () => {
    const result = placeNearRect({ rect: rect(10, 500, 30), bar, viewport });
    expect(result.top).toBeGreaterThan(30);
  });

  it('超出右边界时向左收进视口', () => {
    const result = placeNearRect({ rect: rect(300, 1190, 320), bar, viewport });
    expect(result.left).toBe(1200 - 6 - 300);
  });

  it('窄视口下也不会出现负坐标', () => {
    const result = placeNearRect({
      rect: rect(400, 200, 420),
      bar: { width: 900, height: 32 },
      viewport: { width: 320, height: 640 },
    });
    expect(result.left).toBeGreaterThanOrEqual(0);
    expect(result.top).toBeGreaterThanOrEqual(0);
  });
});
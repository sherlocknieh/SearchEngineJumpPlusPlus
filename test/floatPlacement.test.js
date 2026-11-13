import { describe, expect, it } from 'vitest';
import { placeAboveRect, placeInsideRect, placeNearRect } from '../src/core/floatPlacement.js';

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
describe('placeInsideRect', () => {
  const imageRect = { top: 200, left: 300, right: 800, bottom: 600 };

  it('放在图片内部顶部居中', () => {
    expect(placeInsideRect({ rect: imageRect, bar, viewport })).toEqual({
      top: 200 + 6,
      left: 300 + (500 - 300) / 2,
    });
  });

  it('图片太小时返回 null 以便退回外部定位', () => {
    const small = { top: 10, left: 10, right: 110, bottom: 110 };
    expect(placeInsideRect({ rect: small, bar, viewport })).toBeNull();
  });

  it('图片超出视口右侧时居中坐标收进视口', () => {
    const rect = { top: 200, left: 950, right: 1350, bottom: 600 };
    expect(placeInsideRect({ rect, bar, viewport }).left).toBe(1200 - 6 - 300);
  });

  it('图片顶部超出视口时收进视口顶部', () => {
    const rect = { top: -40, left: 300, right: 800, bottom: 600 };
    expect(placeInsideRect({ rect, bar, viewport }).top).toBe(6);
  });
});

describe('placeAboveRect', () => {
  it('图片上方居中', () => {
    const rect = { top: 300, left: 300, right: 800, bottom: 400 };
    expect(placeAboveRect({ rect, bar, viewport })).toEqual({
      top: 300 - 6 - 32,
      left: 300 + (500 - 300) / 2,
    });
  });

  it('顶部空间不足时收进视口顶部', () => {
    const rect = { top: 10, left: 300, right: 800, bottom: 100 };
    expect(placeAboveRect({ rect, bar, viewport }).top).toBe(6);
  });
});

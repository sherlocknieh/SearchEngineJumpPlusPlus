import { describe, expect, it } from 'vitest';
import { placeAboveRect, placeInsideRect, placeInlineIcon } from '../src/core/floatPlacement.js';

const viewport = { width: 1200, height: 800 };
const bar = { width: 300, height: 32 };

function rect(top, right, bottom) {
  return { top, left: right - 100, right, bottom };
}

describe('placeAboveRect', () => {
  it('左对齐时贴住锚点左边缘', () => {
    expect(placeAboveRect({ rect: rect(300, 500, 320), bar, viewport, align: 'left' })).toEqual({
      top: 300 - 6 - 32,
      left: 400,
    });
  });

  it('未指定对齐方式时居中', () => {
    expect(placeAboveRect({ rect: rect(300, 500, 320), bar, viewport })).toEqual({
      top: 300 - 6 - 32,
      left: 400 + (100 - 300) / 2,
    });
  });

  it('上方空间不足时翻到锚点下方', () => {
    const result = placeAboveRect({ rect: rect(10, 500, 30), bar, viewport });
    expect(result.top).toBe(30 + 6);
  });

  it('超出左右边界时收进视口', () => {
    const result = placeAboveRect({ rect: rect(300, 1190, 320), bar, viewport });
    expect(result.left).toBe(1200 - 6 - 300);
  });

  it('窄视口下也不会出现负坐标', () => {
    const result = placeAboveRect({
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

describe('placeAboveRect 图片兜底', () => {
  it('图片上方居中', () => {
    const rect = { top: 300, left: 300, right: 800, bottom: 400 };
    expect(placeAboveRect({ rect, bar, viewport })).toEqual({
      top: 300 - 6 - 32,
      left: 300 + (500 - 300) / 2,
    });
  });

  it('顶部空间不足时翻到图片下方', () => {
    const rect = { top: 10, left: 300, right: 800, bottom: 100 };
    expect(placeAboveRect({ rect, bar, viewport }).top).toBe(100 + 6);
  });
});

describe('placeInlineIcon', () => {
  const viewport = { width: 1200, height: 800 };
  const size = { iconSize: 30, barHeight: 32 };

  it('贴在选区左侧、与这一行垂直居中', () => {
    const rect = { top: 300, left: 400, right: 500, bottom: 320 };
    expect(placeInlineIcon({ rect, ...size, viewport })).toEqual({
      top: 310 - 16,
      left: 400 - 6 - 30,
    });
  });

  it('左侧放不下时压住选区开头', () => {
    const rect = { top: 300, left: 10, right: 200, bottom: 320 };
    expect(placeInlineIcon({ rect, ...size, viewport }).left).toBe(10);
  });

  it('多行选区按第一行对齐', () => {
    const rect = { top: 300, left: 400, right: 500, bottom: 500 };
    expect(placeInlineIcon({ rect, ...size, viewport }).top).toBe(300 + 15 - 16);
  });

  it('靠近右边界时图标仍在视口内', () => {
    const rect = { top: 300, left: 1190, right: 1195, bottom: 320 };
    const { left } = placeInlineIcon({ rect, ...size, viewport });
    expect(left).toBe(1190 - 6 - 30);
    expect(left + 30).toBeLessThanOrEqual(1200 - 6);
  });
});

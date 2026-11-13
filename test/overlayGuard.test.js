// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import {
  OVERLAY_MIN_Z_INDEX,
  findSelectionBlocker,
  removeSelectionBlockers,
} from '../src/core/overlayGuard.js';

// happy-dom 的 getComputedStyle 不处理游离节点，这里用一个只有必要能力的文档替身
const VIEWPORT = { width: 1000, height: 800 };

/** 造一个 iframe 节点，样式与尺寸直接挂在节点上供替身文档读取 */
function frame({ position = 'fixed', zIndex = 2147483647, pointerEvents = 'auto', width = 1000, height = 800 } = {}) {
  const el = document.createElement('iframe');
  el.fakeStyle = {
    position,
    zIndex: String(zIndex),
    pointerEvents,
    display: 'block',
    visibility: 'visible',
  };
  el.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
  });
  return el;
}

/** @param {Element[]} els 页面上的全部 iframe @param {Element | null} hit 视口中心压着的元素 */
function fakeDoc(els, { hit = null, hitTest = true } = {}) {
  const doc = {
    defaultView: {
      innerWidth: VIEWPORT.width,
      innerHeight: VIEWPORT.height,
      getComputedStyle: (el) => el.fakeStyle ?? {},
    },
    querySelectorAll: () => els,
  };
  if (hitTest) doc.elementFromPoint = () => hit;
  return doc;
}

describe('findSelectionBlocker', () => {
  it('识别占满视口的透明 iframe 遮罩', () => {
    const el = frame();
    expect(findSelectionBlocker(fakeDoc([el], { hit: el }))).toBe(el);
  });

  it('命中点上压着正常内容时不算遮罩', () => {
    const el = frame();
    expect(findSelectionBlocker(fakeDoc([el], { hit: document.createElement('p') }))).toBeNull();
  });

  it('普通浮动层、尺寸过小的广告位不算遮罩', () => {
    const lowZ = frame({ zIndex: 10 });
    const small = frame({ width: 320, height: 180 });
    expect(findSelectionBlocker(fakeDoc([lowZ, small], { hit: small }))).toBeNull();
  });

  it('不接鼠标事件或非固定定位的 iframe 不挡划词', () => {
    const passive = frame({ pointerEvents: 'none' });
    const absolute = frame({ position: 'absolute' });
    expect(findSelectionBlocker(fakeDoc([passive, absolute], { hit: absolute }))).toBeNull();
  });

  it('z-index 低于阈值不参与判断', () => {
    const el = frame({ zIndex: OVERLAY_MIN_Z_INDEX - 1 });
    expect(findSelectionBlocker(fakeDoc([el], { hit: el }))).toBeNull();
  });

  it('拿不到命中测试时退回按样式与尺寸判断', () => {
    const el = frame();
    expect(findSelectionBlocker(fakeDoc([el], { hitTest: false }))).toBe(el);
  });
});

describe('removeSelectionBlockers', () => {
  it('只移除全屏遮罩，保留其他 iframe', () => {
    const blocker = frame();
    const keep = frame({ width: 320, height: 180 });
    const removed = removeSelectionBlockers(fakeDoc([blocker, keep]));

    expect(removed).toBe(1);
    expect(blocker.isConnected).toBe(false);
  });

  it('没有遮罩时返回 0', () => {
    expect(removeSelectionBlockers(fakeDoc([frame({ zIndex: 10 })]))).toBe(0);
  });
});

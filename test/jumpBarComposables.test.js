// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import {
  hasScrollOverflow,
  maxScrollLeft,
  useScrollDrag,
} from '../src/composables/useScrollDrag.js';
import { useStackSync } from '../src/composables/useStackSync.js';

function createScroller() {
  const el = document.createElement('div');
  let scrollLeft = 0;
  Object.defineProperties(el, {
    scrollWidth: { value: 500, configurable: true },
    clientWidth: { value: 200, configurable: true },
    scrollLeft: {
      configurable: true,
      get: () => scrollLeft,
      set: (value) => {
        scrollLeft = value;
      },
    },
  });
  document.body.appendChild(el);
  return el;
}

// 内容宽度与滚动区宽度都按小数值给出：整数 scrollWidth/clientWidth 会把
// 亚像素差异放大成 1~2px，判定需要看真实小数宽度
function createMeasuredScroller({ contentWidth, viewWidth }) {
  const el = document.createElement('div');
  const item = document.createElement('span');
  Object.defineProperty(item, 'getBoundingClientRect', {
    value: () => ({
      width: contentWidth,
      height: 30,
      left: 0,
      right: contentWidth,
      top: 0,
      bottom: 30,
    }),
  });
  el.appendChild(item);
  Object.defineProperty(el, 'getBoundingClientRect', {
    value: () => ({ width: viewWidth, height: 34, left: 0, right: viewWidth, top: 0, bottom: 34 }),
  });
  Object.defineProperty(el, 'scrollWidth', {
    value: Math.ceil(contentWidth),
    configurable: true,
  });
  Object.defineProperty(el, 'clientWidth', {
    value: Math.floor(viewWidth),
    configurable: true,
  });
  document.body.appendChild(el);
  return el;
}

describe('hasScrollOverflow', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('亚像素级取整误差不算溢出', () => {
    // 内容 200.4 落在 200.2 的可视区内：scrollWidth 201 - clientWidth 200 会误判溢出
    const el = createMeasuredScroller({ contentWidth: 200.4, viewWidth: 200.2 });
    expect(el.scrollWidth - el.clientWidth).toBeGreaterThan(0);
    expect(hasScrollOverflow(el)).toBe(false);
    expect(maxScrollLeft(el)).toBe(0);
  });

  it('真正超出容差才算溢出', () => {
    const el = createMeasuredScroller({ contentWidth: 206, viewWidth: 200 });
    expect(hasScrollOverflow(el)).toBe(true);
    expect(maxScrollLeft(el)).toBe(6);
  });

  it('取整误差区间内仍按小数宽度判定', () => {
    // 整数差只有 1px，但内容确实多出 0.6px，仍算溢出
    const el = createMeasuredScroller({ contentWidth: 200.8, viewWidth: 200.2 });
    expect(hasScrollOverflow(el)).toBe(true);
    expect(maxScrollLeft(el)).toBe(1);
  });
});

describe('useScrollDrag', () => {
  let el;

  beforeEach(() => {
    el = createScroller();
  });

  afterEach(() => {
    el.remove();
  });

  function setup() {
    return useScrollDrag({ scrollEl: ref(el), threshold: 6 });
  }

  it('横向移动超过阈值后开始拖动', () => {
    const drag = setup();
    el.scrollLeft = 100;
    drag.onScrollPointerDown({
      pointerType: 'mouse',
      button: 0,
      pointerId: 1,
      clientX: 100,
      clientY: 50,
    });
    drag.onWindowPointerMove({
      pointerId: 1,
      pointerType: 'mouse',
      buttons: 1,
      clientX: 130,
      clientY: 52,
    });

    expect(el.scrollLeft).toBe(70);
    expect(el.classList.contains('sej-scroll-dragging')).toBe(true);
    drag.endScrollDrag({ pointerId: 1 });
    expect(el.classList.contains('sej-scroll-dragging')).toBe(false);
    drag.dispose();
  });

  it('触屏不接管拖动，交给浏览器原生滚动', () => {
    const drag = setup();
    el.scrollLeft = 100;
    drag.onScrollPointerDown({
      pointerType: 'touch',
      pointerId: 2,
      clientX: 100,
      clientY: 50,
    });
    drag.onWindowPointerMove({
      pointerId: 2,
      pointerType: 'touch',
      buttons: 0,
      clientX: 140,
      clientY: 50,
    });

    expect(el.scrollLeft).toBe(100);
    expect(el.classList.contains('sej-scroll-dragging')).toBe(false);
    drag.dispose();
  });

  it('未超过阈值或纵向手势不拖动', () => {
    const drag = setup();
    el.scrollLeft = 100;
    drag.onScrollPointerDown({
      pointerType: 'mouse',
      button: 0,
      pointerId: 1,
      clientX: 100,
      clientY: 50,
    });
    drag.onWindowPointerMove({
      pointerId: 1,
      pointerType: 'mouse',
      buttons: 1,
      clientX: 103,
      clientY: 50,
    });
    expect(el.scrollLeft).toBe(100);

    drag.onWindowPointerMove({
      pointerId: 1,
      pointerType: 'mouse',
      buttons: 1,
      clientX: 110,
      clientY: 80,
    });
    expect(el.scrollLeft).toBe(100);
    drag.dispose();
  });

  it('拖动结束后的 click 被抑制一次', () => {
    const drag = setup();
    el.scrollLeft = 100;
    drag.onScrollPointerDown({
      pointerType: 'mouse',
      button: 0,
      pointerId: 1,
      clientX: 100,
      clientY: 50,
    });
    drag.onWindowPointerMove({
      pointerId: 1,
      pointerType: 'mouse',
      buttons: 1,
      clientX: 130,
      clientY: 50,
    });
    drag.endScrollDrag({ pointerId: 1 });

    const event = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
    drag.onScrollClickCapture(event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);

    const second = { preventDefault: vi.fn(), stopPropagation: vi.fn() };
    drag.onScrollClickCapture(second);
    expect(second.preventDefault).not.toHaveBeenCalled();
    drag.dispose();
  });

  it('滚动提示按左右剩余内容切换', () => {
    const drag = setup();
    el.scrollLeft = 100;
    drag.updateScrollHints();
    expect(el.classList.contains('sej-scroll-more-left')).toBe(true);
    expect(el.classList.contains('sej-scroll-more-right')).toBe(true);

    el.scrollLeft = 300;
    drag.updateScrollHints();
    expect(el.classList.contains('sej-scroll-more-right')).toBe(false);
    drag.dispose();
  });

  it('滚轮纵向滚动量转成横向滚动', () => {
    const drag = setup();
    const event = { deltaX: 0, deltaY: 60, deltaMode: 0, preventDefault: vi.fn() };
    drag.onScrollWheel(event);

    expect(el.scrollLeft).toBe(60);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    drag.dispose();
  });

  it('行模式的滚轮按行高换算', () => {
    const drag = setup();
    drag.onScrollWheel({ deltaX: 0, deltaY: 3, deltaMode: 1, preventDefault: vi.fn() });

    expect(el.scrollLeft).toBe(48);
    drag.dispose();
  });

  it('到两端后放行滚轮, 不拦截页面滚动', () => {
    const drag = setup();
    el.scrollLeft = 0;
    const up = { deltaX: 0, deltaY: -60, deltaMode: 0, preventDefault: vi.fn() };
    drag.onScrollWheel(up);
    expect(el.scrollLeft).toBe(0);
    expect(up.preventDefault).not.toHaveBeenCalled();

    el.scrollLeft = 300;
    const down = { deltaX: 0, deltaY: 60, deltaMode: 0, preventDefault: vi.fn() };
    drag.onScrollWheel(down);
    expect(el.scrollLeft).toBe(300);
    expect(down.preventDefault).not.toHaveBeenCalled();
    drag.dispose();
  });

  it('内容不溢出时不接管滚轮', () => {
    const drag = setup();
    Object.defineProperty(el, 'scrollWidth', { value: 200, configurable: true });
    const event = { deltaX: 0, deltaY: 60, deltaMode: 0, preventDefault: vi.fn() };
    drag.onScrollWheel(event);

    expect(el.scrollLeft).toBe(0);
    expect(event.preventDefault).not.toHaveBeenCalled();
    drag.dispose();
  });

  it('Ctrl 缩放时不接管滚轮', () => {
    const drag = setup();
    const event = {
      deltaX: 0,
      deltaY: 60,
      deltaMode: 0,
      ctrlKey: true,
      preventDefault: vi.fn(),
    };
    drag.onScrollWheel(event);

    expect(el.scrollLeft).toBe(0);
    expect(event.preventDefault).not.toHaveBeenCalled();
    drag.dispose();
  });
});

describe('useStackSync', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('按退避延迟刷新，结束后移除 resize 监听', () => {
    const refresh = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    const { start, stop } = useStackSync({ delays: [0, 100], refresh });

    start();
    expect(addSpy).toHaveBeenCalledWith('resize', refresh);
    vi.advanceTimersByTime(0);
    expect(refresh).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(100);
    expect(refresh).toHaveBeenCalledTimes(2);

    refresh.mockClear();
    window.dispatchEvent(new Event('resize'));
    expect(refresh).not.toHaveBeenCalled();

    stop();
  });
});

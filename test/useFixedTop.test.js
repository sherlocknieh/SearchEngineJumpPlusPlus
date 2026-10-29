// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useFixedTop } from '../src/composables/useFixedTop.js';

function setViewportWidth(vw) {
  Object.defineProperty(document.documentElement, 'clientWidth', {
    configurable: true,
    value: vw,
  });
}

function createBar(left, width) {
  const el = document.createElement('div');
  el.getBoundingClientRect = () => ({
    left,
    right: left + width,
    width,
    top: 0,
    bottom: 30,
    height: 30,
    x: left,
    y: 0,
  });
  document.body.appendChild(el);
  return el;
}

function setup({ vw, left, width, patches = {}, forceCenter = false }) {
  setViewportWidth(vw);
  const host = document.createElement('div');
  const containerEl = ref(createBar(left, width));
  const api = useFixedTop({
    containerEl,
    isSelectSearch: ref(false),
    inlineStyleBlocked: false,
    sitePatches: patches,
    matchedRule: null,
    getResolvedStyle: () => '',
    getHost: () => host,
    getStackOffset: () => 0,
    updateScrollHints: () => {},
    getInsertTarget: () => null,
    getInputTarget: () => null,
    forceCenter,
  });
  return { api, host, el: containerEl.value };
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useFixedTop constrainBarToViewport', () => {
  it('窄屏下把所有站点的跳转条位移到视口中心', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('-400px 0');
    expect(el.dataset.sejCentered).toBe('1');
  });

  it('窄屏下标记为移动端居中', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });

    api.constrainBarToViewport();

    expect(el.classList.contains('sej-mobile-centered')).toBe(true);
  });

  it('视口变宽后撤销居中位移', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });
    api.constrainBarToViewport();

    setViewportWidth(900);
    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
    expect(el.classList.contains('sej-mobile-centered')).toBe(false);
  });

  it('桌面端未声明补丁的站点保持原布局', () => {
    const { api, el } = setup({ vw: 900, left: 600, width: 100 });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
  });

  it('按 UA 识别移动设备，宽视口同样居中', () => {
    const originalUA = Object.getOwnPropertyDescriptor(window.navigator, 'userAgent');
    const originalVisualViewport = Object.getOwnPropertyDescriptor(window, 'visualViewport');
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value:
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36',
    });
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: undefined });

    try {
      const { api, el } = setup({ vw: 900, left: 600, width: 100 });
      api.constrainBarToViewport();

      expect(el.style.getPropertyValue('translate')).toBe('-200px 0');
      expect(el.dataset.sejCentered).toBe('1');
    } finally {
      if (originalUA) {
        Object.defineProperty(window.navigator, 'userAgent', originalUA);
      } else {
        delete window.navigator.userAgent;
      }
      if (originalVisualViewport) {
        Object.defineProperty(window, 'visualViewport', originalVisualViewport);
      } else {
        delete window.visualViewport;
      }
    }
  });

  it('跳转条固定时不保留居中位移', () => {
    const { api, host, el } = setup({ vw: 500, left: 600, width: 100 });
    api.constrainBarToViewport();
    host.style.position = 'fixed';

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
  });
});

describe('useFixedTop alignTo', () => {
  function createNav(left, width = 600) {
    const nav = document.createElement('nav');
    nav.className = 'b_scopebar';
    nav.getBoundingClientRect = () => ({
      left,
      right: left + width,
      width,
      top: 0,
      bottom: 0,
      height: 0,
      x: left,
      y: 0,
    });
    document.body.appendChild(nav);
    return nav;
  }

  it('桌面端跟随对齐元素的左边缘', () => {
    createNav(18);
    const { api, el } = setup({
      vw: 900,
      left: 0,
      width: 100,
      patches: { alignTo: '.b_scopebar' },
    });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('margin-left')).toBe('18px');
  });

  it('对齐元素随视口改变位置后重新对齐', () => {
    const nav = createNav(160);
    const { api, el } = setup({
      vw: 900,
      left: 0,
      width: 100,
      patches: { alignTo: '.b_scopebar' },
    });
    api.constrainBarToViewport();
    expect(el.style.getPropertyValue('margin-left')).toBe('160px');

    nav.getBoundingClientRect = () => ({
      left: 18,
      right: 618,
      width: 600,
      top: 0,
      bottom: 0,
      height: 0,
      x: 18,
      y: 0,
    });
    setViewportWidth(700);
    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('margin-left')).toBe('18px');
  });

  it('对齐元素超出视口时收敛到视口边界', () => {
    createNav(2000);
    const { api, el } = setup({
      vw: 900,
      left: 0,
      width: 100,
      patches: { alignTo: '.b_scopebar' },
    });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('margin-left')).toBe('796px');
  });

  it('开启强制居中时不跟随对齐元素', () => {
    createNav(18);
    const { api, el } = setup({
      vw: 900,
      left: 0,
      width: 100,
      patches: { alignTo: '.b_scopebar' },
      forceCenter: true,
    });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('margin-left')).toBe('');
    expect(el.style.getPropertyValue('left')).toBe('');
  });

  it('对齐元素不存在时保持站点布局', () => {
    const { api, el } = setup({
      vw: 900,
      left: 0,
      width: 100,
      patches: { alignTo: '.b_scopebar' },
    });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('margin-left')).toBe('');
    expect(el.style.getPropertyValue('left')).toBe('');
  });
});

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

function setup({ vw, left, width, patches = {} }) {
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

  it('窄屏下用内联 !important 覆盖站点横向偏移', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('left')).toBe('auto');
    expect(el.style.getPropertyPriority('left')).toBe('important');
    expect(el.style.getPropertyValue('margin-left')).toBe('auto');
    expect(el.style.getPropertyPriority('margin-left')).toBe('important');
  });

  it('视口变宽后撤销居中位移', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });
    api.constrainBarToViewport();

    setViewportWidth(900);
    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
    expect(el.style.getPropertyValue('left')).toBe('');
    expect(el.dataset.sejMobileCentered).toBeUndefined();
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

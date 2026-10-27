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

  it('视口变宽后撤销居中位移', () => {
    const { api, el } = setup({ vw: 500, left: 600, width: 100 });
    api.constrainBarToViewport();

    setViewportWidth(900);
    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
  });

  it('桌面端未声明补丁的站点保持原布局', () => {
    const { api, el } = setup({ vw: 900, left: 600, width: 100 });

    api.constrainBarToViewport();

    expect(el.style.getPropertyValue('translate')).toBe('');
    expect(el.dataset.sejCentered).toBeUndefined();
  });

  it('触屏宽视口（横屏手机/平板）同样居中', () => {
    const originalMatchMedia = window.matchMedia;
    const originalVisualViewport = Object.getOwnPropertyDescriptor(window, 'visualViewport');
    window.matchMedia = (query) => ({
      matches: query.includes('pointer: coarse'),
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    });
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: undefined });

    try {
      const { api, el } = setup({ vw: 900, left: 600, width: 100 });
      api.constrainBarToViewport();

      expect(el.style.getPropertyValue('translate')).toBe('-200px 0');
      expect(el.dataset.sejCentered).toBe('1');
    } finally {
      window.matchMedia = originalMatchMedia;
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

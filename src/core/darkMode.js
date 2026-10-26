import { getHost } from './shadowDom.js';

const THEME_ATTRS = [
  'data-theme',
  'data-color-scheme',
  'data-color-mode',
  'theme',
];
const DARK_HINT = /dark|night/;
const LIGHT_HINT = /light/;

function indicatorHint(value) {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (DARK_HINT.test(lower)) return true;
  if (LIGHT_HINT.test(lower)) return false;
  return null;
}

// 站点通常把主题写在 data-* 属性或 class 上; 属性优先于 class
function themeHint() {
  const elements = [document.documentElement, document.body].filter(Boolean);
  for (const el of elements) {
    for (const attr of THEME_ATTRS) {
      const hint = indicatorHint(el.getAttribute(attr));
      if (hint !== null) return hint;
    }
  }
  for (const el of elements) {
    const className = typeof el.className === 'string' ? el.className : '';
    const hint = indicatorHint(className);
    if (hint !== null) return hint;
  }
  return null;
}

// 返回 null 表示该色值透明或无法解析
function isDarkColor(color) {
  const match = /^rgba?\(([^)]+)\)/.exec(color || '');
  if (!match) return null;

  const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).map(Number);
  if (![r, g, b].every(Number.isFinite) || a < 0.5) return null;

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq < 128;
}

export function isDarkMode() {
  const hint = themeHint();
  if (hint !== null) return hint;

  try {
    const colorScheme = getComputedStyle(document.documentElement).colorScheme;
    if (colorScheme && colorScheme.split(/\s+/).includes('dark')) return true;
  } catch (e) {
    // ignore
  }

  // 从应用根节点逐级向上, 取第一个不透明的背景色
  const start =
    document.querySelector('#app, main, [role="main"], .app') || document.body;
  for (let el = start; el; el = el.parentElement) {
    const dark = isDarkColor(getComputedStyle(el).backgroundColor);
    if (dark !== null) return dark;
  }

  return Boolean(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

// 暗色变量由 global.css 的 :host[qxintheme="dark"] 提供, 这里只负责开关
export function applyDarkModeIfNeeded() {
  const host = getHost();
  const dark = isDarkMode();
  if (dark === host.hasAttribute('qxintheme')) return;

  if (dark) {
    host.setAttribute('qxintheme', 'dark');
  } else {
    host.removeAttribute('qxintheme');
  }
}

let darkModeWatched = false;
let refreshTimer = null;

function scheduleRefresh() {
  if (refreshTimer) return;
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    applyDarkModeIfNeeded();
  }, 50);
}

export function watchDarkModeChanges() {
  if (darkModeWatched) return;
  darkModeWatched = true;

  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', scheduleRefresh);
    } else if (darkModeQuery.addListener) {
      darkModeQuery.addListener(scheduleRefresh);
    }
  }

  if (typeof MutationObserver === 'function') {
    const observer = new MutationObserver(scheduleRefresh);
    const observe = (el) => {
      if (el) {
        observer.observe(el, {
          attributes: true,
          attributeFilter: ['class', 'style', ...THEME_ATTRS],
        });
      }
    };
    observe(document.documentElement);
    observe(document.body);
    document.addEventListener('DOMContentLoaded', () => {
      observe(document.body);
      scheduleRefresh();
    });
  }

  // 部分站点在 hydration 之后才写入主题, 补几次延迟检测
  [200, 800, 2000].forEach((delay) => {
    setTimeout(applyDarkModeIfNeeded, delay);
  });
}

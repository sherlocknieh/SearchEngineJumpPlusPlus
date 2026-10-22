import { addStyle } from './shadow.js';

export const DARK_MODE_STYLE = `
  :root,
  :host {
    --font-color-qxin: #bdc1bc;
    --background-color-qxin: #202124f0;
    --background-avtive-color-qxin: #424242;
    --background-active-enable-qxin: #274144;
    --background-active-disable-qxin: #583535;
    --background-hover-color-qxin: #424242;
    --trigger-shown-qxin: #3c4043 !important;
    --background-btn-qxin: #292f36;
    --background-setting-qxin: #202124;
    --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);
    --border-color-sej: #3b4547;
    --sej-bar-bg: rgba(32, 33, 36, 0.9);
    --sej-hover-bg: rgba(255, 255, 255, 0.09);
    --sej-active-bg: rgba(255, 255, 255, 0.14);
    --sej-accent: #8ab4f8;
    --sej-accent-weak: rgba(138, 180, 248, 0.18);
    --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5),
      0 8px 24px -12px hsla(0, 0%, 0%, 0.8);
    --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5),
      0 16px 40px -12px hsla(0, 0%, 0%, 0.85);
    --sej-surface-2: rgba(255, 255, 255, 0.045);
    --sej-surface-hover: rgba(255, 255, 255, 0.09);
    --sej-input-bg: #17181a;
    --sej-btn-bg: rgba(255, 255, 255, 0.04);
    --sej-checkbox-border: #4a5459;
    --sej-focus-ring: rgba(138, 180, 248, 0.3);
    --sej-accent-contrast: #202124;
    --sej-danger: #f28b82;
    --sej-danger-weak: rgba(242, 139, 130, 0.14);
    --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85),
      0 2px 8px hsla(0, 0%, 0%, 0.5);
  }
`;

function isBackgroundDark(bgColor) {
  try {
    const match = bgColor.match(/rgba?\(([^)]+)\)/);
    if (!match) return false;

    const values = match[1].split(/\s*,\s*/).map(Number);
    const [r, g, b, a] = values;

    if (a !== undefined && a < 0.5) return false;

    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128;
  } catch (e) {
    return false;
  }
}

export function isDarkMode() {
  const html = document.documentElement;
  const body = document.body;

  const darkModeIndicators = [
    html.getAttribute('data-theme'),
    html.getAttribute('data-color-scheme'),
    html.getAttribute('data-color-mode'),
    html.getAttribute('theme'),
    body?.getAttribute('data-theme'),
    body?.getAttribute('data-color-scheme'),
    body?.getAttribute('data-color-mode'),
    body?.getAttribute('theme'),
    html.className,
    body?.className,
  ];

  for (const indicator of darkModeIndicators) {
    if (indicator && typeof indicator === 'string') {
      const lower = indicator.toLowerCase();
      if (lower.includes('dark') || lower.includes('night')) return true;
      if (lower.includes('light') && !lower.includes('dark')) return false;
    }
  }

  const elementsToCheck = [
    document.body,
    document.documentElement,
    document.querySelector('main'),
    document.querySelector('#app'),
    document.querySelector('.app'),
    document.querySelector('[role="main"]'),
  ];

  for (const element of elementsToCheck) {
    if (element) {
      try {
        const bgColor = getComputedStyle(element).backgroundColor;
        if (
          bgColor &&
          bgColor !== 'rgba(0, 0, 0, 0)' &&
          bgColor !== 'transparent'
        ) {
          return isBackgroundDark(bgColor);
        }
      } catch (e) {
        // ignore
      }
    }
  }

  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true;
  }

  return false;
}

export function applyDarkModeIfNeeded() {
  if (isDarkMode()) addStyle(DARK_MODE_STYLE);
}

let darkModeWatched = false;

export function watchDarkModeChanges() {
  if (darkModeWatched || !window.matchMedia) return;
  darkModeWatched = true;

  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let lastDarkModeState = darkModeQuery.matches;

  const handleChange = (e) => {
    if (e.matches !== lastDarkModeState) {
      lastDarkModeState = e.matches;
      if (isDarkMode()) addStyle(DARK_MODE_STYLE);
    }
  };

  if (darkModeQuery.addEventListener) {
    darkModeQuery.addEventListener('change', handleChange);
  } else if (darkModeQuery.addListener) {
    darkModeQuery.addListener(handleChange);
  }
}

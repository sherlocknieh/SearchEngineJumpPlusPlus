import { GM_addStyle } from '$';
import { getCSPNonce } from './csp.js';
import { addStyle } from './shadowDom.js';

let pageStyleEl = null;

function addPageStyle(cssText) {
  if (!cssText) return;
  if (typeof GM_addStyle === 'function') {
    try {
      GM_addStyle(cssText);
      return;
    } catch (e) {
      console.warn('[SEJ] GM_addStyle 注入失败，回退到 <style>', e);
    }
  }

  if (!pageStyleEl || !pageStyleEl.isConnected) {
    pageStyleEl = document.createElement('style');
    pageStyleEl.id = 'sej-page-style';
    const nonce = getCSPNonce();
    if (nonce) pageStyleEl.setAttribute('nonce', nonce);
    (document.head || document.documentElement).appendChild(pageStyleEl);
  }
  pageStyleEl.textContent += `\n${cssText}`;
}

export function getElementBySelector(selector) {
  if (!selector) return null;
  if (selector.startsWith('css;')) {
    return document.querySelector(selector.slice(4));
  }
  return document.evaluate(selector, document, null, 9, null).singleNodeValue;
}

export function getInputTarget(rule) {
  const keyword = rule?.insertIntoDoc?.keyword;
  return typeof keyword === 'function' ? keyword : getElementBySelector(keyword);
}

export function getInsertTarget(rule) {
  const target = rule?.insertIntoDoc?.target;
  return typeof target === 'function' ? target() : getElementBySelector(target);
}

export function getInsertPositionLabel(rule) {
  return rule?.insertIntoDoc?.where?.toLowerCase();
}

// 强制居中：抵消站点规则的横向偏移，让跳转条在可用宽度内水平居中
const FORCE_CENTER_STYLE = `
  grid-column: 1 / -1;
  justify-self: center;
  left: auto;
  right: auto;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

/**
 * 解析规则样式：强制居中模式追加居中覆盖，并处理知乎排版优化脚本的宽度覆盖。
 * 返回最终生效的 rule 样式文本。
 */
export function resolveRuleStyle(rule, settingData) {
  if (!rule?.style) return '';
  let style = rule.style;

  const searchMain = document.getElementById('SearchMain');
  if (searchMain && searchMain.style.marginLeft == '150px') {
    style = rule.style_ZhihuChenglinz || style;
  }

  if (settingData.center) {
    style += FORCE_CENTER_STYLE;
  }

  addStyle(`#sej-container { ${style} }`);
  return style;
}

export function applyStylish(rule) {
  if (!rule?.stylish) return;
  addPageStyle(rule.stylish);

  const scriptElementStyles = rule.stylish.match(/#sej-container(-wrapper)?\s*\{[^}]+\}/g);
  if (scriptElementStyles) {
    scriptElementStyles.forEach((ruleText) => addStyle(ruleText));
  }
}

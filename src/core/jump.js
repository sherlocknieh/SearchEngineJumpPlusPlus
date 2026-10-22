import { GM_openInTab } from '$';
import { toGBK } from './toGBK.js';

export function extractKeyword(inputTarget) {
  if (typeof inputTarget === 'function') return inputTarget();
  if (!inputTarget) return '';
  if (inputTarget.nodeName === 'INPUT') return inputTarget.value;
  return inputTarget.textContent || '';
}

export function encodeKeyword(keyword, gbk) {
  return gbk ? toGBK(keyword) : encodeURIComponent(keyword);
}

/**
 * 根据搜索引擎配置生成跳转目标。
 * @returns {{ type: 'get', url: string } | { type: 'post', action: string, field: string, value: string }}
 */
export function prepareJump(engine, keyword, { hideTheSameLink }) {
  let kw = keyword;
  if (hideTheSameLink === false) {
    kw = kw.replace(/site:[^\s]+/, '');
  }

  const encoded = encodeKeyword(kw, engine.gbk);
  const targetURL = engine.url;
  const postIndex = targetURL ? targetURL.indexOf('$post$') : -1;

  if (postIndex !== -1) {
    return {
      type: 'post',
      action: targetURL.substring(0, postIndex),
      field: targetURL.substring(postIndex + 6),
      value: decodeURIComponent(encoded),
    };
  }

  return {
    type: 'get',
    url: targetURL ? targetURL.replaceAll('%s', encoded) : targetURL,
  };
}

export function shouldOpenInNewTab(engine, settingData, isSelectSearch) {
  return Boolean(isSelectSearch || settingData.newtab || engine.blank);
}

export function openInNewTab(url) {
  if (!url) return false;
  try {
    GM_openInTab(url, { active: true, insert: true, setParent: true });
    return true;
  } catch (e) {
    try {
      GM_openInTab(url);
      return true;
    } catch (err) {
      console.warn('[SEJ] GM_openInTab 打开失败，回退到页面内跳转', err);
      return false;
    }
  }
}

export function submitPostForm(action, field, value, targetName) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = action;
  form.style.cssText = 'display:none;';
  form.innerHTML = `<input type="hidden" name="${field}" value="${value}"/>`;
  if (targetName) form.target = targetName;
  document.body.appendChild(form);
  form.submit();
}

/**
 * 执行跳转。返回 true 表示已处理，调用方无需再走默认导航。
 */
export function performJump(engine, keyword, settingData, isSelectSearch) {
  const result = prepareJump(engine, keyword, {
    hideTheSameLink: settingData.HideTheSameLink,
  });
  const newTab = shouldOpenInNewTab(engine, settingData, isSelectSearch);

  if (result.type === 'post') {
    submitPostForm(
      result.action,
      result.field,
      result.value,
      newTab ? '_blank' : '_top',
    );
    return true;
  }

  if (newTab) {
    if (openInNewTab(result.url)) return true;
    window.open(result.url, '_blank');
    return true;
  }

  window.location.href = result.url;
  return true;
}

export function openAllEngines(engines, encodedKeyword, matchedRule) {
  for (const engine of engines) {
    if (engine.disable) continue;
    if (
      engine.url.indexOf('site:') < 0 &&
      matchedRule?.url?.test(engine.url)
    ) {
      continue;
    }
    openInNewTab((engine.url || '').replaceAll('%s', encodedKeyword));
  }
}

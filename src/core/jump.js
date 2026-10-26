import { GM_openInTab } from '$';

export function extractKeyword(inputTarget) {
  if (typeof inputTarget === 'function') return inputTarget();
  if (!inputTarget) return '';
  if (inputTarget.nodeName === 'INPUT') return inputTarget.value;
  return inputTarget.textContent || '';
}

export function encodeKeyword(keyword) {
  return encodeURIComponent(keyword);
}

/**
 * 根据搜索引擎配置生成跳转目标。
 * @returns {{ type: 'get', url: string } | { type: 'post', action: string, field: string, value: string }}
 */
export function prepareJump(engine, keyword, { hideTheSameLink }) {
  let kw = keyword;
  if (hideTheSameLink === false) {
    // 去掉 site: 限定及紧随其后的空白，避免关键词以空格开头被编码成 %20
    kw = kw.replace(/\bsite:[^\s]+\s*/g, '').trim();
  }

  const encoded = encodeKeyword(kw);
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

/**
 * @param {boolean} forceNewTab 批量打开多个引擎时必须强制新标签页，否则会互相覆盖
 */
export function shouldOpenInNewTab(engine, forceNewTab = false) {
  return Boolean(forceNewTab || engine.target !== '_self');
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
  // 用 DOM API 赋值，避免关键词中的引号/尖括号被当作 HTML 解析
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = field;
  input.value = value;
  form.appendChild(input);
  if (targetName) form.target = targetName;
  document.body.appendChild(form);
  form.submit();
}

/**
 * 执行跳转。返回 true 表示已处理，调用方无需再走默认导航。
 * 是否新标签页由引擎的打开方式决定，forceNewTab 仅用于一键打开全部引擎。
 */
export function performJump(engine, keyword, settingData, forceNewTab = false) {
  const result = prepareJump(engine, keyword, {
    hideTheSameLink: settingData.HideTheSameLink,
  });
  const newTab = shouldOpenInNewTab(engine, forceNewTab);

  if (result.type === 'post') {
    submitPostForm(result.action, result.field, result.value, newTab ? '_blank' : '_top');
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

/**
 * 一键打开分类下的全部引擎。
 * 复用 performJump，统一编码关键词并支持 $post$ 表单；
 * 批量打开会强制使用新标签页，避免引擎之间互相覆盖页面。
 * GM_openInTab 不可用时 performJump 会回退到 window.open，避免静默失败。
 */
export function openAllEngines(engines, keyword, settingData, matchedRule) {
  for (const engine of engines) {
    if (engine.disable) continue;
    if (settingData?.HideTheSameLink && matchedRule?.url?.test(engine.url)) {
      continue;
    }
    performJump(engine, keyword, settingData || {}, true);
  }
}

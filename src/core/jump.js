import { GM_openInTab } from '$';
import { normalizeEngineAction } from './configData.js';
import { normalizeKeywordUrl, hostFromUrl, registrableDomain } from './engineUrl.js';
import { copyText } from './clipboard.js';

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
 * 是否为非搜索类动作引擎（复制/打开链接）。
 */
export function isActionEngine(engine) {
  return Boolean(normalizeEngineAction(engine?.action));
}

/**
 * 执行动作引擎，返回是否成功处理。
 * copy 复制当前关键词/划词内容；open 把当前内容当作链接打开。
 */
export async function performEngineAction(engine, keyword) {
  const action = normalizeEngineAction(engine?.action);
  if (action === 'copy') {
    return copyText(keyword);
  }
  if (action === 'open') {
    const url = normalizeKeywordUrl(keyword);
    if (!url) return false;
    if (shouldOpenInNewTab(engine)) {
      if (!openInNewTab(url)) window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
    return true;
  }
  return false;
}

/**
 * 当前页面地址；非浏览器环境（测试）下为空，便于按默认方式处理。
 */
function currentHref() {
  return typeof window !== 'undefined' ? window.location.href : '';
}

/**
 * 引擎链接与当前页面是否同站（可注册域名相同）。
 * 同站跳转直接复用当前页面，避免堆出同一站点的多个标签页。
 */
export function isSameSiteUrl(url, href = currentHref()) {
  const targetDomain = registrableDomain(hostFromUrl(url));
  const pageDomain = registrableDomain(hostFromUrl(href));
  return Boolean(targetDomain) && targetDomain === pageDomain;
}

/**
 * @param {boolean} forceNewTab 批量打开多个引擎时必须强制新标签页，否则会互相覆盖
 */
export function shouldOpenInNewTab(engine, forceNewTab = false, href = currentHref()) {
  if (forceNewTab) return true;
  // 引擎显式配置了打开方式时以配置为准
  if (engine.target === '_blank') return true;
  if (engine.target === '_self') return false;
  // 未配置时：本站链接原地跳转，其余站点开新标签页
  return !isSameSiteUrl(engine.url, href);
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
  // 动作引擎不拼接搜索 URL，直接执行复制/打开链接
  if (isActionEngine(engine)) {
    performEngineAction(engine, keyword);
    return true;
  }

  const result = prepareJump(engine, keyword, {
    hideTheSameLink: settingData.HideTheSameLink,
  });
  // 用实际跳转地址判断是否同站，表单目标只有 action 部分
  const jumpUrl = result.type === 'post' ? result.action : result.url;
  const newTab = shouldOpenInNewTab({ ...engine, url: jumpUrl }, forceNewTab);

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
    // 动作引擎没有 URL，不参与“与当前站点相同”的判断；
    // 批量打开时只执行打开链接，避免静默覆盖剪贴板
    if (isActionEngine(engine)) {
      if (engine.action !== 'copy') performEngineAction(engine, keyword);
      continue;
    }
    if (settingData?.HideTheSameLink && matchedRule?.url?.test(engine.url)) {
      continue;
    }
    performJump(engine, keyword, settingData || {}, true);
  }
}

import { GM_openInTab } from '$';
import {
  DEFAULT_OPEN_TARGET,
  normalizeDefaultOpenTarget,
  normalizeEngineAction,
  normalizeEngineTarget,
} from './configData.js';
import { findKeywordUrl } from './engineUrl.js';
import { copyImage, copyText } from './clipboard.js';
import { selectLinkTitle } from './linkAction.js';

export function extractKeyword(inputTarget) {
  if (typeof inputTarget === 'function') return inputTarget();
  if (!inputTarget) return '';
  if (inputTarget.nodeName === 'INPUT') return inputTarget.value;
  return inputTarget.textContent || '';
}

/**
 * 跳转条当前交给引擎的关键词：上下文操作条（图片/链接命中）优先，其次划词条，
 * 最后才是站点内嵌的搜索框。
 *
 * 优先级看「这次是谁触发的」，而不是挂载时定下的来源：长按经常发生在划词条
 * 已经挂载之后，此时选区是空的，再按选区取词等于引擎链接里没带上图片地址。
 * @param {object} [sources]
 * @param {string | null} [sources.contextKeyword] 上下文命中内容，非上下文模式为 null
 * @param {string | null} [sources.selectionText] 选区文字，非划词条为 null
 * @param {Element | (() => string) | null} [sources.inputTarget] 站点搜索框
 */
export function resolveBarKeyword({ contextKeyword = null, selectionText = null, inputTarget = null } = {}) {
  if (contextKeyword !== null) return contextKeyword;
  if (selectionText !== null) return selectionText;
  return extractKeyword(inputTarget);
}

export function encodeKeyword(keyword) {
  return encodeURIComponent(keyword);
}

/**
 * 根据搜索引擎配置生成跳转目标。
 * @returns {{ type: 'get', url: string } | { type: 'post', action: string, field: string, value: string }}
 */
export function prepareJump(engine, keyword) {
  const encoded = encodeKeyword(keyword);
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
 * 是否为非搜索类动作引擎（复制/打开）。
 */
export function isActionEngine(engine) {
  return Boolean(normalizeEngineAction(engine?.action));
}

/**
 * 动作引擎的目标内容：普通跳转只有一段文字，上下文操作条另有打开地址、
 * 可复制的图片，以及「选中链接标题」需要的链接元素。
 * @param {string | { text?: string, url?: string, image?: string, element?: Element | null }} target
 */
function normalizeActionTarget(target) {
  if (typeof target === 'string') return { text: target, url: target, image: '', element: null };
  const text = typeof target?.text === 'string' ? target.text : '';
  const url = typeof target?.url === 'string' && target.url ? target.url : text;
  const image = typeof target?.image === 'string' ? target.image : '';
  const element = target?.element || null;
  return { text, url, image, element };
}

/**
 * 打开图片时的地址：http(s) 直接用；内联 data:image 转成同源 blob: 再打开。
 * Chrome 拦截顶层导航到 data:（点开只会得到空白页），blob: 则能正常显示这张图。
 * @param {string} raw 命中图片的地址
 * @returns {Promise<string>} 可打开的地址；不可打开时返回空串
 */
async function imageOpenUrl(raw) {
  const value = String(raw ?? '').trim();
  if (!/^data:image\//i.test(value)) return findKeywordUrl(value);
  try {
    const blob = await (await fetch(value)).blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    return '';
  }
}

/**
 * 执行动作引擎，返回是否成功处理。
 * copy 复制文字，copyImage 复制图片本身（取不到时复制图片地址），
 * copyImageUrl / copyLinkUrl 复制地址，copyLinkText 复制链接标题，
 * selectLinkText 选中页面上的链接标题，open / openImage 把链接或图片地址打开。
 * @param {string | { text?: string, url?: string, image?: string, element?: Element | null }} target 复制/打开用的内容
 */
export async function performEngineAction(engine, target, defaultTarget = DEFAULT_OPEN_TARGET) {
  const action = normalizeEngineAction(engine?.action);
  const source = normalizeActionTarget(target);
  if (action === 'copy') return copyText(source.text);
  if (action === 'copyImage') {
    if (source.image && (await copyImage(source.image))) return true;
    return copyText(source.url || source.text);
  }
  if (action === 'copyLinkText') return copyText(source.text);
  if (action === 'copyImageUrl' || action === 'copyLinkUrl') return copyText(source.url);
  if (action === 'selectLinkText') return selectLinkTitle(source.element);
  if (action === 'open' || action === 'openImage') {
    const url = action === 'openImage' ? await imageOpenUrl(source.url) : findKeywordUrl(source.url);
    if (!url) return false;
    const mode = resolveOpenMode(engine, false, defaultTarget);
    if (mode === 'self') {
      window.location.href = url;
    } else if (!openInNewTab(url, mode !== 'background')) {
      window.open(url, '_blank');
    }
    return true;
  }
  return false;
}

/**
 * 打开方式的实际行为：self 留在当前页，active 切到新标签页，background 在后台新标签页打开。
 * 引擎的打开方式优先，未设置时跟随全局默认；批量打开时把「当前页」提升为新标签页，
 * 但后台打开保持后台，避免一键打开多个引擎时抢走焦点。
 * @param {boolean} forceNewTab 批量打开多个引擎时必须避开当前页，否则会互相覆盖
 * @param {string} defaultTarget 全局默认打开方式（_blank / _background / _self）
 * @returns {'self' | 'active' | 'background'}
 */
export function resolveOpenMode(
  engine,
  forceNewTab = false,
  defaultTarget = DEFAULT_OPEN_TARGET,
) {
  const target = normalizeEngineTarget(engine?.target) || normalizeDefaultOpenTarget(defaultTarget);
  if (target === '_background') return 'background';
  if (target === '_self') return forceNewTab ? 'active' : 'self';
  return 'active';
}

/**
 * 是否离开当前页打开。
 * @param {boolean} forceNewTab 批量打开多个引擎时必须强制新标签页，否则会互相覆盖
 * @param {string} defaultTarget 全局默认打开方式（_blank / _background / _self）
 */
export function shouldOpenInNewTab(
  engine,
  forceNewTab = false,
  defaultTarget = DEFAULT_OPEN_TARGET,
) {
  return resolveOpenMode(engine, forceNewTab, defaultTarget) !== 'self';
}

/**
 * 新标签页打开；active 为 false 时交给脚本管理器放到后台，不切换当前标签页。
 * GM_openInTab 的选项不被支持时退回前台打开，行为仍符合「离开当前页」的预期。
 */
export function openInNewTab(url, active = true) {
  if (!url) return false;
  try {
    GM_openInTab(url, { active, insert: true, setParent: true });
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
export function performJump(engine, keyword, settingData = {}, forceNewTab = false) {
  // 动作引擎不拼接搜索 URL，直接执行复制/打开
  if (isActionEngine(engine)) {
    performEngineAction(engine, keyword, settingData.defaultOpenTarget);
    return true;
  }

  const result = prepareJump(engine, keyword);
  const mode = resolveOpenMode(engine, forceNewTab, settingData.defaultOpenTarget);

  if (result.type === 'post') {
    // 表单提交无法在后台完成，后台打开降级为新标签页，避免当前页被结果覆盖
    submitPostForm(result.action, result.field, result.value, mode === 'self' ? '_top' : '_blank');
    return true;
  }

  if (mode === 'self') {
    window.location.href = result.url;
    return true;
  }

  if (openInNewTab(result.url, mode !== 'background')) return true;
  window.open(result.url, '_blank');
  return true;
}

/**
 * 一键打开分类下的全部引擎。
 * 复用 performJump，统一编码关键词并支持 $post$ 表单；
 * 批量打开会把「当前页」提升为新标签页，避免引擎之间互相覆盖页面；
 * 引擎选择的「后台标签页」保持后台，不抢走当前页焦点。
 * GM_openInTab 不可用时 performJump 会回退到 window.open，避免静默失败。
 */
export function openAllEngines(engines, keyword, settingData = {}) {
  for (const engine of engines) {
    if (engine.disable) continue;
    // 动作引擎没有 URL，不参与“与当前站点相同”的判断；
    // 批量打开只执行打开，避免复制动作静默覆盖剪贴板
    if (isActionEngine(engine)) {
      if (engine.action === 'open') {
        performEngineAction(engine, keyword, settingData.defaultOpenTarget);
      }
      continue;
    }
    performJump(engine, keyword, settingData, true);
  }
}

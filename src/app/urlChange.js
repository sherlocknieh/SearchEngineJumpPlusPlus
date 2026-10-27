import { isRunning, teardown } from './lifecycle.js';
import { useSettings } from '../stores/settings.js';

/** 连续路由变化的合并窗口，避免导航动画期间反复重建 */
export const NAV_DEBOUNCE_MS = 100;

/**
 * 规范化页面 URL，用于判断 SPA 路由是否真的发生了变化。
 *
 * Bilibili 会在 URL 中附带 vt 时间戳，即使页面没有跳转它也会变化，
 * 这里直接移除，避免触发无意义的重建。
 */
export function normalizeURL(urlString) {
  try {
    const url = new URL(urlString);
    if (url.hostname.includes('bilibili.com')) {
      url.searchParams.delete('vt');
    }
    return url.toString();
  } catch (e) {
    // URL 解析失败时退回原始字符串，保证比较逻辑仍可运行
    return urlString;
  }
}

function toComparable(url) {
  return normalizeURL(decodeURI(url).replaceAll(' ', '+'));
}

/** 两个站点规则是否为同一条（按 URL 正则判断） */
function isSameRule(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.url?.source === b.url?.source && a.url?.flags === b.url?.flags;
}

/**
 * 路由变化后是否需要重建跳转条。
 *
 * 命中规则未变且宿主仍在文档中时，跳转条仍然有效，
 * 只有 SPA 把包含宿主的区域替换掉才需要重新挂载。
 */
function needsRemount(settings) {
  // 上次启动未成功找到输入框/插入位置时，路由变化后重试一次
  if (!settings.barMounted) return true;
  return !isSameRule(settings.getMatchedRule(), settings.activeRule);
}

/**
 * 监听 SPA 路由变化。
 *
 * 现代脚本管理器提供 window.onurlchange 事件。路由变化后先合并连续导航，
 * 再判断命中规则是否变化、跳转条宿主是否仍在文档中：需要时才重建，
 * 否则只刷新规则引用，避免每个 SPA 路由都重建整个 Vue 应用。
 *
 * @param {() => void} onNavigate 路由变化后的处理函数，通常是重新启动脚本
 * @returns {() => void} 取消监听
 */
export function listenUrlChange(onNavigate) {
  // 已经有其他代码接管 onurlchange 时不再重复绑定
  if (window.onurlchange !== null) return () => {};

  let lastURL = toComparable(location.href);
  let navigateTimer = 0;

  const onUrlChange = (e) => {
    const newURL = toComparable(e.url);
    if (lastURL === newURL) return;
    lastURL = newURL;

    // 连续导航只处理最后一次，避免中途的页面状态触发无意义重建
    clearTimeout(navigateTimer);
    navigateTimer = setTimeout(() => {
      navigateTimer = 0;
      // 未挂载时不能读取设置：此时存储可能尚未初始化，
      // useSettings 会缓存一份错误的实例
      if (!isRunning()) {
        teardown();
        onNavigate();
        return;
      }
      const settings = useSettings();
      if (needsRemount(settings)) {
        // 完全清理旧实例后，再交给调用方重新启动
        teardown();
        onNavigate();
        return;
      }
      // 跳转条仍然有效，只刷新当前页面匹配到的规则引用
      settings.activeRule = settings.getMatchedRule();
    }, NAV_DEBOUNCE_MS);
  };

  window.addEventListener('urlchange', onUrlChange);

  return () => {
    clearTimeout(navigateTimer);
    navigateTimer = 0;
    window.removeEventListener('urlchange', onUrlChange);
  };
}

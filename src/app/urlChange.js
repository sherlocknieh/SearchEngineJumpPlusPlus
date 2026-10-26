import { teardown } from './lifecycle.js';

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

/**
 * 监听 SPA 路由变化。
 *
 * 现代脚本管理器提供 window.onurlchange 事件，路由变化后需要重新
 * 匹配站点规则并重建跳转条。这里先记录规范化后的 URL，
 * 只有 URL 真正变化时才调用 onNavigate，避免重复执行。
 *
 * @param {() => void} onNavigate 路由变化后的处理函数，通常是重新启动脚本
 */
export function listenUrlChange(onNavigate) {
  // 已经有其他代码接管 onurlchange 时不再重复绑定
  if (window.onurlchange !== null) return;

  let lastURL = toComparable(location.href);
  window.addEventListener('urlchange', (e) => {
    const newURL = toComparable(e.url);
    if (lastURL === newURL) return;
    lastURL = newURL;

    // 完全清理旧实例后，再交给调用方重新启动
    teardown();
    onNavigate();
  });
}

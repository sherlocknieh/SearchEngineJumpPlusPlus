/**
 * 这些站点的输入框或页面内容渲染较晚。
 * 匹配到后延后启动，避免初始化时找不到输入框或插入位置。
 */
const DELAY_START_PATTERNS = [
  // 知乎、爱词霸：搜索框异步渲染
  /^https?:\/\/www\.zhihu\.com\/search\?/,
  /^https?:\/\/www\.iciba\.com\/word\?/,
  // Bilibili、百度：搜索结果区域需要等待页面脚本渲染
  /^https?:\/\/search\.bilibili\.com\//,
  /^https?:\/\/(www\.)?baidu\.com/i,
];

/** 延迟启动的等待时间（毫秒） */
export const DELAY_START_MS = 1000;

/** 当前页面是否需要延迟启动 */
export function shouldDelayStart(href = location.href) {
  return DELAY_START_PATTERNS.some((re) => re.test(href));
}

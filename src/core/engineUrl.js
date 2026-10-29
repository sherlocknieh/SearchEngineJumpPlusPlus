/**
 * 搜索引擎表单的 URL 推断工具。
 * 用于根据链接自动补全名称与图标地址。
 */

// 常见二级后缀，如 example.com.cn 取 example
const SECOND_LEVEL_SUFFIXES = new Set([
  'com',
  'net',
  'org',
  'gov',
  'edu',
  'co',
  'ac',
  'or',
  'ne',
  'go',
  'adm',
]);

/** 补全协议；空值返回空串 */
export function withProtocol(raw) {
  const value = String(raw ?? '').trim();
  if (!value) return '';
  return value.includes('://') ? value : `https://${value}`;
}

function parseHost(raw) {
  const value = withProtocol(raw);
  if (!value) return '';
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return '';
  }
}

/**
 * 取站点 origin（协议 + 主机 + 端口）。
 * 用于生成 /favicon.ico 地址或自定义图标模板的替换值。
 */
export function siteOrigin(raw) {
  const value = withProtocol(raw);
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

// 常见二级后缀组合（如 example.com.cn）需要多取一段作为主域名
function secondLevelSuffixLength(parts) {
  const last = parts[parts.length - 1] || '';
  const secondLast = (parts[parts.length - 2] || '').toLowerCase();
  return last.length === 2 && SECOND_LEVEL_SUFFIXES.has(secondLast) ? 2 : 1;
}

/** 从链接推断引擎名称，如 zh.wikipedia.org -> Wikipedia */
export function titleFromUrl(raw) {
  let host = parseHost(raw).replace(/^www\./, '');
  if (!host) return '';
  if (/^\d+(\.\d+){3}$/.test(host)) return host;
  if (!host.includes('.')) return '';
  const parts = host.split('.').filter(Boolean);
  const label = parts[parts.length - secondLevelSuffixLength(parts) - 1] || parts[0];
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
}

/** 从链接推断图标地址（默认 /favicon.ico） */
export function faviconFromUrl(raw) {
  const origin = siteOrigin(raw);
  if (!origin) return '';
  try {
    if (!new URL(origin).hostname.includes('.')) return '';
  } catch {
    return '';
  }
  return `${origin}/favicon.ico`;
}

/**
 * 取可注册域名（站点主域名），用于补充图标候选。
 *   chat.deepseek.com  -> deepseek.com
 *   www.example.com.cn -> example.com.cn
 * IP 地址原样返回，避免把最后一段数字当成后缀。
 */
export function registrableDomain(raw) {
  const host = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '');
  if (!host || !host.includes('.') || /^\d+(\.\d+){3}$/.test(host)) return host;

  const parts = host.split('.').filter(Boolean);
  if (parts.length <= 2) return parts.join('.');
  return parts.slice(-(secondLevelSuffixLength(parts) + 1)).join('.');
}

/** 站点主机名（保留子域，去掉 www.） */
export function hostFromUrl(raw) {
  return parseHost(raw)
    .replace(/\.$/, '')
    .replace(/^www\./, '');
}

const LINK_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const SPECIAL_LINK_SCHEME = /^(mailto|tel):/i;

/**
 * 把选中文本/关键词整理成可打开的链接。
 * 没有协议时补全 https://；空白、非链接文本与不支持的协议返回空串。
 */
export function normalizeKeywordUrl(raw) {
  const value = String(raw ?? '').trim();
  if (!value || /\s/.test(value)) return '';
  // mailto:/tel: 直接使用；其余按 http(s) 处理
  const candidate = SPECIAL_LINK_SCHEME.test(value)
    ? value
    : LINK_SCHEME.test(value)
      ? value
      : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (/^https?:$/.test(url.protocol)) {
      const host = url.hostname;
      // 仅当主机名像域名、localhost 或 IP 时才视为链接，避免把普通单词当地址
      if (!host.includes('.') && host !== 'localhost') return '';
      return url.href;
    }
    if (/^(mailto|tel):$/.test(url.protocol)) return url.href;
  } catch (e) {
    return '';
  }
  return '';
}

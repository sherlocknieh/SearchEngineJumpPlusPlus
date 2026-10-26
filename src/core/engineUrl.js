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

function parseHost(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try {
    return new URL(value.includes('://') ? value : `https://${value}`).hostname.toLowerCase();
  } catch {
    return '';
  }
}

/** 从链接推断引擎名称，如 zh.wikipedia.org -> Wikipedia */
export function titleFromUrl(raw) {
  let host = parseHost(raw).replace(/^www\./, '');
  if (!host) return '';
  if (/^\d+(\.\d+){3}$/.test(host)) return host;
  if (!host.includes('.')) return '';
  const parts = host.split('.').filter(Boolean);
  const last = parts[parts.length - 1] || '';
  const secondLast = (parts[parts.length - 2] || '').toLowerCase();
  const suffixLength = last.length === 2 && SECOND_LEVEL_SUFFIXES.has(secondLast) ? 2 : 1;
  const label = parts[parts.length - suffixLength - 1] || parts[0];
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
}

/** 从链接推断图标地址（默认 /favicon.ico） */
export function faviconFromUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    if (!url.hostname.includes('.')) return '';
    return `${url.origin}/favicon.ico`;
  } catch {
    return '';
  }
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
  const last = parts[parts.length - 1] || '';
  const secondLast = (parts[parts.length - 2] || '').toLowerCase();
  const suffixLength = last.length === 2 && SECOND_LEVEL_SUFFIXES.has(secondLast) ? 2 : 1;
  return parts.slice(-(suffixLength + 1)).join('.');
}

/** 站点主机名（保留子域，去掉 www.） */
export function hostFromUrl(raw) {
  return parseHost(raw)
    .replace(/\.$/, '')
    .replace(/^www\./, '');
}

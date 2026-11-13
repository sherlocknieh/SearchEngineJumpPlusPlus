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

// ---------------------------------------------------------------------------
// 搜索链接 -> 关键词占位符模板
//
// 关键词内容无法预判：可能是中文、表情、编码后的符号，甚至是看起来像参数的文本，
// 所以只按「站点 + 参数名 / 路径位置」识别，识别不出来就保持原样。
//
// 默认引擎列表里出现过的关键词参数：
//   q            Google / Bing / GitHub / 知乎 / 豆瓣 / Trakt / DeepSeek / ChatGPT / Gemini ...
//   wd           Baidu
//   word         Baidu 移动端
//   query        Sogou
//   keyword      B站 / 人人影视 / 动漫花园 / BTSearch / SkrBT
//   key          孔夫子旧书
//   w            金山词霸
//   search       RARBG / TorrentGalaxy / Wikipedia(index.php)
//   search_query YouTube
// 关键词写在路径里的：Wikipedia /wiki/<kw>、Z-Library /s/<kw>、SubHD /search/<kw>、
// 1337x /search/<kw>/1/、海盗湾与 EZTV /search/<kw>、类义词典 /<kw>
// ---------------------------------------------------------------------------

// 通用关键词参数（仅在路径本身像搜索页时使用）
const GENERIC_KEYWORD_PARAMS = [
  'q',
  'query',
  'keyword',
  'word',
  'wd',
  'search',
  'search_query',
  'searchterm',
  'search_term',
  'kw',
  'key',
  'k',
  'text',
  // 识图站点（TinEye / SauceNAO 等）用 url 传图片链接
  'url',
];

const GENERIC_SEARCH_PATH = /^\/(?:search|results?|web|find|word)\b/i;

// 站点专属规则：参数名有歧义（如 q）时再限定路径，避免误伤普通页面的同名参数
const SITE_RULES = [
  { host: /(^|\.)google\.[^/]+$/i, path: /^\/search\b/i, params: ['q'] },
  {
    host: /(^|\.)bing\.com$/i,
    path: /^\/(?:search|images\/search|images\/searchbyimage|dict\/search)\b/i,
    params: ['q', 'imgurl'],
  },
  // 识图引擎：关键词是图片链接，参数名各不相同
  { host: /^lens\.google\.com$/i, params: ['url'] },
  { host: /^graph\.baidu\.com$/i, params: ['image'] },
  { host: /(^|\.)baidu\.com$/i, path: /^\/(?:s|baidu)\b/i, params: ['wd', 'word'] },
  { host: /(^|\.)sogou\.com$/i, params: ['query', 'keyword'] },
  { host: /(^|\.)so\.com$/i, params: ['q'] },
  { host: /(^|\.)yandex\.[^/]+$/i, params: ['text', 'url'] },
  { host: /(^|\.)duckduckgo\.com$/i, params: ['q'] },
  { host: /^search\.bilibili\.com$/i, params: ['keyword'] },
  { host: /(^|\.)youtube\.com$/i, path: /^\/results\b/i, params: ['search_query'] },
  { host: /^github\.com$/i, path: /^\/search\b/i, params: ['q'] },
  { host: /(^|\.)zhihu\.com$/i, path: /^\/search\b/i, params: ['q'] },
  { host: /^zhida\.zhihu\.com$/i, params: ['q'] },
  { host: /(^|\.)douban\.com$/i, path: /^\/search\b/i, params: ['q'] },
  { host: /(^|\.)stackoverflow\.com$/i, path: /^\/search\b/i, params: ['q'] },
  { host: /(^|\.)wikipedia\.org$/i, path: /^\/w\/index\.php$/i, params: ['search'] },
  { host: /(^|\.)iciba\.com$/i, path: /^\/word\b/i, params: ['w'] },
  { host: /(^|\.)dict\.cn$/i, params: ['q'] },
  { host: /(^|\.)youdao\.com$/i, path: /^\/search\b/i, params: ['q'] },
  { host: /(^|\.)trakt\.tv$/i, params: ['q'] },
  { host: /(^|\.)kongfz\.com$/i, params: ['key'] },
  { host: /(^|\.)yyets\.click$/i, params: ['keyword'] },
  { host: /(^|\.)dmhy\.org$/i, params: ['keyword'] },
  { host: /(^|\.)rargb\.to$/i, params: ['search'] },
  { host: /(^|\.)btsearch\.love$/i, params: ['keyword'] },
  { host: /(^|\.)skrbtso\.top$/i, params: ['keyword'] },
  { host: /(^|\.)torrentgalaxy\.[^/]+$/i, params: ['search'] },
  {
    host: /(^|\.)(?:chatgpt\.com|grok\.com|kimi\.com|doubao\.com|qianwen\.com|chatglm\.cn|minimax\.cn)$/i,
    params: ['q'],
  },
  { host: /^chat\.deepseek\.com$/i, params: ['q'] },
  { host: /^gemini\.google\.com$/i, params: ['q'] },
];

// 关键词位于路径中的站点：命中后整段替换为 %s
const PATH_RULES = [
  { host: /(^|\.)wikipedia\.org$/i, match: /^\/wiki\/[^/]+\/?$/i, to: () => '/wiki/%s' },
  { host: /(^|\.)z-lib\.[^/]+$/i, match: /^\/s\/[^/]+\/?$/i, to: () => '/s/%s' },
  { host: /(^|\.)subhd\.tv$/i, match: /^\/search\/[^/]+\/?$/i, to: () => '/search/%s' },
  { host: /(^|\.)1337x\.to$/i, match: /^\/search\/[^/]+\/1\/?$/i, to: () => '/search/%s/1/' },
  { host: /(^|\.)thepiratebay\.org$/i, match: /^\/search\/[^/]+/i, to: () => '/search/%s' },
  { host: /(^|\.)eztvx\.to$/i, match: /^\/search\/[^/]+\/?$/i, to: () => '/search/%s' },
  { host: /(^|\.)powerthesaurus\.org$/i, match: /^\/[^/]+\/?$/i, to: () => '/%s' },
];

function decodeParamName(raw) {
  try {
    return decodeURIComponent(raw.replace(/\+/g, ' '));
  } catch {
    return raw;
  }
}

function pickKeywordParam(params, names) {
  const present = new Set();
  for (const key of params.keys()) present.add(key.toLowerCase());
  for (const name of names) {
    if (present.has(name)) return name;
  }
  return '';
}

function findKeywordParam(url) {
  const host = url.hostname.toLowerCase();
  for (const rule of SITE_RULES) {
    if (!rule.host.test(host)) continue;
    if (rule.path && !rule.path.test(url.pathname)) continue;
    const key = pickKeywordParam(url.searchParams, rule.params);
    if (key) return key;
  }
  if (GENERIC_SEARCH_PATH.test(url.pathname)) {
    return pickKeywordParam(url.searchParams, GENERIC_KEYWORD_PARAMS);
  }
  return '';
}

// 拆成「?之前」「查询串」「#之后」三段，替换时保留原始写法不做归一化
function splitUrlText(value) {
  let rest = value;
  let hash = '';
  const hashIndex = rest.indexOf('#');
  if (hashIndex !== -1) {
    hash = rest.slice(hashIndex);
    rest = rest.slice(0, hashIndex);
  }
  let query = '';
  const queryIndex = rest.indexOf('?');
  if (queryIndex !== -1) {
    query = rest.slice(queryIndex + 1);
    rest = rest.slice(0, queryIndex);
  }
  return { base: rest, query, hash };
}

function replaceQueryValue(value, key) {
  const { base, query, hash } = splitUrlText(value);
  const parts = query.split('&');
  for (let i = 0; i < parts.length; i += 1) {
    const eq = parts[i].indexOf('=');
    const rawKey = eq === -1 ? parts[i] : parts[i].slice(0, eq);
    if (decodeParamName(rawKey).toLowerCase() === key) {
      parts[i] = `${rawKey}=%s`;
      return `${base}?${parts.join('&')}${hash}`;
    }
  }
  return value;
}

function replacePathValue(url) {
  for (const rule of PATH_RULES) {
    if (!rule.host.test(url.hostname)) continue;
    if (!rule.match.test(url.pathname)) continue;
    return `${url.origin}${rule.to()}${url.search}${url.hash}`;
  }
  return '';
}

/**
 * 分析搜索链接并给出处理结果。
 * @returns {{ url: string, status: 'ready' | 'replaced' | 'manual' | 'plain' }}
 *   ready    已是模板（含 %s / $post$），无需处理
 *   replaced 本次成功把关键词替换成 %s
 *   manual   没能自动替换（特殊模式、普通链接、非法链接），提醒用户手动替换
 *   plain    空输入，不提示
 */
export function analyzeSearchUrl(raw) {
  const value = String(raw ?? '').trim();
  if (!value) return { url: value, status: 'plain' };
  if (value.includes('%s') || value.includes('$post$')) {
    return { url: value, status: 'ready' };
  }

  let url;
  try {
    url = new URL(withProtocol(value));
  } catch {
    return { url: value, status: 'manual' };
  }
  if (!/^https?:$/.test(url.protocol)) return { url: value, status: 'manual' };

  const key = findKeywordParam(url);
  if (key) return { url: replaceQueryValue(value, key), status: 'replaced' };
  const pathTemplate = replacePathValue(url);
  if (pathTemplate) return { url: pathTemplate, status: 'replaced' };
  // 认不出关键词时一律提醒手动替换，包括普通页面、首页与特殊模式
  return { url: value, status: 'manual' };
}

/**
 * 把搜索链接里的关键词替换成 %s 占位符。
 * 识别不到搜索特征时原样返回，避免破坏普通链接；已是模板的链接不再处理。
 */
export function searchTemplateFromUrl(raw) {
  return analyzeSearchUrl(raw).url;
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

/**
 * 站点插件匹配器
 *
 * 按主机名建立索引：精确主机名 -> Map，后缀 -> 有序数组，正则 -> 数组。
 * 先筛选候选插件，再执行 URL 正则，避免对每个插件都做一次完整 URL 匹配。
 */
function createRuleMatcher(rules) {
  const exactHosts = new Map();
  const suffixHosts = [];
  const patternHosts = [];
  const fallbackRules = [];

  for (const rule of rules) {
    const hosts = rule.hosts || [];
    const suffixes = rule.hostSuffixes || [];

    for (const host of hosts) {
      const key = host.toLowerCase();
      const list = exactHosts.get(key);
      if (list) list.push(rule);
      else exactHosts.set(key, [rule]);
    }

    for (const suffix of suffixes) {
      suffixHosts.push({ suffix: suffix.toLowerCase(), rule });
    }

    if (rule.hostPattern instanceof RegExp) {
      patternHosts.push({ pattern: rule.hostPattern, rule });
    }

    if (!hosts.length && !suffixes.length && !(rule.hostPattern instanceof RegExp)) {
      fallbackRules.push(rule);
    }
  }

  // 更长的后缀优先匹配，避免较短后缀抢先
  suffixHosts.sort((a, b) => b.suffix.length - a.suffix.length);

  return function matchRule(href) {
    let hostname;
    try {
      hostname = new URL(href).hostname.toLowerCase();
    } catch (e) {
      return null;
    }

    const candidates = [];
    const pushAll = (list) => {
      if (list) candidates.push(...list);
    };

    pushAll(exactHosts.get(hostname));

    for (const { suffix, rule } of suffixHosts) {
      if (hostname === suffix || hostname.endsWith(`.${suffix}`)) {
        candidates.push(rule);
      }
    }

    for (const { pattern, rule } of patternHosts) {
      pattern.lastIndex = 0;
      if (pattern.test(hostname)) candidates.push(rule);
    }

    pushAll(fallbackRules);

    // 去重后按候选顺序执行一次 URL 正则
    const seen = new Set();
    for (const rule of candidates) {
      if (seen.has(rule)) continue;
      seen.add(rule);
      rule.url.lastIndex = 0;
      if (rule.url.test(href)) return rule;
    }
    return null;
  };
}

// 自动批量导入 ./sites/ 下的所有域名插件；新增域名文件无需修改此文件
const siteModules = import.meta.glob('./sites/*.js', { eager: true });

// 按域名文件路径排序，文件内保持列表顺序；如规则可能重叠，可用文件名前缀控制顺序
const siteRules = Object.entries(siteModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([, mod]) => (Array.isArray(mod.default) ? mod.default : [mod.default]))
  .filter(Boolean);

export const matchRule = createRuleMatcher(siteRules);

export default siteRules;

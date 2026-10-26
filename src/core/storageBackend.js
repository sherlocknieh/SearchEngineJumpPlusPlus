/**
 * 存储后端适配：脚本管理器（GM）同步/异步 API 与 localStorage 的探测和读写。
 *
 * 这里不保存配置缓存，也不判断变更；storage.js 只通过本模块访问底层存储，
 * 便于单独理解"值存在哪里"，而不用同时阅读变更检测逻辑。
 */

export const LOCAL_PREFIX = 'sej:storage:';
export const TS_SUFFIX = ':updatedAt';
const PROBE_KEY = 'sej:probe:' + Date.now();

let warned = false;

export function isPresent(value) {
  return value !== undefined && value !== null;
}

export function cloneValue(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (e) {
    return value;
  }
}

export function gmNamespace() {
  return typeof globalThis !== 'undefined' ? globalThis.GM : undefined;
}

function hasSyncGM() {
  return typeof GM_getValue === 'function' && typeof GM_setValue === 'function';
}

function hasAsyncGM() {
  const gm = gmNamespace();
  return Boolean(
    gm && typeof gm['getValue'] === 'function' && typeof gm['setValue'] === 'function',
  );
}

export function readLocal(key) {
  try {
    const raw = localStorage.getItem(LOCAL_PREFIX + key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch (e) {
    return undefined;
  }
}

export function writeLocal(key, value) {
  try {
    localStorage.setItem(LOCAL_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('[SEJ] localStorage 写入失败，回退内存存储', e);
    return false;
  }
}

export function removeLocal(key) {
  try {
    localStorage.removeItem(LOCAL_PREFIX + key);
  } catch (e) {
    // ignore
  }
}

function warnLocalFallback() {
  if (warned) return;
  warned = true;
  console.warn(
    '[SEJ] 未检测到可用的脚本管理器存储（GM_getValue/GM.setValue），' +
      '已改用 localStorage：配置仅在当前站点生效，跳转到其他网站会回到默认设置。',
  );
}

async function probeSyncGM() {
  if (!hasSyncGM()) return false;
  try {
    const token = String(Math.random());
    GM_setValue(PROBE_KEY, token);
    return GM_getValue(PROBE_KEY) === token;
  } catch (e) {
    return false;
  } finally {
    try {
      if (typeof GM_deleteValue === 'function') GM_deleteValue(PROBE_KEY);
    } catch (e) {
      // ignore
    }
  }
}

async function probeAsyncGM() {
  if (!hasAsyncGM()) return false;
  const gm = gmNamespace();
  try {
    const token = String(Math.random());
    await gm['setValue'](PROBE_KEY, token);
    const value = await gm['getValue'](PROBE_KEY);
    return value === token;
  } catch (e) {
    return false;
  } finally {
    try {
      await gm['deleteValue']?.(PROBE_KEY);
    } catch (e) {
      // ignore
    }
  }
}

/**
 * 探测可用的存储后端。
 * @returns {Promise<'gm-sync' | 'gm-async' | 'local'>}
 */
export async function probeBackend() {
  if (await probeSyncGM()) return 'gm-sync';
  if (await probeAsyncGM()) return 'gm-async';
  warnLocalFallback();
  return 'local';
}

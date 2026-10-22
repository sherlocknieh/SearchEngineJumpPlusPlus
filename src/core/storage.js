import { GM_getValue, GM_setValue, GM_deleteValue } from '$';

const memoryFallback = new Map();
const asyncCache = new Map();
const asyncLoaded = new Set();
// 各键最近一次已知值，用于判断 GM 存储是否真的发生了变化。
// 不能拿 localStorage 比较：它只属于当前站点，同一个 GM 值在每个站点
// 都会被当成“有新变化”，从而导致无限重启和重复提示。
const lastKnown = new Map();
const LOCAL_PREFIX = 'sej:storage:';
const TS_SUFFIX = ':updatedAt';
const PROBE_KEY = 'sej:probe:' + Date.now();

// 'gm-sync' | 'gm-async' | 'local'
let backend = 'local';
let readyPromise = null;
let warned = false;

function stableStringify(value) {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(',')}}`;
}

/**
 * 比较两份设置是否等价（忽略对象键顺序）。
 */
export function isSameValue(a, b) {
  try {
    return stableStringify(a) === stableStringify(b);
  } catch (e) {
    return false;
  }
}

function cloneValue(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (e) {
    return value;
  }
}

function remember(key, value) {
  if (isPresent(value)) lastKnown.set(key, cloneValue(value));
}

function forget(key) {
  lastKnown.delete(key);
  asyncCache.delete(key);
  asyncLoaded.delete(key);
}

function gmNamespace() {
  return typeof globalThis !== 'undefined' ? globalThis.GM : undefined;
}

function hasSyncGM() {
  return (
    typeof GM_getValue === 'function' && typeof GM_setValue === 'function'
  );
}

function hasAsyncGM() {
  const gm = gmNamespace();
  return Boolean(
    gm &&
      typeof gm['getValue'] === 'function' &&
      typeof gm['setValue'] === 'function',
  );
}

function readLocal(key) {
  try {
    const raw = localStorage.getItem(LOCAL_PREFIX + key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch (e) {
    return undefined;
  }
}

function writeLocal(key, value) {
  try {
    localStorage.setItem(LOCAL_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('[SEJ] localStorage 写入失败，回退内存存储', e);
    return false;
  }
}

function removeLocal(key) {
  try {
    localStorage.removeItem(LOCAL_PREFIX + key);
  } catch (e) {
    // ignore
  }
}

function isPresent(value) {
  return value !== undefined && value !== null;
}

function warnOnce() {
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

async function preloadAsync(keys) {
  const gm = gmNamespace();
  await Promise.all(
    keys.map(async (key) => {
      try {
        const value = await gm['getValue'](key);
        asyncLoaded.add(key);
        if (isPresent(value)) {
          asyncCache.set(key, value);
          remember(key, value);
          return;
        }
        // GM 中没有记录时，把本站点已有的 localStorage 配置迁回 GM，
        // 避免配置只停留在单个域名下
        const local = readLocal(key);
        if (isPresent(local)) {
          asyncCache.set(key, local);
          remember(key, local);
          await gm['setValue'](key, cloneValue(local));
        }
      } catch (e) {
        console.warn('[SEJ] 读取 GM 存储失败', key, e);
      }
    }),
  );
}

/**
 * 探测可用的存储后端，并在需要时预加载配置。
 * 需在读取设置前 await。
 */
export function initStorage(keys = []) {
  if (!readyPromise) {
    readyPromise = (async () => {
      if (await probeSyncGM()) {
        backend = 'gm-sync';
      } else if (await probeAsyncGM()) {
        backend = 'gm-async';
        await preloadAsync(keys);
      } else {
        backend = 'local';
        warnOnce();
      }
      if (backend === 'gm-sync') {
        for (const key of keys) {
          try {
            const value = GM_getValue(key);
            if (isPresent(value)) remember(key, value);
          } catch (e) {
            console.warn('[SEJ] 读取 GM 存储失败', key, e);
          }
        }
      }
      console.info(`[SEJ] 设置存储后端：${backend}`);
      return backend;
    })();
  }
  return readyPromise;
}

export function getStorageBackend() {
  return backend;
}

export function getValue(key, defaultValue) {
  if (backend === 'gm-sync') {
    try {
      const value = GM_getValue(key);
      if (isPresent(value)) {
        remember(key, value);
        return cloneValue(value);
      }
      return defaultValue;
    } catch (e) {
      // 读取失败时清掉已知值，让后续轮询能够重新拉取并恢复设置
      lastKnown.delete(key);
      console.warn('[SEJ] GM_getValue 失败，使用默认值', e);
      return defaultValue;
    }
  }

  if (backend === 'gm-async') {
    if (asyncCache.has(key)) return cloneValue(asyncCache.get(key));
    if (asyncLoaded.has(key)) return defaultValue;
  }

  if (backend === 'local') {
    const local = readLocal(key);
    if (isPresent(local)) return local;

    if (memoryFallback.has(key)) return cloneValue(memoryFallback.get(key));
  }

  return defaultValue;
}

export function setValue(key, value) {
  const updatedAt = Date.now();
  const plain = cloneValue(value);
  let stored = 'memory';

  if (backend === 'gm-sync') {
    try {
      GM_setValue(key, plain);
      GM_setValue(key + TS_SUFFIX, updatedAt);
      stored = 'gm';
    } catch (e) {
      console.warn('[SEJ] GM_setValue 失败，尝试 localStorage', e);
    }
  } else if (backend === 'gm-async') {
    asyncCache.set(key, plain);
    asyncLoaded.add(key);
    const gm = gmNamespace();
    try {
      Promise.resolve(gm['setValue'](key, plain)).catch((e) => {
        console.warn('[SEJ] GM.setValue 失败，退回 localStorage', e);
        writeLocal(key, plain);
        writeLocal(key + TS_SUFFIX, updatedAt);
      });
      stored = 'gm';
    } catch (e) {
      console.warn('[SEJ] GM.setValue 失败', e);
    }
  }

  remember(key, plain);

  // 仅在 GM 存储不可用时才使用站点 localStorage，避免占用站点配额
  // 或留下只在单个域名下生效的陈旧副本
  if (backend === 'local' || stored === 'memory') {
    if (writeLocal(key, plain)) {
      writeLocal(key + TS_SUFFIX, updatedAt);
      if (stored === 'memory') stored = 'local';
    } else if (stored === 'memory') {
      memoryFallback.set(key, plain);
    }
  }

  return stored;
}

export function deleteValue(key) {
  const gm = gmNamespace();

  if (typeof GM_deleteValue === 'function') {
    try {
      GM_deleteValue(key);
      GM_deleteValue(key + TS_SUFFIX);
    } catch (e) {
      console.warn('[SEJ] GM_deleteValue 失败', e);
    }
  } else if (gm && typeof gm['deleteValue'] === 'function') {
    try {
      Promise.resolve(gm['deleteValue'](key)).catch(() => {});
      Promise.resolve(gm['deleteValue'](key + TS_SUFFIX)).catch(() => {});
    } catch (e) {
      console.warn('[SEJ] GM.deleteValue 失败', e);
    }
  }

  removeLocal(key);
  removeLocal(key + TS_SUFFIX);
  memoryFallback.delete(key);
  forget(key);
}

/**
 * 监听设置的跨页面/跨站点变化。
 * GM 存储可跨站点；localStorage 的 storage 事件仅同源。
 * @returns {() => void} 取消监听
 */
export function watchValue(key, callback) {
  const cleanups = [];
  const gm = gmNamespace();

  const handleRemote = (newValue) => {
    if (!isPresent(newValue)) return;
    const plain = cloneValue(newValue);
    asyncCache.set(key, plain);
    asyncLoaded.add(key);
    remember(key, plain);
    callback(plain);
  };

  const addListener =
    typeof GM_addValueChangeListener === 'function'
      ? GM_addValueChangeListener
      : gm && typeof gm['addValueChangeListener'] === 'function'
        ? gm['addValueChangeListener'].bind(gm)
        : null;

  if (addListener) {
    try {
      const result = addListener(key, (name, oldValue, newValue, remote) => {
        if (!remote) return;
        handleRemote(newValue);
      });
      Promise.resolve(result)
        .then((listenerId) => {
          if (listenerId === undefined || listenerId === null) return;
          const remove =
            typeof GM_removeValueChangeListener === 'function'
              ? GM_removeValueChangeListener
              : gm && typeof gm['removeValueChangeListener'] === 'function'
                ? gm['removeValueChangeListener'].bind(gm)
                : null;
          if (!remove) return;
          cleanups.push(() => {
            try {
              remove(listenerId);
            } catch (e) {
              // ignore
            }
          });
        })
        .catch(() => {});
    } catch (e) {
      console.warn('[SEJ] GM 变更监听注册失败', e);
    }
  }

  const localKey = LOCAL_PREFIX + key;
  const onStorage = (event) => {
    if (backend !== 'local') return;
    if (event.key !== localKey || event.newValue === null) return;
    try {
      callback(JSON.parse(event.newValue));
    } catch (e) {
      // ignore
    }
  };
  window.addEventListener('storage', onStorage);
  cleanups.push(() => window.removeEventListener('storage', onStorage));

  return () => {
    while (cleanups.length) {
      const cleanup = cleanups.pop();
      cleanup();
    }
  };
}

/**
 * 主动拉取最新值（用于不支持变更监听的脚本管理器，如 Greasemonkey 4）。
 * 与上次已知值比较，返回新值；无变化时返回 null。
 */
export async function pullLatest(key) {
  const gm = gmNamespace();

  try {
    let value;

    if (backend === 'gm-async') {
      value = await gm['getValue'](key);
      asyncLoaded.add(key);
    } else if (backend === 'gm-sync') {
      value = GM_getValue(key);
    } else {
      return null;
    }

    if (!isPresent(value)) return null;

    const current = lastKnown.get(key);
    if (isPresent(current) && isSameValue(value, current)) return null;

    const plain = cloneValue(value);
    lastKnown.set(key, plain);
    asyncCache.set(key, plain);
    asyncLoaded.add(key);
    return plain;
  } catch (e) {
    console.warn('[SEJ] 拉取最新设置失败', e);
  }

  return null;
}

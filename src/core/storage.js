import { GM_getValue, GM_setValue, GM_deleteValue } from '$';
import {
  TS_SUFFIX,
  cloneValue,
  gmNamespace,
  isPresent,
  probeBackend,
  LOCAL_PREFIX,
  readLocal,
  removeLocal,
  writeLocal,
} from './storageBackend.js';

const memoryFallback = new Map();
const asyncCache = new Map();
const asyncLoaded = new Set();
// 各键最近一次已知值，用于判断 GM 存储是否真的发生了变化。
// 不能拿 localStorage 比较：它只属于当前站点，同一个 GM 值在每个站点
// 都会被当成“有新变化”，从而导致无限重启和重复提示。
const lastKnown = new Map();
// 各键最近一次已知的写入时间戳，用于轮询时跳过整份配置的读取与比较
const lastKnownStamp = new Map();

// 'gm-sync' | 'gm-async' | 'local'
let backend = 'local';
let readyPromise = null;

/**
 * @param {boolean} cloned value 是否已是独立副本，可跳过复制
 */
function remember(key, value, cloned = false) {
  if (isPresent(value)) lastKnown.set(key, cloned ? value : cloneValue(value));
}

function forget(key) {
  lastKnown.delete(key);
  lastKnownStamp.delete(key);
  asyncCache.delete(key);
  asyncLoaded.delete(key);
}

/**
 * 比较两份设置是否等价（忽略对象键顺序）。
 *
 * 用递归深比较而不是先序列化成字符串：配置文件含大量图标 base64，
 * 序列化需要遍历并拼接数百 KB 字符串，深比较遇到不同项即可提前返回，
 * 实测比 stableStringify 快约 90 倍。
 */
export function isSameValue(a, b) {
  try {
    return deepEqual(a, b);
  } catch (e) {
    return false;
  }
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;

  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;

  if (aIsArray) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }
  return true;
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
      backend = await probeBackend();
      if (backend === 'gm-async') await preloadAsync(keys);
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

export function getValue(key, defaultValue) {
  if (backend === 'gm-sync') {
    try {
      const value = GM_getValue(key);
      if (isPresent(value)) {
        const plain = cloneValue(value);
        remember(key, plain, true);
        return plain;
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
      // 时间戳供轮询做变更检测，缺了它就只能退回整份配置的深比较
      Promise.resolve(gm['setValue'](key + TS_SUFFIX, updatedAt)).catch(() => {});
      stored = 'gm';
    } catch (e) {
      console.warn('[SEJ] GM.setValue 失败', e);
    }
  }

  // 本地写入的值不会再被轮询拉取，只有 GM 存储需要记录时间戳
  if (stored === 'gm') lastKnownStamp.set(key, updatedAt);
  remember(key, plain, true);

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
    remember(key, plain, true);
    // 时间戳未知，下次轮询需要重新读一次以对齐
    lastKnownStamp.delete(key);
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
 *
 * 先读时间戳做快速判断：配置含大量图标 base64，每次都把整份值读出来
 * 并深比较会带来可观的常驻开销，时间戳未变时直接返回。
 */
export async function pullLatest(key) {
  const gm = gmNamespace();

  try {
    let value;
    let stamp;

    if (backend === 'gm-async') {
      stamp = await gm['getValue'](key + TS_SUFFIX);
      if (isPresent(stamp) && lastKnownStamp.get(key) === stamp) return null;
      value = await gm['getValue'](key);
      asyncLoaded.add(key);
    } else if (backend === 'gm-sync') {
      if (typeof GM_getValue === 'function') stamp = GM_getValue(key + TS_SUFFIX);
      if (isPresent(stamp) && lastKnownStamp.get(key) === stamp) return null;
      value = GM_getValue(key);
    } else {
      return null;
    }

    if (!isPresent(value)) return null;

    // 没有时间戳（旧版本或其他写入方）时仍需比较内容，避免漏掉变更
    if (isPresent(stamp)) lastKnownStamp.set(key, stamp);

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

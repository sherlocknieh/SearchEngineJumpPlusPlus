import { GM_xmlhttpRequest } from '$';
import { t } from '../assets/i18n.js';

/** 单次图标请求的超时时间（毫秒） */
const ICON_TIMEOUT = 4000;
/**
 * 内嵌图标的数据上限（原始二进制字节数）。
 * 图标最终会以 base64 形式写进脚本存储，base64 体积约为原始字节的 4/3，
 * 所以 64KB 原图约等于 87KB 存储字符串。抓取阶段不限制大小，只有超过
 * 该值时才先压缩再内嵌，避免大量图标撑爆 GM 存储配额。
 */
const MAX_ICON_BYTES = 64 * 1024;
/** 压缩后图标的最长边；图标只以 16~20px 展示，64px 足以覆盖高分屏 */
const COMPRESS_START_SIZE = 64;
/** 压缩时继续缩小的尺寸下限，缩到该值仍超限则判为压缩失败 */
const COMPRESS_MIN_SIZE = 16;

const EXTENSION_MIME = {
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.bmp': 'image/bmp',
  '.avif': 'image/avif',
};

function getHeader(headers, name) {
  if (!headers) return '';
  const match = headers.match(new RegExp(`^${name}:\\s*(.+)$`, 'im'));
  return match ? match[1].trim() : '';
}

function mimeFromUrl(url) {
  const path = url.split(/[?#]/)[0].toLowerCase();
  const dot = path.lastIndexOf('.');
  if (dot === -1) return '';
  return EXTENSION_MIME[path.slice(dot)] || '';
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/**
 * 由 data URL 反推解码后的字节数，用于判断压缩结果是否已降到上限内。
 * base64 每 4 个字符表示 3 字节，末尾的 = / == 只是填充，需要扣除。
 */
function dataUrlBytes(dataUrl) {
  const comma = dataUrl.indexOf(',');
  if (comma === -1) return Infinity;
  const base64 = dataUrl.slice(comma + 1);
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

/**
 * 用 <img> 解码图片的兼容方案：先创建 blob URL，加载完成或失败后
 * 由调用方执行 release 释放对象 URL，避免长期占用内存；失败返回 null。
 */
function loadImageElement(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () =>
      resolve({
        image,
        release: () => URL.revokeObjectURL(url),
      });
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    image.src = url;
  });
}

/**
 * 把 ArrayBuffer 解码成可绘制到 canvas 的图片对象。
 * 优先 createImageBitmap：它直接接收 Blob，不经过 URL 加载，因此不受页面
 * img-src CSP 限制；SVG 等它不支持的格式会抛错，此时回退到 <img> + blob URL。
 * 返回 { image, release }，release 负责释放 ImageBitmap 或 blob URL。
 */
async function decodeIcon(buffer, mime) {
  const blob = new Blob([buffer], { type: mime || 'application/octet-stream' });
  if (typeof createImageBitmap === 'function') {
    try {
      const image = await createImageBitmap(blob);
      return { image, release: () => image.close?.() };
    } catch (e) {
      // createImageBitmap 不支持该格式时，交给 <img> 再试一次
    }
  }
  return loadImageElement(blob);
}

/**
 * 检测浏览器是否支持用 canvas 编码 WebP。
 * 不支持时 toDataURL('image/webp') 会静默回退成 PNG，因此用返回的 MIME 判断。
 */
function supportsWebp() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch (e) {
    return false;
  }
}

/**
 * 把超限图标缩小并重新编码，返回不超过 MAX_ICON_BYTES 的 data URL；
 * 无法解码或缩到下限仍超限时返回空字符串。
 *
 * 处理流程：
 * 1. 解码原图，最长边初始缩到 64px（原图更小时保持原尺寸，不放大）；
 * 2. 优先 WebP（保留透明通道），先高质量再降质量；不支持 WebP 时用 PNG；
 * 3. 当前尺寸仍超限则最长边按 0.75 递减，最小到 16px。
 */
async function compressIcon(buffer, mime) {
  const decoded = await decodeIcon(buffer, mime);
  if (!decoded) return '';
  const { image, release } = decoded;
  try {
    // ImageBitmap 使用 width/height，<img> 使用 naturalWidth/naturalHeight
    const sourceWidth = image.naturalWidth || image.width || 0;
    const sourceHeight = image.naturalHeight || image.height || 0;
    const hasSize = sourceWidth > 0 && sourceHeight > 0;
    // 只有 viewBox、没有固有尺寸的 SVG 取不到宽高，按 64×64 处理
    const sourceSide = hasSize ? Math.max(sourceWidth, sourceHeight) : COMPRESS_START_SIZE;
    let maxSide = Math.min(COMPRESS_START_SIZE, sourceSide);
    const webp = supportsWebp();

    while (maxSide >= COMPRESS_MIN_SIZE) {
      // 等比例缩放，保持图标不变形
      const scale = maxSide / sourceSide;
      const width = hasSize ? Math.max(1, Math.round(sourceWidth * scale)) : maxSide;
      const height = hasSize ? Math.max(1, Math.round(sourceHeight * scale)) : maxSide;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      ctx.drawImage(image, 0, 0, width, height);

      // 依次尝试更低的编码质量；PNG 不支持质量参数
      const attempts = webp
        ? [
            ['image/webp', 0.9],
            ['image/webp', 0.7],
            ['image/png', undefined],
          ]
        : [['image/png', undefined]];
      for (const [type, quality] of attempts) {
        const dataUrl = canvas.toDataURL(type, quality);
        // 直接按 data URL 长度估算大小，省去额外的 Blob 异步读取
        if (dataUrlBytes(dataUrl) <= MAX_ICON_BYTES) return dataUrl;
      }
      maxSide = Math.floor(maxSide * 0.75);
    }
    return '';
  } catch (e) {
    console.warn('[SEJ] 图标压缩失败:', e);
    return '';
  } finally {
    // 无论成功与否都释放 ImageBitmap 或 blob URL
    release?.();
  }
}

/**
 * 兼容只提供 GM.* 命名空间的管理器（如 Greasemonkey 4）。
 */
function getRequestFn() {
  if (typeof GM_xmlhttpRequest === 'function') return GM_xmlhttpRequest;
  const gm = typeof globalThis !== 'undefined' ? globalThis.GM : undefined;
  if (gm && typeof gm['xmlHttpRequest'] === 'function') {
    return gm['xmlHttpRequest'].bind(gm);
  }
  return null;
}

function requestIcon(url) {
  return new Promise((resolve) => {
    const request = getRequestFn();
    if (!request) {
      resolve({ response: null, reason: t('favicon.noRequestApi') });
      return;
    }
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    try {
      request({
        method: 'GET',
        url,
        responseType: 'arraybuffer',
        timeout: ICON_TIMEOUT,
        headers: { Accept: 'image/*,*/*;q=0.8' },
        onload: (response) => finish({ response }),
        onerror: () => finish({ response: null, reason: t('favicon.networkError') }),
        ontimeout: () => finish({ response: null, reason: t('favicon.timeout') }),
        onabort: () => finish({ response: null, reason: t('favicon.aborted') }),
      });
    } catch (e) {
      finish({
        response: null,
        reason: t('favicon.requestError', { message: e?.message || e }),
      });
    }
  });
}

/**
 * 图标显示地址：优先使用内嵌的 data URL，回退到原始链接。
 */
export function getFaviconSrc(engine) {
  return engine?.faviconData || engine?.favicon || '';
}

/**
 * 抓取并转换图标，返回 { data, reason }；data 为空表示失败，reason 为失败原因。
 * 抓取阶段不限制响应大小，只有超过 MAX_ICON_BYTES 的图片才会先压缩再内嵌，
 * 未超限的图片按原格式直接转成 data URL，避免不必要的画质损失。
 */
export async function resolveFavicon(url) {
  const source = typeof url === 'string' ? url.trim() : '';
  if (!/^https?:\/\//i.test(source)) return { data: '', reason: '' };

  const { response, reason } = await requestIcon(source);
  if (!response) {
    return { data: '', reason: reason || t('favicon.requestFailed') };
  }
  if (response.status < 200 || response.status >= 300) {
    return { data: '', reason: `HTTP ${response.status || 0}` };
  }

  const buffer = response.response;
  if (!buffer || buffer.byteLength === 0) {
    return { data: '', reason: t('favicon.emptyResponse') };
  }

  let mime = getHeader(response.responseHeaders, 'content-type').split(';')[0].trim().toLowerCase();
  // 部分静态服务器返回 application/octet-stream，按 URL 后缀再推断一次
  if (!mime || mime === 'application/octet-stream') {
    mime = mimeFromUrl(source);
  }
  if (!/^image\//.test(mime)) {
    return {
      data: '',
      reason: t('favicon.notImage', {
        type: mime || t('favicon.unknownType'),
      }),
    };
  }

  try {
    if (buffer.byteLength > MAX_ICON_BYTES) {
      // 超限图标先缩小重编码；压缩失败则放弃内嵌，由调用方回退到原始链接
      const compressed = await compressIcon(buffer, mime);
      if (!compressed) {
        return { data: '', reason: t('favicon.compressFailed') };
      }
      return { data: compressed, reason: '' };
    }
    return {
      data: `data:${mime};base64,${arrayBufferToBase64(buffer)}`,
      reason: '',
    };
  } catch (e) {
    console.warn('[SEJ] 图标转换失败:', source, e);
    return { data: '', reason: t('favicon.convertFailed') };
  }
}

/**
 * 把外部图标地址转成 data URL，避免被 Wikipedia 等页面的 CSP 拦截。
 * 获取失败或不是图片时原样返回。
 */
export async function embedFavicon(url) {
  const source = typeof url === 'string' ? url.trim() : '';
  const { data } = await resolveFavicon(source);
  return data || source;
}

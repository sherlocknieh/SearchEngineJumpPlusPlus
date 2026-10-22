import { GM_xmlhttpRequest } from '$';

const ICON_TIMEOUT = 4000;
const MAX_ICON_BYTES = 64 * 1024;

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

function requestIcon(url) {
    return new Promise((resolve) => {
        if (typeof GM_xmlhttpRequest !== 'function') {
            resolve(null);
            return;
        }
        let settled = false;
        const finish = (response) => {
            if (settled) return;
            settled = true;
            resolve(response);
        };
        try {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'arraybuffer',
                timeout: ICON_TIMEOUT,
                headers: { Accept: 'image/*,*/*;q=0.8' },
                onload: finish,
                onerror: () => finish(null),
                ontimeout: () => finish(null),
                onabort: () => finish(null),
            });
        } catch (e) {
            finish(null);
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
 * 把外部图标地址转成 data URL，避免被 Wikipedia 等页面的 CSP 拦截。
 * 获取失败或不是图片时原样返回。
 */
export async function embedFavicon(url) {
    const source = typeof url === 'string' ? url.trim() : '';
    if (!/^https?:\/\//i.test(source)) return source;

    const response = await requestIcon(source);
    if (!response || response.status < 200 || response.status >= 300) {
        return source;
    }

    const buffer = response.response;
    if (!buffer || buffer.byteLength === 0 || buffer.byteLength > MAX_ICON_BYTES) {
        return source;
    }

    let mime = getHeader(response.responseHeaders, 'content-type')
        .split(';')[0]
        .trim()
        .toLowerCase();
    if (!mime || mime === 'application/octet-stream') {
        mime = mimeFromUrl(source);
    }
    if (!/^image\//.test(mime)) return source;

    try {
        return `data:${mime};base64,${arrayBufferToBase64(buffer)}`;
    } catch (e) {
        console.warn('[SEJ] 图标转换失败:', source, e);
        return source;
    }
}

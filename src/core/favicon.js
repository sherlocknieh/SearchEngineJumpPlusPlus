import { GM_xmlhttpRequest } from '$';
import { t } from '../i18n/index.js';

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
                onerror: () =>
                    finish({ response: null, reason: t('favicon.networkError') }),
                ontimeout: () =>
                    finish({ response: null, reason: t('favicon.timeout') }),
                onabort: () =>
                    finish({ response: null, reason: t('favicon.aborted') }),
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
    if (buffer.byteLength > MAX_ICON_BYTES) {
        return {
            data: '',
            reason: t('favicon.tooLarge', { size: MAX_ICON_BYTES / 1024 }),
        };
    }

    let mime = getHeader(response.responseHeaders, 'content-type')
        .split(';')[0]
        .trim()
        .toLowerCase();
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

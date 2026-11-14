// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  dataUrlBytes,
  dataUrlStorageBytes,
  formatIconSize,
  imageFileFromDataTransfer,
  isImageFile,
  toWebpIcon,
} from '../src/core/favicon.js';

describe('dataUrlBytes', () => {
  it('按 base64 长度反推解码后字节数并扣除填充', () => {
    expect(dataUrlBytes('data:image/png;base64,AA==')).toBe(1);
    expect(dataUrlBytes('data:image/png;base64,AAA=')).toBe(2);
    expect(dataUrlBytes('data:image/png;base64,AAAA')).toBe(3);
  });

  it('非 data URL 返回 Infinity', () => {
    expect(dataUrlBytes('https://a.favicon.im/1337x.to')).toBe(Infinity);
  });
});

describe('dataUrlStorageBytes', () => {
  it('data URL 以字符串长度作为实际存储体积', () => {
    const dataUrl = 'data:image/png;base64,AA==';
    expect(dataUrlStorageBytes(dataUrl)).toBe(dataUrl.length);
  });

  it('base64 体积大于原图字节数（约 4/3）', () => {
    const dataUrl = 'data:image/png;base64,AAAA';
    expect(dataUrlBytes(dataUrl)).toBe(3);
    expect(dataUrlStorageBytes(dataUrl)).toBe(dataUrl.length);
    expect(dataUrlStorageBytes(dataUrl)).toBeGreaterThan(dataUrlBytes(dataUrl));
  });

  it('非 data URL 返回 Infinity', () => {
    expect(dataUrlStorageBytes('https://1337x.to/favicon.ico')).toBe(Infinity);
  });
});

describe('formatIconSize', () => {
  it('1KB 以内以 B 显示', () => {
    expect(formatIconSize(1)).toBe('1 B');
    expect(formatIconSize(1023)).toBe('1023 B');
  });

  it('1KB 到 1MB 以 KB 显示，整数不带小数', () => {
    expect(formatIconSize(1024)).toBe('1 KB');
    expect(formatIconSize(1536)).toBe('1.5 KB');
    expect(formatIconSize(64 * 1024)).toBe('64 KB');
  });

  it('超过 1MB 以 MB 显示', () => {
    expect(formatIconSize(1024 * 1024)).toBe('1 MB');
    expect(formatIconSize(1024 * 1024 * 1.5)).toBe('1.5 MB');
  });

  it('无效值返回空串，便于调用方直接判断是否展示', () => {
    expect(formatIconSize(Infinity)).toBe('');
    expect(formatIconSize(0)).toBe('');
    expect(formatIconSize(NaN)).toBe('');
  });
});

describe('toWebpIcon', () => {
  const PNG = 'image/png';

  function stubCanvas(webpDataUrl) {
    const original = document.createElement.bind(document);
    const canvas = {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: () => {} }),
      toDataURL: (type) => (type === 'image/webp' ? webpDataUrl : 'data:image/png;base64,AAAA'),
    };
    vi.spyOn(document, 'createElement').mockImplementation((tag) =>
      tag === 'canvas' ? canvas : original(tag),
    );
  }

  beforeEach(() => {
    vi.stubGlobal('createImageBitmap', async () => ({ width: 32, height: 32, close() {} }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('转码结果更小时采用 WebP', async () => {
    stubCanvas('data:image/webp;base64,AAAA');
    const buffer = new Uint8Array(100);
    await expect(toWebpIcon(buffer, PNG)).resolves.toBe('data:image/webp;base64,AAAA');
  });

  it('转码结果更大时放弃，保留原始格式', async () => {
    stubCanvas('data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    const buffer = new Uint8Array(10);
    await expect(toWebpIcon(buffer, PNG)).resolves.toBe('');
  });

  it('跳过 WebP / GIF / SVG，避免无收益或破坏特性', async () => {
    stubCanvas('data:image/webp;base64,AAAA');
    const buffer = new Uint8Array(100);
    await expect(toWebpIcon(buffer, 'image/webp')).resolves.toBe('');
    await expect(toWebpIcon(buffer, 'image/gif')).resolves.toBe('');
    await expect(toWebpIcon(buffer, 'image/svg+xml')).resolves.toBe('');
  });
});

describe('isImageFile', () => {
  it('按 MIME 或后缀识别图片', () => {
    expect(isImageFile({ type: 'image/png', name: 'image.png' })).toBe(true);
    // 系统剪贴板里的 .ico 常常没有 MIME
    expect(isImageFile({ type: '', name: 'favicon.ico' })).toBe(true);
  });

  it('非图片与缺字段都判为否', () => {
    expect(isImageFile({ type: 'text/plain', name: 'a.txt' })).toBe(false);
    expect(isImageFile(null)).toBe(false);
  });
});

describe('imageFileFromDataTransfer', () => {
  const png = { type: 'image/png', name: 'image.png' };

  it('优先取剪贴板里的图片条目', () => {
    const dataTransfer = {
      items: [
        { kind: 'string', type: 'text/plain' },
        { kind: 'file', type: 'image/png', getAsFile: () => png },
      ],
      files: [],
    };
    expect(imageFileFromDataTransfer(dataTransfer)).toBe(png);
  });

  it('条目取不到文件时回退到 files', () => {
    const dataTransfer = {
      items: [{ kind: 'file', type: 'image/png', getAsFile: () => null }],
      files: [png],
    };
    expect(imageFileFromDataTransfer(dataTransfer)).toBe(png);
  });

  it('剪贴板没有图片时返回 null，保留输入框默认粘贴', () => {
    expect(imageFileFromDataTransfer(null)).toBeNull();
    expect(
      imageFileFromDataTransfer({ items: [{ kind: 'string', type: 'text/plain' }], files: [] }),
    ).toBeNull();
  });
});

// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { openInTab } = vi.hoisted(() => ({ openInTab: vi.fn() }));

vi.mock('$', () => ({ GM_openInTab: openInTab }));

import {
  isActionEngine,
  openAllEngines,
  performEngineAction,
  performJump,
} from '../src/core/jump.js';

describe('performJump', () => {
  beforeEach(() => {
    openInTab.mockReset();
  });

  it('新标签页打开时对 URL 编码并调用 GM_openInTab', () => {
    expect(performJump({ url: 'https://a.test/?q=%s' }, 'a b', {})).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://a.test/?q=a%20b', {
      active: true,
      insert: true,
      setParent: true,
    });
  });

  it('批量打开时忽略打开方式强制新标签', () => {
    performJump({ url: 'https://a.test/?q=%s', target: '_self' }, 'x', {}, true);
    expect(openInTab).toHaveBeenCalledTimes(1);
  });

  it('未设置打开方式时跟随全局默认（当前页）', () => {
    performJump({ url: 'https://b.test/?q=%s' }, 'x', { defaultOpenTarget: '_self' });
    expect(openInTab).not.toHaveBeenCalled();
    expect(window.location.href).toBe('https://b.test/?q=x');
  });

  it('默认新标签页时不受全局默认缺失影响', () => {
    performJump({ url: 'https://a.test/?q=%s' }, 'x', { defaultOpenTarget: '_blank' });
    expect(openInTab).toHaveBeenCalledTimes(1);
  });
});

describe('openAllEngines', () => {
  const engines = [
    { url: 'https://a.test/?q=%s' },
    { url: 'https://b.test/?q=%s', disable: true },
    { url: 'https://c.test/?q=%s' },
  ];

  beforeEach(() => {
    openInTab.mockReset();
  });

  it('跳过禁用引擎，其余全部打开', () => {
    openAllEngines(engines, 'k');

    expect(openInTab).toHaveBeenCalledTimes(2);
    expect(openInTab.mock.calls.map(([url]) => url)).toEqual([
      'https://a.test/?q=k',
      'https://c.test/?q=k',
    ]);
  });
});

describe('动作引擎', () => {
  const writeText = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    openInTab.mockReset();
    writeText.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
  });

  it('识别 copy/open 动作', () => {
    expect(isActionEngine({ action: 'copy' })).toBe(true);
    expect(isActionEngine({ action: 'open' })).toBe(true);
    expect(isActionEngine({ action: 'unknown' })).toBe(false);
    expect(isActionEngine({ url: 'https://a.test' })).toBe(false);
  });

  it('复制当前关键词而不打开页面', async () => {
    expect(await performEngineAction({ action: 'copy' }, 'hello')).toBe(true);
    expect(writeText).toHaveBeenCalledWith('hello');
    expect(openInTab).not.toHaveBeenCalled();
  });

  it('没有可复制内容时返回 false', async () => {
    expect(await performEngineAction({ action: 'copy' }, '')).toBe(false);
  });

  it('把当前关键词当作链接打开', async () => {
    expect(await performEngineAction({ action: 'open' }, 'example.com/a')).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://example.com/a', {
      active: true,
      insert: true,
      setParent: true,
    });
  });

  it('文字里含链接时打开其中的链接', async () => {
    expect(await performEngineAction({ action: 'open' }, '看看 https://a.test/p 这个')).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://a.test/p', {
      active: true,
      insert: true,
      setParent: true,
    });
  });

  it('当前内容不是链接时不打开', async () => {
    expect(await performEngineAction({ action: 'open' }, 'just words')).toBe(false);
    expect(openInTab).not.toHaveBeenCalled();
  });

  it('performJump 对动作引擎直接返回已处理', () => {
    expect(performJump({ action: 'copy' }, 'x', {})).toBe(true);
    expect(openInTab).not.toHaveBeenCalled();
  });

  it('一键打开全部时跳过复制动作，只打开链接', () => {
    openAllEngines([{ action: 'copy' }, { action: 'open' }], 'example.com');
    expect(writeText).not.toHaveBeenCalled();
    expect(openInTab).toHaveBeenCalledTimes(1);
  });
});

describe('动作引擎的上下文目标', () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  const write = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    openInTab.mockReset();
    writeText.mockClear();
    write.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText, write },
      configurable: true,
    });
  });

  it('复制对象里的文本内容', async () => {
    const target = { text: '标题\nhttps://a.test', url: 'https://a.test' };
    expect(await performEngineAction({ action: 'copy' }, target)).toBe(true);
    expect(writeText).toHaveBeenCalledWith('标题\nhttps://a.test');
  });

  it('图片可取时写入图片数据，取不到时回退到复制的文字', async () => {
    const target = { text: 'https://cdn.test/a.png', image: 'https://cdn.test/a.png' };
    const originalFetch = globalThis.fetch;
    const OriginalItem = globalThis.ClipboardItem;
    try {
      // 不支持图片剪贴板时回退到复制地址
      globalThis.ClipboardItem = undefined;
      expect(await performEngineAction({ action: 'copy' }, target)).toBe(true);
      expect(writeText).toHaveBeenCalledWith('https://cdn.test/a.png');

      globalThis.ClipboardItem = class {
        constructor(items) {
          this.items = items;
        }
      };
      globalThis.fetch = vi.fn(async () => ({
        ok: true,
        blob: async () => new Blob(['png'], { type: 'image/png' }),
      }));
      writeText.mockClear();
      expect(await performEngineAction({ action: 'copy' }, target)).toBe(true);
      expect(write).toHaveBeenCalledTimes(1);
      expect(writeText).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      globalThis.ClipboardItem = OriginalItem;
    }
  });

  it('打开对象目标用地址而不是显示文字', async () => {
    expect(
      await performEngineAction({ action: 'open' }, { text: '标题', url: 'https://a.test/p' }),
    ).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://a.test/p', {
      active: true,
      insert: true,
      setParent: true,
    });
  });
});

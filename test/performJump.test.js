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

  it('后台打开时在新标签页里保持不激活', () => {
    performJump({ url: 'https://a.test/?q=%s', target: '_background' }, 'x', {});
    expect(openInTab).toHaveBeenCalledWith('https://a.test/?q=x', {
      active: false,
      insert: true,
      setParent: true,
    });
  });

  it('引擎未设置打开方式时跟随全局的后台默认', () => {
    performJump({ url: 'https://a.test/?q=%s' }, 'x', { defaultOpenTarget: '_background' });
    expect(openInTab).toHaveBeenCalledWith('https://a.test/?q=x', {
      active: false,
      insert: true,
      setParent: true,
    });
  });

  it('批量打开时后台引擎仍然后台', () => {
    performJump({ url: 'https://a.test/?q=%s', target: '_background' }, 'x', {}, true);
    expect(openInTab).toHaveBeenCalledWith('https://a.test/?q=x', {
      active: false,
      insert: true,
      setParent: true,
    });
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

  it('识别各类复制与打开动作', () => {
    expect(isActionEngine({ action: 'copy' })).toBe(true);
    expect(isActionEngine({ action: 'copyLinkText' })).toBe(true);
    expect(isActionEngine({ action: 'copyLinkUrl' })).toBe(true);
    expect(isActionEngine({ action: 'selectLinkText' })).toBe(true);
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

  it('复制链接标题只写文字，复制链接地址只写地址', async () => {
    const target = { text: '示例标题', url: 'https://a.test/p' };
    expect(await performEngineAction({ action: 'copyLinkText' }, target)).toBe(true);
    expect(writeText).toHaveBeenLastCalledWith('示例标题');
    expect(await performEngineAction({ action: 'copyLinkUrl' }, target)).toBe(true);
    expect(writeText).toHaveBeenLastCalledWith('https://a.test/p');
  });

  it('选中链接标题时把标题文字变成页面选区', async () => {
    const link = document.createElement('a');
    link.href = 'https://a.test/p';
    link.innerHTML = '<h3>示例标题</h3><span>站点名</span>';
    document.body.appendChild(link);
    const target = { text: '示例标题', url: link.href, element: link };

    expect(await performEngineAction({ action: 'selectLinkText' }, target)).toBe(true);
    expect(document.getSelection().toString()).toBe('示例标题');
    link.remove();
  });

  it('没有链接元素或缺可选中文字时选中失败', async () => {
    expect(await performEngineAction({ action: 'selectLinkText' }, '示例标题')).toBe(false);
    const empty = document.createElement('a');
    document.body.appendChild(empty);
    expect(await performEngineAction({ action: 'selectLinkText' }, { element: empty })).toBe(false);
    empty.remove();
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
    openAllEngines(
      [
        { action: 'copy' },
        { action: 'copyImageUrl' },
        { action: 'copyLinkText' },
        { action: 'copyLinkUrl' },
        { action: 'selectLinkText' },
        { action: 'open' },
      ],
      'example.com',
    );
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

  it('复制文字只复制文字，图片目标交给复制图片处理', async () => {
    const target = { text: '标题\nhttps://a.test', url: 'https://a.test' };
    expect(await performEngineAction({ action: 'copy' }, target)).toBe(true);
    expect(writeText).toHaveBeenCalledWith('标题\nhttps://a.test');
    // 带图片目标时复制文字也仍然只复制文字，不会写入图片
    writeText.mockClear();
    expect(
      await performEngineAction(
        { action: 'copy' },
        { text: '文中文字', url: 'https://a.test', image: 'https://cdn.test/a.png' },
      ),
    ).toBe(true);
    expect(writeText).toHaveBeenCalledWith('文中文字');
    expect(write).not.toHaveBeenCalled();
  });

  it('复制图片可取时写入图片数据，取不到时回退到图片地址', async () => {
    const target = { text: 'https://cdn.test/a.png', image: 'https://cdn.test/a.png' };
    const originalFetch = globalThis.fetch;
    const OriginalItem = globalThis.ClipboardItem;
    try {
      // 不支持图片剪贴板时回退到复制地址
      globalThis.ClipboardItem = undefined;
      expect(await performEngineAction({ action: 'copyImage' }, target)).toBe(true);
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
      expect(await performEngineAction({ action: 'copyImage' }, target)).toBe(true);
      expect(write).toHaveBeenCalledTimes(1);
      expect(writeText).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      globalThis.ClipboardItem = OriginalItem;
    }
  });

  it('打开链接与打开图片都用地址打开目标', async () => {
    expect(
      await performEngineAction({ action: 'open' }, { text: '标题', url: 'https://a.test/p' }),
    ).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://a.test/p', {
      active: true,
      insert: true,
      setParent: true,
    });
    openInTab.mockClear();
    expect(
      await performEngineAction(
        { action: 'openImage' },
        { text: 'https://cdn.test/a.png', url: 'https://cdn.test/a.png' },
      ),
    ).toBe(true);
    expect(openInTab).toHaveBeenCalledWith('https://cdn.test/a.png', {
      active: true,
      insert: true,
      setParent: true,
    });
  });

  it('内联图片打不开原地址时换成 blob: 再打开', async () => {
    // Chrome 拦截顶层导航到 data:，打开图片要先转成同源 blob:
    const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==';
    expect(await performEngineAction({ action: 'openImage' }, { url: data })).toBe(true);
    const [url] = openInTab.mock.calls[0] || [];
    expect(url?.startsWith('blob:')).toBe(true);
  });

  it('内联图片改为把字节上传给识图引擎', () => {
    const submit = vi.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
    const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==';
    expect(
      performJump({ url: 'https://lens.google.com/uploadbyurl?url=%s' }, data, {}),
    ).toBe(true);
    expect(submit).toHaveBeenCalledTimes(1);
    // 表单用完即移除，不留在页面里
    expect(document.querySelector('form')).toBeNull();
    // 没有上传入口的引擎搜不了内联图片
    expect(
      performJump({ url: 'https://yandex.ru/images/search?rpt=imageview&url=%s' }, data, {}),
    ).toBe(false);
    expect(openInTab).not.toHaveBeenCalled();
    submit.mockRestore();
  });
});

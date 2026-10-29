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

  it('跳过禁用引擎和当前站点引擎', () => {
    openAllEngines(engines, 'k', { HideTheSameLink: true }, { url: /a\.test/ });

    expect(openInTab).toHaveBeenCalledTimes(1);
    expect(openInTab.mock.calls[0][0]).toBe('https://c.test/?q=k');
  });

  it('关闭防原地跳转时打开全部启用引擎', () => {
    openAllEngines(engines, 'k', { HideTheSameLink: false }, { url: /a\.test/ });

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

  it('当前内容不是链接时不打开', async () => {
    expect(await performEngineAction({ action: 'open' }, 'just words')).toBe(false);
    expect(openInTab).not.toHaveBeenCalled();
  });

  it('performJump 对动作引擎直接返回已处理', () => {
    expect(performJump({ action: 'copy' }, 'x', {})).toBe(true);
    expect(openInTab).not.toHaveBeenCalled();
  });

  it('一键打开全部时跳过复制动作，只打开链接', () => {
    openAllEngines([{ action: 'copy' }, { action: 'open' }], 'example.com', {}, null);
    expect(writeText).not.toHaveBeenCalled();
    expect(openInTab).toHaveBeenCalledTimes(1);
  });
});

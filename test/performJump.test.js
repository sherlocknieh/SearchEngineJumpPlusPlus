// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { openInTab } = vi.hoisted(() => ({ openInTab: vi.fn() }));

vi.mock('$', () => ({ GM_openInTab: openInTab }));

import { openAllEngines, performJump } from '../src/core/jump.js';

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

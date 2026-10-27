import { beforeEach, describe, expect, it, vi } from 'vitest';

const { embedFavicon } = vi.hoisted(() => ({ embedFavicon: vi.fn() }));

vi.mock('../src/core/favicon.js', () => ({
  embedFavicon,
  resolveFavicon: vi.fn(async () => ({ data: '', reason: 'unused' })),
}));

import { useEngineIcons } from '../src/composables/useEngineIcons.js';

function makeDraft(count) {
  return {
    categories: [
      {
        engines: Array.from({ length: count }, (_, index) => ({
          _id: index + 1,
          name: `E${index}`,
          url: `https://e${index}.test/?q=%s`,
          favicon: `https://e${index}.test/favicon.ico`,
        })),
      },
    ],
  };
}

function createIcons(draft, overrides = {}) {
  return useEngineIcons({
    draft,
    scheduleAutoSave: vi.fn(),
    isDisposed: () => false,
    ...overrides,
  });
}

describe('useEngineIcons.loadAllIcons', () => {
  beforeEach(() => {
    embedFavicon.mockReset();
  });

  it('批量内嵌远程图标并只触发一次自动保存', async () => {
    embedFavicon.mockImplementation(async (url) => `data:image/png;base64,${url}`);
    const draft = makeDraft(3);
    const scheduleAutoSave = vi.fn();
    const { loadAllIcons, loadingIcons } = createIcons(draft, { scheduleAutoSave });

    await loadAllIcons();

    expect(embedFavicon).toHaveBeenCalledTimes(3);
    for (const engine of draft.categories[0].engines) {
      expect(engine.faviconData).toBe(`data:image/png;base64,${engine.favicon}`);
    }
    expect(scheduleAutoSave).toHaveBeenCalledTimes(1);
    expect(loadingIcons.value).toBe(false);
  });

  it('限制并发数量', async () => {
    let active = 0;
    let maxActive = 0;
    embedFavicon.mockImplementation(async (url) => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 1));
      active--;
      return `data:${url}`;
    });

    await createIcons(makeDraft(12)).loadAllIcons();

    expect(maxActive).toBeLessThanOrEqual(6);
    expect(maxActive).toBe(6);
  });

  it('面板已关闭时不再写回或自动保存', async () => {
    embedFavicon.mockImplementation(async (url) => `data:${url}`);
    const draft = makeDraft(2);
    const scheduleAutoSave = vi.fn();
    const { loadAllIcons } = createIcons(draft, {
      scheduleAutoSave,
      isDisposed: () => true,
    });

    await loadAllIcons();

    for (const engine of draft.categories[0].engines) {
      expect(engine.faviconData).toBe(`data:${engine.favicon}`);
    }
    expect(scheduleAutoSave).not.toHaveBeenCalled();
  });

  it('没有需要内嵌的图标时不发起请求', async () => {
    const draft = makeDraft(2);
    draft.categories[0].engines.forEach((engine) => {
      engine.faviconData = 'data:image/png;base64,existing';
    });

    await createIcons(draft).loadAllIcons();

    expect(embedFavicon).not.toHaveBeenCalled();
  });

  it('重复调用时上一轮未结束时直接跳过', async () => {
    const releases = [];
    embedFavicon.mockImplementation(
      () =>
        new Promise((resolve) => {
          releases.push(() => resolve('data:done'));
        }),
    );
    const icons = createIcons(makeDraft(2));

    const first = icons.loadAllIcons();
    await icons.loadAllIcons();
    expect(embedFavicon).toHaveBeenCalledTimes(2);

    releases.forEach((release) => release());
    await first;
  });
});

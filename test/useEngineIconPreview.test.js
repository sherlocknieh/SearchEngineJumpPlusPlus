// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { nextTick, reactive } from 'vue';
import { hostFromUrl } from '../src/core/engineUrl.js';

const resolveFavicon = vi.fn();
vi.mock('../src/core/favicon.js', async (importOriginal) => ({
  ...(await importOriginal()),
  resolveFavicon,
}));

const { useEngineIconPreview } = await import('../src/composables/useEngineIconPreview.js');

const ICON = 'data:image/png;base64,AA==';

function setup({ url, favicon, faviconData = '' }) {
  const form = reactive({ name: 'E', url, favicon, target: '_blank' });
  const api = useEngineIconPreview({
    form,
    siteHost: { value: hostFromUrl(url) || hostFromUrl(favicon) },
    initialFavicon: favicon,
    initialFaviconData: faviconData,
    isBusy: () => false,
  });
  return { api, form };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('useEngineIconPreview 候选来源', () => {
  afterEach(() => {
    resolveFavicon.mockReset();
  });

  it('主域名站点也会试探自身的 favicon.ico', async () => {
    resolveFavicon.mockResolvedValue({ data: ICON, reason: '', bytes: 5734 });
    const { api } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon: 'https://a.favicon.im/1337x.to',
    });

    await api.previewIcon();

    const requested = resolveFavicon.mock.calls.map(([target]) => target);
    expect(requested).toEqual(['https://a.favicon.im/1337x.to', 'https://1337x.to/favicon.ico']);
    expect(api.previewSteps.value.map((step) => step.status)).toEqual(['ok', 'ok']);
    // 来源行显示下载到的原始大小，而不是转码后的存储体积
    expect(api.previewSteps.value.map((step) => step.size)).toEqual(['5.6 KB', '5.6 KB']);
    expect(api.previewSteps.value.map((step) => step.rawSize)).toEqual([5734, 5734]);
  });

  it('子域名站点同时试探主机名与主域名的 favicon.ico', async () => {
    resolveFavicon.mockResolvedValue({ data: '', reason: 'HTTP 404' });
    const { api } = setup({ url: 'https://zh.wikipedia.org/w/index.php?search=%s', favicon: '' });

    await api.previewIcon();

    expect(resolveFavicon.mock.calls.map(([target]) => target)).toEqual([
      'https://zh.wikipedia.org/favicon.ico',
      'https://wikipedia.org/favicon.ico',
      'https://a.favicon.im/zh.wikipedia.org',
      'https://a.favicon.im/wikipedia.org',
    ]);
  });

  it('候选地址去重，不重复请求同一来源', async () => {
    resolveFavicon.mockResolvedValue({ data: '', reason: 'HTTP 404' });
    const { api } = setup({
      url: 'https://baidu.com/s?wd=%s',
      favicon: 'https://baidu.com/favicon.ico',
    });

    await api.previewIcon();

    const requested = resolveFavicon.mock.calls.map(([target]) => target);
    expect(new Set(requested).size).toBe(requested.length);
    expect(requested).toEqual(['https://baidu.com/favicon.ico', 'https://a.favicon.im/baidu.com']);
  });
});

describe('useEngineIconPreview 结果呈现', () => {
  afterEach(() => {
    resolveFavicon.mockReset();
  });

  it('获取成功后不自动采用，等用户点选', async () => {
    resolveFavicon.mockResolvedValue({ data: ICON, reason: '', bytes: 5734 });
    const { api, form } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon: 'https://a.favicon.im/1337x.to',
    });

    await api.previewIcon();

    expect(api.previewData.value).toBe('');
    expect(api.previewSize.value).toBe('');
    expect(api.previewUrl.value).toBe('');
    // 图标地址保持用户填写的内容，不被自动改写
    expect(form.favicon).toBe('https://a.favicon.im/1337x.to');
    // 全部成功项都可点选
    expect(api.previewSteps.value.every((step) => step.status === 'ok')).toBe(true);
  });

  it('成功项按返回先后排序，失败项排在其后', async () => {
    // 候选顺序为 sub → 主域名 favicon.ico → 两个图标服务，此处让返回顺序与之不同
    const delays = {
      'https://sub.slow.test/favicon.ico': 20,
      'https://slow.test/favicon.ico': 15,
      'https://a.favicon.im/sub.slow.test': 5,
      'https://a.favicon.im/slow.test': 0,
    };
    resolveFavicon.mockImplementation(async (target) => {
      await sleep(delays[target] ?? 0);
      return target === 'https://sub.slow.test/favicon.ico'
        ? { data: '', reason: 'HTTP 404' }
        : { data: ICON, reason: '', bytes: 5734 };
    });

    const { api } = setup({ url: 'https://sub.slow.test/s?q=%s', favicon: '' });
    await api.previewIcon();

    expect(api.previewSteps.value.map((step) => step.url)).toEqual([
      'https://a.favicon.im/slow.test',
      'https://a.favicon.im/sub.slow.test',
      'https://slow.test/favicon.ico',
      'https://sub.slow.test/favicon.ico',
    ]);
    expect(api.previewSteps.value.map((step) => step.status)).toEqual(['ok', 'ok', 'ok', 'failed']);
  });

  it('编辑已有图标时不会把首个来源误标为已选择', async () => {
    resolveFavicon.mockResolvedValue({ data: ICON, reason: '', bytes: 5734 });
    const favicon = 'https://a.favicon.im/1337x.to';
    const { api } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon,
      // 编辑态会带出已存图标数据，预览链接指向其中一条来源
      faviconData: 'data:image/png;base64,BB==',
    });

    // 初始化时数据仍可用于提交，但没有“用户点选”
    expect(api.previewUrl.value).toBe(favicon);
    expect(api.pickedUrl.value).toBe('');

    await api.previewIcon();
    expect(api.pickedUrl.value).toBe('');
  });

  it('成功一条就立即上浮，不等整批结束', async () => {
    // 手工控制两条候选的返回时机，观察中途顺序
    const pending = new Map();
    resolveFavicon.mockImplementation(
      (target) =>
        new Promise((resolve) => {
          pending.set(target, resolve);
        }),
    );

    const { api } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon: 'https://a.favicon.im/1337x.to',
    });
    const running = api.previewIcon();
    await Promise.resolve();

    const [first, second] = api.previewSteps.value.map((step) => step.url);
    expect(api.previewSteps.value.map((step) => step.status)).toEqual(['loading', 'loading']);

    // 后一条先成功：应立刻跳到首位，前一条仍在请求
    pending.get(second)({ data: ICON, reason: '', bytes: 5734 });
    await Promise.resolve();
    await Promise.resolve();

    expect(api.previewSteps.value.map((step) => step.url)).toEqual([second, first]);
    expect(api.previewSteps.value[0].status).toBe('ok');
    expect(api.previewSteps.value[1].status).toBe('loading');

    // 前一条随后失败：沉到末尾，顺序不变
    pending.get(first)({ data: '', reason: 'HTTP 404' });
    await running;

    expect(api.previewSteps.value.map((step) => step.url)).toEqual([second, first]);
    expect(api.previewSteps.value.map((step) => step.status)).toEqual(['ok', 'failed']);
  });

  it('用户点选后写入图标地址、数据与体积', async () => {
    resolveFavicon.mockResolvedValue({ data: ICON, reason: '', bytes: 5734 });
    const { api, form } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon: 'https://a.favicon.im/1337x.to',
    });
    await api.previewIcon();

    const target = api.previewSteps.value.find(
      (step) => step.url === 'https://1337x.to/favicon.ico',
    );
    await api.chooseStep(target);

    expect(form.favicon).toBe('https://1337x.to/favicon.ico');
    expect(api.previewData.value).toBe(ICON);
    // “图标数据”栏显示转码后的存储体积，与来源行的原始大小不同
    expect(api.previewSize.value).toBe('26 B');
    expect(api.previewUrl.value).toBe('https://1337x.to/favicon.ico');
    expect(api.pickedUrl.value).toBe('https://1337x.to/favicon.ico');
  });

  it('手动改图标地址后清除点选标记', async () => {
    resolveFavicon.mockResolvedValue({ data: ICON, reason: '', bytes: 5734 });
    const { api, form } = setup({
      url: 'https://www.1337x.to/search/%s/1/',
      favicon: 'https://a.favicon.im/1337x.to',
    });
    await api.previewIcon();
    await api.chooseStep(api.previewSteps.value[0]);
    expect(api.pickedUrl.value).not.toBe('');

    form.favicon = 'https://example.test/icon.png';
    await nextTick();

    expect(api.pickedUrl.value).toBe('');
  });
});

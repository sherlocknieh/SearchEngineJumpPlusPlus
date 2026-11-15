// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import {
  HINT_TARGET_MAX,
  LONG_PRESS_MOVE_TOLERANCE,
  actionEngineHint,
  actionTargetHint,
  contextActionHintKey,
  contextActionEngines,
  contextActionTarget,
  contextCategoryKey,
  contextLinkHit,
  getContextEngines,
  isActionAvailableInMode,
  isLongPressMove,
  resolveContextHit,
} from '../src/core/contextAction.js';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('resolveContextHit', () => {
  it('图片包在链接里时以图片为主，同时保留外层链接', () => {
    document.body.innerHTML =
      '<a href="https://site.test/page"><img src="https://cdn.test/a.png"></a>';
    const hit = resolveContextHit(document.querySelector('img'));
    expect(hit.mode).toBe('image');
    expect(hit.url).toBe('https://cdn.test/a.png');
    expect(hit.link).toMatchObject({ url: 'https://site.test/page', text: '' });
    expect(hit.link.element).toBe(document.querySelector('a'));
  });

  it('链接地址与图片地址一致时，外层链接不产生链接动作', () => {
    document.body.innerHTML =
      '<a href="https://cdn.test/a.png"><img src="https://cdn.test/a.png"></a>';
    const hit = resolveContextHit(document.querySelector('img'));
    expect(hit.link).toMatchObject({ url: 'https://cdn.test/a.png' });
    expect(contextLinkHit(hit)).toBeNull();
  });

  it('只有链接引擎时按链接处理，不额外记录链接副本', () => {
    document.body.innerHTML =
      '<a href="https://site.test/page"><img src="https://cdn.test/a.png"></a>';
    const hit = resolveContextHit(
      document.querySelector('img'),
      (mode) => mode === 'link',
    );
    expect(hit.mode).toBe('link');
    expect(hit.url).toBe('https://site.test/page');
    expect(hit.link).toBeUndefined();
  });

  it('只有图片引擎时不提供链接动作', () => {
    document.body.innerHTML =
      '<a href="https://site.test/page"><img src="https://cdn.test/a.png"></a>';
    const hit = resolveContextHit(
      document.querySelector('img'),
      (mode) => mode === 'image',
    );
    expect(hit.mode).toBe('image');
    expect(hit.link).toBeNull();
  });

  it('没有可用引擎或目标不是图片/链接时返回 null', () => {
    document.body.innerHTML = '<a href="https://site.test/page">文字</a><p>段落</p>';
    expect(resolveContextHit(document.querySelector('a'), () => false)).toBeNull();
    expect(resolveContextHit(document.querySelector('p'))).toBeNull();
  });

  it('按下目标被标题浮层覆盖时，仍按坐标同时给出图片与外层链接', () => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    link.href = 'https://site.test/page';
    const image = document.createElement('img');
    image.setAttribute('src', 'https://cdn.test/a.png');
    image.getBoundingClientRect = () => ({
      width: 120,
      height: 120,
      top: 0,
      left: 0,
      right: 120,
      bottom: 120,
      x: 0,
      y: 0,
    });
    link.appendChild(image);
    const overlay = document.createElement('a');
    overlay.href = 'https://site.test/page';
    overlay.textContent = '标题';
    figure.append(link, overlay);
    document.body.appendChild(figure);

    const hit = resolveContextHit(overlay, () => true, { x: 50, y: 50 });
    expect(hit.mode).toBe('image');
    expect(hit.url).toBe('https://cdn.test/a.png');
    expect(hit.link).toMatchObject({ url: 'https://site.test/page', text: '标题' });
  });
});

describe('contextLinkHit', () => {
  it('链接动作目标取链接文字与地址，没有文字时回退到地址', () => {
    expect(contextLinkHit({ link: { url: 'https://site.test/a', text: '标题' } })).toEqual({
      keyword: '标题',
      url: 'https://site.test/a',
      element: null,
    });
    expect(contextLinkHit({ link: { url: 'https://site.test/a.png', text: '' } })).toEqual({
      keyword: 'https://site.test/a.png',
      url: 'https://site.test/a.png',
      element: null,
    });
  });

  it('保留外层链接元素，选中链接标题才能落到页面选区', () => {
    const element = { nodeType: 1 };
    expect(
      contextLinkHit({ link: { url: 'https://site.test/a', text: '标题', element } }).element,
    ).toBe(element);
  });

  it('没有外层链接时返回 null', () => {
    expect(contextLinkHit({})).toBeNull();
    expect(contextLinkHit({ link: { url: '' } })).toBeNull();
  });

  it('外层链接就指向图片本身时不再提供链接动作', () => {
    const url = 'https://cdn.test/a.png';
    expect(contextLinkHit({ url, link: { url, text: '大图' } })).toBeNull();
  });
});

describe('isLongPressMove', () => {
  it('小范围抖动不算移动，超过阈值才算', () => {
    expect(isLongPressMove(100, 100, 103, 104)).toBe(false);
    expect(isLongPressMove(100, 100, 100 + LONG_PRESS_MOVE_TOLERANCE + 1, 100)).toBe(true);
  });
});

describe('contextCategoryKey', () => {
  it('图片与链接分别对应搜图、操作分类', () => {
    expect(contextCategoryKey('image')).toBe('image');
    expect(contextCategoryKey('link')).toBe('actions');
    expect(contextCategoryKey('')).toBe('');
    expect(contextCategoryKey('unknown')).toBe('');
  });
});

describe('getContextEngines', () => {
  it('图片模式只取搜图分类下启用且带链接的引擎', () => {
    const engines = getContextEngines(
      {
        engineList: {
          image: [
            { name: 'A', url: 'https://a.test/?url=%s' },
            { name: 'B', url: 'https://b.test/?url=%s', disable: true },
            { name: 'C', url: '' },
          ],
        },
      },
      'image',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['A']);
  });

  it('链接模式取操作分类下启用的复制/打开动作', () => {
    const engines = getContextEngines(
      {
        engineList: {
          actions: [
            { name: '复制', url: '', action: 'copy' },
            { name: '打开', url: '', action: 'open' },
            { name: '隐藏', url: '', action: 'open', disable: true },
            { name: '空项', url: '' },
          ],
        },
      },
      'link',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['复制', '打开']);
  });

  it('缺少分类或模式未知时返回空数组', () => {
    expect(getContextEngines({}, 'image')).toEqual([]);
    expect(getContextEngines(null, 'link')).toEqual([]);
    expect(getContextEngines({ engineList: { web: [{ url: 'https://a.test/?q=%s' }] } })).toEqual(
      [],
    );
  });
});

describe('contextActionTarget', () => {
  const hit = { keyword: '示例标题', url: 'https://site.test/a' };

  it('链接标题与链接地址分别取文字和地址，打开只用地址', () => {
    expect(contextActionTarget('link', 'copyLinkText', hit)).toBe('示例标题');
    expect(contextActionTarget('link', 'copyLinkUrl', hit)).toBe('https://site.test/a');
    expect(contextActionTarget('link', 'open', hit)).toBe('https://site.test/a');
  });

  it('选中链接标题带上链接元素，供动作执行方落下选区', () => {
    const element = { nodeType: 1 };
    expect(contextActionTarget('link', 'selectLinkText', { ...hit, element })).toEqual({
      text: '示例标题',
      url: 'https://site.test/a',
      element,
    });
  });

  it('纯图片链接没有标题时标题与地址取同一段地址', () => {
    const url = 'https://site.test/a.png';
    expect(contextActionTarget('link', 'copyLinkText', { keyword: url, url })).toBe(url);
    expect(contextActionTarget('link', 'copyLinkUrl', { keyword: url, url })).toBe(url);
  });

  it('图片复制图片本身，取不到时回退地址；打开用图片地址', () => {
    const image = { keyword: 'https://cdn.test/a.png', url: 'https://cdn.test/a.png' };
    expect(contextActionTarget('image', 'copy', image)).toEqual({
      text: 'https://cdn.test/a.png',
      url: 'https://cdn.test/a.png',
      image: 'https://cdn.test/a.png',
    });
    expect(contextActionTarget('image', 'open', image)).toBe('https://cdn.test/a.png');
  });
});

describe('isActionAvailableInMode', () => {
  it('链接复制拆成标题与地址，不再提供通用复制', () => {
    expect(isActionAvailableInMode('link', 'copyLinkText')).toBe(true);
    expect(isActionAvailableInMode('link', 'copyLinkUrl')).toBe(true);
    expect(isActionAvailableInMode('link', 'selectLinkText')).toBe(true);
    expect(isActionAvailableInMode('link', 'copy')).toBe(false);
    expect(isActionAvailableInMode('link', 'copyImageUrl')).toBe(false);
  });

  it('图片地址只在图片模式，链接复制只在链接模式', () => {
    expect(isActionAvailableInMode('image', 'copyImageUrl')).toBe(true);
    expect(isActionAvailableInMode('image', 'copyLinkUrl')).toBe(false);
    expect(isActionAvailableInMode('text', 'copyLinkText')).toBe(false);
    expect(isActionAvailableInMode('text', 'selectLinkText')).toBe(false);
    expect(isActionAvailableInMode('input', 'copyImageUrl')).toBe(false);
  });

  it('通用复制与打开始终可用', () => {
    for (const mode of ['image', 'text', 'input']) {
      expect(isActionAvailableInMode(mode, 'copy')).toBe(true);
      expect(isActionAvailableInMode(mode, 'open')).toBe(true);
    }
    expect(isActionAvailableInMode('link', 'open')).toBe(true);
  });
});

describe('contextActionEngines', () => {
  const t = (key) => key;
  const engines = [
    { name: '复制图片地址', url: '', action: 'copyImageUrl' },
    { name: '复制', url: '', action: 'copy' },
    { name: '打开', url: '', action: 'open' },
    { name: '复制链接标题', url: '', action: 'copyLinkText' },
    { name: '复制链接地址', url: '', action: 'copyLinkUrl' },
    { name: '选中链接标题', url: '', action: 'selectLinkText' },
  ];
  const image = { keyword: 'https://cdn.test/a.png', url: 'https://cdn.test/a.png' };
  const link = { keyword: '示例标题', url: 'https://site.test/a' };
  const targets = [
    { mode: 'image', hit: image },
    { mode: 'link', hit: link },
  ];

  it('图片与外层链接的动作按设置顺序合并，图片目标排在链接目标之前', () => {
    const list = contextActionEngines(engines, targets, t);
    expect(list.map((engine) => engine.name)).toEqual([
      'action.hintCopyImageUrl',
      'action.hintCopyImage',
      'action.hintOpenImage',
      'action.hintOpenLink',
      'action.hintCopyLinkTitle',
      'action.hintCopyLinkUrl',
      'action.hintSelectLinkTitle',
    ]);
    expect(list.map((engine) => engine.contextTarget)).toEqual([
      'image',
      'image',
      'image',
      'link',
      'link',
      'link',
      'link',
    ]);
  });

  it('调整设置里的顺序后浮层顺序随之变化', () => {
    const reversed = engines.slice().reverse();
    const list = contextActionEngines(reversed, targets, t);
    expect(list.map((engine) => engine.name)).toEqual([
      'action.hintSelectLinkTitle',
      'action.hintCopyLinkUrl',
      'action.hintCopyLinkTitle',
      'action.hintOpenImage',
      'action.hintOpenLink',
      'action.hintCopyImage',
      'action.hintCopyImageUrl',
    ]);
  });

  it('纯图片链接不再重复给出复制/选中标题，复制图片用命中图片当图标', () => {
    const list = contextActionEngines(engines, [{ mode: 'image', hit: image }, { mode: 'link', hit: image }], t);
    expect(list.map((engine) => engine.name)).toEqual([
      'action.hintCopyImageUrl',
      'action.hintCopyImage',
      'action.hintOpenImage',
      'action.hintOpenLink',
      'action.hintCopyLinkUrl',
    ]);
    expect(list.find((engine) => engine.action === 'copy').favicon).toBe(image.url);
  });

  it('跳过隐藏项与非动作引擎，目标为空时返回空数组', () => {
    const list = contextActionEngines(
      [
        { name: '隐藏', url: '', action: 'copy', disable: true },
        { name: '搜索引擎', url: 'https://a.test/?q=%s' },
      ],
      targets,
      t,
    );
    expect(list).toEqual([]);
    expect(contextActionEngines(engines, [], t)).toEqual([]);
  });
});

describe('contextActionHintKey', () => {
  it('不同情景下的复制动作各有提示', () => {
    expect(contextActionHintKey('link', 'copyLinkText')).toBe('action.hintCopyLinkTitle');
    expect(contextActionHintKey('link', 'copyLinkUrl')).toBe('action.hintCopyLinkUrl');
    expect(contextActionHintKey('link', 'selectLinkText')).toBe('action.hintSelectLinkTitle');
    expect(contextActionHintKey('link', 'copy')).toBe('');
    expect(contextActionHintKey('image', 'copy')).toBe('action.hintCopyImage');
    expect(contextActionHintKey('link', 'open')).toBe('action.hintOpenLink');
    expect(contextActionHintKey('image', 'open')).toBe('action.hintOpenImage');
  });

  it('未知情景或动作没有提示', () => {
    expect(contextActionHintKey('', 'copy')).toBe('');
    expect(contextActionHintKey('image', 'unknown')).toBe('');
  });
});

describe('actionEngineHint', () => {
  // 用带插值的假文案函数，直接断言提示里拼进了什么内容
  const t = (key, params = {}) => {
    const text = key === 'action.hintWithTarget' ? '{action}：{target}' : key;
    return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
  };
  const hit = { keyword: '示例标题', url: 'https://site.test/a' };

  it('提示包含这次实际复制或打开的内容', () => {
    expect(actionEngineHint('link', 'copyLinkText', hit, t)).toBe(
      'action.hintCopyLinkTitle：示例标题',
    );
    expect(actionEngineHint('link', 'copyLinkUrl', hit, t)).toBe(
      'action.hintCopyLinkUrl：https://site.test/a',
    );
    expect(actionEngineHint('link', 'open', hit, t)).toBe(
      'action.hintOpenLink：https://site.test/a',
    );
    expect(actionEngineHint('image', 'copy', hit, t)).toBe(
      'action.hintCopyImage：https://site.test/a',
    );
    expect(actionEngineHint('text', 'copy', hit, t)).toBe('action.hintCopyText：示例标题');
    expect(actionEngineHint('text', 'open', hit, t)).toBe(
      'action.hintOpenLink：https://site.test/a',
    );
    expect(actionEngineHint('input', 'copy', hit, t)).toBe(
      'action.hintCopyText：示例标题',
    );
  });

  it('没有目标内容时只保留动作说明', () => {
    expect(actionEngineHint('text', 'copy', { keyword: '  ' }, t)).toBe('action.hintCopyText');
  });

  it('过长的目标内容截断，避免提示被撑开', () => {
    const longUrl = `https://site.test/${'a'.repeat(HINT_TARGET_MAX * 2)}`;
    const hint = actionEngineHint('link', 'open', { keyword: '', url: longUrl }, t);
    const target = hint.split('：')[1];
    expect(target).toHaveLength(HINT_TARGET_MAX);
    expect(target.endsWith('…')).toBe(true);
  });

  it('名称已说明动作时只返回目标内容', () => {
    expect(actionTargetHint('image', 'copy', { url: 'https://cdn.test/a.png' })).toBe(
      'https://cdn.test/a.png',
    );
    expect(actionTargetHint('link', 'copyLinkText', hit)).toBe('示例标题');
    expect(actionTargetHint('link', 'selectLinkText', hit)).toBe('示例标题');
    expect(actionTargetHint('link', 'copyLinkUrl', hit)).toBe('https://site.test/a');
    expect(actionTargetHint('link', 'open', hit)).toBe('https://site.test/a');
    expect(actionTargetHint('image', 'unknown', hit)).toBe('');
  });

  it('未知情景没有提示', () => {
    expect(actionEngineHint('', 'copy', hit, t)).toBe('');
  });
});

// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import {
  HINT_TARGET_MAX,
  LONG_PRESS_MOVE_TOLERANCE,
  actionEngineEffect,
  actionEngineTip,
  actionTargetHint,
  contextActionEngines,
  contextActionTarget,
  contextCategoryKey,
  contextLinkHit,
  contextTriggerId,
  getContextEngines,
  isActionAvailableInMode,
  isActionTriggered,
  isLongPressMove,
  modeTriggerId,
  resolveContextHit,
  triggerLabels,
} from '../src/core/contextAction.js';
import { ACTION_TRIGGERS, ENGINE_ACTIONS, TRIGGER_KEYS } from '../src/core/configData.js';
import { messages } from '../src/assets/messages.js';

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

  it('内联缩略图同样按图片命中，地址是 data:image 自身', () => {
    const inline = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    document.body.innerHTML = `<a href="https://site.test/page"><img src="${inline}"></a>`;
    const image = document.querySelector('img');
    Object.defineProperty(image, 'naturalWidth', { value: 92 });
    Object.defineProperty(image, 'naturalHeight', { value: 92 });

    const hit = resolveContextHit(image);
    expect(hit.mode).toBe('image');
    expect(hit.url).toBe(inline);
    // 外层链接仍是普通链接，链接动作照旧可用
    expect(hit.link).toMatchObject({ url: 'https://site.test/page' });
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

  it('链接模式只取勾选了长按/右键链接的动作', () => {
    const engines = getContextEngines(
      {
        engineList: {
          actions: [
            { name: '复制链接标题', url: '', action: 'copyLinkText' },
            { name: '复制文字', url: '', action: 'copy' },
            { name: '打开', url: '', action: 'open' },
            { name: '隐藏', url: '', action: 'open', disable: true },
            { name: '关闭了全部触发条件', url: '', action: 'copyLinkUrl', triggers: [] },
            { name: '空项', url: '' },
          ],
        },
      },
      'link',
    );
    expect(engines.map((engine) => engine.name)).toEqual(['复制链接标题', '打开']);
  });

  it('长按与右键分别按各自的触发条件接管', () => {
    const settingData = {
      engineList: {
        actions: [
          { name: '仅右键复制', url: '', action: 'copyLinkText', triggers: ['linkMenu'] },
        ],
      },
    };
    expect(getContextEngines(settingData, 'link', 'long')).toEqual([]);
    expect(getContextEngines(settingData, 'link', 'menu').map((engine) => engine.name)).toEqual([
      '仅右键复制',
    ]);
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

  it('复制文字只复制文字，复制图片取图片本身，打开各自用对应地址', () => {
    const image = { keyword: 'https://cdn.test/a.png', url: 'https://cdn.test/a.png' };
    // 复制文字只用于划词与搜索框，目标始终是那段文字
    expect(contextActionTarget('text', 'copy', image)).toBe('https://cdn.test/a.png');
    expect(contextActionTarget('image', 'copyImage', image)).toEqual({
      text: 'https://cdn.test/a.png',
      url: 'https://cdn.test/a.png',
      image: 'https://cdn.test/a.png',
    });
    expect(contextActionTarget('image', 'openImage', image)).toBe('https://cdn.test/a.png');
    expect(contextActionTarget('link', 'open', hit)).toBe('https://site.test/a');
  });
});

describe('isActionAvailableInMode', () => {
  it('复制文字只用于划词与搜索框，链接复制拆成标题与地址', () => {
    expect(isActionAvailableInMode('text', 'copy')).toBe(true);
    expect(isActionAvailableInMode('input', 'copy')).toBe(true);
    expect(isActionAvailableInMode('image', 'copy')).toBe(false);
    expect(isActionAvailableInMode('link', 'copy')).toBe(false);
    // 剪切同样只在能删除内容的划词/搜索框情景出现
    expect(isActionAvailableInMode('text', 'cut')).toBe(true);
    expect(isActionAvailableInMode('input', 'cut')).toBe(true);
    expect(isActionAvailableInMode('image', 'cut')).toBe(false);
    expect(isActionAvailableInMode('link', 'cut')).toBe(false);
    expect(isActionAvailableInMode('link', 'copyLinkText')).toBe(true);
    expect(isActionAvailableInMode('link', 'copyLinkUrl')).toBe(true);
    expect(isActionAvailableInMode('link', 'selectLinkText')).toBe(true);
    expect(isActionAvailableInMode('link', 'copyImageUrl')).toBe(false);
  });

  it('图片类动作只在图片模式，链接复制只在链接模式', () => {
    expect(isActionAvailableInMode('image', 'copyImage')).toBe(true);
    expect(isActionAvailableInMode('image', 'copyImageUrl')).toBe(true);
    expect(isActionAvailableInMode('image', 'openImage')).toBe(true);
    expect(isActionAvailableInMode('text', 'copyImage')).toBe(false);
    expect(isActionAvailableInMode('image', 'copyLinkUrl')).toBe(false);
    expect(isActionAvailableInMode('text', 'copyLinkText')).toBe(false);
    expect(isActionAvailableInMode('text', 'selectLinkText')).toBe(false);
    expect(isActionAvailableInMode('input', 'copyImageUrl')).toBe(false);
  });

  it('打开链接只用于划词与链接，打开图片只用于图片', () => {
    for (const mode of ['link', 'text', 'input']) {
      expect(isActionAvailableInMode(mode, 'open')).toBe(true);
    }
    expect(isActionAvailableInMode('image', 'open')).toBe(false);
    for (const mode of ['link', 'text', 'input']) {
      expect(isActionAvailableInMode(mode, 'openImage')).toBe(false);
    }
  });
});

describe('contextActionEngines', () => {
  const engines = [
    { name: '复制图片地址', url: '', action: 'copyImageUrl' },
    { name: '复制文字', url: '', action: 'copy' },
    { name: '复制图片', url: '', action: 'copyImage' },
    { name: '打开链接', url: '', action: 'open' },
    { name: '打开图片', url: '', action: 'openImage' },
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
    const list = contextActionEngines(engines, targets);
    // 条目名称原样取自设置；复制文字在图片/链接模式下没有目标，不产生条目
    expect(list.map((engine) => engine.name)).toEqual([
      '复制图片地址',
      '复制图片',
      '打开链接',
      '打开图片',
      '复制链接标题',
      '复制链接地址',
      '选中链接标题',
    ]);
    expect(list.map((engine) => engine.contextTarget)).toEqual([
      'image',
      'image',
      'link',
      'image',
      'link',
      'link',
      'link',
    ]);
  });

  it('没有动作的普通搜索引擎在所有模式下都可用（图片模式里就是搜图）', () => {
    for (const mode of ['image', 'link', 'text', 'input']) {
      expect(isActionAvailableInMode(mode, undefined)).toBe(true);
    }
  });

  it('内联缩略图与普通图片一样，打开图片照常出现', () => {
    const inline = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const list = contextActionEngines(engines, [
      { mode: 'image', hit: { keyword: inline, url: inline } },
      { mode: 'link', hit: link },
    ]);
    expect(list.map((engine) => engine.name)).toEqual([
      '复制图片地址',
      '复制图片',
      '打开链接',
      '打开图片',
      '复制链接标题',
      '复制链接地址',
      '选中链接标题',
    ]);
    expect(list.map((engine) => engine.contextTarget)).toEqual([
      'image',
      'image',
      'link',
      'image',
      'link',
      'link',
      'link',
    ]);
  });

  it('触发条件决定条目是否出现：长按与右键分别生效', () => {
    const menuOnly = engines.map((engine) =>
      engine.action === 'copyImage' ? { ...engine, triggers: ['imageMenu'] } : engine,
    );
    expect(
      contextActionEngines(menuOnly, targets, 'long').some((e) => e.action === 'copyImage'),
    ).toBe(false);
    expect(
      contextActionEngines(menuOnly, targets, 'menu').some((e) => e.action === 'copyImage'),
    ).toBe(true);
    // 全部取消勾选等于关掉这个操作
    const disabled = engines.map((engine) =>
      engine.action === 'copyLinkText' ? { ...engine, triggers: [] } : engine,
    );
    expect(
      contextActionEngines(disabled, targets, 'menu').some((e) => e.action === 'copyLinkText'),
    ).toBe(false);
  });

  it('调整设置里的顺序后浮层顺序随之变化，改名也直接生效', () => {
    const renamed = engines
      .slice()
      .reverse()
      .map((engine) =>
        engine.action === 'copyLinkText' ? { ...engine, name: '拷贝标题' } : engine,
      );
    const list = contextActionEngines(renamed, targets);
    expect(list.map((engine) => engine.name)).toEqual([
      '选中链接标题',
      '复制链接地址',
      '拷贝标题',
      '打开图片',
      '打开链接',
      '复制图片',
      '复制图片地址',
    ]);
  });

  it('纯图片链接不再重复给出复制/选中标题，复制图片用命中图片当图标', () => {
    const list = contextActionEngines(engines, [
      { mode: 'image', hit: image },
      { mode: 'link', hit: image },
    ]);
    expect(list.map((engine) => engine.name)).toEqual([
      '复制图片地址',
      '复制图片',
      '打开链接',
      '打开图片',
      '复制链接地址',
    ]);
    expect(list.find((engine) => engine.action === 'copyImage').favicon).toBe(image.url);
    // 复制文字在图片/链接浮层里不出现，图标也不被替换
    expect(list.some((engine) => engine.action === 'copy')).toBe(false);
  });

  it('跳过隐藏项与非动作引擎，目标为空时返回空数组', () => {
    const list = contextActionEngines(
      [
        { name: '隐藏', url: '', action: 'copy', disable: true },
        { name: '搜索引擎', url: 'https://a.test/?q=%s' },
      ],
      targets,
    );
    expect(list).toEqual([]);
    expect(contextActionEngines(engines, [])).toEqual([]);
  });
});

describe('动作说明与触发条件', () => {
  const t = (key) => key;

  it('每个动作都有操作说明，且中英文文案齐全', () => {
    for (const action of ENGINE_ACTIONS) {
      const key = actionEngineEffect(action, t);
      expect(key).toMatch(/^action\.effect/);
      expect(messages['zh-CN'][key]).toBeTruthy();
      expect(messages.en[key]).toBeTruthy();
    }
  });

  it('每个动作的默认触发条件都有对应文案', () => {
    for (const action of ENGINE_ACTIONS) {
      const triggers = ACTION_TRIGGERS[action];
      expect(triggers.length).toBeGreaterThan(0);
      for (const id of triggers) {
        expect(TRIGGER_KEYS[id]).toBeTruthy();
        expect(messages['zh-CN'][TRIGGER_KEYS[id]]).toBeTruthy();
        expect(messages.en[TRIGGER_KEYS[id]]).toBeTruthy();
      }
    }
  });

  it('悬停提示把勾选的触发条件用斜杠连起来，再接操作', () => {
    expect(actionEngineTip({ action: 'copy' }, t)).toBe(
      'trigger.selection / trigger.input：action.effectCopy',
    );
    // 只勾一项、以及全部取消（操作关闭）时都有对应文案
    expect(actionEngineTip({ action: 'copyImage', triggers: ['imageMenu'] }, t)).toBe(
      'trigger.imageMenu：action.effectCopyImage',
    );
    expect(actionEngineTip({ action: 'copyImage', triggers: [] }, t)).toBe(
      'action.effectCopyImage',
    );
  });

  it('触发条件按勾选结果生效，普通搜索引擎不受限制', () => {
    expect(isActionTriggered({ action: 'copy' }, 'selection')).toBe(true);
    expect(isActionTriggered({ action: 'copy' }, 'imageLong')).toBe(false);
    expect(isActionTriggered({ action: 'copyImage', triggers: [] }, 'imageLong')).toBe(false);
    expect(isActionTriggered({ action: 'openImage', triggers: ['imageMenu'] }, 'imageLong')).toBe(
      false,
    );
    expect(isActionTriggered({ name: 'Google', url: 'https://a.test/?q=%s' }, 'any')).toBe(true);
  });

  it('普通条按关键词来源、上下文条按手势给出触发条件', () => {
    expect(modeTriggerId('text', 'copy')).toBe('selection');
    expect(modeTriggerId('input', 'copy')).toBe('input');
    expect(modeTriggerId('text', 'open')).toBe('keyword');
    expect(modeTriggerId('image', 'copy')).toBe('');
    expect(contextTriggerId('image', 'long')).toBe('imageLong');
    expect(contextTriggerId('image', 'menu')).toBe('imageMenu');
    expect(contextTriggerId('link', 'long')).toBe('linkLong');
    expect(contextTriggerId('link', 'menu')).toBe('linkMenu');
  });

  it('触发条件的文案按勾选顺序拼接', () => {
    expect(triggerLabels(['linkMenu', 'linkLong'], t)).toEqual(['trigger.linkMenu', 'trigger.linkLong']);
    expect(triggerLabels([], t)).toEqual([]);
  });

  it('未知动作没有说明', () => {
    expect(actionEngineEffect('paste', t)).toBe('');
    expect(actionEngineTip({ action: 'paste' }, t)).toBe('');
    expect(actionEngineTip(undefined, t)).toBe('');
  });
});

describe('actionTargetHint', () => {
  const hit = { keyword: '示例标题', url: 'https://site.test/a' };

  it('名称已说明动作时只返回目标内容', () => {
    expect(actionTargetHint('image', 'copyImage', { url: 'https://cdn.test/a.png' })).toBe(
      'https://cdn.test/a.png',
    );
    expect(actionTargetHint('text', 'cut', { keyword: '待剪切文字', url: '' })).toBe('待剪切文字');
    expect(actionTargetHint('input', 'cut', { keyword: '待剪切文字', url: '' })).toBe('待剪切文字');
    expect(actionTargetHint('link', 'copyLinkText', hit)).toBe('示例标题');
    expect(actionTargetHint('link', 'selectLinkText', hit)).toBe('示例标题');
    expect(actionTargetHint('link', 'copyLinkUrl', hit)).toBe('https://site.test/a');
    expect(actionTargetHint('link', 'open', hit)).toBe('https://site.test/a');
    expect(actionTargetHint('image', 'openImage', hit)).toBe('https://site.test/a');
  });

  it('过长的目标内容截断，避免提示被撑开', () => {
    const longUrl = `https://site.test/${'a'.repeat(HINT_TARGET_MAX * 2)}`;
    const hint = actionTargetHint('link', 'open', { keyword: '', url: longUrl });
    expect(hint).toHaveLength(HINT_TARGET_MAX);
    expect(hint.endsWith('…')).toBe(true);
  });

  it('未知情景、动作或情景不适用时不显示提示', () => {
    expect(actionTargetHint('', 'copy', hit)).toBe('');
    expect(actionTargetHint('image', 'unknown', hit)).toBe('');
    // 动作在情景里不出现时没有提示
    expect(actionTargetHint('image', 'copy', hit)).toBe('');
    expect(actionTargetHint('link', 'copyImage', hit)).toBe('');
    expect(actionTargetHint('text', 'openImage', hit)).toBe('');
  });
});

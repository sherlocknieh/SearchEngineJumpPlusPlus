// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';
import { useConfigIO } from '../src/composables/useConfigIO.js';
import { useUndoDelete } from '../src/composables/useUndoDelete.js';
import { useEngineIcons } from '../src/composables/useEngineIcons.js';
import { ui } from '../src/stores/ui.js';

function createDraft() {
  return reactive({
    categories: [
      {
        _id: 1,
        name: '搜索',
        key: 'web',
        enabled: true,
        engines: [{ _id: 2, name: 'A', url: 'https://a.test' }],
      },
    ],
  });
}

describe('useConfigIO', () => {
  let draft;
  let id;
  const nextId = () => ++id;
  let settings;

  function setup() {
    draft = createDraft();
    id = 10;
    settings = {
      scriptSettingData: { engineCategories: [], engineList: {} },
      applySettings: vi.fn(() => 'gm'),
    };
    const onRefresh = vi.fn();
    const onCancel = vi.fn();
    const onChanged = vi.fn();
    const onFeedback = vi.fn();
    const onResetRemote = vi.fn();
    const api = useConfigIO({
      draft,
      nextId,
      buildResult: (categories = draft.categories) => ({
        engineCategories: categories.map((category) => [
          category.name,
          category.key,
          category.enabled,
        ]),
        engineList: Object.fromEntries(
          categories.map((category) => [
            category.key,
            category.engines.map((engine) => ({ name: engine.name, url: engine.url })),
          ]),
        ),
      }),
      getCurrent: () => ({ version: 'v1' }),
      getSettings: () => settings,
      refreshDraft: onRefresh,
      cancelAutoSave: onCancel,
      markSettingsChanged: onChanged,
      pulseSaveFeedback: onFeedback,
      resetRemoteSynced: onResetRemote,
    });
    return { api, onRefresh, onCancel, onChanged, onFeedback, onResetRemote };
  }

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('合并预览只追加不重复的引擎', () => {
    const { api } = setup();
    const text = api.mergePreview(
      JSON.stringify({
        engineCategories: [['搜索', 'web', true]],
        engineList: {
          web: [
            { name: 'A2', url: 'https://A.test/' },
            { name: 'B', url: 'https://b.test' },
          ],
        },
      }),
      true,
    );

    const parsed = JSON.parse(text);
    expect(parsed.engineList.web.map((engine) => engine.name)).toEqual(['A', 'B']);
    // 预览不应改动真实草稿
    expect(draft.categories[0].engines).toHaveLength(1);
  });

  it('无法识别的配置返回空串', () => {
    const { api } = setup();
    expect(api.mergePreview('null', true)).toBe('');
    expect(api.mergePreview('not json', true)).toBe('');
  });

  it('应用配置会取消自动保存并刷新草稿', () => {
    const { api, onRefresh, onCancel, onChanged, onFeedback, onResetRemote } = setup();
    api.applyConfig(
      JSON.stringify({ engineCategories: [['新', 'x', true]], engineList: { x: [] } }),
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onResetRemote).toHaveBeenCalledTimes(1);
    expect(settings.applySettings).toHaveBeenCalledTimes(1);
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onFeedback).toHaveBeenCalledTimes(1);
    expect(api.configOpen.value).toBe(false);
  });

  it('保存失败时不标记已修改', () => {
    const { api, onChanged } = setup();
    settings.applySettings.mockReturnValue('memory');
    api.applyConfig(JSON.stringify({ engineCategories: [], engineList: {} }));
    expect(onChanged).not.toHaveBeenCalled();
  });
});

describe('useUndoDelete', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('删除引擎后可以撤销并回到原位置', () => {
    const draft = createDraft();
    const scheduleAutoSave = vi.fn();
    const closeCategoryDialog = vi.fn();
    const { deleteEngine, undoDelete, canUndo } = useUndoDelete({
      draft,
      scheduleAutoSave,
      isDialogOpen: () => false,
      closeCategoryDialog,
    });

    deleteEngine(0, 0);
    expect(draft.categories[0].engines).toHaveLength(0);
    expect(scheduleAutoSave).toHaveBeenCalledTimes(1);
    expect(canUndo()).toBe(true);

    undoDelete();
    expect(draft.categories[0].engines.map((engine) => engine.name)).toEqual(['A']);
    expect(canUndo()).toBe(false);
    expect(scheduleAutoSave).toHaveBeenCalledTimes(2);
  });

  it('弹窗打开时拒绝撤销但保留记录', () => {
    const draft = createDraft();
    let dialogOpen = false;
    const { deleteCategory, undoDelete, canUndo } = useUndoDelete({
      draft,
      scheduleAutoSave: vi.fn(),
      isDialogOpen: () => dialogOpen,
      closeCategoryDialog: vi.fn(),
    });

    deleteCategory(0);
    expect(draft.categories).toHaveLength(0);

    dialogOpen = true;
    undoDelete();
    expect(draft.categories).toHaveLength(0);
    expect(canUndo()).toBe(true);

    dialogOpen = false;
    undoDelete();
    expect(draft.categories).toHaveLength(1);
  });
});

describe('useEngineIcons.getICON', () => {
  afterEach(() => {
    ui.iconSource = 0;
  });

  it('默认使用站点自身 favicon.ico', () => {
    const { getICON } = useEngineIcons({
      draft: createDraft(),
      scheduleAutoSave: vi.fn(),
      isDisposed: () => false,
    });
    ui.iconSource = 0;
    expect(getICON('https://example.com/search?q=1')).toBe('https://example.com/favicon.ico');
  });

  it('无协议时补全 https，并保留端口', () => {
    const { getICON } = useEngineIcons({
      draft: createDraft(),
      scheduleAutoSave: vi.fn(),
      isDisposed: () => false,
    });
    ui.iconSource = 0;
    expect(getICON('example.com:8080/search?q=1')).toBe('https://example.com:8080/favicon.ico');
    expect(getICON('')).toBe('');
  });

  it('支持自定义 %s 模板', () => {
    const { getICON } = useEngineIcons({
      draft: createDraft(),
      scheduleAutoSave: vi.fn(),
      isDisposed: () => false,
    });
    ui.iconSource = 'https://icons.test/%s.png';
    expect(getICON('example.com')).toBe('https://icons.test/https://example.com.png');
  });
});

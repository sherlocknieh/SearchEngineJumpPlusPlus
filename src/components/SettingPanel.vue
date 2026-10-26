<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { isSameValue } from '../core/storage.js';
import { mergeIntoCategories } from '../core/configMerge.js';
import { OPTION_KEYS, configToText, serializeConfig } from '../core/configSchema.js';
import { useSettings } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { embedFavicon, getFaviconSrc, resolveFavicon } from '../core/favicon.js';
import { closeSettingPanel, showToast, ui } from '../stores/ui.js';
import {
  localizeCategoryName,
  localizeEngineName,
  setLanguagePreference,
  t,
} from '../assets/i18n.js';
import { useAutoSave } from '../composables/useAutoSave.js';
import { usePanelDrag } from '../composables/usePanelDrag.js';
import { useDragSort } from '../composables/useDragSort.js';
import EngineEditDialog from './EngineEditDialog.vue';
import CategoryEditDialog from './CategoryEditDialog.vue';
import ConfigEditor from './ConfigEditor.vue';

const COPY =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const EYE =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
const PENCIL =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
const TRASH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';

const settings = useSettings();
const source = computed(() => settings.settingData);

function displayCategoryName(category) {
  if (!category) return '';
  return localizeCategoryName(category.name, category.key);
}

let uid = 1;
const nextId = () => uid++;

function makeDraft() {
  const raw = JSON.parse(JSON.stringify(source.value));
  const d = {};
  for (const key of OPTION_KEYS) d[key] = raw[key];
  d.categories = raw.engineCategories.map(([name, key, enabled]) => ({
    _id: nextId(),
    name,
    key,
    enabled: Boolean(enabled),
    engines: (raw.engineList[key] || []).map((engine) => ({
      ...engine,
      _id: nextId(),
    })),
  }));
  return d;
}

const draft = reactive(makeDraft());
const layerEl = ref(null);
const maskEl = ref(null);
const maskVisible = ref(false);
const layerStyle = ref({});
const categoryDialog = ref(null);
const engineDialog = ref(null);
const engineSaving = ref(false);
const loadingIcons = ref(false);
const configOpen = ref(false);
// 从文件导入时缓存解析结果，等用户在配置编辑器中决定覆盖或合并
const pendingImport = ref(null);
const configFileInput = ref(null);

const UNDO_DURATION = 5000;
const undoStack = [];

const configText = computed(() => configToText(source.value));

// 恢复默认时填入文本框的初始配置
const defaultConfigText = computed(() => configToText(settings.scriptSettingData));

function buildResult(categories = draft.categories) {
  return serializeConfig({
    options: draft,
    categories,
    version: source.value.version,
  });
}

function remoteFaviconEngines() {
  const list = [];
  for (const category of draft.categories) {
    for (const engine of category.engines) {
      if (!engine.faviconData && /^https?:\/\//i.test(engine.favicon || '')) {
        list.push(engine);
      }
    }
  }
  return list;
}

async function embedRemoteFavicons() {
  const pending = remoteFaviconEngines();
  let converted = 0;
  let failed = 0;
  const worker = async () => {
    while (pending.length) {
      const engine = pending.shift();
      const original = engine.favicon;
      const dataUrl = await embedFavicon(original);
      if (dataUrl !== original) {
        engine.faviconData = dataUrl;
        converted++;
      } else {
        failed++;
      }
    }
  };
  const workers = Array.from({ length: Math.min(6, pending.length) }, () => worker());
  await Promise.all(workers);
  return { converted, failed };
}

const {
  saving,
  saveFlash,
  cancelAutoSave,
  scheduleAutoSave,
  flushPending,
  saveNow,
  pulseSaveFeedback,
  markSettingsChanged,
  takeSettingsChanged,
  dispose: disposeAutoSave,
} = useAutoSave({
  buildResult,
  getCurrent: () => source.value,
  settings,
});

// 底部开关、下拉框等离散修改也自动保存；文本输入仍只在提交时写入
watch(
  () => OPTION_KEYS.map((key) => draft[key]),
  () => scheduleAutoSave(),
);

// 语言切换立即生效（仍需自动保存后才持久化）
watch(
  () => draft.language,
  (value) => setLanguagePreference(value),
);

function refreshDraft() {
  const next = makeDraft();
  for (const key of OPTION_KEYS) draft[key] = next[key];
  draft.categories.splice(0, draft.categories.length, ...next.categories);
}

// 其他页面保存后尝试同步：无本地修改时直接刷新，有冲突时提供手动同步
function trySyncFromRemote() {
  if (saving.value) return;
  const hasLocalChanges = !isSameValue(buildResult(), source.value);
  if (engineDialog.value || categoryDialog.value || configOpen.value || hasLocalChanges) {
    showToast(t('toast.remoteConflict'), 6000, {
      label: t('toast.syncAction'),
      onClick: forceSyncFromRemote,
    });
    return;
  }
  if (!settings.reload()) return;
  refreshDraft();
  remoteSynced = true;
  showToast(t('toast.synced'), 3000);
}

// 放弃面板内未提交的修改，直接采用存储中的最新设置
function forceSyncFromRemote() {
  engineDialog.value = null;
  categoryDialog.value = null;
  configOpen.value = false;
  cancelAutoSave();
  settings.reload();
  refreshDraft();
  remoteSynced = true;
  showToast(t('toast.synced'), 3000);
}

watch(() => ui.settingsRevision, trySyncFromRemote);

function save() {
  if (saveNow()) close();
}

// 打开设置时静默触发一次：把远程图标内嵌为 data 链接并自动保存
async function loadAllIcons() {
  if (loadingIcons.value || saving.value) return;
  const pending = remoteFaviconEngines().length;
  if (!pending) return;
  loadingIcons.value = true;
  try {
    const { converted, failed } = await embedRemoteFavicons();
    if (disposed || !converted) return;
    scheduleAutoSave();
    const parts = [t('toast.embeddedIcons', { count: converted })];
    if (failed) parts.push(t('toast.iconsFailed', { count: failed }));
    showToast(`${parts.join(t('toast.listSeparator'))}${t('toast.autoSavedSuffix')}`, 4000);
  } finally {
    loadingIcons.value = false;
  }
}

function applyConfig(text) {
  const parsed = parseConfigInput(text);
  if (!parsed) return;
  cancelAutoSave();
  remoteSynced = false;
  const backend = settings.applySettings(parsed);
  pendingImport.value = null;
  refreshDraft();
  if (backend === 'memory') {
    showToast(t('toast.saveFailed'), 5000);
  } else {
    markSettingsChanged();
    pulseSaveFeedback();
  }
  configOpen.value = false;
}

// 取消：丢弃窗口内的所有预览改动，不写入设置
function cancelConfig() {
  pendingImport.value = null;
  configOpen.value = false;
}

let closeTimer = null;
let closed = false;
// 面板关闭后不再回写自动内嵌图标的结果
let disposed = false;
// 面板内合并了其他页面写入的设置后，关闭面板时重建一次以刷新跳转条
let remoteSynced = false;

function finishClose() {
  if (closed) return;
  closed = true;
  clearTimeout(closeTimer);
  closeTimer = null;
  // 关闭前落盘尚未触发的自动保存
  flushPending();
  closeSettingPanel();
  if (remoteSynced || takeSettingsChanged()) {
    remoteSynced = false;
    setTimeout(requestRestart, 0);
  }
}

function onMaskTransitionEnd(e) {
  if (e.target !== maskEl.value || e.propertyName !== 'opacity') return;
  if (maskVisible.value) return;
  finishClose();
}

function close() {
  if (!maskVisible.value) return;
  maskVisible.value = false;
  closeTimer = setTimeout(finishClose, 400);
}

function toggleCategory(index) {
  const category = draft.categories[index];
  category.enabled = !category.enabled;
  scheduleAutoSave();
  showToast(category.enabled ? t('common.enabled') : t('common.hidden'));
}

function toggleEngine(ci, ei) {
  const engine = draft.categories[ci].engines[ei];
  engine.disable = !engine.disable;
  scheduleAutoSave();
  showToast(engine.disable ? t('common.hidden') : t('common.enabled'));
}

function pushUndo(entry) {
  undoStack.push(entry);
  if (undoStack.length > 20) undoStack.shift();
}

function undoDelete() {
  if (engineDialog.value || categoryDialog.value || configOpen.value) {
    showToast(t('toast.dialogOpen'));
    return;
  }
  const entry = undoStack.pop();
  if (!entry) return;

  if (entry.type === 'category') {
    const index = Math.min(entry.index, draft.categories.length);
    draft.categories.splice(index, 0, entry.item);
  } else {
    const category = draft.categories.find((item) => item.key === entry.categoryKey);
    if (!category) {
      undoStack.push(entry);
      showToast(t('toast.categoryMissing'));
      return;
    }
    const index = Math.min(entry.index, category.engines.length);
    category.engines.splice(index, 0, entry.item);
  }

  categoryDialog.value = null;
  scheduleAutoSave();
  showToast(t('toast.undoDelete', { label: entry.label }));
}

function notifyDeleted(entry, label) {
  pushUndo({ ...entry, label });
  showToast(t('toast.deleted', { label }), UNDO_DURATION, {
    label: t('common.undo'),
    onClick: undoDelete,
  });
}

function deleteCategory(index) {
  const category = draft.categories[index];
  if (!category) return;
  notifyDeleted(
    {
      type: 'category',
      index,
      item: JSON.parse(JSON.stringify(category)),
    },
    t('category.label', { name: displayCategoryName(category) }),
  );
  draft.categories.splice(index, 1);
  scheduleAutoSave();
}

function deleteEngine(ci, ei) {
  const category = draft.categories[ci];
  const engine = category?.engines?.[ei];
  if (!engine) return;
  notifyDeleted(
    {
      type: 'engine',
      categoryKey: category.key,
      index: ei,
      item: JSON.parse(JSON.stringify(engine)),
    },
    t('engine.label', { name: localizeEngineName(engine.name) }),
  );
  category.engines.splice(ei, 1);
  scheduleAutoSave();
}

function onKeydown(e) {
  if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
  if (e.key.toLowerCase() !== 'z') return;
  if (!undoStack.length) return;

  // 事件跨 Shadow DOM 重定向，composedPath 才能拿到真实目标
  const target = e.composedPath?.()[0] || e.target;
  if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
    return;
  }

  e.preventDefault();
  undoDelete();
}

function openCategoryDialog(index) {
  if (consumeClickSuppression()) return;
  categoryDialog.value = { index };
}

function submitCategory(name) {
  const ctx = categoryDialog.value;
  if (!ctx) return;
  const category = draft.categories[ctx.index];
  if (category) {
    const nextName = name || t('category.emptyName');
    if (category.name !== nextName) {
      category.name = nextName;
      scheduleAutoSave();
    }
  }
  categoryDialog.value = null;
}

function cancelCategoryDialog() {
  categoryDialog.value = null;
}

function deleteCategoryFromDialog() {
  const ctx = categoryDialog.value;
  if (!ctx) return;
  categoryDialog.value = null;
  deleteCategory(ctx.index);
}

const {
  dragCtx,
  copyTargetCi,
  onDragPointerDown,
  onWindowBlur,
  consumeClickSuppression,
  dispose: disposeDragSort,
} = useDragSort({ draft, layerEl, nextId, scheduleAutoSave });

function addEngine(ci) {
  engineDialog.value = { mode: 'add', ci, initial: {} };
}

function editEngine(ci, ei) {
  if (consumeClickSuppression()) return;
  engineDialog.value = {
    mode: 'edit',
    ci,
    ei,
    initial: { ...draft.categories[ci].engines[ei] },
  };
}

function cancelEngineDialog() {
  if (!engineSaving.value) engineDialog.value = null;
}

function deleteEngineFromDialog() {
  const ctx = engineDialog.value;
  if (!ctx || ctx.mode !== 'edit') return;
  engineDialog.value = null;
  deleteEngine(ctx.ci, ctx.ei);
}

async function submitEngine(engine) {
  const ctx = engineDialog.value;
  if (!ctx || engineSaving.value) return;
  if (!engine.name || !engine.url) {
    alert(t('engine.required'));
    return;
  }
  engineSaving.value = true;
  try {
    const list = draft.categories[ctx.ci].engines;
    const existing = ctx.mode === 'edit' ? list[ctx.ei] : null;
    const original = engine.favicon;
    const embedded = /^data:/i.test(engine.faviconData || '')
      ? engine.faviconData
      : existing?.faviconData && existing.favicon === original
        ? existing.faviconData
        : '';
    const next = ctx.mode === 'add' ? { ...engine, _id: nextId() } : { ...existing, ...engine };
    // 保留用户填写的原始链接，内嵌结果单独存放
    next.favicon = original;
    if (embedded && embedded !== original) {
      next.faviconData = embedded;
    } else {
      delete next.faviconData;
    }
    if (ctx.mode === 'add') {
      list.push(next);
    } else {
      list[ctx.ei] = next;
    }
    engineDialog.value = null;
    scheduleAutoSave();
    // 图标在后台获取，不阻塞保存；拿到后再更新并自动保存
    const token = bumpIconToken(next._id);
    if (!next.faviconData) loadFaviconInBackground(next._id, original, token);
  } finally {
    engineSaving.value = false;
  }
}

function findEngineById(id) {
  for (const category of draft.categories) {
    const engine = category.engines.find((item) => item._id === id);
    if (engine) return engine;
  }
  return null;
}

// 每个条目的图标加载版本号，用于丢弃过期的后台结果
const iconLoadTokens = new Map();

function bumpIconToken(id) {
  const token = (iconLoadTokens.get(id) || 0) + 1;
  iconLoadTokens.set(id, token);
  return token;
}

async function loadFaviconInBackground(id, url, token) {
  if (!/^https?:\/\//i.test(url)) return;
  const { data, reason } = await resolveFavicon(url);
  if (iconLoadTokens.get(id) !== token) return;
  const engine = findEngineById(id);
  // 图标在此期间被修改或该条目已删除时丢弃结果
  if (!engine || engine.favicon !== url) return;
  if (!data) {
    console.warn('[SEJ] 后台获取图标失败:', url, reason || t('favicon.backgroundFailed'));
    return;
  }
  engine.faviconData = data;
  scheduleAutoSave();
}

function createCategoryKey() {
  const base = 'user' + Date.now();
  let key = base;
  let index = 1;
  while (draft.categories.some((category) => category.key === key)) {
    key = `${base}-${index++}`;
  }
  return key;
}

async function addCategory() {
  draft.categories.push({
    _id: nextId(),
    name: t('category.newName'),
    key: createCategoryKey(),
    enabled: true,
    engines: [],
  });
  scheduleAutoSave();
  await nextTick();
  const body = layerEl.value?.querySelector('#sej-settings-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function getICON(olink) {
  const link = olink || '';
  let protocol;
  let host;
  if (link.indexOf('://') !== -1) {
    protocol = link.split('://')[0] || 'https';
    host = link.split('://')[1].split('/')[0];
  } else {
    protocol = 'https';
    host = link.split('/')[0];
  }
  const siteURL = protocol + '://' + host;
  const iconSetting = ui.iconSource;
  // 非数字时视为自定义地址模板，%s 会替换为站点地址；否则用站点自带的 /favicon.ico
  const template = isNaN(iconSetting) ? iconSetting : '';
  return (template || siteURL + '/favicon.ico').replace('%s', siteURL);
}

function openConfig() {
  pendingImport.value = null;
  configOpen.value = true;
}

function pickConfigFile() {
  configFileInput.value?.click();
}

async function importConfigFile(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  try {
    pendingImport.value = JSON.parse(await file.text());
    // 窗口先展示当前配置，等用户选择覆盖或合并后再切换内容
    configOpen.value = true;
  } catch (e) {
    alert(t('config.parseFailed'));
  }
}

function exportConfig() {
  const blob = new Blob([configText.value], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'SearchEngineJump.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(t('config.exported'));
}

function parseConfigInput(input) {
  if (typeof input !== 'string') return input;
  try {
    return JSON.parse(input);
  } catch (e) {
    alert(t('config.parseFailed'));
    return null;
  }
}

// 合并预览：在草稿的副本上合并，返回供文本框展示的配置，不写入设置
function mergePreview(input, silent = false) {
  const parsed = parseConfigInput(input);
  if (!parsed) return '';

  const categories = draft.categories.map((cat) => ({
    ...cat,
    engines: cat.engines.map((engine) => ({ ...engine })),
  }));
  const stats = mergeIntoCategories(categories, parsed, nextId);
  if (!stats) {
    if (!silent) alert(t('config.mergeUnrecognized'));
    return '';
  }

  if (!stats.engines) {
    // 没有新增条目时仍然返回完整配置，避免切换模式后只剩导入文件内容
    if (!silent) showToast(t('toast.mergeNothing'), 3000);
  } else {
    const parts = [t('toast.mergedEngines', { count: stats.engines })];
    if (stats.categories) {
      parts.push(t('toast.mergedCategories', { count: stats.categories }));
    }
    if (stats.skipped) {
      parts.push(t('toast.mergedSkipped', { count: stats.skipped }));
    }
    if (!silent) {
      showToast(
        t('toast.mergeImported', {
          summary: parts.join(t('toast.listSeparator')),
        }),
        4000,
      );
    }
  }
  return configToText(buildResult(categories));
}

const { startDrag, dispose: disposePanelDrag } = usePanelDrag({
  layerEl,
  maskEl,
  layerStyle,
});

onMounted(() => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeydown);
  window.addEventListener('blur', onWindowBlur);
  nextTick(() => {
    maskVisible.value = true;
    // 打开设置时静默内嵌一次远程图标，省去单独的操作按钮
    loadAllIcons();
  });
});

onBeforeUnmount(() => {
  disposed = true;
  // 关闭面板时立即落盘尚未触发的自动保存，避免刚完成的编辑丢失
  flushPending();
  disposeAutoSave();
  disposeDragSort();
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', onKeydown);
  window.removeEventListener('blur', onWindowBlur);
  clearTimeout(closeTimer);
  disposePanelDrag();
  // 未保存的语言选择不带到面板外
  setLanguagePreference(settings.settingData.language);
});
</script>

<template>
  <div
    id="settingLayerMask"
    ref="maskEl"
    :style="{ display: 'flex', opacity: maskVisible ? 1 : 0 }"
    @click.self="close"
    @transitionend="onMaskTransitionEnd"
  >
    <div id="settingLayer" ref="layerEl" :style="layerStyle" @click.stop>
      <div class="sej-panel-header" @pointerdown="startDrag" @contextmenu.prevent>
        <span class="sej-panel-title">{{ t('settings.title') }}</span>
        <button
          type="button"
          class="sej-panel-close"
          :title="t('settings.close')"
          :aria-label="t('settings.close')"
          @click.stop="close"
          @pointerdown.stop
        >
          ✕
        </button>
      </div>
      <!-- 引擎列表管理区域；长按条目在触屏上进入拖动，禁止原生长按菜单 -->
      <div id="sej-settings-body" @dragstart.prevent @contextmenu.prevent>
        <!-- 分类列表 -->
        <div
          v-for="(category, ci) in draft.categories"
          :id="category.key"
          :key="category._id"
          class="iqxin-items"
          :class="{
            'sej-category-hidden': !category.enabled,
            'sej-drag-placeholder': dragCtx?.type === 'category' && dragCtx.key === category.key,
          }"
          :data-sej-drag-el="'category-' + category._id"
        >
          <!-- 类别标题 -->
          <div
            class="sejtitle drag"
            :data-xin="category.enabled ? 1 : -1"
            :data-iqxintitle="category.key"
            :title="t('settings.editCategory', { name: displayCategoryName(category) })"
            @pointerdown="onDragPointerDown($event, 'category', ci)"
            @click.stop="openCategoryDialog(ci)"
          >
            <span class="iqxin-pointer-events">{{ displayCategoryName(category) }}</span>
            <span class="sej-hover-edit" v-html="PENCIL"></span>
            <span
              class="iqxin-set-toggle"
              :class="{ 'iqxin-set-hidden': !category.enabled }"
              :title="category.enabled ? t('common.hide') : t('common.show')"
              @click.stop="toggleCategory(ci)"
              v-html="category.enabled ? EYE : EYE_OFF"
            ></span>
            <span
              class="sej-hover-delete"
              :title="t('settings.deleteCategory')"
              @pointerdown.stop
              @click.stop="deleteCategory(ci)"
              v-html="TRASH"
            ></span>
          </div>

          <!-- 具体条目 -->
          <div class="sejcon" :data-sej-drag-el="'list-' + category._id">
            <!-- 每个搜索引擎 -->
            <span
              v-for="(engine, ei) in category.engines"
              :key="engine._id"
              class="drag"
              :data-sej-drag-el="'engine-' + engine._id"
              :class="{
                'sej-drag-placeholder': dragCtx?.type === 'engine' && dragCtx.key === engine._id,
              }"
              :title="t('settings.editEngine', { name: localizeEngineName(engine.name) })"
              @pointerdown="onDragPointerDown($event, 'engine', ci, ei)"
              @click.stop="editEngine(ci, ei)"
            >
              <span
                class="sej-engine"
                :data-iqxintitle="engine.name"
                :data-iqxinimg="engine.favicon"
                :data-iqxinlink="engine.url"
                :data-iqxintarget="engine.target === '_self' ? '_self' : null"
                :data-iqxindisabled="engine.disable ? 'true' : null"
              >
                <img class="sej-engine-icon" :src="getFaviconSrc(engine)" alt="" />
                <span>{{ localizeEngineName(engine.name) }}</span>
              </span>
              <span class="sej-hover-edit" v-html="PENCIL"></span>
              <span
                class="iqxin-set-toggle"
                :class="{ 'iqxin-set-hidden': engine.disable }"
                :title="engine.disable ? t('common.show') : t('common.hide')"
                @click.stop="toggleEngine(ci, ei)"
                v-html="engine.disable ? EYE_OFF : EYE"
              ></span>
              <span
                class="sej-hover-delete"
                :title="t('settings.deleteEngine')"
                @pointerdown.stop
                @click.stop="deleteEngine(ci, ei)"
                v-html="TRASH"
              ></span>
            </span>
            <!-- 添加搜索引擎按钮；拖动已有引擎悬浮时变为复制入口 -->
            <span
              class="iqxin-additem"
              :class="{ 'sej-copy-target': copyTargetCi === ci }"
              @click.stop="addEngine(ci)"
            >
              <span v-if="copyTargetCi === ci" class="sej-copy-icon" v-html="COPY"></span>
              <template v-else>+</template>
              <span v-if="copyTargetCi === ci" class="sej-copy-hint">{{
                t('settings.copyHere')
              }}</span>
            </span>
          </div>
        </div>
        <!-- 新增分类占位卡片 -->
        <div
          class="iqxin-items sej-add-category-card"
          role="button"
          tabindex="0"
          :title="t('settings.addCategory')"
          :aria-label="t('settings.addCategory')"
          @click="addCategory"
          @keydown.enter="addCategory"
          @keydown.space.prevent="addCategory"
        >
          <span class="sej-add-category-plus">+</span>
        </div>
      </div>
      <!-- 底部设置按钮区域 -->
      <div id="btnEle">
        <div class="btnEleLayer">
          <div class="sej-footer-options">
            <span id="xin-HideTheSameLink" :title="t('settings.hideSameLinkTip')">
              <label
                >{{ t('settings.hideSameLink')
                }}<input type="checkbox" v-model="draft.HideTheSameLink"
              /></label>
            </span>
            <span id="xin-selectSearch">
              <label
                >{{ t('settings.selectSearch')
                }}<input type="checkbox" v-model="draft.selectSearch"
              /></label>
            </span>
            <span id="xin-centerDisplay" :title="t('settings.centerTip')">
              <label
                >{{ t('settings.center') }}<input type="checkbox" v-model="draft.center"
              /></label>
            </span>
            <span id="iqxin-fixedTopS" :title="t('settings.fixedTopTip')">
              <label
                >{{ t('settings.fixedTop') }}<input type="checkbox" v-model="draft.fixedTop"
              /></label>
            </span>
            <span
              v-show="draft.fixedTop"
              id="iqxin-fixedTopUpward"
              :title="t('settings.fixedTopUpwardTip')"
            >
              <label
                >{{ t('settings.fixedTopUpward')
                }}<input type="checkbox" v-model="draft.fixedTopUpward"
              /></label>
            </span>
            <span id="xin-language">
              <label
                >{{ t('settings.language') }}
                <select v-model="draft.language" class="sej-language-select">
                  <option value="auto">{{ t('settings.languageAuto') }}</option>
                  <option value="zh-CN">简体中文</option>
                  <option value="en">English</option>
                </select>
              </label>
            </span>
          </div>
          <div class="sej-footer-bar">
            <div class="sej-footer-selects">
              <div id="xin-modification" class="sej-config-box">
                <button
                  type="button"
                  class="sej-config-open"
                  :title="t('settings.editConfig')"
                  @click="openConfig"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                    />
                  </svg>
                  {{ t('settings.editConfig') }}
                </button>
                <span class="sej-config-sep" aria-hidden="true"></span>
                <button
                  type="button"
                  class="sej-config-action"
                  :title="t('config.import')"
                  @click="pickConfigFile"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21V9" />
                    <path d="m7 14 5-5 5 5" />
                    <path d="M5 3h14" />
                  </svg>
                  {{ t('config.import') }}
                </button>
                <span class="sej-config-sep" aria-hidden="true"></span>
                <button
                  type="button"
                  class="sej-config-action"
                  :title="t('config.export')"
                  @click="exportConfig"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  {{ t('config.export') }}
                </button>
              </div>
              <input
                ref="configFileInput"
                class="sej-file-input"
                type="file"
                accept="application/json,.json"
                @change="importConfigFile"
              />
            </div>
            <div class="sej-footer-links">
              <span class="feedback" :title="t('settings.feedbackGreasyFork')">
                <a target="_blank" href="https://greasyfork.org/zh-CN/users/1238054">Greasy Fork</a>
              </span>
              <span class="feedback" :title="t('settings.feedbackGitHub')">
                <a target="_blank" href="https://github.com/sherlocknieh/Monkey-Scripts">GitHub</a>
              </span>
            </div>
            <div class="sej-footer-actions">
              <span
                id="xin-save"
                :title="t('settings.close')"
                :class="{ 'sej-saving': saving, 'sej-save-flash': saveFlash }"
                @click="save"
              >
                <i class="sej-save-text" :class="{ 'sej-save-text-flash': saveFlash }">
                  {{
                    saving
                      ? t('settings.saving')
                      : saveFlash
                        ? t('settings.saved')
                        : t('settings.close')
                  }}
                </i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <EngineEditDialog
        v-if="engineDialog"
        :mode="engineDialog.mode"
        :initial="engineDialog.initial"
        :busy="engineSaving"
        :resolve-icon="getICON"
        @submit="submitEngine"
        @delete="deleteEngineFromDialog"
        @cancel="cancelEngineDialog"
      />

      <CategoryEditDialog
        v-if="categoryDialog"
        :name="displayCategoryName(draft.categories[categoryDialog.index]) || ''"
        @submit="submitCategory"
        @delete="deleteCategoryFromDialog"
        @cancel="cancelCategoryDialog"
      />

      <ConfigEditor
        v-if="configOpen"
        :initial-text="configText"
        :default-text="defaultConfigText"
        :imported="pendingImport"
        :merge-preview="mergePreview"
        @apply="applyConfig"
        @cancel="cancelConfig"
      />
    </div>
  </div>
</template>

<style>
#settingLayerMask {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: rgba(16, 18, 22, 0.42);
  backdrop-filter: blur(12px);
  z-index: 200000000;
  overflow: auto;
  font-family: var(--sej-font-family);
  min-height: 100%;
  font-size: 14px;
  transition: opacity 0.15s ease-out;
  opacity: 0;
  animation: sej-setting-mask-in 0.15s ease;
  user-select: none;
  -moz-user-select: none;
  touch-action: manipulation;
  padding: 20px;
  box-sizing: border-box;
  color: var(--font-color-qxin);
}

#settingLayer {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  --sej-panel-pad-x: 20px;
  --sej-panel-pad-top: 16px;
  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;
  background-color: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 16px;
  box-shadow: var(--sej-panel-shadow);
  position: absolute;
  width: auto;
  min-width: min(720px, calc(100vw - 32px));
  max-width: min(960px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  margin: 0;
  overflow: visible;
  animation: sej-panel-in 0.16s ease-out;
}

@keyframes sej-panel-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.99);
  }
}

.sej-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 0 0 auto;
  padding: 0 2px 12px;
  cursor: move;
  /* 触屏拖动标题栏时不要触发页面滚动/长按菜单 */
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.sej-panel-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.sej-panel-close {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--sej-surface-hover);
  color: transparent;
  font-size: 0;
  line-height: 0;
  cursor: pointer;
  opacity: 1;
  transition:
    background-color 0.12s ease-out,
    opacity 0.12s ease-out,
    transform 0.1s ease-out;
}

.sej-panel-close::before,
.sej-panel-close::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 1.5px;
  border-radius: 2px;
  background: var(--font-color-qxin);
  transform: translate(-50%, -50%) rotate(45deg);
}

.sej-panel-close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.sej-panel-close:hover {
  background: var(--sej-active-bg);
}

.sej-panel-close:active {
  transform: scale(0.92);
  opacity: 0.75;
}

.iqxin-items {
  display: flex;
  flex-direction: column;
  flex: 0 0 220px;
  width: 220px;
  min-width: 0;
  max-width: 220px;
  box-sizing: border-box;
  margin: 0;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--border-color-sej);
  background: var(--sej-surface-2);
}

.sej-add-category-card {
  align-items: center;
  justify-content: center;
  min-height: 140px;
  background: transparent;
  border: 1px dashed var(--sej-checkbox-border);
  color: var(--font-color-qxin);
  cursor: pointer;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-add-category-card:hover {
  background: var(--sej-surface-hover);
  border-color: var(--sej-accent);
  color: var(--sej-accent);
}

.sej-add-category-card:focus-visible {
  background: var(--sej-surface-hover);
  outline: 2px solid var(--sej-accent);
  outline-offset: 2px;
}

.sej-add-category-plus {
  font-size: 42px;
  font-weight: 300;
  line-height: 1;
  opacity: 0.45;
  transition: opacity 0.12s ease-out;
}

.sej-add-category-card:hover .sej-add-category-plus {
  opacity: 1;
}

.sejcon {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.sejcon > .drag {
  flex: 0 0 auto;
}

#settingLayer .drag {
  display: block;
  position: relative;
  /* 触屏：tap 立即响应；长按由脚本接管拖动，禁用原生长按菜单 */
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* 拖动排序：源元素隐藏但保留占位，目标位置只空出空白 */
#settingLayer .sej-drag-placeholder,
#settingLayer .sej-drag-placeholder * {
  visibility: hidden !important;
}

#settingLayer .sejtitle:active,
#settingLayer .sejcon > .drag:active {
  cursor: grabbing;
}

.sej-drag-ghost {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  margin: 0 !important;
  z-index: 200000200;
  opacity: 1 !important;
  pointer-events: none;
  box-sizing: border-box;
  overflow: hidden;
  will-change: transform;
}

.sej-drag-ghost * {
  pointer-events: none !important;
}

.sej-drag-ghost-engine {
  border-radius: 8px;
  background: var(--background-setting-qxin);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
}

.sej-drag-ghost-category {
  border: 1px solid var(--border-color-sej);
  border-radius: 12px;
  background: var(--background-setting-qxin);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

#settingLayer .sej-engine {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 82px 0 8px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: var(--sej-font-family);
  font-size: 13px;
  color: var(--font-color-qxin);
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 0.08s ease-out,
    opacity 0.08s ease-out;
  cursor: pointer;
}

#settingLayer .sej-engine > span {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sejtitle {
  text-align: left;
  /* 左侧与引擎条目对齐，右侧避开编辑/删除/显隐按钮 */
  padding: 5px 82px 5px 8px;
  margin-bottom: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 8px;
}

/* 标题下方的细分隔线，用于和引擎条目区分 */
.sejtitle::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 1px;
  background: var(--border-color-sej);
  pointer-events: none;
}

#settingLayerMask [data-xin] {
  margin: 1px 0;
  border-radius: 8px;
}

.sejcon [data-xin] {
  cursor: pointer;
}

/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */
#settingLayerMask [data-iqxindisabled='true'],
[data-xin^='-'] {
  background-color: transparent;
  color: var(--font-color-qxin);
  transition: background-color 0.12s ease-out;
}

#settingLayerMask [data-iqxindisabled='true'] > span,
#settingLayerMask [data-iqxindisabled='true'] .sej-engine-icon,
[data-xin^='-'] > .iqxin-pointer-events {
  opacity: 0.4;
  filter: grayscale(1);
}

/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */
.sej-category-hidden .sej-engine > span,
.sej-category-hidden .sej-engine .sej-engine-icon,
.sej-category-hidden .iqxin-additem {
  opacity: 0.4;
  filter: grayscale(1);
}

#settingLayerMask .sej-engine:hover {
  background-color: var(--sej-surface-hover);
}

#settingLayerMask [data-iqxindisabled='true']:hover,
[data-xin^='-']:hover {
  background-color: transparent;
}

.sej-category-hidden .sej-engine:hover {
  background-color: transparent;
}

#settingLayerMask label {
  cursor: pointer;
}

#settingLayerMask .sej-engine-icon {
  vertical-align: middle;
}

#btnEle {
  position: relative;
  width: 100%;
  margin-top: 10px;
  background: transparent;
  border-radius: 0;
  flex: 0 0 auto;
}

#btnEle span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  min-height: 30px;
  background: var(--sej-surface-2);
  border: 1px solid transparent;
  margin: 0;
  color: var(--font-color-qxin);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out,
    opacity 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
}

#btnEle .sej-language-select {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-color-sej);
  border-radius: 6px;
  background: var(--sej-input-bg);
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
  padding: 2px 4px;
  margin-left: 2px;
  cursor: pointer;
  outline: none;
}

#btnEle .sej-language-select:focus-visible {
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

#btnEle span:hover {
  background: var(--sej-surface-hover);
  color: var(--font-color-qxin);
}

#btnEle a {
  color: var(--font-color-qxin);
  opacity: 0.7;
  text-decoration: none;
  font-family: inherit;
  transition:
    opacity 0.12s ease-out,
    color 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle a:hover {
  opacity: 1;
  color: var(--sej-accent);
}

#btnEle span:active,
#btnEle a:active {
  transform: scale(0.96);
  opacity: 0.8;
}

#btnEle .feedback {
  background: transparent;
  border-color: transparent;
  padding: 4px 6px;
}

#btnEle .feedback:hover {
  background: transparent;
  border-color: transparent;
  color: var(--sej-accent);
}

#btnEle > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

#btnEle > div.btnEleLayer {
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  background: transparent;
  border-radius: 0;
  border-top: 1px solid var(--border-color-sej);
  padding-top: 12px;
  gap: 8px;
}

.sej-footer-options,
.sej-footer-bar,
.sej-footer-selects,
.sej-footer-links,
.sej-footer-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
}

.sej-footer-options {
  gap: 8px;
}

.sej-footer-bar {
  gap: 8px 12px;
}

.sej-footer-selects {
  gap: 8px;
}

/* 配置文件：齿轮入口与导入/导出合并为同一个容器 */
#btnEle .sej-config-box {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  background: var(--sej-surface-2);
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
}

#btnEle .sej-config-box button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  margin: 0;
  padding: 4px 9px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.12s ease-out,
    color 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle .sej-config-box .sej-config-open {
  padding-left: 10px;
}

#btnEle .sej-config-box button:hover {
  background: var(--sej-surface-hover);
  color: var(--font-color-qxin);
}

#btnEle .sej-config-box button:active {
  transform: scale(0.96);
}

#btnEle .sej-config-box button:focus-visible {
  outline: 2px solid var(--sej-accent);
  outline-offset: -2px;
}

#btnEle .sej-config-box svg {
  flex: 0 0 auto;
}

#btnEle span.sej-config-sep {
  flex: 0 0 auto;
  width: 1px;
  height: 16px;
  min-height: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: var(--border-color-sej);
  pointer-events: none;
}

.sej-footer-links {
  gap: 0;
  margin-left: auto;
}

.sej-footer-actions {
  margin-left: 4px;
}

#btnEle #xin-save {
  position: relative;
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  font-weight: 600;
}

#btnEle #xin-save:hover {
  background: var(--sej-accent);
  color: var(--sej-accent-contrast);
  opacity: 0.85;
}

#btnEle #xin-save.sej-saving {
  cursor: progress;
  opacity: 0.6;
  pointer-events: none;
}

/* 自动保存成功反馈：关闭按钮外扩绿色波纹，「已保存」文字上滑淡入 */
#btnEle #xin-save.sej-save-flash {
  animation: sej-save-glow 0.9s ease-out;
}

#btnEle #xin-save.sej-save-flash::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 2px solid var(--sej-success, #188038);
  pointer-events: none;
  animation: sej-save-ripple 0.9s ease-out forwards;
}

.sej-save-text {
  font-style: normal;
}

.sej-save-text.sej-save-text-flash {
  animation: sej-save-text-in 0.9s ease-out;
}

@keyframes sej-save-glow {
  0%,
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
  35% {
    box-shadow: 0 0 0 4px var(--sej-success-weak, rgba(24, 128, 56, 0.14));
  }
  70% {
    box-shadow: 0 0 0 2px var(--sej-success-weak, rgba(24, 128, 56, 0.14));
  }
}

@keyframes sej-save-ripple {
  0% {
    opacity: 0.9;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.18, 1.5);
  }
}

@keyframes sej-save-text-in {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
}

#settingLayerMask input[type='checkbox'],
#settingLayerMask input[type='radio'] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: -3px;
  margin: 0 !important;
  padding: 0;
  position: relative;
  border: 1.5px solid var(--sej-checkbox-border);
  border-radius: 5px;
  background: var(--sej-input-bg);
  cursor: pointer;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out;
}

#settingLayerMask input[type='checkbox']:before,
#settingLayerMask input[type='radio']:before {
  content: none;
}

#settingLayerMask input[type='checkbox']:checked,
#settingLayerMask input[type='radio']:checked {
  background: var(--sej-accent);
  border-color: var(--sej-accent);
}

#settingLayerMask input[type='checkbox']:checked:after,
#settingLayerMask input[type='radio']:checked:after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid var(--sej-accent-contrast);
  border-width: 0 2px 2px 0;
  background: none;
  transform: rotate(45deg);
}

.iqxin-set-toggle {
  opacity: 0.6;
  position: absolute;
  background: transparent;
  /* 用上下外边距 auto 垂直居中，避免 transform 让按钮单独成为合成层 */
  top: 0;
  bottom: 0;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  padding: 3px;
  border-radius: 6px;
  cursor: pointer;
  transition:
    opacity 0.12s ease-out,
    background-color 0.12s ease-out,
    color 0.12s ease-out;
  right: 6px;
  display: inline-flex;
  align-items: center;
  color: var(--font-color-qxin);
}

.iqxin-set-toggle svg {
  display: block;
}

.iqxin-set-toggle.iqxin-set-hidden {
  opacity: 0.35;
}

.iqxin-set-toggle:hover {
  opacity: 1;
  background: var(--sej-surface-hover);
}

/* 悬浮操作：右侧依次为编辑、删除、显隐按钮 */
.sej-hover-edit,
.sej-hover-delete {
  position: absolute;
  display: inline-flex;
  align-items: center;
  color: var(--font-color-qxin);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.12s ease-out,
    background-color 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-hover-edit {
  top: 0;
  bottom: 0;
  right: 54px;
  height: fit-content;
  margin: auto 0;
  padding: 3px;
  border-radius: 6px;
}

.sej-hover-delete {
  top: 0;
  bottom: 0;
  right: 30px;
  height: fit-content;
  margin: auto 0;
  padding: 3px;
  border-radius: 6px;
  cursor: pointer;
}

.sej-hover-edit svg,
.sej-hover-delete svg {
  display: block;
}

.sejtitle:hover .sej-hover-edit,
#settingLayer .sejcon > .drag:hover > .sej-hover-edit {
  opacity: 0.6;
}

.sejtitle:hover .sej-hover-delete,
#settingLayer .sejcon > .drag:hover > .sej-hover-delete {
  opacity: 0.6;
  pointer-events: auto;
}

.sejtitle:hover .sej-hover-edit:hover,
#settingLayer .sejcon > .drag:hover > .sej-hover-edit:hover {
  opacity: 1;
  background: var(--sej-surface-hover);
}

.sej-hover-delete:hover {
  opacity: 1;
  background: var(--sej-danger-weak, rgba(220, 53, 69, 0.12));
  color: var(--sej-danger, #dc3545);
}

span.iqxin-additem {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  margin: auto 0 2px;
  padding: 5px 0;
  border: 1px dashed currentColor;
  border-radius: 8px;
  color: var(--font-color-qxin);
  opacity: 0.55;
  cursor: pointer;
  visibility: visible;
  transition:
    opacity 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

span.iqxin-additem:hover {
  opacity: 1;
  border-color: var(--sej-accent);
  color: var(--sej-accent);
}

span.iqxin-additem.sej-copy-target {
  opacity: 1;
  border-style: solid;
  border-color: var(--sej-accent);
  background: var(--sej-accent-weak);
  color: var(--sej-accent);
}

.sej-copy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.sej-copy-icon svg {
  display: block;
  width: 14px;
  height: 14px;
}

.sej-copy-hint {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  z-index: 5;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(20, 22, 26, 0.82);
  color: #fff;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
}

@keyframes sej-setting-mask-in {
  from {
    opacity: 0;
  }
}

/* ---------- Vue 重构版设置面板布局优化 ---------- */
#sej-settings-body {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */
  margin-top: 0;
  margin-right: calc(var(--sej-panel-pad-x) * -1);
  padding-top: 2px;
  padding-right: var(--sej-panel-pad-x);
  padding-bottom: 4px;
}

#sej-settings-body::-webkit-scrollbar {
  width: 8px;
}

#sej-settings-body::-webkit-scrollbar-thumb {
  background: var(--sej-surface-hover);
  border-radius: 4px;
}

#settingLayer #btnEle {
  flex: 0 0 auto;
}

@media (max-width: 780px) {
  #btnEle span {
    font-size: 12px;
    padding: 5px 8px;
  }
  #btnEle .sej-config-box button {
    font-size: 12px;
    padding: 5px 7px;
  }
  #btnEle .sej-config-box .sej-config-open {
    padding-left: 8px;
  }
  #settingLayer {
    --sej-panel-pad-x: 12px;
    min-width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    max-height: calc(100vh - 16px);
  }
}

@media (max-width: 560px) {
  .iqxin-items {
    flex: 1 1 160px;
    width: auto;
    max-width: none;
  }
}

.iqxin-pointer-events,
#settingLayer .sej-engine * {
  pointer-events: none;
}

#newSearchBox,
.sej-dialog-box {
  position: fixed;
  z-index: 200000100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 20px;
  background: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 14px;
  box-shadow: var(--sej-shadow-menu);
  color: var(--font-color-qxin);
  margin: 0;
  transition:
    opacity 0.14s ease-out,
    transform 0.14s ease-out;
}

.sej-dialog-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

.sej-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12px;
}

.sej-field > span {
  opacity: 0.65;
}

.sej-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sej-field-row input {
  flex: 1 1 0;
  width: auto;
  min-width: 0;
}

.sej-file-input {
  display: none;
}

.sej-dialog-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

#newSearchBox input,
.sej-dialog-box input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color-sej);
  padding: 7px 9px;
  border-radius: 8px;
  outline: none;
  color: var(--font-color-qxin);
  background: var(--sej-input-bg);
  font-family: inherit;
  font-size: 13px;
  transition:
    border-color 0.12s ease-out,
    box-shadow 0.12s ease-out;
}

#newSearchBox input:focus,
.sej-dialog-box input:focus {
  background: var(--sej-input-bg);
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

.addItemBoxBtn {
  cursor: pointer;
  background: var(--sej-btn-bg);
  border: 1px solid var(--border-color-sej);
  border-radius: 8px;
  padding: 6px 14px;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

.addItemBoxBtn:hover {
  background: var(--sej-surface-hover);
}

.sej-dialog-danger {
  margin-right: auto;
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

/* 单独占据操作栏左侧，其余按钮保持右对齐 */
.sej-dialog-left {
  margin-right: auto;
}

.sej-dialog-danger:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

.iqxin-closeBtn,
.iqxin-enterBtn {
  box-sizing: border-box;
}

.iqxin-enterBtn {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  font-weight: 600;
}

.iqxin-enterBtn:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.85;
}

.iqxin-closeBtn:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}
</style>

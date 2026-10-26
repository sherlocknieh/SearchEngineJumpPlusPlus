<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { isSameValue } from '../core/storage.js';
import { OPTION_KEYS, serializeConfig } from '../core/configSchema.js';
import { useSettings } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { getFaviconSrc } from '../core/favicon.js';
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
import { useModalA11y } from '../composables/useModalA11y.js';
import { useConfigIO } from '../composables/useConfigIO.js';
import { useEngineIcons } from '../composables/useEngineIcons.js';
import { useUndoDelete } from '../composables/useUndoDelete.js';
import { addStyle } from '../core/shadowDom.js';
import settingPanelStyles from './SettingPanel.css?raw';
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

addStyle(settingPanelStyles);

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

function buildResult(categories = draft.categories) {
  return serializeConfig({
    options: draft,
    categories,
    version: source.value.version,
  });
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

const {
  configOpen,
  pendingImport,
  configFileInput,
  configText,
  defaultConfigText,
  openConfig,
  pickConfigFile,
  importConfigFile,
  exportConfig,
  mergePreview,
  applyConfig,
  cancelConfig,
} = useConfigIO({
  draft,
  nextId,
  buildResult,
  getCurrent: () => source.value,
  getSettings: () => settings,
  refreshDraft,
  cancelAutoSave,
  markSettingsChanged,
  pulseSaveFeedback,
  resetRemoteSynced: () => {
    remoteSynced = false;
  },
});

const { deleteCategory, deleteEngine, undoDelete, canUndo } = useUndoDelete({
  draft,
  scheduleAutoSave,
  isDialogOpen: () => Boolean(engineDialog.value || categoryDialog.value || configOpen.value),
  closeCategoryDialog: () => {
    categoryDialog.value = null;
  },
});

const { getICON, refreshIconInBackground, loadAllIcons } = useEngineIcons({
  draft,
  scheduleAutoSave,
  isDisposed: () => disposed,
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

function onKeydown(e) {
  if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
  if (e.key.toLowerCase() !== 'z') return;
  if (!canUndo()) return;

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
    refreshIconInBackground(next, original);
  } finally {
    engineSaving.value = false;
  }
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

useModalA11y({ containerEl: layerEl, onClose: close });

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
    <div
      id="settingLayer"
      ref="layerEl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sej-settings-title"
      :style="layerStyle"
      @click.stop
    >
      <div class="sej-panel-header" @pointerdown="startDrag" @contextmenu.prevent>
        <span id="sej-settings-title" class="sej-panel-title">{{ t('settings.title') }}</span>
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

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { OPTION_KEYS } from '../core/configSchema.js';
import { useSettings } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { closeSettingPanel, showToast } from '../stores/ui.js';
import { setLanguagePreference, t } from '../assets/i18n.js';
import { addStyle } from '../core/shadowDom.js';
import { useAutoSave } from '../composables/useAutoSave.js';
import { usePanelDrag } from '../composables/usePanelDrag.js';
import { useDragSort } from '../composables/useDragSort.js';
import { useModalA11y } from '../composables/useModalA11y.js';
import { useConfigIO } from '../composables/useConfigIO.js';
import { useEngineIcons } from '../composables/useEngineIcons.js';
import { useUndoDelete } from '../composables/useUndoDelete.js';
import { useSettingsDialogs } from '../composables/useSettingsDialogs.js';
import { useSettingsDraft } from '../composables/useSettingsDraft.js';
import { useRemoteSettingsSync } from '../composables/useRemoteSettingsSync.js';
import settingPanelStyles from './settingPanelStyles.js';
import EngineEditDialog from './EngineEditDialog.vue';
import CategoryEditDialog from './CategoryEditDialog.vue';
import ConfigEditor from './ConfigEditor.vue';
import SettingsCategoryCard from './SettingsCategoryCard.vue';
import SettingsFooter from './SettingsFooter.vue';
import SettingsOptions from './SettingsOptions.vue';

addStyle(settingPanelStyles);

const settings = useSettings();
const {
  source,
  draft,
  nextId,
  buildResult,
  refreshDraft,
  displayCategoryName,
  toggleCategory,
  toggleEngine,
  appendCategory,
} = useSettingsDraft({ settings });

const layerEl = ref(null);
const maskEl = ref(null);
const maskVisible = ref(false);
const layerStyle = ref({});
const categoryDialog = ref(null);
const engineDialog = ref(null);
const engineSaving = ref(false);
// 面板内合并了其他页面写入的设置后，关闭面板时重建一次以刷新跳转条
const remoteSynced = ref(false);

let closeTimer = null;
let closed = false;
// 面板关闭后不再回写自动内嵌图标的结果
let disposed = false;

const {
  saving,
  cancelAutoSave,
  scheduleAutoSave,
  flushPending,
  saveNow,
  notifySaved,
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
  notifySaved,
  resetRemoteSynced: () => {
    remoteSynced.value = false;
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

useRemoteSettingsSync({
  settings,
  source,
  buildResult,
  refreshDraft,
  saving,
  remoteSynced,
  isOverlayOpen: () => Boolean(engineDialog.value || categoryDialog.value || configOpen.value),
  cancelAutoSave,
  closeOverlays: () => {
    engineDialog.value = null;
    categoryDialog.value = null;
    configOpen.value = false;
  },
});

const {
  dragCtx,
  copyTargetCi,
  onDragPointerDown,
  onWindowBlur,
  consumeClickSuppression,
  dispose: disposeDragSort,
} = useDragSort({ draft, layerEl, nextId, scheduleAutoSave });

const {
  openCategoryDialog,
  submitCategory,
  cancelCategoryDialog,
  deleteCategoryFromDialog,
  addEngine,
  editEngine,
  cancelEngineDialog,
  deleteEngineFromDialog,
  submitEngine,
} = useSettingsDialogs({
  draft,
  nextId,
  categoryDialog,
  engineDialog,
  engineSaving,
  scheduleAutoSave,
  deleteCategory,
  deleteEngine,
  refreshIconInBackground,
  consumeClickSuppression,
});

function onToggleCategory(ci) {
  const enabled = toggleCategory(ci);
  scheduleAutoSave();
  showToast(enabled ? t('common.enabled') : t('common.hidden'));
}

function onToggleEngine(ci, ei) {
  const enabled = toggleEngine(ci, ei);
  scheduleAutoSave();
  showToast(enabled ? t('common.enabled') : t('common.hidden'));
}

function updateOption(key, value) {
  draft[key] = value;
}

async function addCategory() {
  appendCategory(t('category.newName'));
  scheduleAutoSave();
  await nextTick();
  const body = layerEl.value?.querySelector('#sej-settings-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function save() {
  if (saveNow()) close();
}

function finishClose() {
  if (closed) return;
  closed = true;
  clearTimeout(closeTimer);
  closeTimer = null;
  // 关闭前落盘尚未触发的自动保存
  flushPending();
  closeSettingPanel();
  if (remoteSynced.value || takeSettingsChanged()) {
    remoteSynced.value = false;
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

useModalA11y({ containerEl: layerEl, onClose: close });

const { startDrag, dispose: disposePanelDrag } = usePanelDrag({
  layerEl,
  maskEl,
  layerStyle,
});

// 本组件以「挂载即打开」为契约：显示与否由 App.vue 的 v-if 控制。
// 挂载时开启这些全局副作用，卸载时（遮罩淡出后）还原；若改成常驻挂载，
// 页面加载时就会锁住 body 滚动并预载图标，因此不要在外层去掉 v-if。
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
        <SettingsCategoryCard
          v-for="(category, ci) in draft.categories"
          :key="category._id"
          :category="category"
          :ci="ci"
          :drag-ctx="dragCtx"
          :copy-target-ci="copyTargetCi"
          :display-name="displayCategoryName(category)"
          @toggle-category="onToggleCategory"
          @open-category="openCategoryDialog"
          @delete-category="deleteCategory"
          @add-engine="addEngine"
          @edit-engine="editEngine"
          @toggle-engine="onToggleEngine"
          @delete-engine="deleteEngine"
          @drag-start="onDragPointerDown"
        />
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
          <SettingsOptions :options="draft" @update-option="updateOption" />
          <SettingsFooter
            :saving="saving"
            @open-config="openConfig"
            @pick-config-file="pickConfigFile"
            @export-config="exportConfig"
            @save="save"
          />
        </div>
        <input
          ref="configFileInput"
          class="sej-file-input"
          type="file"
          accept="application/json,.json"
          @change="importConfigFile"
        />
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

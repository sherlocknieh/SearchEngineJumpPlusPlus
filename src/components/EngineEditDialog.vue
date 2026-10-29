<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { faviconFromUrl, hostFromUrl, titleFromUrl, withProtocol } from '../core/engineUrl.js';
import { t } from '../assets/i18n.js';
import { useModalA11y } from '../composables/useModalA11y.js';
import { useEngineIconPreview } from '../composables/useEngineIconPreview.js';
import { addStyle } from '../core/shadowDom.js';
import engineEditStyles from './EngineEditDialog.css?raw';

addStyle(engineEditStyles);

const props = defineProps({
  mode: { type: String, default: 'add' },
  initial: { type: Object, default: () => ({}) },
  resolveIcon: { type: Function, required: true },
  busy: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'cancel', 'delete']);

// 图标选择状态：未选用为绿色空心圆，已选用为绿底白勾
const ICON_SELECT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>';

// 快捷动作引擎没有链接与图标，编辑时只保留动作类型并允许改名称/打开方式
const initialAction =
  props.initial.action === 'copy' || props.initial.action === 'open' ? props.initial.action : '';

const form = reactive({
  name: props.initial.name || '',
  url: props.initial.url || '',
  favicon: props.initial.favicon || '',
  target: props.initial.target === '_self' ? '_self' : '_blank',
});

const urlInput = ref(null);
const rootEl = ref(null);

useModalA11y({
  containerEl: rootEl,
  initialFocus: urlInput,
  onClose: () => {
    if (!props.busy) emit('cancel');
  },
});

const initialFavicon = (props.initial.favicon || '').trim();
const siteHost = computed(() => hostFromUrl(form.url) || hostFromUrl(form.favicon));

const {
  faviconFileInput,
  previewData,
  pickedUrl,
  previewLoading,
  previewSteps,
  previewSize,
  dataIconLink,
  previewImage,
  canPreview,
  previewLabel,
  extractorUrl,
  STEP_STATUS_TEXT,
  clearSteps,
  markDataEdited,
  chooseStep,
  previewIcon,
  pickFaviconFile,
  uploadFavicon,
  resolveFaviconData,
} = useEngineIconPreview({
  form,
  siteHost,
  initialFavicon,
  initialFaviconData: props.initial.faviconData,
  isBusy: () => props.busy,
});

// 标题/图标为空（或未手动改过）时，随链接自动更新
const titleEdited = ref(Boolean((props.initial.name || '').trim()));
const faviconEdited = ref(Boolean((props.initial.favicon || '').trim()));

// 链接源文本可被光标选中：存在选区时不触发切换，避免拖选误切换图标
function chooseStepFromClick(step) {
  const selection = typeof window !== 'undefined' ? window.getSelection() : null;
  if (selection && !selection.isCollapsed && selection.toString().trim()) return;
  chooseStep(step);
}

function markTitleEdited() {
  titleEdited.value = true;
}

function markFaviconEdited() {
  faviconEdited.value = true;
  clearSteps();
}

watch(
  () => form.url,
  () => {
    if (!titleEdited.value || !form.name.trim()) {
      form.name = titleFromUrl(form.url);
    }
    if (!faviconEdited.value || !form.favicon.trim()) {
      form.favicon = faviconFromUrl(form.url);
    }
    clearSteps();
  },
);

onMounted(() => urlInput.value?.focus());

function submit() {
  if (props.busy) return;
  const action = initialAction;
  const url = action ? '' : withProtocol(form.url);
  const favicon = action ? '' : form.favicon.trim() || props.resolveIcon(form.url);
  emit('submit', {
    name: form.name,
    url,
    favicon,
    faviconData: action ? '' : resolveFaviconData(favicon),
    target: form.target,
    ...(action ? { action } : {}),
  });
}
</script>

<template>
  <!-- 引擎编辑弹窗 -->
  <div
    id="newSearchBox"
    ref="rootEl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="sej-engine-title"
  >
    <!-- 弹窗标题 -->
    <div id="sej-engine-title" class="sej-dialog-title">
      {{ mode === 'edit' ? t('engine.editTitle') : t('engine.addTitle') }}
    </div>
    <!-- 引擎链接 -->
    <label v-if="!initialAction" class="sej-field">
      <span>{{ t('engine.url') }}</span>
      <!-- 链接输入框：自动补全协议并联动标题/图标 -->
      <input
        ref="urlInput"
        v-model="form.url"
        :placeholder="t('common.required')"
        :disabled="busy"
      />
    </label>
    <!-- 引擎名称 -->
    <label class="sej-field">
      <span>{{ t('engine.name') }}</span>
      <!-- 名称输入框：手动修改后不再随链接自动填充 -->
      <input
        v-model="form.name"
        :placeholder="t('common.required')"
        :disabled="busy"
        @input="markTitleEdited"
      />
    </label>
    <!-- 图标地址 -->
    <div v-if="!initialAction" class="sej-field">
      <span>{{ t('engine.iconSrc') }}</span>
      <!-- 图标地址输入行：输入框 + 获取按钮 -->
      <div class="sej-field-row">
        <!-- 图标地址输入框：手动修改后不再随链接自动填充 -->
        <input
          v-model="form.favicon"
          :placeholder="t('common.optional')"
          :disabled="busy"
          @input="markFaviconEdited"
        />
        <!-- 获取图标按钮：并行试探各来源，等待中或无可试探来源时禁用 -->
        <button
          type="button"
          class="sej-icon-preview-btn"
          :disabled="busy || (!previewLoading && !canPreview)"
          @click="previewIcon"
        >
          {{ previewLabel }}
        </button>
      </div>
      <!-- 并行尝试的来源与结果；成功项可点选切换 -->
      <!-- 缩略图显示实际图标；未点选的提示“选择此图标”，已点选的显示“已选择” -->
      <!-- 图标来源列表容器：无试探结果时不渲染 -->
      <div v-if="previewSteps.length" class="sej-preview-steps">
        <!-- 单个来源项：可点击/回车选用成功项 -->
        <div
          v-for="step in previewSteps"
          :key="step.url"
          :title="step.url"
          class="sej-preview-step"
          :class="[
            'is-' + step.status,
            {
              'is-selectable': step.status === 'ok',
              'is-active': step.status === 'ok' && step.url === pickedUrl,
            },
          ]"
          :role="step.status === 'ok' ? 'button' : undefined"
          :tabindex="step.status === 'ok' ? 0 : undefined"
          @click="chooseStepFromClick(step)"
          @keydown.enter.prevent="chooseStep(step)"
          @keydown.space.prevent="chooseStep(step)"
        >
          <!-- 成功项缩略图 -->
          <img
            v-if="step.status === 'ok' && step.data"
            class="sej-preview-thumb"
            :src="step.data"
            alt=""
          />
          <!-- 非成功项占位圆点 -->
          <span v-else class="sej-preview-dot"></span>
          <!-- 来源地址文本 -->
          <span class="sej-preview-url">{{ step.url }}</span>
          <!-- 获取成功后的原始下载大小（未压缩） -->
          <span v-if="step.status === 'ok' && step.size" class="sej-preview-size">{{
            step.size
          }}</span>
          <!-- 失败原因 -->
          <span v-if="step.status === 'failed' && step.reason" class="sej-preview-state">{{
            step.reason
          }}</span>
          <!-- 成功项选中状态角标 -->
          <span
            v-else-if="step.status === 'ok'"
            class="sej-preview-state sej-preview-icon"
            :class="{ 'is-selected': step.url === pickedUrl }"
            :title="step.url !== pickedUrl ? t('engine.stepUse') : t('engine.stepOk')"
            v-html="ICON_SELECT"
          ></span>
          <!-- 进行中/待处理状态文本 -->
          <span v-else class="sej-preview-state">{{ t(STEP_STATUS_TEXT[step.status]) }}</span>
        </div>
        <!-- 外链：无结果时去图标提取工具手工取图 -->
        <a
          v-if="extractorUrl"
          class="sej-preview-extractor"
          :href="extractorUrl"
          target="_blank"
          rel="noopener"
        >
          {{ t('engine.tryExtractor') }}
        </a>
      </div>
    </div>
    <!-- 图标数据 -->
    <div v-if="!initialAction" class="sej-field">
      <!-- 字段名：附带压缩后的存储体积 -->
      <span>
        {{ t('engine.iconData') }}
        <em v-if="previewSize" class="sej-icon-size"
          >{{ previewSize }} {{ t('engine.iconDataCompressed') }}</em
        >
      </span>
      <!-- 图标数据输入行：输入框 + 上传按钮 -->
      <div class="sej-data-line">
        <!-- 图标数据输入框：支持直接粘贴 data URI -->
        <input
          v-model="previewData"
          class="sej-data-input"
          :placeholder="t('engine.iconDataPlaceholder')"
          :disabled="busy"
          @input="markDataEdited"
        />
        <!-- 上传按钮：已有图标时显示缩略图 -->
        <button
          type="button"
          class="sej-icon-preview-btn"
          :class="{ 'sej-has-icon': previewImage }"
          :disabled="busy"
          :title="previewImage ? t('engine.uploadReplace') : t('engine.upload')"
          @click="pickFaviconFile"
        >
          <!-- 当前图标缩略图 -->
          <img v-if="previewImage" class="sej-icon-preview" :src="dataIconLink" alt="" />
          <!-- 无图标时的按钮文字 -->
          <template v-else>{{ t('engine.upload') }}</template>
        </button>
      </div>
      <!-- 隐藏的文件选择框：由上传按钮触发 -->
      <input
        ref="faviconFileInput"
        class="sej-file-input"
        type="file"
        accept="image/*,.ico"
        @change="uploadFavicon"
      />
    </div>
    <!-- 打开方式 -->
    <label v-if="!initialAction || initialAction === 'open'" class="sej-field">
      <!-- 字段名 -->
      <span>{{ t('engine.target') }}</span>
      <!-- 打开方式下拉：新标签页 / 当前页 -->
      <select id="iqxin-newTarget" v-model="form.target" :disabled="busy">
        <option value="_blank">{{ t('engine.targetBlank') }}</option>
        <option value="_self">{{ t('engine.targetSelf') }}</option>
      </select>
    </label>
    <!-- 底部操作按钮 -->
    <div class="sej-dialog-actions">
      <!-- 删除按钮：仅编辑已有引擎时显示 -->
      <button
        v-if="mode === 'edit'"
        type="button"
        class="addItemBoxBtn sej-dialog-danger"
        :disabled="busy"
        @click="$emit('delete')"
      >
        {{ t('common.delete') }}
      </button>
      <!-- 取消按钮：放弃修改并关闭弹窗 -->
      <button class="addItemBoxBtn iqxin-closeBtn" :disabled="busy" @click="$emit('cancel')">
        {{ t('common.cancel') }}
      </button>
      <!-- 确认按钮：提交表单，忙碌时显示“获取中” -->
      <button class="addItemBoxBtn iqxin-enterBtn" :disabled="busy" @click="submit">
        {{ busy ? t('engine.fetching') : t('common.confirm') }}
      </button>
    </div>
  </div>
</template>

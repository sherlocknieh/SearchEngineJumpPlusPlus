<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { faviconFromUrl, hostFromUrl, titleFromUrl } from '../core/engineUrl.js';
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

// 图标选择状态：未选用为空心圆勾，已选用为实心圆勾
const ICON_SELECT =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>';

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
  previewUrl,
  previewLoading,
  previewSteps,
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
  const url = form.url.indexOf('://') === -1 ? 'https://' + form.url : form.url;
  const favicon = form.favicon.trim() || props.resolveIcon(form.url);
  emit('submit', {
    name: form.name,
    url,
    favicon,
    faviconData: resolveFaviconData(favicon),
    target: form.target,
  });
}
</script>

<template>
  <div
    id="newSearchBox"
    ref="rootEl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="sej-engine-title"
  >
    <div id="sej-engine-title" class="sej-dialog-title">
      {{ mode === 'edit' ? t('engine.editTitle') : t('engine.addTitle') }}
    </div>
    <label class="sej-field">
      <span>{{ t('engine.url') }}</span>
      <input
        ref="urlInput"
        v-model="form.url"
        :placeholder="t('common.required')"
        :disabled="busy"
      />
    </label>
    <label class="sej-field">
      <span>{{ t('engine.name') }}</span>
      <input
        v-model="form.name"
        :placeholder="t('common.required')"
        :disabled="busy"
        @input="markTitleEdited"
      />
    </label>
    <div class="sej-field">
      <span>{{ t('engine.iconSrc') }}</span>
      <div class="sej-field-row">
        <input
          v-model="form.favicon"
          :placeholder="t('common.optional')"
          :disabled="busy"
          @input="markFaviconEdited"
        />
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
      <!-- 缩略图显示实际图标；非当前项提示“点击选用”，当前项显示“已获取” -->
      <div v-if="previewSteps.length" class="sej-preview-steps">
        <div
          v-for="step in previewSteps"
          :key="step.url"
          :title="step.url"
          class="sej-preview-step"
          :class="[
            'is-' + step.status,
            {
              'is-selectable': step.status === 'ok',
              'is-active': step.status === 'ok' && step.url === previewUrl,
            },
          ]"
          :role="step.status === 'ok' ? 'button' : undefined"
          :tabindex="step.status === 'ok' ? 0 : undefined"
          @click="chooseStep(step)"
          @keydown.enter.prevent="chooseStep(step)"
          @keydown.space.prevent="chooseStep(step)"
        >
          <img
            v-if="step.status === 'ok' && step.data"
            class="sej-preview-thumb"
            :src="step.data"
            alt=""
          />
          <span v-else class="sej-preview-dot"></span>
          <span class="sej-preview-url">{{ step.url }}</span>
          <span v-if="step.status === 'failed' && step.reason" class="sej-preview-state">{{
            step.reason
          }}</span>
          <span
            v-else-if="step.status === 'ok'"
            class="sej-preview-state sej-preview-icon"
            :class="{ 'is-selected': step.url === previewUrl }"
            :title="step.url !== previewUrl ? t('engine.stepUse') : t('engine.stepOk')"
            v-html="ICON_SELECT"
          ></span>
          <span v-else class="sej-preview-state">{{ t(STEP_STATUS_TEXT[step.status]) }}</span>
        </div>
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
    <div class="sej-field">
      <span>{{ t('engine.iconData') }}</span>
      <div class="sej-data-line">
        <input
          v-model="previewData"
          class="sej-data-input"
          :placeholder="t('engine.iconDataPlaceholder')"
          :disabled="busy"
          @input="markDataEdited"
        />
        <button
          type="button"
          class="sej-icon-preview-btn"
          :class="{ 'sej-has-icon': previewImage }"
          :disabled="busy"
          :title="previewImage ? t('engine.uploadReplace') : t('engine.upload')"
          @click="pickFaviconFile"
        >
          <img v-if="previewImage" class="sej-icon-preview" :src="dataIconLink" alt="" />
          <template v-else>{{ t('engine.upload') }}</template>
        </button>
      </div>
      <input
        ref="faviconFileInput"
        class="sej-file-input"
        type="file"
        accept="image/*,.ico"
        @change="uploadFavicon"
      />
    </div>
    <label class="sej-field">
      <span>{{ t('engine.target') }}</span>
      <select id="iqxin-newTarget" v-model="form.target" :disabled="busy">
        <option value="_blank">{{ t('engine.targetBlank') }}</option>
        <option value="_self">{{ t('engine.targetSelf') }}</option>
      </select>
    </label>
    <div class="sej-dialog-actions">
      <button
        v-if="mode === 'edit'"
        type="button"
        class="addItemBoxBtn sej-dialog-danger"
        :disabled="busy"
        @click="$emit('delete')"
      >
        {{ t('common.delete') }}
      </button>
      <button class="addItemBoxBtn iqxin-closeBtn" :disabled="busy" @click="$emit('cancel')">
        {{ t('common.cancel') }}
      </button>
      <button class="addItemBoxBtn iqxin-enterBtn" :disabled="busy" @click="submit">
        {{ busy ? t('engine.fetching') : t('common.confirm') }}
      </button>
    </div>
  </div>
</template>

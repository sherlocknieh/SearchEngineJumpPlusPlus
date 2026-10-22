<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { embedFavicon } from '../core/favicon.js';

const props = defineProps({
  mode: { type: String, default: 'add' },
  initial: { type: Object, default: () => ({}) },
  resolveIcon: { type: Function, required: true },
  busy: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'cancel', 'delete']);

const form = reactive({
  name: props.initial.name || '',
  url: props.initial.url || '',
  favicon: props.initial.favicon || '',
  blank: Boolean(props.initial.blank),
  gbk: Boolean(props.initial.gbk),
});

const urlInput = ref(null);
const initialFavicon = (props.initial.favicon || '').trim();

// 常见二级后缀，如 example.com.cn 取 example
const secondLevelSuffixes = new Set([
  'com', 'net', 'org', 'gov', 'edu', 'co', 'ac', 'or', 'ne', 'go', 'adm',
]);

function titleFromUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  let host;
  try {
    host = new URL(value.includes('://') ? value : `https://${value}`).hostname;
  } catch {
    return '';
  }
  host = host.replace(/^www\./i, '');
  if (/^\d+(\.\d+){3}$/.test(host)) return host;
  if (!host || !host.includes('.')) return '';
  const parts = host.split('.').filter(Boolean);
  // 取可注册域名（跳过 zh./m./wap. 等子域），如 zh.wikipedia.org -> Wikipedia
  let suffixLength = 1;
  const last = parts[parts.length - 1] || '';
  const secondLast = (parts[parts.length - 2] || '').toLowerCase();
  if (last.length === 2 && secondLevelSuffixes.has(secondLast)) {
    suffixLength = 2;
  }
  const label = parts[parts.length - suffixLength - 1] || parts[0];
  return label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
}

function faviconFromUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    if (!url.hostname.includes('.')) return '';
    return `${url.origin}/favicon.ico`;
  } catch {
    return '';
  }
}

// 标题/图标为空（或未手动改过）时，随链接自动更新
const titleEdited = ref(Boolean((props.initial.name || '').trim()));
const faviconEdited = ref(Boolean((props.initial.favicon || '').trim()));

function markTitleEdited() {
  titleEdited.value = true;
}

function markFaviconEdited() {
  faviconEdited.value = true;
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
  },
);

const previewData = ref('');
const previewLoading = ref(false);
const previewFailed = ref(false);
const previewCache = new Map();
let previewToken = 0;

const dataIconLink = computed(() => previewData.value.trim());
const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
const canPreview = computed(() => /^(https?:\/\/|data:)/i.test(form.favicon.trim()));

// 用户手动填写 data 链接后，不再被图标转换结果覆盖
const dataEdited = ref(false);

function markDataEdited() {
  dataEdited.value = true;
}

function setPreviewData(value) {
  previewData.value = value;
  dataEdited.value = false;
}

// 输入变化时清空旧预览，避免 data 链接与当前地址不对应
watch(
  () => form.favicon,
  (value) => {
    previewToken++;
    const url = value.trim();
    previewLoading.value = false;
    previewFailed.value = false;
    if (dataEdited.value) return;
    if (/^data:/i.test(url)) {
      setPreviewData(url);
      return;
    }
    if (url === initialFavicon && props.initial.faviconData) {
      setPreviewData(props.initial.faviconData);
      return;
    }
    setPreviewData('');
  },
  { immediate: true },
);

async function previewIcon() {
  if (props.busy || previewLoading.value) return;
  const url = form.favicon.trim();
  if (/^data:/i.test(url)) {
    setPreviewData(url);
    previewFailed.value = false;
    return;
  }
  if (!/^https?:\/\//i.test(url)) return;
  if (url === initialFavicon && props.initial.faviconData) {
    setPreviewData(props.initial.faviconData);
    return;
  }
  if (previewCache.has(url)) {
    setPreviewData(previewCache.get(url));
    previewFailed.value = false;
    return;
  }

  const token = ++previewToken;
  const previous = previewData.value;
  previewData.value = '';
  previewFailed.value = false;
  previewLoading.value = true;
  const result = await embedFavicon(url);
  if (token !== previewToken) return;
  previewLoading.value = false;
  if (result !== url) {
    setPreviewData(result);
    previewCache.set(url, result);
  } else {
    previewData.value = previous;
    previewFailed.value = true;
  }
}

onMounted(() => urlInput.value?.focus());

onBeforeUnmount(() => {
  previewToken++;
});

function submit() {
  if (props.busy) return;
  emit('submit', {
    name: form.name,
    url: form.url.indexOf('://') === -1 ? 'https://' + form.url : form.url,
    favicon: form.favicon || props.resolveIcon(form.url),
    // 转换中的旧结果不能用于新链接，交给保存流程重新抓取
    faviconData: previewLoading.value ? '' : previewData.value.trim(),
    blank: form.blank,
    gbk: form.gbk,
  });
}
</script>

<template>
  <div id="newSearchBox">
    <div class="sej-dialog-title">
      {{ mode === 'edit' ? '编辑搜索引擎' : '添加搜索引擎' }}
    </div>
    <label class="sej-field">
      <span>链接</span>
      <input ref="urlInput" v-model="form.url" placeholder="必填" :disabled="busy" />
    </label>
    <label class="sej-field">
      <span>标题</span>
      <input v-model="form.name" placeholder="必填，留空自动取域名" :disabled="busy"
        @input="markTitleEdited" />
    </label>
    <div class="sej-field">
      <span>图标</span>
      <div class="sej-field-row">
        <input v-model="form.favicon" placeholder="选填，默认 域名/favicon.ico" :disabled="busy"
          @input="markFaviconEdited" />
        <button type="button" class="sej-icon-preview-btn"
          :disabled="busy || previewLoading || !canPreview" @click="previewIcon">
          {{ previewLoading ? '转换中…' : '预览' }}
        </button>
      </div>
    </div>
    <div class="sej-field">
      <span>图标缓存</span>
      <div class="sej-data-line">
        <input v-model="previewData" class="sej-data-input"
          placeholder="选填，可粘贴 data:image/... 链接" :disabled="busy"
          @input="markDataEdited" />
        <img v-if="previewImage" class="sej-icon-preview" :src="dataIconLink" alt="" />
      </div>
      <span v-if="previewLoading" class="sej-field-value">转换中…</span>
      <span v-else-if="previewFailed" class="sej-field-value">转换失败（保存时会重试）</span>
    </div>
    <label class="sej-field">
      <span>打开方式</span>
      <select id="iqxin-newTarget" v-model="form.blank" :disabled="busy">
        <option :value="true">新标签页打开</option>
        <option :value="false">当前页打开</option>
      </select>
    </label>
    <label v-if="mode === 'edit'" class="sej-field-inline">
      <input v-model="form.gbk" type="checkbox" :disabled="busy" />
      <span>GBK 编码</span>
    </label>
    <div class="sej-dialog-actions">
      <button v-if="mode === 'edit'" type="button"
        class="addItemBoxBtn sej-dialog-danger" :disabled="busy" @click="$emit('delete')">
        删除
      </button>
      <button class="addItemBoxBtn iqxin-closeBtn" :disabled="busy" @click="$emit('cancel')">
        取消
      </button>
      <button class="addItemBoxBtn iqxin-enterBtn" :disabled="busy" @click="submit">
        {{ busy ? '获取图标中…' : '确定' }}
      </button>
    </div>
  </div>
</template>

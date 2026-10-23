<script setup>
import {
  computed,
  nextTick,
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
  target: props.initial.target === '_self' ? '_self' : '_blank',
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

// 站点主机名（保留子域，去掉 www.）
function hostFromUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try {
    return new URL(value.includes('://') ? value : `https://${value}`)
      .hostname.toLowerCase()
      .replace(/\.$/, '')
      .replace(/^www\./, '');
  } catch {
    return '';
  }
}

const siteHost = computed(
  () => hostFromUrl(form.url) || hostFromUrl(form.favicon),
);

// 标题/图标为空（或未手动改过）时，随链接自动更新
const titleEdited = ref(Boolean((props.initial.name || '').trim()));
const faviconEdited = ref(Boolean((props.initial.favicon || '').trim()));

function markTitleEdited() {
  titleEdited.value = true;
}

function markFaviconEdited() {
  faviconEdited.value = true;
  previewSteps.value = [];
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
    previewSteps.value = [];
  },
);

const previewData = ref('');
const previewLoading = ref(false);
const previewFailed = ref(false);
// 本次获取依次尝试的来源及结果
const previewSteps = ref([]);
const previewCache = new Map();
let previewToken = 0;

const dataIconLink = computed(() => previewData.value.trim());
const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
const canPreview = computed(
  () =>
    Boolean(siteHost.value) ||
    /^(https?:\/\/|data:)/i.test(form.favicon.trim()),
);
const previewLabel = computed(() => {
  if (previewLoading.value) return '取消';
  if (previewFailed.value || previewImage.value) return '重新获取';
  return '获取图标';
});
const extractorUrl = computed(() => {
  const host = siteHost.value;
  if (!host) return '';
  return (
    'https://convertico.com/favicon-extractor/?url=' +
    encodeURIComponent(host)
  );
});
const STEP_STATUS_TEXT = {
  pending: '等待',
  loading: '获取中…',
  ok: '已获取',
  failed: '不可用',
  canceled: '已取消',
};

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

function cancelPreview() {
  previewToken++;
  previewLoading.value = false;
  previewFailed.value = true;
  const current = previewSteps.value.find((step) => step.status === 'loading');
  if (current) current.status = 'canceled';
}

// 命中可用结果：写回图标地址与缓存，并保留来源记录
async function applyPreview(step, data) {
  step.status = 'ok';
  previewLoading.value = false;
  previewFailed.value = false;
  previewCache.set(step.url, data);
  if (form.favicon.trim() !== step.url) {
    form.favicon = step.url;
    // 等 favicon 的 watch 清理旧预览后再写入转换结果
    await nextTick();
  }
  setPreviewData(data);
}

async function previewIcon() {
  if (props.busy) return;
  if (previewLoading.value) {
    cancelPreview();
    return;
  }

  const url = form.favicon.trim();
  if (/^data:/i.test(url)) {
    setPreviewData(url);
    previewFailed.value = false;
    previewSteps.value = [];
    return;
  }

  // 依次尝试：当前地址 → 公共图标服务
  const candidates = [];
  if (/^https?:\/\//i.test(url)) candidates.push({ url });
  const host = siteHost.value;
  if (host) {
    // 公共图标服务使用完整主机名，保留 chat. 这类子域
    const serviceUrl = `https://a.favicon.im/${host}`;
    if (!candidates.some((item) => item.url === serviceUrl)) {
      candidates.push({ url: serviceUrl });
    }
  }
  if (!candidates.length) return;

  const token = ++previewToken;
  previewFailed.value = false;
  previewLoading.value = true;
  previewSteps.value = candidates.map((item) => ({
    ...item,
    status: 'pending',
  }));

  for (const step of previewSteps.value) {
    if (previewCache.has(step.url)) {
      await applyPreview(step, previewCache.get(step.url));
      return;
    }
    step.status = 'loading';
    const result = await embedFavicon(step.url);
    if (token !== previewToken) return;
    if (result !== step.url) {
      await applyPreview(step, result);
      return;
    }
    step.status = 'failed';
  }

  previewLoading.value = false;
  previewFailed.value = true;
}

onMounted(() => urlInput.value?.focus());

const faviconFileInput = ref(null);

function pickFaviconFile() {
  faviconFileInput.value?.click();
}

function uploadFavicon(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  const isImage =
    file.type.startsWith('image/') ||
    /\.(ico|png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(file.name);
  if (!isImage) {
    alert('请选择图片文件');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    // 本地上传优先于进行中的远程获取
    previewToken++;
    previewLoading.value = false;
    previewFailed.value = false;
    previewSteps.value = [];
    previewData.value = String(reader.result || '');
    dataEdited.value = true;
  };
  reader.onerror = () => alert('读取图片失败');
  reader.readAsDataURL(file);
}

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
    target: form.target,
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
      <input v-model="form.name" placeholder="必填" :disabled="busy"
        @input="markTitleEdited" />
    </label>
    <div class="sej-field">
      <span>图标</span>
      <div class="sej-field-row">
        <input v-model="form.favicon" placeholder="选填" :disabled="busy"
          @input="markFaviconEdited" />
        <button type="button" class="sej-icon-preview-btn"
          :disabled="busy || (!previewLoading && !canPreview)" @click="previewIcon">
          {{ previewLabel }}
        </button>
      </div>
      <!-- 依次尝试的来源与结果 -->
      <div v-if="previewSteps.length" class="sej-preview-steps">
        <div v-for="step in previewSteps" :key="step.url" :title="step.url"
          class="sej-preview-step" :class="'is-' + step.status">
          <span class="sej-preview-dot"></span>
          <span class="sej-preview-url">{{ step.url }}</span>
          <span class="sej-preview-state">{{ STEP_STATUS_TEXT[step.status] }}</span>
        </div>
        <a v-if="extractorUrl" class="sej-preview-extractor"
          :href="extractorUrl" target="_blank" rel="noopener">
          ↗试试在线提取工具
        </a>
      </div>
    </div>
    <div class="sej-field">
      <span>图标数据</span>
      <div class="sej-data-line">
        <input v-model="previewData" class="sej-data-input"
          placeholder="选填，可粘贴 data:image/... 链接" :disabled="busy"
          @input="markDataEdited" />
        <button type="button" class="sej-icon-preview-btn"
          :class="{ 'sej-has-icon': previewImage }" :disabled="busy"
          :title="previewImage ? '本地上传（替换当前图标）' : '本地上传'"
          @click="pickFaviconFile">
          <img v-if="previewImage" class="sej-icon-preview" :src="dataIconLink" alt="" />
          <template v-else>本地上传</template>
        </button>
      </div>
      <input ref="faviconFileInput" class="sej-file-input" type="file"
        accept="image/*,.ico" @change="uploadFavicon" />
    </div>
    <label class="sej-field">
      <span>打开方式</span>
      <select id="iqxin-newTarget" v-model="form.target" :disabled="busy">
        <option value="_blank">新标签页打开</option>
        <option value="_self">当前页打开</option>
      </select>
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

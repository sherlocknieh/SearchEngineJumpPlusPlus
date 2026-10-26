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
import { resolveFavicon } from '../core/favicon.js';
import { t } from '../i18n/index.js';

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
// 从 URL 取图标地址（默认 /favicon.ico）
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

/**
 * 取可注册域名（站点主域名），用于补充图标候选。
 * 依据常见二级后缀表判断，例如：
 *   chat.deepseek.com  -> deepseek.com
 *   gemini.google.com   -> google.com
 *   www.example.com.cn -> example.com.cn
 *   en.wikipedia.org   -> wikipedia.org
 *   deepseek.com       -> deepseek.com（本身已是主域名）
 * IP 地址原样返回，避免把最后一段数字当成后缀。
 */
function registrableDomain(raw) {
  const host = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '');
  if (!host || !host.includes('.') || /^\d+(\.\d+){3}$/.test(host)) {
    return host;
  }
  const parts = host.split('.').filter(Boolean);
  if (parts.length <= 2) return parts.join('.');
  const last = parts[parts.length - 1] || '';
  const secondLast = (parts[parts.length - 2] || '').toLowerCase();
  const suffixLength =
    last.length === 2 && secondLevelSuffixes.has(secondLast) ? 2 : 1;
  return parts.slice(-(suffixLength + 1)).join('.');
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
// 预览数据对应的图标链接；manual 表示用户手填或本地上传
const previewUrl = ref('');
const previewLoading = ref(false);
const previewFailed = ref(false);
// 本轮并行尝试的来源及结果；status 为 pending/loading/ok/failed/canceled，
// data 为该来源获取到并压缩后的 data URL，用于缩略图与后续切换
const previewSteps = ref([]);
// 图标地址 → data URL 的缓存，避免重复请求，也用于点选来源时即时切换
const previewCache = new Map();
// 每轮获取、取消或用户改地址时递增；异步结果返回后据此判断是否已过期
let previewToken = 0;

const dataIconLink = computed(() => previewData.value.trim());
const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
const canPreview = computed(
  () =>
    Boolean(siteHost.value) ||
    /^(https?:\/\/|data:)/i.test(form.favicon.trim()),
);
const previewLabel = computed(() => {
  if (previewLoading.value) return t('engine.cancelFetch');
  if (previewFailed.value || previewImage.value) return t('engine.refetch');
  return t('engine.fetchIcon');
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
  pending: 'engine.stepPending',
  loading: 'engine.stepLoading',
  ok: 'engine.stepOk',
  failed: 'engine.stepFailed',
  canceled: 'engine.stepCanceled',
};

// 用户手动填写 data 链接后，不再被图标转换结果覆盖
const dataEdited = ref(false);

function markDataEdited() {
  dataEdited.value = true;
  previewUrl.value = previewData.value.trim() ? 'manual' : '';
}

function setPreviewData(value, sourceUrl) {
  previewData.value = value;
  previewUrl.value = value ? sourceUrl || '' : '';
  dataEdited.value = false;
}

function setManualPreviewData(value) {
  previewData.value = value;
  previewUrl.value = value ? 'manual' : '';
  dataEdited.value = Boolean(value);
}

/**
 * 预览流程自己回写 form.favicon 时计数 +1。
 * favicon 的 watch 看到计数大于 0 就跳过“地址变化即取消获取”的逻辑，
 * 否则自动填入第一个成功项会把仍在进行的其他来源请求全部作废，
 * 用户就无法在多条成功路径之间选择了。
 */
let internalUpdates = 0;

// 图标地址变化时保留已有图标继续显示，能对应上新地址才替换；
// 新地址的图标留到点击确定后在后台获取
watch(
  () => form.favicon,
  (value) => {
    // 预览流程自己写入的地址由 applyPreview 负责，不走这里的取消逻辑
    if (internalUpdates > 0) return;
    previewToken++;
    const url = value.trim();
    previewLoading.value = false;
    previewFailed.value = false;
    if (dataEdited.value) return;
    if (/^data:/i.test(url)) {
      setPreviewData(url, url);
      return;
    }
    // 之前获取过该地址时直接复用缓存，不再请求
    if (previewCache.has(url)) {
      setPreviewData(previewCache.get(url), url);
      return;
    }
    if (url === initialFavicon && props.initial.faviconData) {
      setPreviewData(props.initial.faviconData, url);
    }
  },
  { immediate: true },
);

/**
 * 取消本轮获取：递增 token 让未返回的请求结果失效，
 * 并把仍在等待/加载的来源标记为已取消；已成功的选项保留，仍可点选。
 */
function cancelPreview() {
  previewToken++;
  previewLoading.value = false;
  previewFailed.value = true;
  previewSteps.value.forEach((step) => {
    if (step.status === 'loading' || step.status === 'pending') {
      step.status = 'canceled';
    }
  });
}

/**
 * 采用某条来源的图标：把结果写入缓存，同步图标地址、图标数据和当前高亮项。
 * 不发起新请求；地址变化不会被当成用户改动，因此不会中断同批次其他请求。
 */
async function applyPreview(step, data) {
  step.status = 'ok';
  previewCache.set(step.url, data);
  if (form.favicon.trim() !== step.url) {
    internalUpdates++;
    form.favicon = step.url;
    // 等 favicon 的 watch 处理完（此处会被 internalUpdates 跳过）再写入数据
    await nextTick();
    internalUpdates--;
  }
  setPreviewData(data, step.url);
}

/**
 * 用户在多条成功来源中点选：切换图标地址、图标数据与当前高亮项。
 * 数据已在获取阶段写入 step.data / previewCache，这里不再请求网络。
 */
async function chooseStep(step) {
  if (props.busy || step.status !== 'ok' || !step.data) return;
  if (step.url === previewUrl.value) return;
  await applyPreview(step, step.data);
}

/**
 * 获取图标入口：
 * - 正在获取时再次点击视为取消；
 * - 构造候选（当前地址、可注册域名的 favicon.ico、完整主机名 / 可注册域名
 *   的公共图标服务）并去重；
 * - 所有候选并行请求，先返回的成功结果自动采用，其余成功项保留供点选；
 * - 全部结束后根据是否存在成功项更新失败状态。
 */
async function previewIcon() {
  if (props.busy) return;
  if (previewLoading.value) {
    cancelPreview();
    return;
  }

  const url = form.favicon.trim();
  if (/^data:/i.test(url)) {
    setPreviewData(url, url);
    previewFailed.value = false;
    previewSteps.value = [];
    return;
  }

  // 候选顺序：当前地址 → 主域名 favicon.ico → 完整主机名服务 → 主域名服务
  const candidates = [];
  // 过滤空值并去重，避免同一地址被请求两次（例如图标本身就填了服务地址）
  const addCandidate = (value) => {
    if (!value || candidates.some((item) => item.url === value)) return;
    candidates.push({ url: value });
  };
  // 当前地址是有效 URL 时，直接尝试
  if (/^https?:\/\//i.test(url)) addCandidate(url);
  const host = siteHost.value;
  if (host) {
    const domain = registrableDomain(host);
    if (domain !== host) {
      // 子域可能没有独立图标，优先尝试主域名自身的 favicon.ico
      // （如 deepseek.com/favicon.ico）
      addCandidate(faviconFromUrl(domain));
    }
    // 公共图标服务使用完整主机名，保留 chat. 这类子域
    addCandidate(`https://a.favicon.im/${host}`);
    if (domain !== host) {
      // 再尝试主域名的公共图标服务
      addCandidate(`https://a.favicon.im/${domain}`);
    }
  }
  if (!candidates.length) return;

  const token = ++previewToken;
  previewFailed.value = false;
  previewLoading.value = true;
  previewSteps.value = candidates.map((item) => ({
    ...item,
    status: 'pending',
    data: '',
  }));

  // 本批次是否已自动采用默认图标；其余成功项保留在列表中供用户点选
  let applied = false;
  /**
   * 处理单个候选：命中缓存直接复用，否则请求并解析图标。
   * token 变化说明本轮已取消或被新一轮取代，此时丢弃结果。
   * 成功结果写入缓存；本批次尚未采用任何图标时，把它作为默认图标。
   */
  const settle = async (step) => {
    if (previewCache.has(step.url)) {
      // 之前已成功获取过该地址，直接复用，不再产生网络请求
      step.data = previewCache.get(step.url);
      step.status = 'ok';
    } else {
      step.status = 'loading';
      const { data, reason } = await resolveFavicon(step.url);
      if (token !== previewToken) return;
      if (data) {
        step.data = data;
        step.status = 'ok';
        previewCache.set(step.url, data);
      } else {
        step.reason = reason;
        step.status = 'failed';
        return;
      }
    }
    // 谁先返回用谁作为默认图标，其余成功项留给用户选择
    if (!applied) {
      applied = true;
      await applyPreview(step, step.data);
    }
  };

  // 所有候选并行执行，整体耗时取决于最慢的一条（受请求超时限制）
  await Promise.all(previewSteps.value.map(settle));
  if (token !== previewToken) return;
  previewLoading.value = false;
  previewFailed.value = !previewSteps.value.some(
    (step) => step.status === 'ok',
  );
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
    alert(t('engine.selectImage'));
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    // 本地上传优先于进行中的远程获取
    previewToken++;
    previewLoading.value = false;
    previewFailed.value = false;
    previewSteps.value = [];
    setManualPreviewData(String(reader.result || ''));
  };
  reader.onerror = () => alert(t('engine.readImageFailed'));
  reader.readAsDataURL(file);
}

onBeforeUnmount(() => {
  previewToken++;
});

function submit() {
  if (props.busy) return;
  const url = form.url.indexOf('://') === -1 ? 'https://' + form.url : form.url;
  const favicon = form.favicon.trim() || props.resolveIcon(form.url);
  const data = previewData.value.trim();
  // 只回传与当前图标地址对应的数据，其余交给保存流程在后台获取
  const matched =
    Boolean(data) &&
    (dataEdited.value ||
      previewUrl.value === favicon ||
      /^data:/i.test(favicon));
  emit('submit', {
    name: form.name,
    url,
    favicon,
    faviconData: matched ? data : '',
    target: form.target,
  });
}
</script>

<template>
  <div id="newSearchBox">
    <div class="sej-dialog-title">
      {{ mode === 'edit' ? t('engine.editTitle') : t('engine.addTitle') }}
    </div>
    <label class="sej-field">
      <span>{{ t('engine.url') }}</span>
      <input ref="urlInput" v-model="form.url" :placeholder="t('common.required')" :disabled="busy" />
    </label>
    <label class="sej-field">
      <span>{{ t('engine.name') }}</span>
      <input v-model="form.name" :placeholder="t('common.required')" :disabled="busy"
        @input="markTitleEdited" />
    </label>
    <div class="sej-field">
      <span>{{ t('engine.iconSrc') }}</span>
      <div class="sej-field-row">
        <input v-model="form.favicon" :placeholder="t('common.optional')" :disabled="busy"
          @input="markFaviconEdited" />
        <button type="button" class="sej-icon-preview-btn"
          :disabled="busy || (!previewLoading && !canPreview)" @click="previewIcon">
          {{ previewLabel }}
        </button>
      </div>
      <!-- 并行尝试的来源与结果；成功项可点选切换 -->
      <!-- 缩略图显示实际图标；非当前项提示“点击选用”，当前项显示“已获取” -->
      <div v-if="previewSteps.length" class="sej-preview-steps">
        <div v-for="step in previewSteps" :key="step.url" :title="step.url"
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
          @keydown.space.prevent="chooseStep(step)">
          <img v-if="step.status === 'ok' && step.data" class="sej-preview-thumb"
            :src="step.data" alt="" />
          <span v-else class="sej-preview-dot"></span>
          <span class="sej-preview-url">{{ step.url }}</span>
          <span v-if="step.status === 'failed' && step.reason" class="sej-preview-state">{{
            step.reason
          }}</span>
          <span v-else-if="step.status === 'ok'" class="sej-preview-state sej-preview-icon"
            :class="{ 'is-selected': step.url === previewUrl }"
            :title="step.url !== previewUrl ? t('engine.stepUse') : t('engine.stepOk')"
            v-html="ICON_SELECT"></span>
          <span v-else class="sej-preview-state">{{ t(STEP_STATUS_TEXT[step.status]) }}</span>
        </div>
        <a v-if="extractorUrl" class="sej-preview-extractor"
          :href="extractorUrl" target="_blank" rel="noopener">
          {{ t('engine.tryExtractor') }}
        </a>
      </div>
    </div>
    <div class="sej-field">
      <span>{{ t('engine.iconData') }}</span>
      <div class="sej-data-line">
        <input v-model="previewData" class="sej-data-input"
          :placeholder="t('engine.iconDataPlaceholder')" :disabled="busy"
          @input="markDataEdited" />
        <button type="button" class="sej-icon-preview-btn"
          :class="{ 'sej-has-icon': previewImage }" :disabled="busy"
          :title="previewImage ? t('engine.uploadReplace') : t('engine.upload')"
          @click="pickFaviconFile">
          <img v-if="previewImage" class="sej-icon-preview" :src="dataIconLink" alt="" />
          <template v-else>{{ t('engine.upload') }}</template>
        </button>
      </div>
      <input ref="faviconFileInput" class="sej-file-input" type="file"
        accept="image/*,.ico" @change="uploadFavicon" />
    </div>
    <label class="sej-field">
      <span>{{ t('engine.target') }}</span>
      <select id="iqxin-newTarget" v-model="form.target" :disabled="busy">
        <option value="_blank">{{ t('engine.targetBlank') }}</option>
        <option value="_self">{{ t('engine.targetSelf') }}</option>
      </select>
    </label>
    <div class="sej-dialog-actions">
      <button v-if="mode === 'edit'" type="button"
        class="addItemBoxBtn sej-dialog-danger" :disabled="busy" @click="$emit('delete')">
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

/**
 * 引擎编辑弹窗的图标预览状态机。
 *
 * 负责多来源并行获取、取消、缓存与点选切换，以及本地图片上传。
 * 组件只保留表单字段与模板，避免把网络/异步状态混在表单逻辑里。
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { resolveFavicon } from '../core/favicon.js';
import { faviconFromUrl, registrableDomain } from '../core/engineUrl.js';
import { t } from '../assets/i18n.js';

const STEP_STATUS_TEXT = {
  pending: 'engine.stepPending',
  loading: 'engine.stepLoading',
  ok: 'engine.stepOk',
  failed: 'engine.stepFailed',
  canceled: 'engine.stepCanceled',
};

/**
 * @param {object} options
 * @param {object} options.form 表单（reactive，需含 favicon 字段）
 * @param {{ value: string }} options.siteHost 当前站点主机名
 * @param {string} options.initialFavicon 初始图标地址
 * @param {string} [options.initialFaviconData] 初始图标数据
 * @param {() => boolean} options.isBusy 是否处于保存中
 */
export function useEngineIconPreview({
  form,
  siteHost,
  initialFavicon,
  initialFaviconData,
  isBusy,
}) {
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
  // 用户手动填写 data 链接后，不再被图标转换结果覆盖
  const dataEdited = ref(false);
  /**
   * 预览流程自己回写 form.favicon 时计数 +1。
   * favicon 的 watch 看到计数大于 0 就跳过“地址变化即取消获取”的逻辑，
   * 否则自动填入第一个成功项会把仍在进行的其他来源请求全部作废。
   */
  let internalUpdates = 0;

  const faviconFileInput = ref(null);

  const dataIconLink = computed(() => previewData.value.trim());
  const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
  const canPreview = computed(
    () => Boolean(siteHost.value) || /^(https?:\/\/|data:)/i.test(form.favicon.trim()),
  );
  const previewLabel = computed(() => {
    if (previewLoading.value) return t('engine.cancelFetch');
    if (previewFailed.value || previewImage.value) return t('engine.refetch');
    return t('engine.fetchIcon');
  });
  const extractorUrl = computed(() => {
    const host = siteHost.value;
    if (!host) return '';
    return 'https://convertico.com/favicon-extractor/?url=' + encodeURIComponent(host);
  });

  function clearSteps() {
    previewSteps.value = [];
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

  function markDataEdited() {
    dataEdited.value = true;
    previewUrl.value = previewData.value.trim() ? 'manual' : '';
  }

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
      if (url === initialFavicon && initialFaviconData) {
        setPreviewData(initialFaviconData, url);
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
    if (isBusy() || step.status !== 'ok' || !step.data) return;
    if (step.url === previewUrl.value) return;
    await applyPreview(step, step.data);
  }

  /**
   * 获取图标入口：
   * - 正在获取时再次点击视为取消；
   * - 构造候选（当前地址、可注册域名的 favicon.ico、完整主机名 / 可注册域名
   *   的公共图标服务）并去重；
   * - 所有候选并行请求，先返回的成功结果自动采用，其余成功项保留供点选。
   */
  async function previewIcon() {
    if (isBusy()) return;
    if (previewLoading.value) {
      cancelPreview();
      return;
    }

    const url = form.favicon.trim();
    if (/^data:/i.test(url)) {
      setPreviewData(url, url);
      previewFailed.value = false;
      clearSteps();
      return;
    }

    // 候选顺序：当前地址 → 主域名 favicon.ico → 完整主机名服务 → 主域名服务
    const candidates = [];
    const addCandidate = (value) => {
      if (!value || candidates.some((item) => item.url === value)) return;
      candidates.push({ url: value });
    };
    if (/^https?:\/\//i.test(url)) addCandidate(url);
    const host = siteHost.value;
    if (host) {
      const domain = registrableDomain(host);
      if (domain !== host) {
        addCandidate(faviconFromUrl(domain));
      }
      // 公共图标服务使用完整主机名，保留 chat. 这类子域
      addCandidate(`https://a.favicon.im/${host}`);
      if (domain !== host) {
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

    await Promise.all(previewSteps.value.map(settle));
    if (token !== previewToken) return;
    previewLoading.value = false;
    previewFailed.value = !previewSteps.value.some((step) => step.status === 'ok');
  }

  function pickFaviconFile() {
    faviconFileInput.value?.click();
  }

  function uploadFavicon(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const isImage =
      file.type.startsWith('image/') || /\.(ico|png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(file.name);
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
      clearSteps();
      setManualPreviewData(String(reader.result || ''));
    };
    reader.onerror = () => alert(t('engine.readImageFailed'));
    reader.readAsDataURL(file);
  }

  /**
   * 提交时决定要保存的图标数据：只回传与当前图标地址对应的数据，
   * 其余交给保存流程在后台获取。
   */
  function resolveFaviconData(favicon) {
    const data = previewData.value.trim();
    const matched =
      Boolean(data) &&
      (dataEdited.value || previewUrl.value === favicon || /^data:/i.test(favicon));
    return matched ? data : '';
  }

  onBeforeUnmount(() => {
    previewToken++;
  });

  return {
    faviconFileInput,
    previewData,
    previewUrl,
    previewLoading,
    previewFailed,
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
  };
}

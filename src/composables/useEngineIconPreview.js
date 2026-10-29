/**
 * 引擎编辑弹窗的图标预览状态机。
 *
 * 负责多来源并行获取、取消、缓存与点选切换，以及本地图片上传。
 * 组件只保留表单字段与模板，避免把网络/异步状态混在表单逻辑里。
 */
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { dataUrlStorageBytes, formatIconSize, resolveFavicon } from '../core/favicon.js';
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
  // 用户本轮明确点选过的来源；仅用于列表打勾，初始化带出的图标不参与
  const pickedUrl = ref('');
  const previewLoading = ref(false);
  const previewFailed = ref(false);
  // 本轮并行尝试的来源及结果；status 为 pending/loading/ok/failed/canceled，
  // data 为该来源获取到并压缩后的 data URL，用于缩略图与后续切换
  const previewSteps = ref([]);
  // 图标地址 → { data, bytes } 的缓存，避免重复请求，也用于点选来源时即时切换
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
  // 当前图标数据写入存储后的体积文案；非 data URL（或手填的普通链接）留空
  const previewSize = computed(() => formatIconSize(dataUrlStorageBytes(dataIconLink.value)));
  const canPreview = computed(
    () => Boolean(siteHost.value) || /^(https?:\/\/|data:)/i.test(form.favicon.trim()),
  );
  // 已有成功来源（无论是否选用）后按钮改为“重新获取”，避免误以为没获取过
  const hasFetched = computed(() => previewSteps.value.some((step) => step.status === 'ok'));
  const previewLabel = computed(() => {
    if (previewLoading.value) return t('engine.cancelFetch');
    if (previewFailed.value || previewImage.value || hasFetched.value) return t('engine.refetch');
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
    pickedUrl.value = '';
    dataEdited.value = Boolean(value);
  }

  function markDataEdited() {
    dataEdited.value = true;
    pickedUrl.value = '';
    previewUrl.value = previewData.value.trim() ? 'manual' : '';
  }

  // 图标地址变化时保留已有图标继续显示，能对应上新地址才替换；
  // 新地址的图标留到点击确定后在后台获取
  watch(
    () => form.favicon,
    (value) => {
      // 预览流程自己写入的地址由 applyPreview 负责，不走这里的取消逻辑
      if (internalUpdates > 0) return;
      // 用户手动改地址后，之前点选的来源不再代表当前图标
      pickedUrl.value = '';
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
      const cached = previewCache.get(url);
      if (cached) {
        setPreviewData(cached.data, url);
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
   * 采用某条来源的图标：把结果写入缓存，同步图标地址、图标数据和当前打勾项。
   * 不发起新请求；地址变化不会被当成用户改动，因此不会中断同批次其他请求。
   */
  async function applyPreview(step, data) {
    step.status = 'ok';
    pickedUrl.value = step.url;
    previewCache.set(step.url, { data, bytes: step.rawSize });
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
   * 用户在多条成功来源中点选：切换图标地址、图标数据与当前打勾项。
   * 数据已在获取阶段写入 step.data / previewCache，这里不再请求网络。
   */
  async function chooseStep(step) {
    if (isBusy() || step.status !== 'ok' || !step.data) return;
    if (step.url === pickedUrl.value) return;
    await applyPreview(step, step.data);
  }

  /**
   * 获取图标入口：
   * - 正在获取时再次点击视为取消；
   * - 构造候选（当前地址、主机名与可注册域名的 favicon.ico、完整主机名 /
   *   可注册域名的公共图标服务）并去重；
   * - 所有候选并行请求，成功的来源全部保留供点选，不自动采用；
   * - 任一来源成功即上浮到成功组末尾，失败项沉底，无需等整批结束。
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

    // 候选顺序：当前地址 → 主机名 favicon.ico → 主域名 favicon.ico →
    // 完整主机名服务 → 主域名服务
    const candidates = [];
    const addCandidate = (value) => {
      if (!value || candidates.some((item) => item.url === value)) return;
      candidates.push({ url: value });
    };
    if (/^https?:\/\//i.test(url)) addCandidate(url);
    const host = siteHost.value;
    if (host) {
      const domain = registrableDomain(host);
      // 站点自身的 favicon.ico 始终参与试探：host 本身可能就是主域名，
      // 此时若只在 domain !== host 时添加，就只剩图标服务一个来源、没有兜底
      addCandidate(faviconFromUrl(host));
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
      // 下载到的原始字节数与对应文案，供来源行展示
      rawSize: 0,
      size: '',
    }));

    /** 把来源挪到指定位置；先摘除再插入，避免自身占位导致偏移 */
    const moveTo = (step, index) => {
      const list = previewSteps.value;
      const from = list.indexOf(step);
      if (from === -1) return;
      list.splice(from, 1);
      list.splice(Math.min(index, list.length), 0, step);
    };
    /** 成功组末尾的下标（不含自身），用于把刚成功的来源插到已成功项之后 */
    const okEnd = (step) =>
      previewSteps.value.filter((item) => item !== step && item.status === 'ok').length;

    const settle = async (step) => {
      const cached = previewCache.get(step.url);
      if (cached) {
        // 之前已成功获取过该地址，直接复用，不再产生网络请求
        step.data = cached.data;
        step.rawSize = cached.bytes;
        step.status = 'ok';
      } else {
        step.status = 'loading';
        const { data, reason, bytes } = await resolveFavicon(step.url);
        if (token !== previewToken) return;
        if (data) {
          step.data = data;
          step.rawSize = bytes || 0;
          step.status = 'ok';
          previewCache.set(step.url, { data, bytes: step.rawSize });
        } else {
          step.reason = reason;
          step.status = 'failed';
          // 失败项沉到末尾，按失败先后排列，不占用成功项的位置
          moveTo(step, previewSteps.value.length);
          return;
        }
      }
      // 来源行展示下载到的原始大小，压缩后的存储体积在“图标数据”栏展示
      step.size = formatIconSize(step.rawSize);
      // 一拿到结果就上浮：已成功项保持先后次序，未完成项依次后移
      moveTo(step, okEnd(step));
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
    pickedUrl,
    previewLoading,
    previewFailed,
    previewSteps,
    dataIconLink,
    previewImage,
    previewSize,
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

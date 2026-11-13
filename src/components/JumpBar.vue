<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { useSettings } from '../stores/settings.js';
import { ui } from '../stores/ui.js';
import { localizeCategoryName, t } from '../assets/i18n.js';
import { isInlineStyleBlocked } from '../core/csp.js';
import {
  getHost,
  insertHost,
  isEventInsideUi,
  HOST_ROLE_FLOAT,
  HOST_ROLE_KEY,
  HOST_ROLE_MAIN,
} from '../core/shadowDom.js';
import { placeAboveRect, placeInsideRect, placeNearRect } from '../core/floatPlacement.js';
import {
  getInputTarget,
  getInsertTarget,
  getInsertPositionLabel,
  resolveRuleStyle,
  applyStylish,
} from '../core/applyRule.js';
import {
  extractKeyword,
  performJump,
  openAllEngines,
  isActionEngine,
  performEngineAction,
} from '../core/jump.js';
import { getSelectedText } from '../core/selection.js';
import {
  currentGestureId,
  isPointerPressed,
  isSelectionDrag,
  trackSelectionPointer,
} from '../core/selectionGesture.js';
import { isBarCategoryVisible } from '../core/configData.js';
import { closeImageSearch, imageSearch } from '../stores/imageSearch.js';
import { showToast } from '../stores/ui.js';
import { useBarViewport } from '../composables/useBarViewport.js';
import { useScrollDrag } from '../composables/useScrollDrag.js';
import { useStackSync } from '../composables/useStackSync.js';
import { SEARCH } from '../assets/icons.js';
import EngineItem from './EngineItem.vue';
import EngineCategory from './EngineCategory.vue';
import SettingButton from './SettingButton.vue';

const props = defineProps({
  // float 角色只做划词条 / 图片条，main 角色负责站点内嵌的跳转条
  role: { type: String, default: HOST_ROLE_MAIN },
});

const isFloat = props.role === HOST_ROLE_FLOAT;
// 子组件（下拉面板等）据此在所属 Shadow Root 内取根节点
provide(HOST_ROLE_KEY, props.role);

const settings = useSettings();
const data = settings.settingData;
const matchedRule = isFloat ? null : settings.getMatchedRule();
// 记录本实例实际使用的规则，供 SPA 路由变化时判断能否复用
if (!isFloat) {
  settings.activeRule = matchedRule;
  settings.barMounted = false;
}
// 站点行为补丁由 siteStyles 模块提供
const sitePatches = matchedRule?.patches ?? {};
const inlineStyleBlocked = isInlineStyleBlocked();

const ready = ref(false);
// 浮层条（划词条 / 图片条）始终脱离文档流显示，内嵌条跟随站点布局；
// 这里只需一个固定值，供视图校正判断“是否浮层”
const isOverlayBar = { value: isFloat };
// 浮层条只在开启划词搜索时响应选区，图片模式与设置项无关
const selectSearchEnabled = Boolean(data.selectSearch);
const isSelectSearch = ref(isFloat && selectSearchEnabled);
// 长按图片时复用同一条划词条，只把关键词换成图片地址
const isImageSearch = ref(false);
// 精简模式是「跟随选区」的子选项：只有跟随选区的浮层条隐藏文字，只留图标
const compactBar = computed(
  () => isFloat && Boolean(data.selectionFollowPointer) && Boolean(data.selectionCompact),
);
// 图标模式：划词后只露出一个图标，指针停到图标上才展开整条搜索条；
// 搜图条需要显示图片缩略图与引擎，始终维持整条
const iconMode = computed(() => isFloat && !isImageSearch.value && Boolean(data.selectionIcon));
const iconExpanded = ref(false);
const selectionText = ref('');
const barVisible = ref(false);
const containerEl = ref(null);
const scrollEl = ref(null);
const containerClass = ref('rwl-exempt');
// 跟随选区/图片时记录锚点矩形，顶部居中模式保持 null
const anchorRect = ref(null);
const floatStyle = ref({});

const {
  updateScrollHints,
  onScrollPointerDown,
  onWindowPointerMove,
  endScrollDrag,
  onScrollClickCapture,
  onScrollWheel,
  dispose: disposeScrollDrag,
} = useScrollDrag({ scrollEl });

const { start: startStackSync, stop: stopStackSync } = useStackSync();

const {
  constrainBarToViewport,
  onViewportResize,
  scheduleConstrainCheck,
  dispose: disposeViewport,
} = useBarViewport({
  containerEl,
  // 浮层期间不做页面内的横向校正
  isSelectSearch: isOverlayBar,
  sitePatches,
  updateScrollHints,
  forceCenter: Boolean(data.center),
});

let inputTarget = null;
let insertTarget = null;
let insertPosition = 'beforeend';
let resolvedStyle = '';

// 浮层条的定位坐标与图片缩略图共用同一个 style 绑定
const barStyle = computed(() => {
  const style = { ...floatStyle.value };
  if (isImageSearch.value) style['--sej-image-thumb'] = `url(${imageSearch.imageUrl})`;
  return style;
});

const categories = computed(() =>
  data.engineCategories
    // 搜图分类只在图片模式下出现：图片地址搜网页没有意义，
    // 普通跳转条也从不展示它，与分类的显示开关无关
    .filter(([, key, enabled]) => isBarCategoryVisible(key, enabled, isImageSearch.value))
    .map(([name, key]) => ({
      name: localizeCategoryName(name, key),
      key,
      engines: (data.engineList[key] || []).filter((engine) => !engine.disable),
    }))
    .filter((category) => category.engines.length),
);

function getCurrentKeyword() {
  if (isImageSearch.value) return imageSearch.imageUrl;
  if (isSelectSearch.value) return selectionText.value;
  return extractKeyword(inputTarget);
}

async function onJump(engine) {
  const keyword = getCurrentKeyword();
  if (isActionEngine(engine)) {
    const ok = await performEngineAction(engine, keyword, data.defaultOpenTarget);
    if (ok) {
      showToast(t(engine.action === 'copy' ? 'action.copied' : 'action.opened'));
    } else {
      showToast(t(engine.action === 'copy' ? 'action.copyFailed' : 'action.openFailed'));
    }
    return;
  }
  performJump(engine, keyword, data);
  if (isImageSearch.value) closeImageMode();
}

function onJumpAll(engines) {
  openAllEngines(engines, getCurrentKeyword(), data);
  if (isImageSearch.value) closeImageMode();
}

/** 收起图片模式：清掉图片状态后由浮层条自行收起 */
function closeImageMode() {
  hideFloatBar();
  closeImageSearch();
}

// 长按可能发生在浮层条已挂载之后：图片模式与划词共用同一个浮层条，
// 切换模式只需刷新关键词与显隐，无需重建 Vue 应用
watch(
  () => imageSearch.active,
  (active) => {
    if (!isFloat || active === isImageSearch.value) return;
    isImageSearch.value = active;
    if (active) {
      selectionText.value = '';
      refreshAnchor(null);
      showFloatBar();
      return;
    }
    hideFloatBar();
  },
);

// 图片模式是临时浮层：点外部、按 Escape 或滚动页面时收起
function onImageModePointerDown(e) {
  // 划词模式不在这里收起：拖选时按下就藏、松手又显示会闪一下
  if (!isImageSearch.value) return;
  // 右键用于重新指定图片，交给 contextmenu 处理，避免先收起再重建
  if (e.button !== 0) return;
  if (!isInsideBar(e)) closeImageMode();
}

// Escape 统一收起浮层条：图片模式同时清掉图片状态
function onOverlayKeydown(e) {
  if (e.key !== 'Escape') return;
  if (isImageSearch.value) {
    closeImageMode();
    return;
  }
  hideFloatBar();
}

function onImageModeScroll() {
  if (isImageSearch.value) closeImageMode();
}

// 与浏览器 PageDown 一致：每次滚动 7/8 屏，保留少量上下文
const PAGE_STEP_RATIO = 0.875;
// 实测 Chrome 的 PageDown 动画约 150ms，而 behavior: 'smooth' 会按距离滚动约 600ms
const PAGE_SCROLL_DURATION = 150;
let scrollAnimRaf = 0;

// 缓入缓出，接近系统分页滚动的加减速
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function cancelScrollAnim() {
  if (!scrollAnimRaf) return;
  cancelAnimationFrame(scrollAnimRaf);
  scrollAnimRaf = 0;
}

function animateScrollTo(el, target) {
  cancelScrollAnim();
  const from = el.scrollLeft;
  const distance = target - from;
  if (!distance) return;
  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / PAGE_SCROLL_DURATION);
    el.scrollLeft = from + distance * easeInOutQuad(progress);
    scrollAnimRaf = progress < 1 ? requestAnimationFrame(step) : 0;
  };
  scrollAnimRaf = requestAnimationFrame(step);
}

function scrollBar(direction) {
  const el = scrollEl.value;
  if (!el) return;
  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) return;
  const step = direction * el.clientWidth * PAGE_STEP_RATIO;
  const target = Math.min(maxScroll, Math.max(0, el.scrollLeft + step));
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    cancelScrollAnim();
    el.scrollLeft = target;
    return;
  }
  animateScrollTo(el, target);
}

// 开始拖动或滚轮滚动时让出控制权，避免和动画互相抢滚动位置
function onBarPointerDown(e) {
  cancelScrollAnim();
  onScrollPointerDown(e);
}

function onBarWheel(e) {
  cancelScrollAnim();
  onScrollWheel(e);
}

/** 划词条沿用同一套跳转条，只是关键词来自选区 */
function initSelectSearch() {
  // 划词条本身靠 Shadow DOM 样式定位，不依赖内联样式，CSP 下也可工作
  if (inlineStyleBlocked) {
    console.warn('[SEJ] 检测到 CSP 阻止内联样式，划词条仍会尝试显示');
  }
  isSelectSearch.value = true;
  inputTarget = () => selectionText.value;
  return true;
}

function initImageSearch() {
  isImageSearch.value = true;
  inputTarget = () => imageSearch.imageUrl;
  return true;
}

/**
 * 解析本角色的挂载目标。
 * @returns {{render: boolean, ok?: boolean}} render 为 false 表示本角色无需渲染；
 *   ok 为 false 表示站点规则命中但目标失效，调用方应保持未挂载状态以便重试。
 */
function initTargets() {
  // 划词条与图片条共用同一个浮层条：长按触发时优先进入图片模式
  if (isFloat) {
    if (imageSearch.active) return { render: initImageSearch() };
    return { render: selectSearchEnabled && initSelectSearch() };
  }

  // 规则声明优先划词时（如 Wikipedia），内嵌条让位给独立的划词条
  if (selectSearchEnabled && matchedRule?.enabled && matchedRule.selectSearchPriority) {
    return { render: false };
  }

  if (matchedRule?.enabled) {
    inputTarget = getInputTarget(matchedRule);
    insertTarget = getInsertTarget(matchedRule);
    insertPosition = getInsertPositionLabel(matchedRule) || 'beforeend';
    if (!inputTarget || !insertTarget) {
      console.warn(
        `[SEJ] 未找到输入框或插入位置：\n输入框：${inputTarget}\n插入位置：${insertTarget}`,
      );
      return { render: false, ok: false };
    }
    return { render: true };
  }

  // 没有站点规则：内嵌条不渲染，划词交给独立的浮层条
  return { render: false };
}

/** 站点 wrapperClass 会参与页面网格布局 */
function applyWrapperClass() {
  if (!matchedRule?.wrapperClass) return;
  const needsWrapper = !resolvedStyle.includes('sticky') && !resolvedStyle.includes('fixed');
  if (needsWrapper) getHost(props.role).classList.add(matchedRule.wrapperClass);
}

function injectHost() {
  // 浮层条脱离站点布局；内嵌条跟随规则指定的插入位置
  if (isFloat) {
    insertHost(document.body, 'beforeend', props.role);
    return;
  }
  insertHost(insertTarget, insertPosition, props.role);
  applyWrapperClass();
}

/** 事件是否发生在跳转条内部（含 Teleport 到容器外的分类下拉面板） */
function isInsideBar(e) {
  return isEventInsideUi(containerEl.value, e);
}

/** 跟随模式下用选区/图片的矩形算出跳转条的视口坐标 */
function syncFloatPlacement() {
  if (!isFloat) return;
  const bar = containerEl.value;
  const rect = anchorRect.value;
  if (!bar || !rect) {
    floatStyle.value = {};
    containerEl.value?.classList.remove('sej-follow-anchor');
    containerEl.value?.classList.add('sej-top');
    return;
  }
  const barRect = bar.getBoundingClientRect();
  const viewport = {
    width: document.documentElement.clientWidth,
    height: window.visualViewport?.height || window.innerHeight,
  };
  // 图片条放进图片内部顶部居中，图片太小放不下时放到图片上方居中
  const imagePlacement = isImageSearch.value
    ? (placeInsideRect({ rect, bar: { width: barRect.width, height: barRect.height }, viewport }) ??
      placeAboveRect({ rect, bar: { width: barRect.width, height: barRect.height }, viewport }))
    : null;
  const { top, left } =
    imagePlacement ??
    placeNearRect({
      rect,
      bar: { width: barRect.width, height: barRect.height },
      viewport,
    });
  bar.classList.remove('sej-top');
  bar.classList.add('sej-follow-anchor');
  floatStyle.value = { top: `${top}px`, left: `${left}px` };
}

/**
 * 选区的视口矩形：多行选区取包围盒；拿不到范围时返回 null，退回顶部居中。
 * @param {Selection} selection 文档选区
 */
function selectionAnchorRect(selection) {
  if (typeof selection?.getRangeAt === 'function' && selection.rangeCount) {
    try {
      const rangeRect = selection.getRangeAt(0).getBoundingClientRect();
      if (rangeRect && (rangeRect.width > 0 || rangeRect.height > 0)) return rangeRect;
    } catch (e) {
      // 选区跨 Shadow 边界等情况下拿不到范围
    }
  }
  return null;
}

/** 当前长按命中的图片元素（用于跟随模式取图片右上角） */
function imageAnchorRect() {
  const el = imageSearch.element;
  if (!el?.isConnected) return null;
  const rect = el.getBoundingClientRect?.();
  return rect && rect.width > 0 ? rect : null;
}

/**
 * 记录本次要贴住的锚点；关闭跟随或拿不到矩形时回到顶部居中。
 * @param {Selection | null} selection 文档选区
 */
function refreshAnchor(selection) {
  anchorRect.value =
    isFloat && data.selectionFollowPointer
      ? isImageSearch.value
        ? imageAnchorRect()
        : selectionAnchorRect(selection)
      : null;
}

/**
 * 显示浮层条。跟随模式下内容与宽度都可能刚变化，
 * 先渲染完再量尺寸定位，避免用旧宽高算出偏移的坐标。
 */
async function showFloatBar() {
  if (!isFloat) {
    barVisible.value = true;
    return;
  }
  // 每次显示都从图标收起态开始，避免沿用上一条选区的展开状态
  clearIconCollapse();
  iconExpanded.value = false;
  // 等待渲染期间可能已经被收起，只有仍允许显示时才落地
  const token = ++showToken;
  await nextTick();
  if (token !== showToken) return;
  syncFloatPlacement();
  barVisible.value = true;
}

function hideFloatBar() {
  // 递增令牌取消排队中的显示，避免收起后被上一帧的显示重新拉起
  showToken += 1;
  clearIconCollapse();
  iconExpanded.value = false;
  barVisible.value = false;
}

// 图标模式下指针停靠的宽限时间：斜向移动时短暂离开图标不该马上收起
const ICON_COLLAPSE_DELAY = 180;
let iconCollapseTimer = 0;

function clearIconCollapse() {
  if (!iconCollapseTimer) return;
  clearTimeout(iconCollapseTimer);
  iconCollapseTimer = 0;
}

/** 图标模式的展开/收起会改变整条尺寸，渲染完再重新贴回锚点 */
async function setIconExpanded(expanded) {
  if (!iconMode.value || iconExpanded.value === expanded) return;
  iconExpanded.value = expanded;
  await nextTick();
  syncFloatPlacement();
  updateScrollHints();
}

/** 指针停在图标上即展开整条搜索条，无需点击 */
function onIconPointerEnter() {
  if (!iconMode.value) return;
  clearIconCollapse();
  setIconExpanded(true);
}

/**
 * 指针离开整条（含展开后的搜索条）后收回到图标。
 * 移到分类下拉面板时保持展开；离开窗口时 relatedTarget 为空，仍然收起。
 */
function onIconPointerLeave(e) {
  if (!iconMode.value || !iconExpanded.value) return;
  const next = e?.relatedTarget;
  if (next && next.getRootNode?.() === containerEl.value?.getRootNode?.()) return;
  clearIconCollapse();
  iconCollapseTimer = setTimeout(() => setIconExpanded(false), ICON_COLLAPSE_DELAY);
}

// 异步显示的令牌：收起时作废所有未落地的显示
let showToken = 0;
// 点击跳转条本身会清掉页面选区，此时要保持浮层
let keepOverlayUntil = 0;
// 本次输入操作里已主动收起，残余的选区变化不应再弹出
let dismissedGesture = -1;
// 按下时先不收起：若是重新划词，松手后仍要显示，收起再弹出就是闪烁
let pendingHide = false;
// 本次操作已由松手判定过显隐，之后迟到的空选区是拖动中间态，不再改变结果
let settledGesture = -1;

function onSelectionChange(e) {
  if (!isSelectSearch.value) return;
  // 图片模式的关键词来自图片地址：长按松手时浏览器会补发空选区的
  // mouseup / selectionchange，必须先于「无选区就收起」判断
  if (isImageSearch.value) return;
  // 仍在拖动选区就先不弹，等松手后按最终选区显示
  if (isPointerPressed()) return;
  // 本次操作里已收起划词条：同一次点击读到的残留选区不再重新弹出；
  // 但拖动选区属于重新划词，应照常显示
  if (dismissedGesture === currentGestureId() && !isSelectionDrag()) return;
  // 输入框内的选区默认忽略，可在设置面板中单独开启
  const text = getSelectedText({ includeInput: data.selectSearchInInput });
  if (!text) {
    // 松手时已判定过显隐：拖动过程中迟到的空选区不能把刚划好的条收掉
    if (settledGesture === currentGestureId()) return;
    // 点跳转条本身会清掉页面选区，浮层要留到这次点击结束
    if (barVisible.value && (performance.now() < keepOverlayUntil || isInsideBar(e))) return;
    hideFloatBar();
    return;
  }
  selectionText.value = text;
  refreshAnchor(document.getSelection());
  showFloatBar();
}

// 在页面其他位置按下鼠标先挂起收起，等这次操作结束再决定：
// 重新划词时保持显示，单纯点击空白才收起
function onOverlayPointerDown(e) {
  if (!barVisible.value) return;
  if (isInsideBar(e)) {
    keepOverlayUntil = performance.now() + 500;
    return;
  }
  // 图片模式一并清掉状态，否则下一次长按 active 仍是 true，浮层不会再出现
  if (isImageSearch.value) {
    closeImageMode();
    return;
  }
  // 记下本次操作，避免同一击的 mouseup/selectionchange 把刚收起的浮层又拉回来
  dismissedGesture = currentGestureId();
  pendingHide = true;
}

// 一次输入操作结束：挂起的收起在确认没有新选区后才生效
function settleOverlay(e) {
  if (!pendingHide) return;
  pendingHide = false;
  if (!isSelectSearch.value || isImageSearch.value) return;
  settledGesture = currentGestureId();
  // 拖动产生了新选区，交给 onSelectionChange 更新内容与位置
  if (isSelectionDrag() && getSelectedText({ includeInput: data.selectSearchInInput })) return;
  if (e && performance.now() < keepOverlayUntil) return;
  hideFloatBar();
}

// selectionchange 不带可靠的事件目标，只用来发现新选区
function onDocumentSelectionChange() {
  onSelectionChange(null);
}

// 滚动只改变锚点的视口坐标，重新量一次矩形就能继续跟随；
// 锚点已经消失（选区被清空、图片被移除）时才退回顶部居中
function onFloatScroll(e) {
  if (!isFloat || !anchorRect.value) return;
  // 跳转条自身的横向滚动不改变锚点位置，不参与跟随重算
  if (isInsideBar(e)) return;
  refreshAnchor(document.getSelection());
  syncFloatPlacement();
}

// 视口变化后重新收一次边界，避免跟随模式跑到屏幕外
function onFloatResize() {
  onViewportResize();
  syncFloatPlacement();
}

onMounted(async () => {
  const { render, ok = true } = initTargets();
  if (!ok) return;
  // ok 为真表示初始化已完成（含让位给划词条的情况），路由变化无需重试
  if (!isFloat) settings.barMounted = ok;
  // 没有需要渲染的内容时保持空挂载，避免多建一个无用实例
  if (!render) return;
  ready.value = true;

  // 划词条可能是在用户划词后才延迟挂载的，先把当前选区同步进来
  if (isSelectSearch.value) onSelectionChange();
  // 图片模式下由长按触发，挂载后直接显示并定位
  if (isImageSearch.value) {
    refreshAnchor(null);
    barVisible.value = true;
  }

  if (matchedRule) {
    applyStylish(matchedRule);
    resolvedStyle = resolveRuleStyle(matchedRule, data) || '';
    if (matchedRule.class) {
      containerClass.value = `rwl-exempt ${matchedRule.class}`;
    }
  }

  await nextTick();
  injectHost();
  startStackSync();
  if (isFloat) {
    syncFloatPlacement();
  } else {
    constrainBarToViewport();
  }
  updateScrollHints();
  // 入场动画的 scale 会让首帧测量偏小，动画结束后重新校准
  scheduleConstrainCheck();
  window.addEventListener('resize', isFloat ? onFloatResize : onViewportResize);
  window.addEventListener('pointermove', onWindowPointerMove, {
    passive: true,
  });
  window.addEventListener('pointerup', endScrollDrag);
  window.addEventListener('pointercancel', endScrollDrag);

  if (isFloat) {
    document.addEventListener('pointerdown', onImageModePointerDown, true);
    document.addEventListener('keydown', onOverlayKeydown, true);
    window.addEventListener('scroll', onImageModeScroll, true);
    window.addEventListener('scroll', onFloatScroll, true);
  }

  if (isSelectSearch.value) {
    // 记录左键是否按住，拖动过程中的选区变化要延后到松手
    trackSelectionPointer();
    document.addEventListener('selectionchange', onDocumentSelectionChange);
    // 部分站点/浏览器中 selectionchange 时机不稳定，补充鼠标与键盘事件兜底
    document.addEventListener('mouseup', onSelectionChange);
    document.addEventListener('keyup', onSelectionChange);
    document.addEventListener('pointerup', settleOverlay, true);
    document.addEventListener('pointercancel', settleOverlay, true);
    document.addEventListener('pointerdown', onOverlayPointerDown, true);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onImageModePointerDown, true);
  document.removeEventListener('keydown', onOverlayKeydown, true);
  window.removeEventListener('scroll', onImageModeScroll, true);
  window.removeEventListener('scroll', onFloatScroll, true);
  document.removeEventListener('pointerdown', onOverlayPointerDown, true);
  document.removeEventListener('pointerup', settleOverlay, true);
  document.removeEventListener('pointercancel', settleOverlay, true);
  document.removeEventListener('selectionchange', onDocumentSelectionChange);
  document.removeEventListener('mouseup', onSelectionChange);
  document.removeEventListener('keyup', onSelectionChange);
  window.removeEventListener('resize', isFloat ? onFloatResize : onViewportResize);
  window.removeEventListener('pointermove', onWindowPointerMove);
  window.removeEventListener('pointerup', endScrollDrag);
  window.removeEventListener('pointercancel', endScrollDrag);
  cancelScrollAnim();
  clearIconCollapse();
  disposeScrollDrag();
  disposeViewport();
  stopStackSync();
});
</script>

<template>
  <div
    v-if="ready"
    ref="containerEl"
    id="sej-container"
    :class="[
      containerClass,
      {
        selectSearch: isFloat,
        'sej-top': isFloat && !anchorRect,
        'sej-follow-anchor': isFloat && Boolean(anchorRect),
        'sej-select-visible': barVisible,
        'sej-image-search': isImageSearch,
        'sej-compact': compactBar,
        'sej-icon-mode': iconMode,
        'sej-icon-collapsed': iconMode && !iconExpanded,
      },
    ]"
    :aria-hidden="isFloat && !barVisible ? 'true' : undefined"
    :style="barStyle"
    @pointerenter="onIconPointerEnter"
    @pointerleave="onIconPointerLeave"
  >
    <!-- 图标模式：收起时只露出这个触发图标，指针停靠或聚焦时展开整条 -->
    <button
      v-if="iconMode"
      type="button"
      class="sej-icon-trigger"
      :title="iconExpanded ? null : t('bar.expand')"
      :aria-label="t('bar.expand')"
      :aria-hidden="iconExpanded ? 'true' : undefined"
      :tabindex="iconExpanded ? -1 : 0"
      @click.stop="setIconExpanded(true)"
      @focus="setIconExpanded(true)"
      v-html="SEARCH"
    ></button>
    <div class="sej-scroll-viewport" @wheel="onBarWheel">
      <div
        ref="scrollEl"
        class="sej-scroll"
        @pointerdown="onBarPointerDown"
        @click.capture="onScrollClickCapture"
        @dragstart.prevent
        @scroll.passive="updateScrollHints"
      >
        <template v-for="category in categories" :key="category.key">
          <template v-if="inlineStyleBlocked">
            <span v-if="!compactBar" class="sej-category-title">
              {{ category.name }}
            </span>
            <EngineItem
              v-for="engine in category.engines"
              :key="engine.url + engine.name"
              :engine="engine"
              :compact="compactBar"
              @jump="onJump"
            />
          </template>
          <EngineCategory
            v-else
            :name="category.name"
            :engines="category.engines"
            :show-icon="ui.categoryIcon"
            :compact="compactBar"
            @jump="onJump"
            @jump-all="onJumpAll(category.engines)"
          />
        </template>
      </div>
      <button
        type="button"
        class="sej-scroll-hint sej-scroll-hint-left"
        :title="t('bar.scrollLeft')"
        :aria-label="t('bar.scrollLeft')"
        @click.stop="scrollBar(-1)"
      ></button>
      <button
        type="button"
        class="sej-scroll-hint sej-scroll-hint-right"
        :title="t('bar.scrollRight')"
        :aria-label="t('bar.scrollRight')"
        @click.stop="scrollBar(1)"
      ></button>
    </div>

    <SettingButton />
  </div>
</template>
<style>
#sej-container {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2px;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  transform-origin: top center;
  animation: sejopen 0.14s ease-out;
  color: var(--font-color-qxin);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  width: max-content !important;
  max-width: min(100%, calc(100vw - 8px));
  box-sizing: border-box;
  border-radius: var(--sej-radius-bar, 12px);
  border: 1px solid var(--border-color-sej);
  overflow: hidden;
  box-shadow: var(
    --sej-shadow-bar,
    0 1px 2px hsla(0, 0%, 0%, 0.06),
    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)
  );
  height: fit-content;
  flex-wrap: nowrap;
  justify-content: center;
  user-select: none;
}

/*
 * 移动端由 JS 标记：抵消站点规则里的 left / grid-column 等横向偏移，
 * 再由 JS 的 translate 把跳转条对齐到可视视口中心。
 */
#sej-container.sej-mobile-centered {
  left: auto !important;
  right: auto !important;
  margin-left: auto !important;
  margin-right: auto !important;
  grid-column: 1 / -1 !important;
  justify-self: center !important;
}

/* 精简模式只留图标：收紧分类与引擎条目的左右内边距，避免只剩图标时留白过大 */
#sej-container.sej-compact > .sej-scroll-viewport > .sej-scroll > .sej-engine,
#sej-container.sej-compact > .sej-scroll-viewport > .sej-scroll .sej-category > .sej-engine {
  padding: 0 7px;
  gap: 0;
}

/* icon 模式：收起时只保留触发图标，展开后恢复正常搜索条 */
#sej-container.sej-icon-mode.sej-icon-collapsed {
  padding: 4px;
  border-radius: 50%;
}

#sej-container.sej-icon-mode.sej-icon-collapsed > .sej-scroll-viewport,
#sej-container.sej-icon-mode.sej-icon-collapsed > #setBtn {
  display: none;
}

/* 展开后图标留在最左侧作为当前模式标识，指针始终落在整条内，不会因元素消失而误收起 */
#sej-container.sej-icon-mode:not(.sej-icon-collapsed) > .sej-icon-trigger {
  margin-right: 2px;
  cursor: default;
}

#sej-container.sej-icon-mode:not(.sej-icon-collapsed) > .sej-icon-trigger:hover {
  background: none;
}

.sej-icon-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  appearance: none;
  background: none;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.sej-icon-trigger:hover {
  background: var(--sej-hover-bg, var(--background-hover-color-qxin));
}

.sej-icon-trigger svg {
  width: 16px;
  height: 16px;
  display: block;
}

.sej-icon-trigger:focus-visible {
  outline: 2px solid var(--sej-accent, #4285f4);
  outline-offset: 0;
}

/* 滚动区容器：内容不足时让类别和设置按钮作为整体居中，溢出时再收缩滚动 */
#sej-container > .sej-scroll-viewport {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
}

/* 类别区单行显示，超出可用宽度时横向滚动；设置按钮固定在右侧 */
#sej-container > .sej-scroll-viewport > .sej-scroll {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  /*
   * 不显示滚动条：桌面端用鼠标拖动或滚轮横向滚动，触屏不拦截手势，
   * 让浏览器原生处理横向滚动，保留松手后的惯性滑动。
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
  touch-action: auto;
  cursor: grab;
}

#sej-container > .sej-scroll-viewport > .sej-scroll::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging * {
  cursor: grabbing;
}

/* 左右仍有隐藏内容时，用渐隐边缘 + 圆形箭头提示可以继续拖动 */
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left {
  -webkit-mask-image: linear-gradient(to right, transparent, #000 28px);
  mask-image: linear-gradient(to right, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(to left, transparent, #000 28px);
  mask-image: linear-gradient(to left, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
}

/*
 * 箭头滚动按钮：点击滚动一屏。
 * 按钮本身铺满滚动区高度并加宽为透明命中区，鼠标从边缘移到箭头上时
 * 不会先掠过底下的分类/引擎条目；只绘制箭头，不带圆形底座。
 */
#sej-container .sej-scroll-hint {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  min-width: 0;
  min-height: 0;
  margin-left: 4px;
  padding: 0;
  box-sizing: border-box;
  appearance: none;
  color: var(--font-color-qxin);
  background: none;
  border: 0;
  font: inherit;
  line-height: 0;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.16s ease-out;
}

/* 箭头本体 */
#sej-container .sej-scroll-hint::after {
  content: '';
  position: relative;
  z-index: 1;
  width: 7px;
  height: 7px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  border-radius: 1px;
  opacity: 0.45;
  transition: opacity 0.12s ease-out;
  filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.2));
}

#sej-container .sej-scroll-hint-left {
  left: 0;
}

#sej-container .sej-scroll-hint-left::after {
  margin-left: 2px;
  transform: rotate(-135deg);
}

#sej-container .sej-scroll-hint-right {
  right: 0;
}

#sej-container .sej-scroll-hint-right::after {
  margin-right: 2px;
  transform: rotate(45deg);
}

#sej-container .sej-scroll-hint:hover::after {
  opacity: 0.8;
  filter: drop-shadow(0 1px 4px hsla(0, 0%, 0%, 0.4));
}

#sej-container .sej-scroll-hint:active::after {
  opacity: 1;
}

#sej-container .sej-scroll-hint:focus-visible {
  outline: 2px solid var(--sej-accent);
  outline-offset: -2px;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left ~ .sej-scroll-hint-left,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right ~ .sej-scroll-hint-right {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

#sej-container > #setBtn {
  flex: 0 0 auto;
}

/* 浮层条：划词与图片模式共用，脱离站点布局固定在视口上 */
#sej-container.selectSearch {
  position: fixed;
  z-index: 99999999;
  margin: 0;
  /* 站点规则里的网格列与横向偏移在顶部浮层里不再适用 */
  grid-column: auto;
  max-width: min(calc(100vw - 8px), max-content);
  transform: translateY(calc(-100% - 10px));
  visibility: hidden;
  pointer-events: none;
  /* 划词条直接在锚点原位显隐，不做滑入/淡入，也不延迟消失 */
  animation: none;
  transition: none;
}

/* 顶部居中：默认位置，横向由视口决定 */
#sej-container.selectSearch.sej-top {
  top: 2px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

/* 跟随选区/图片：坐标来自内联样式，不再做居中与滑出位移 */
#sej-container.selectSearch.sej-follow-anchor {
  top: 0;
  left: 0;
  right: auto;
  margin: 0;
  transform: none;
  transform-origin: top left;
}

#sej-container.selectSearch.sej-select-visible {
  transform: none;
  visibility: visible;
  pointer-events: auto;
}

/*
 * 图片模式：长按后直接显示，并显示当前要搜索的图片缩略图，
 * 让用户确认搜的是哪张图（背景图没有可见的 <img> 可参照）。
 */
#sej-container.sej-image-search {
  padding-left: 6px;
}

#sej-container.sej-image-search::before {
  content: '';
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  border-radius: 4px;
  background: var(--sej-surface-2) center / cover no-repeat;
  background-image: var(--sej-image-thumb, none);
  box-shadow: inset 0 0 0 1px var(--border-color-sej);
}

.sej-category-title {
  font-weight: 600;
  padding: 0 12px;
  opacity: 0.8;
}

@keyframes sejopen {
  0% {
    transform: translateY(-4px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}
</style>

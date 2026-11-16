import { reactive } from 'vue';

// 子组件通过该键拿到所属跳转条的提示控制器：内嵌条与划词条各自一份，互不干扰
export const HOVER_TIP_KEY = Symbol('sejHoverTip');

// 指针进入条目后的短延迟：既能滤掉快速掠过，又远快于原生 title 的一秒等待
const SHOW_DELAY_MS = 100;
// 指针离开条目后的宽限：移到相邻条目时由下一条目接管，提示不闪烁
const HIDE_DELAY_MS = 80;

/**
 * 跳转条的悬停提示状态。
 *
 * 原生 title 由浏览器延迟弹出，无法在紧凑模式、动作目标这类内容上给出即时反馈；
 * 这里只维护「当前锚点 + 文案」，由 HoverTip 组件统一渲染并定位。
 */
export function createHoverTip() {
  const tip = reactive({ visible: false, text: '', anchor: null, placement: 'right' });
  let showTimer = 0;
  let hideTimer = 0;
  let listening = false;

  function clearShow() {
    clearTimeout(showTimer);
    showTimer = 0;
  }

  function clearHide() {
    clearTimeout(hideTimer);
    hideTimer = 0;
  }

  // 页面滚动、改窗口或按下指针后，锚点可能已经移开/被点击，直接收起最不容易遮挡内容
  function onViewportChange() {
    conceal();
  }

  function listenViewport(on) {
    if (on === listening) return;
    listening = on;
    if (on) {
      window.addEventListener('scroll', onViewportChange, { passive: true, capture: true });
      window.addEventListener('resize', onViewportChange, { passive: true });
      window.addEventListener('pointerdown', onViewportChange, { passive: true, capture: true });
      return;
    }
    window.removeEventListener('scroll', onViewportChange, true);
    window.removeEventListener('resize', onViewportChange);
    window.removeEventListener('pointerdown', onViewportChange, true);
  }

  function conceal() {
    tip.visible = false;
    tip.text = '';
    tip.anchor = null;
    listenViewport(false);
  }

  function reveal(anchor, text, placement) {
    tip.anchor = anchor;
    tip.text = text;
    tip.placement = placement;
    tip.visible = true;
    listenViewport(true);
  }

  /**
   * 请求显示提示。
   * 已有提示时直接换到新条目，避免从一条移到下一条时重新等延迟。
   * placement 决定提示落点：普通条目在右侧，分类图标在上方以免挡住相邻分类。
   */
  function show(anchor, text, { immediate = false, placement = 'right' } = {}) {
    if (!anchor || !text) {
      hide({ immediate: true });
      return;
    }
    clearHide();
    if (
      tip.visible &&
      tip.anchor === anchor &&
      tip.text === text &&
      tip.placement === placement
    ) {
      return;
    }
    clearShow();
    if (tip.visible || immediate) {
      reveal(anchor, text, placement);
      return;
    }
    showTimer = setTimeout(() => {
      showTimer = 0;
      reveal(anchor, text, placement);
    }, SHOW_DELAY_MS);
  }

  /**
   * 请求隐藏提示。
   * 未显示时立即清空；已显示时留出一小段宽限，供相邻条目接管。
   */
  function hide({ immediate = false } = {}) {
    clearShow();
    if (immediate || !tip.visible) {
      clearHide();
      conceal();
      return;
    }
    clearHide();
    hideTimer = setTimeout(() => {
      hideTimer = 0;
      conceal();
    }, HIDE_DELAY_MS);
  }

  // 跳转条重建/卸载时清掉计时器与全局监听
  function dispose() {
    clearShow();
    clearHide();
    conceal();
  }

  return { tip, show, hide, dispose };
}

/**
 * 面板事件隔离。
 *
 * Shadow DOM 只隔离样式与 DOM 查询，不隔离事件：面板内的指针、键盘事件仍是
 * composed 事件，会一路冒泡到页面的 document / window，页面自己的全局监听器
 * （关闭下拉、划词工具、快捷键、统计上报等）就被误触发，看起来像鼠标操作同时
 * 作用到了网页上。
 *
 * 这里在面板根节点的冒泡阶段截断这些事件：面板内部的处理器先于根节点执行，
 * 不受影响；页面侧只剩捕获阶段的监听器还能收到（无法拦截，但这类监听器很少）。
 * 移动类事件不拦截，避免影响面板内基于 document 的拖动逻辑。
 */
import { onBeforeUnmount, onMounted } from 'vue';

const BLOCKED_EVENTS = [
  'pointerdown',
  'pointerup',
  'mousedown',
  'mouseup',
  'click',
  'dblclick',
  'auxclick',
  'contextmenu',
  'wheel',
  'touchstart',
  'touchmove',
  'touchend',
  'keydown',
  'keyup',
  'keypress',
];

function stopPropagation(e) {
  e.stopPropagation();
}

/**
 * @param {{ value: HTMLElement | null }} elRef 面板根元素。
 *   必须在面板挂载后调用（内部按 onMounted / onBeforeUnmount 绑定）。
 */
export function useEventIsolation(elRef) {
  let el = null;

  onMounted(() => {
    el = elRef.value;
    if (!el) return;
    for (const type of BLOCKED_EVENTS) el.addEventListener(type, stopPropagation);
  });

  onBeforeUnmount(() => {
    if (!el) return;
    for (const type of BLOCKED_EVENTS) el.removeEventListener(type, stopPropagation);
    el = null;
  });
}

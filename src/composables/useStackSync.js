/**
 * 多实例层叠同步：另一个脚本实例（如开发版）可能稍后才挂载，
 * 退避重试几次刷新层叠偏移即可，避免长时间高频读取布局。
 */
import { refreshStackLayout } from '../core/shadowDom.js';

export const STACK_SYNC_DELAYS = [0, 250, 750, 1500, 3000, 6000];

export function useStackSync({ delays = STACK_SYNC_DELAYS, refresh = refreshStackLayout } = {}) {
  let timers = [];

  function stop() {
    timers.forEach(clearTimeout);
    timers = [];
    window.removeEventListener('resize', refresh);
  }

  function start() {
    stop();
    window.addEventListener('resize', refresh);

    timers = delays.map((delay, index) =>
      setTimeout(() => {
        refresh();
        // 重试结束后不再需要 resize 监听，与原先行为保持一致
        if (index === delays.length - 1) {
          window.removeEventListener('resize', refresh);
        }
      }, delay),
    );
  }

  return { start, stop };
}

/**
 * 拖拽时跟随指针的幽灵元素。
 *
 * 用源元素整块克隆做副本：拖动分类时整个分类框跟随指针，且沿用面板样式。
 */

/**
 * @param {object} options
 * @param {{ value: HTMLElement | null }} options.layerEl 设置面板根元素
 */
export function createDragGhost({ layerEl }) {
  let ghostEl = null;
  let offset = { x: 0, y: 0 };

  function position(x, y) {
    if (!ghostEl) return;
    ghostEl.style.transform = `translate3d(${x - offset.x}px, ${y - offset.y}px, 0)`;
  }

  /**
   * @param {HTMLElement} sourceEl 被拖动的元素
   * @param {DOMRect} rect 被拖动元素当前矩形
   * @param {number} x 指针横向位置
   * @param {number} y 指针纵向位置
   * @param {'category' | 'engine'} type
   */
  function show(sourceEl, rect, x, y, type) {
    offset = { x: x - rect.left, y: y - rect.top };

    const ghost = sourceEl.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.removeAttribute('data-sej-drag-el');
    ghost.querySelectorAll('[data-sej-drag-el]').forEach((el) => {
      el.removeAttribute('data-sej-drag-el');
    });
    ghost.classList.remove('sej-drag-placeholder');
    ghost.classList.add('sej-drag-ghost', `sej-drag-ghost-${type}`);
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    // 挂在设置面板内，保证副本沿用面板与条目的样式
    (layerEl.value || sourceEl.getRootNode()).appendChild(ghost);
    ghostEl = ghost;
    position(x, y);
  }

  function remove() {
    if (!ghostEl) return;
    ghostEl.remove();
    ghostEl = null;
  }

  function hasGhost() {
    return Boolean(ghostEl);
  }

  return { show, position, remove, hasGhost };
}

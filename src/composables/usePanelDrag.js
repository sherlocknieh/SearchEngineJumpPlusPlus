/**
 * 设置面板的标题栏拖动。
 *
 * 面板绝对定位在遮罩内，拖动时需补偿遮罩自身的滚动偏移，
 * 并限制在可视区域内，避免触屏拖出屏幕后无法找回。
 */
export function usePanelDrag({ layerEl, maskEl, layerStyle }) {
  let dragOffset = { x: 0, y: 0 };
  let dragPointerId = null;

  function onDragMove(e) {
    if (dragPointerId != null && e.pointerId !== dragPointerId) return;
    const el = layerEl.value;
    if (!el) return;
    const mask = maskEl.value;
    const scrollLeft = mask ? mask.scrollLeft : 0;
    const scrollTop = mask ? mask.scrollTop : 0;
    const maxLeft = scrollLeft + Math.max(0, window.innerWidth - el.offsetWidth);
    const maxTop = scrollTop + Math.max(0, window.innerHeight - el.offsetHeight);
    layerStyle.value = {
      left: Math.min(Math.max(e.clientX - dragOffset.x + scrollLeft, scrollLeft), maxLeft) + 'px',
      top: Math.min(Math.max(e.clientY - dragOffset.y + scrollTop, scrollTop), maxTop) + 'px',
      margin: 0,
    };
    if (e.cancelable) e.preventDefault();
  }

  function stopDrag(e) {
    if (e && dragPointerId != null && e.pointerId !== dragPointerId) return;
    dragPointerId = null;
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', stopDrag);
    document.removeEventListener('pointercancel', stopDrag);
  }

  function startDrag(e) {
    if (e.pointerType !== 'touch' && e.button !== 0) return;
    if (e.pointerType === 'touch' && e.isPrimary === false) return;
    if (e.target?.closest?.('.sej-panel-close')) return;
    const el = layerEl.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    dragPointerId = e.pointerId;
    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);
  }

  function dispose() {
    stopDrag();
  }

  return { startDrag, stopDrag, dispose };
}

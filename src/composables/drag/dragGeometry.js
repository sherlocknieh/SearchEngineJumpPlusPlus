/**
 * 设置面板拖拽用到的 DOM 几何计算。
 *
 * 命中测试必须使用布局位置而不是 getBoundingClientRect：拖拽排序时
 * 元素正在做 FLIP 过渡，实时矩形会落在动画中的位置，导致来回抖动。
 */

/**
 * 累加元素相对 offsetParent 链的位置。
 *
 * @param {HTMLElement} el
 * @returns {{ x: number, y: number }}
 */
export function layoutOffset(el) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

/**
 * 以滚动容器为基准计算元素矩形，不含 transform 动画。
 *
 * @param {HTMLElement | null} body 滚动容器
 * @param {HTMLElement} el
 * @returns {{ left: number, top: number, width: number, height: number, right: number, bottom: number }}
 */
export function layoutRect(body, el) {
  if (!body || !body.contains(el)) return el.getBoundingClientRect();
  const base = body.getBoundingClientRect();
  const bodyPos = layoutOffset(body);
  const elPos = layoutOffset(el);
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const left = base.left + elPos.x - bodyPos.x - body.scrollLeft;
  const top = base.top + elPos.y - bodyPos.y - body.scrollTop;
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

/**
 * @param {() => HTMLElement | null} getRoot 设置面板根元素
 */
export function createDragGeometry(getRoot) {
  function settingsBody() {
    return getRoot()?.querySelector('#sej-settings-body') || null;
  }

  function dragElements() {
    const root = getRoot();
    return root ? Array.from(root.querySelectorAll('[data-sej-drag-el]')) : [];
  }

  function categoryCards() {
    const body = settingsBody();
    return body
      ? Array.from(body.querySelectorAll('.iqxin-items[data-sej-drag-el^="category-"]'))
      : [];
  }

  function sourceElement(type, ci, ei) {
    if (type === 'category') return categoryCards()[ci] || null;
    const card = categoryCards()[ci];
    if (!card) return null;
    return card.querySelectorAll(':scope > .sejcon > .drag')[ei] || null;
  }

  function addItemIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
      const add = cards[i].querySelector(':scope > .sejcon > .iqxin-additem');
      if (!add) continue;
      const rect = layoutRect(settingsBody(), add);
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i;
      }
    }
    return -1;
  }

  function categoryIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
      const rect = layoutRect(settingsBody(), cards[i]);
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i;
      }
    }
    return -1;
  }

  function engineInsertIndex(card, y) {
    const items = Array.from(card.querySelectorAll(':scope > .sejcon > .drag'));
    for (let i = 0; i < items.length; i++) {
      const rect = layoutRect(settingsBody(), items[i]);
      if (y < rect.top + rect.height / 2) return i;
    }
    return items.length;
  }

  return {
    settingsBody,
    dragElements,
    categoryCards,
    sourceElement,
    addItemIndexAt,
    categoryIndexAt,
    engineInsertIndex,
  };
}

// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import {
  createDragGeometry,
  layoutOffset,
  layoutRect,
} from '../src/composables/drag/dragGeometry.js';

function place(el, { left = 0, top = 0, width = 0, height = 0, parent = null } = {}) {
  Object.defineProperty(el, 'offsetLeft', { value: left, configurable: true });
  Object.defineProperty(el, 'offsetTop', { value: top, configurable: true });
  Object.defineProperty(el, 'offsetWidth', { value: width, configurable: true });
  Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true });
  Object.defineProperty(el, 'offsetParent', { value: parent, configurable: true });
}

function makeDom() {
  document.body.innerHTML = `
    <div id="root">
      <div id="sej-settings-body">
        <div class="iqxin-items" data-sej-drag-el="category-1">
          <div class="sejtitle"></div>
          <div class="sejcon" data-sej-drag-el="list-1">
            <span class="drag" data-sej-drag-el="engine-1"></span>
            <span class="drag" data-sej-drag-el="engine-2"></span>
            <span class="iqxin-additem"></span>
          </div>
        </div>
        <div class="iqxin-items" data-sej-drag-el="category-2">
          <div class="sejcon" data-sej-drag-el="list-2"></div>
        </div>
      </div>
    </div>
  `;
  const root = document.getElementById('root');
  const body = document.getElementById('sej-settings-body');
  const card1 = root.querySelector('[data-sej-drag-el="category-1"]');
  const card2 = root.querySelector('[data-sej-drag-el="category-2"]');
  const con1 = card1.querySelector('.sejcon');
  const [engine1, engine2] = card1.querySelectorAll('.drag');
  const add = card1.querySelector('.iqxin-additem');

  body.getBoundingClientRect = () => ({
    left: 100,
    top: 50,
    right: 400,
    bottom: 500,
    width: 300,
    height: 450,
  });

  place(body, { width: 300, height: 450 });
  place(card1, { top: 0, width: 200, height: 60, parent: body });
  place(card2, { top: 100, width: 200, height: 60, parent: body });
  place(con1, { top: 30, width: 200, height: 80, parent: card1 });
  place(engine1, { top: 0, width: 80, height: 20, parent: con1 });
  place(engine2, { top: 24, width: 80, height: 20, parent: con1 });
  place(add, { left: 0, top: 50, width: 40, height: 20, parent: con1 });

  return { root, body, card1, card2, engine1, engine2, add };
}

describe('dragGeometry', () => {
  let dom;
  let geometry;

  beforeEach(() => {
    dom = makeDom();
    geometry = createDragGeometry(() => dom.root);
  });

  it('layoutOffset 累加 offsetParent 链', () => {
    expect(layoutOffset(dom.engine2)).toEqual({ x: 0, y: 54 });
  });

  it('layoutRect 以滚动容器为基准', () => {
    expect(layoutRect(dom.body, dom.engine1)).toMatchObject({
      left: 100,
      top: 80,
      width: 80,
      height: 20,
      right: 180,
      bottom: 100,
    });
  });

  it('按坐标命中分类卡片', () => {
    expect(geometry.categoryIndexAt(150, 60)).toBe(0);
    expect(geometry.categoryIndexAt(150, 160)).toBe(1);
    expect(geometry.categoryIndexAt(50, 60)).toBe(-1);
  });

  it('按坐标命中加号', () => {
    expect(geometry.addItemIndexAt(110, 140)).toBe(0);
    expect(geometry.addItemIndexAt(110, 400)).toBe(-1);
  });

  it('按纵向中点计算引擎插入位置', () => {
    expect(geometry.engineInsertIndex(dom.card1, 70)).toBe(0);
    expect(geometry.engineInsertIndex(dom.card1, 95)).toBe(1);
    expect(geometry.engineInsertIndex(dom.card1, 200)).toBe(2);
  });

  it('sourceElement 能定位分类与引擎', () => {
    expect(geometry.sourceElement('category', 0)).toBe(dom.card1);
    expect(geometry.sourceElement('engine', 0, 1)).toBe(dom.engine2);
    expect(geometry.sourceElement('engine', 5, 0)).toBeNull();
  });
});

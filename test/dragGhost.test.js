// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { createDragGhost } from '../src/composables/drag/dragGhost.js';

describe('createDragGhost', () => {
  let layer;
  let source;
  let ghost;

  beforeEach(() => {
    document.body.innerHTML = '';
    layer = document.createElement('div');
    source = document.createElement('div');
    source.className = 'drag';
    source.dataset.sejDragEl = 'engine-1';
    source.innerHTML = '<span data-sej-drag-el="child"></span>';
    layer.appendChild(source);
    document.body.appendChild(layer);
    ghost = createDragGhost({ layerEl: { value: layer } });
  });

  it('克隆源元素并去掉拖拽标记', () => {
    ghost.show(source, { left: 10, top: 20, width: 100, height: 30 }, 50, 60, 'engine');

    const el = layer.querySelector('.sej-drag-ghost-engine');
    expect(el).not.toBeNull();
    expect(el.hasAttribute('data-sej-drag-el')).toBe(false);
    expect(el.querySelector('[data-sej-drag-el]')).toBeNull();
    expect(el.style.width).toBe('100px');
    expect(el.style.height).toBe('30px');
  });

  it('按指针与按下位置的差值定位', () => {
    ghost.show(source, { left: 10, top: 20, width: 100, height: 30 }, 50, 60, 'engine');
    const el = layer.querySelector('.sej-drag-ghost-engine');
    // 拿起瞬间与源元素重合，之后跟随指针位移
    expect(el.style.transform).toBe('translate3d(10px, 20px, 0)');

    ghost.position(70, 80);
    expect(el.style.transform).toBe('translate3d(30px, 40px, 0)');
  });

  it('remove 后清除副本', () => {
    ghost.show(source, { left: 0, top: 0, width: 10, height: 10 }, 0, 0, 'category');
    expect(ghost.hasGhost()).toBe(true);

    ghost.remove();
    expect(ghost.hasGhost()).toBe(false);
    expect(layer.querySelector('.sej-drag-ghost-category')).toBeNull();
  });
});

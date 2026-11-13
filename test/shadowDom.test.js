// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import { getDropRoot, isEventInsideUi, reset } from '../src/core/shadowDom.js';

function createUi() {
  const host = document.createElement('div');
  const root = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  const dropRoot = document.createElement('div');
  container.appendChild(document.createElement('a'));
  root.append(container, dropRoot);
  document.body.appendChild(host);
  return { host, root, container, dropRoot };
}

// happy-dom 不派发真实事件，这里直接构造带 composedPath 的事件对象
function eventWithPath(path) {
  return { composedPath: () => path, target: path[0] };
}

afterEach(() => {
  reset();
  document.body.innerHTML = '';
});

describe('isEventInsideUi', () => {
  it('识别容器自身的子树', () => {
    const { container } = createUi();
    const child = container.firstChild;
    expect(isEventInsideUi(container, eventWithPath([child]))).toBe(true);
  });

  it('识别 Teleport 到容器外、同属一个 Shadow Root 的下拉面板', () => {
    const { container, dropRoot } = createUi();
    const panel = document.createElement('div');
    dropRoot.appendChild(panel);
    const engine = document.createElement('a');
    panel.appendChild(engine);

    expect(container.contains(engine)).toBe(false);
    expect(isEventInsideUi(container, eventWithPath([engine]))).toBe(true);
  });

  it('页面内的事件不算内部', () => {
    const { container } = createUi();
    const pageEl = document.createElement('p');
    document.body.appendChild(pageEl);
    expect(isEventInsideUi(container, eventWithPath([pageEl]))).toBe(false);
  });

  it('GetDropRoot 的节点与容器同根', () => {
    const drop = getDropRoot('float');
    const engine = document.createElement('a');
    drop.appendChild(engine);
    const container = document.createElement('div');
    // 跳过 Teleport 容器，直接放到下拉面板同级的 Shadow Root 里
    drop.getRootNode().appendChild(container);
    expect(container.getRootNode()).toBe(engine.getRootNode());
    expect(isEventInsideUi(container, eventWithPath([engine]))).toBe(true);
  });
});
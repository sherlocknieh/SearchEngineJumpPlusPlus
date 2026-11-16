import { describe, expect, it } from 'vitest';
import {
  findShadowSelection,
  getElementSelectionText,
  getSelectedText,
  getSelectionInfo,
  isEditableElement,
} from '../src/core/selection.js';

function input(value, start, end) {
  return { nodeType: 1, tagName: 'INPUT', value, selectionStart: start, selectionEnd: end };
}

function doc(activeElement, selectionText = '') {
  return {
    activeElement,
    getSelection: () => ({
      isCollapsed: !selectionText,
      toString: () => selectionText,
    }),
  };
}

/**
 * 模拟评论组件（B站评论区）把正文放进 open Shadow DOM 后的选区状态：
 * 文档选区被钳制成折叠、文字仍在，真实范围只在 ShadowRoot.getSelection() 上。
 */
function shadowDoc({ text, hostMatches = false, withShadow = true }) {
  const shadowSelection = { isCollapsed: false, toString: () => text };
  const host = { matches: () => hostMatches };
  const shadowRoot = { getSelection: () => shadowSelection, host };
  const hostEl = { shadowRoot };
  const anchorNode = {
    nodeType: 1,
    getRootNode: () => ({ host: null }),
    querySelectorAll: () => (withShadow ? [hostEl] : []),
  };
  const documentSelection = { isCollapsed: true, anchorNode, toString: () => text };
  return {
    doc: { activeElement: null, getSelection: () => documentSelection },
    anchorNode,
    shadowSelection,
    documentSelection,
  };
}

describe('isEditableElement', () => {
  it('识别输入框、文本域与可编辑区域', () => {
    expect(isEditableElement(input('abc', 0, 1))).toBe(true);
    expect(isEditableElement({ nodeType: 1, tagName: 'TEXTAREA' })).toBe(true);
    expect(isEditableElement({ nodeType: 1, tagName: 'DIV', isContentEditable: true })).toBe(true);
  });

  it('忽略普通元素与不支持选区的输入框', () => {
    expect(isEditableElement({ nodeType: 1, tagName: 'DIV' })).toBe(false);
    expect(isEditableElement({ nodeType: 1, tagName: 'INPUT', selectionStart: null })).toBe(false);
    expect(isEditableElement(null)).toBe(false);
  });
});

describe('getElementSelectionText', () => {
  it('按 selectionStart/End 截取输入框内容', () => {
    expect(getElementSelectionText(input('abcdef', 2, 5))).toBe('cde');
    expect(
      getElementSelectionText({
        nodeType: 1,
        tagName: 'TEXTAREA',
        value: 'xy',
        selectionStart: 0,
        selectionEnd: 1,
      }),
    ).toBe('x');
  });

  it('非可编辑元素返回空字符串', () => {
    expect(getElementSelectionText({ nodeType: 1, tagName: 'DIV', value: 'abc' })).toBe('');
    expect(getElementSelectionText(null)).toBe('');
  });
});

describe('getSelectedText', () => {
  it('读取页面选区', () => {
    expect(getSelectedText({ doc: doc(null, 'page text') })).toBe('page text');
  });

  it('默认忽略输入框内的选区', () => {
    expect(getSelectedText({ doc: doc(input('abcdef', 0, 3), '') })).toBe('');
  });

  it('开启 includeInput 后读取输入框内的选区', () => {
    expect(getSelectedText({ includeInput: true, doc: doc(input('abcdef', 0, 3), '') })).toBe(
      'abc',
    );
  });

  it('忽略脚本面板 Shadow DOM 内的选区', () => {
    const anchorNode = {
      getRootNode: () => ({ host: { matches: () => true } }),
    };
    const ownUiDoc = {
      activeElement: null,
      getSelection: () => ({
        isCollapsed: false,
        anchorNode,
        toString: () => 'https://a.test/favicon.ico',
      }),
    };
    expect(getSelectedText({ doc: ownUiDoc })).toBe('');
  });

  it('可编辑区域回退到文档选区', () => {
    const editable = { nodeType: 1, tagName: 'DIV', isContentEditable: true };
    expect(getSelectedText({ includeInput: true, doc: doc(editable, 'editable text') })).toBe(
      'editable text',
    );
  });
});

describe('Shadow DOM 内的选区', () => {
  it('文档选区被钳制时回退到 ShadowRoot 的真实选区', () => {
    const { doc: shadowDocObj, shadowSelection } = shadowDoc({ text: '评论正文' });
    expect(getSelectedText({ doc: shadowDocObj })).toBe('评论正文');
    // 定位要用真实选区：文档选区的范围在钳制后矩形为零
    expect(getSelectionInfo({ doc: shadowDocObj }).selection).toBe(shadowSelection);
  });

  it('找不到 Shadow 选区时仍按文档选区读出文字', () => {
    const { doc: shadowDocObj, documentSelection } = shadowDoc({
      text: '评论正文',
      withShadow: false,
    });
    const info = getSelectionInfo({ doc: shadowDocObj });
    expect(info.text).toBe('评论正文');
    expect(info.selection).toBe(documentSelection);
  });

  it('忽略脚本自己 Shadow DOM 里的选区', () => {
    const { doc: shadowDocObj } = shadowDoc({ text: '面板里的配置文本', hostMatches: true });
    expect(getSelectedText({ doc: shadowDocObj })).toBe('');
  });

  it('嵌套 Shadow Root 时取最内层持有选区的那个', () => {
    const innerSelection = { isCollapsed: false, toString: () => '最内层文字' };
    const innerHost = {};
    const innerRoot = {
      getSelection: () => innerSelection,
      host: innerHost,
      querySelectorAll: () => [],
    };
    innerHost.shadowRoot = innerRoot;
    const outerRoot = {
      getSelection: () => ({ isCollapsed: true, toString: () => '' }),
      host: {},
      querySelectorAll: () => [innerHost],
    };
    const anchorNode = {
      nodeType: 1,
      getRootNode: () => ({ host: null }),
      querySelectorAll: () => [{ shadowRoot: outerRoot }],
    };
    const shadowDocObj = {
      activeElement: null,
      getSelection: () => ({ isCollapsed: true, anchorNode, toString: () => '最内层文字' }),
    };
    expect(findShadowSelection(shadowDocObj)?.selection).toBe(innerSelection);
    expect(getSelectedText({ doc: shadowDocObj })).toBe('最内层文字');
  });
});

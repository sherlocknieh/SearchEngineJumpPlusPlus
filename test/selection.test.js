import { describe, expect, it } from 'vitest';
import {
  getElementSelectionText,
  getSelectedText,
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

  it('可编辑区域回退到文档选区', () => {
    const editable = { nodeType: 1, tagName: 'DIV', isContentEditable: true };
    expect(getSelectedText({ includeInput: true, doc: doc(editable, 'editable text') })).toBe(
      'editable text',
    );
  });
});

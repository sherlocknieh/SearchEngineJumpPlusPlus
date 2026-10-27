// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import {
  applyStylish,
  getElementBySelector,
  getInputTarget,
  getInsertPositionLabel,
  getInsertTarget,
  resolveRuleStyle,
} from '../src/core/applyRule.js';
import { reset } from '../src/core/shadowDom.js';

afterEach(() => {
  reset();
  document.getElementById('SearchMain')?.remove();
  document.querySelector('#sej-input')?.remove();
});

describe('getElementBySelector', () => {
  it('支持 css; 前缀', () => {
    const el = document.createElement('input');
    el.id = 'sej-input';
    document.body.appendChild(el);
    expect(getElementBySelector('css;#sej-input')).toBe(el);
  });

  it('选择器为空或未命中时返回 null', () => {
    expect(getElementBySelector('')).toBeNull();
    expect(getElementBySelector('css;#missing')).toBeNull();
  });
});

describe('目标与位置解析', () => {
  it('getInputTarget 保留函数，getInsertTarget 调用函数', () => {
    const el = document.createElement('div');
    const keyword = () => el;
    expect(getInputTarget({ insertIntoDoc: { keyword } })).toBe(keyword);
    expect(getInsertTarget({ insertIntoDoc: { target: () => el } })).toBe(el);
    expect(getInputTarget(null)).toBeNull();
  });

  it('插入位置统一转成小写', () => {
    expect(getInsertPositionLabel({ insertIntoDoc: { where: 'beforeBegin' } })).toBe('beforebegin');
    expect(getInsertPositionLabel({})).toBeUndefined();
  });
});

describe('resolveRuleStyle', () => {
  it('没有样式时返回空串', () => {
    expect(resolveRuleStyle({}, { center: false })).toBe('');
  });

  it('强制居中时追加覆盖样式', () => {
    const style = resolveRuleStyle({ style: 'margin: 0;' }, { center: true });
    expect(style).toContain('margin: 0;');
    expect(style).toContain('grid-column: 1 / -1');
    expect(style).toContain('justify-self: center');
  });

  it('知乎排版脚本生效时改用备用样式', () => {
    const searchMain = document.createElement('div');
    searchMain.id = 'SearchMain';
    searchMain.style.marginLeft = '150px';
    document.body.appendChild(searchMain);

    const style = resolveRuleStyle(
      { style: 'default: 1;', style_ZhihuChenglinz: 'zhihu: 1;' },
      { center: false },
    );
    expect(style).toBe('zhihu: 1;');
  });
});

describe('applyStylish', () => {
  it('无规则时不抛错，有规则时注入页面样式', () => {
    expect(() => applyStylish({})).not.toThrow();
    expect(() => applyStylish({ stylish: '#sej-container { color: red; }' })).not.toThrow();
  });
});

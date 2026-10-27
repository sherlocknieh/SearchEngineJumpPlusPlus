import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import vueStyleToShadow from '../.build/vueStyleToShadow.js';

const ROOT = process.cwd();
const FILE = path.join(ROOT, 'src/components/Demo.vue');

function transform(code) {
  const plugin = vueStyleToShadow();
  plugin.configResolved({ root: ROOT });
  return plugin.transform(code, FILE);
}

describe('vueStyleToShadow', () => {
  it('删除 style 标签并把 CSS 注入到 script setup', () => {
    const code = `<script setup>
const a = 1;
</script>
<template><div class="a" /></template>
<style>
.a { color: red; }
</style>
`;
    const result = transform(code);
    expect(result).not.toContain('<style>');
    expect(result).toContain('import { addStyle as __sejAddStyle } from "../core/shadowDom.js";');
    expect(result).toContain('__sejAddStyle("\\n.a { color: red; }\\n");');
    expect(result.indexOf('__sejAddStyle')).toBeLessThan(result.indexOf('const a = 1'));
  });

  it('保留多个样式块的顺序', () => {
    const result = transform(`<script setup>const a = 1;</script>
<style>.one { color: red; }</style>
<style>.two { color: blue; }</style>
`);
    expect(result.indexOf('.one')).toBeLessThan(result.indexOf('.two'));
    expect(result.match(/__sejAddStyle\(/g)).toHaveLength(2);
  });

  it('跳过 scoped / lang / src 等无法纯文本注入的样式', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const scoped = transform(`<script setup>const a = 1;</script>
<style scoped>.a { color: red; }</style>
`);
    expect(scoped).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('scoped'));

    const lang = transform(`<script setup>const a = 1;</script>
<style lang="scss">.a { color: red; }</style>
`);
    expect(lang).toBeNull();
    warn.mockRestore();
  });

  it('没有样式块时返回 null', () => {
    expect(transform('<script setup>const a = 1;</script>\n<template><div /></template>')).toBe(
      null,
    );
  });

  it('样式块位于脚本之前时仍能正确注入', () => {
    const code = `<style>.a { color: red; }</style>
<script setup>const a = 1;</script>
`;
    const result = transform(code);
    expect(result).toContain('__sejAddStyle(".a { color: red; }");');
    const scriptIndex = result.indexOf('const a = 1');
    expect(result.indexOf('__sejAddStyle')).toBeLessThan(scriptIndex);
  });

  it('没有 script 时补一个普通 script 块', () => {
    const result = transform('<template><div /></template>\n<style>.a{color:red}</style>');
    expect(result.startsWith('<script>')).toBe(true);
    expect(result).toContain('__sejAddStyle');
  });

  it('语法错误时交给 Vue 插件处理', () => {
    expect(transform('<template><div></template>')).toBeNull();
  });
});

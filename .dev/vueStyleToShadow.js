import path from 'node:path';
import { parse } from '@vue/compiler-sfc';

// 无法按纯文本注入的写法：外链、scoped、CSS Modules、预处理器
const UNSUPPORTED_ATTRS = ['src', 'scoped', 'module', 'lang'];
const STYLE_OPEN = '<style';
const STYLE_CLOSE = '</style>';

/**
 * 把单文件组件里的 <style> 转成运行时 addStyle() 调用。
 *
 * 脚本运行在 Shadow DOM 中，Vue 默认把样式注入 document.head，
 * 而 Shadow Root 内的元素不会应用文档的样式，所以必须改由
 * core/shadowDom.js 的 addStyle() 注入。
 *
 * 做法：用 @vue/compiler-sfc 解析出样式块，按源码偏移删除标签，
 * 再把 addStyle(css) 调用写进组件的 <script> 中。
 *
 * @param {object} [options]
 * @param {string} [options.shadowModule] 提供 addStyle 的模块，相对 Vite root
 */
export default function vueStyleToShadow({ shadowModule = 'src/core/shadowDom.js' } = {}) {
  let importTarget = '';

  return {
    name: 'sej-vue-style-to-shadow',
    enforce: 'pre',

    configResolved(config) {
      importTarget = path.resolve(config.root, shadowModule);
    },

    transform(code, id) {
      if (!id.endsWith('.vue')) return null;

      const { descriptor, errors } = parse(code, { filename: id });
      // 语法错误交给 Vue 插件报告，避免这里抛出二次错误
      if (errors.length) return null;

      const blocks = [];
      for (const style of descriptor.styles) {
        const attrs = Object.keys(style.attrs);
        const unsupported = attrs.filter((attr) => UNSUPPORTED_ATTRS.includes(attr));
        if (unsupported.length) {
          console.warn(`[sej] 跳过 <style ${unsupported.join(' ')}>：仅支持纯 CSS（${id}）`);
          continue;
        }
        if (!style.content.trim()) continue;

        // compiler-sfc 的 loc 只覆盖样式内容，需要向前后扩展到完整标签
        const start = code.lastIndexOf(STYLE_OPEN, style.loc.start.offset);
        const close = code.indexOf(STYLE_CLOSE, style.loc.end.offset);
        if (start === -1 || close === -1) continue;
        blocks.push({ start, end: close + STYLE_CLOSE.length, css: style.content });
      }
      if (!blocks.length) return null;

      const relative = path.relative(path.dirname(id), importTarget).split(path.sep).join('/');
      const importPath = relative.startsWith('.') ? relative : `./${relative}`;
      const injection =
        `\nimport { addStyle as __sejAddStyle } from ${JSON.stringify(importPath)};\n` +
        blocks.map((block) => `__sejAddStyle(${JSON.stringify(block.css)});\n`).join('');

      // 必须注入到 <script setup>：样式要在每次挂载时重新注入，
      // 而模块作用域只会执行一次，reset() 清空样式后重启就会丢失。
      const script = descriptor.scriptSetup || descriptor.script;
      let insertAt = script ? script.loc.start.offset : -1;

      let cleaned = '';
      let cursor = 0;
      for (const block of [...blocks].sort((a, b) => a.start - b.start)) {
        // 样式块位于脚本之前时，插入点需要相应前移
        if (insertAt >= 0 && block.start < insertAt) insertAt -= block.end - block.start;
        cleaned += code.slice(cursor, block.start);
        cursor = block.end;
      }
      cleaned += code.slice(cursor);

      if (insertAt < 0) return `<script>${injection}</script>\n${cleaned}`;
      return cleaned.slice(0, insertAt) + injection + cleaned.slice(insertAt);
    },
  };
}

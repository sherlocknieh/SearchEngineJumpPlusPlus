import path from 'node:path';

const STYLE_RE = /<style\b([^>]*)>([\s\S]*?)<\/style>/g;
const SETUP_SCRIPT_RE = /<script\b[^>]*\bsetup\b[^>]*>/;
const SCRIPT_RE = /<script\b[^>]*>/;
// 无法按纯文本注入的写法：外链、scoped、CSS Modules、预处理器
const UNSUPPORTED_ATTRS = /\bsrc=|\bscoped\b|\bmodule\b|\blang=/;

/**
 * 把单文件组件里的 <style> 转成运行时 addStyle() 调用。
 *
 * 脚本运行在 Shadow DOM 中，Vue 默认把样式注入 document.head，
 * 而 Shadow Root 内的元素不会应用文档的样式，所以必须改由
 * shadow.js 的 addStyle() 注入。
 *
 * 做法：在 Vue 插件编译前取出 <style> 文本，删除原标签，
 * 再把 addStyle(css) 调用写进组件的 <script> 中。
 *
 * @param {object} [options]
 * @param {string} [options.shadowModule] 提供 addStyle 的模块，相对 Vite root
 */
export default function vueStyleToShadow({
  shadowModule = 'src/core/shadowDom.js',
} = {}) {
  let importTarget = '';

  return {
    name: 'sej-vue-style-to-shadow',
    enforce: 'pre',

    configResolved(config) {
      importTarget = path.resolve(config.root, shadowModule);
    },

    transform(code, id) {
      if (!id.endsWith('.vue')) return null;

      const styles = [];
      for (const [, attrs, css] of code.matchAll(STYLE_RE)) {
        if (UNSUPPORTED_ATTRS.test(attrs)) {
          console.warn(`[sej] 跳过 <style${attrs}>：仅支持纯 CSS（${id}）`);
          continue;
        }
        if (css.trim()) styles.push(css);
      }
      if (!styles.length) return null;

      const relative = path
        .relative(path.dirname(id), importTarget)
        .split(path.sep)
        .join('/');
      const importPath = relative.startsWith('.') ? relative : `./${relative}`;

      const injection =
        `\nimport { addStyle as __sejAddStyle } from ${JSON.stringify(importPath)};\n` +
        styles.map((css) => `__sejAddStyle(${JSON.stringify(css)});\n`).join('');

      const cleaned = code.replace(STYLE_RE, '');
      // 必须注入到 <script setup>：样式要在每次挂载时重新注入，
      // 而模块作用域只会执行一次，reset() 清空样式后重启就会丢失。
      const tag = cleaned.match(SETUP_SCRIPT_RE)?.[0] ?? cleaned.match(SCRIPT_RE)?.[0];

      return tag
        ? cleaned.replace(tag, tag + injection)
        : `<script>${injection}</script>\n${cleaned}`;
    },
  };
}

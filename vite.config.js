import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import vueStyleToShadow from './.dev/vueStyleToShadow.js';

const icon = `data:image/svg+xml;base64,${readFileSync(new URL('./src/assets/icon.svg', import.meta.url)).toString('base64')}`;

// `nub run dev` 的调试构建：产物给脚本管理器直接拉取执行，不写进随源码提交的 dist
const devBundle = process.env.SEJ_DEV_BUNDLE === '1';

// https://vite-plugin-monkey.pages.dev/zh/guide/configuration
export default defineConfig({
  build: {
    // dist 里还有随源码提交的 images，只有独立输出目录 .dev/build 才能清空
    outDir: devBundle ? '.dev/build' : 'dist',
    emptyOutDir: devBundle,
    ...(devBundle ? { minify: false } : {}),
  },
  plugins: [
    vue(),
    vueStyleToShadow(), // 使vue组件样式能注入 ShadowRoot
    monkey({
      entry: 'src/main.js',
      build: { fileName: 'SearchEngineJump++.user.js' },
      userscript: {
        // 调试构建用 server: 前缀，与正式版各占一个安装位、可共存
        name: devBundle ? 'server:SearchEngineJump++' : 'SearchEngineJump++',
        namespace: 'https://github.com/sherlocknieh/',
        version: '2026.11.17.2123',
        author: 'sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)',
        description: {
          '': '多引擎快捷跳转 + 划词搜索 + 右键搜图 + 链接标题复制',
          en: 'Quick multi-engine jump, selection search, right-click image search, and link title copy.',
        },
        license: 'MIT',
        icon, // 自动从 src/assets/icon.svg 读取图标
        match: ['*://*/*'],
        connect: ['*'],
        grant: [
          'window.onurlchange',
          'GM_xmlhttpRequest',
          'GM_addValueChangeListener',
          'GM_removeValueChangeListener',
          'GM.getValue',
          'GM.setValue',
          'GM.deleteValue',
          'GM.addValueChangeListener',
          'GM.removeValueChangeListener',
        ],
        noframes: true,
      },
    }),
  ],
});

import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import vueStyleToShadow from './.build/vueStyleToShadow.js';

const icon = `data:image/svg+xml;base64,${readFileSync(new URL('./assets/icon.svg', import.meta.url)).toString('base64')}`;

// `pnpm dev:csp` 的调试构建：产物给脚本管理器直接拉取执行，不写进随源码提交的 dist
const devBundle = process.env.SEJ_DEV_BUNDLE === '1';

// https://vite-plugin-monkey.pages.dev/zh/guide/configuration
export default defineConfig({
  build: {
    // dist 里还有随源码提交的 images，只有独立输出目录 .dev 才能清空
    outDir: devBundle ? '.dev' : 'dist',
    emptyOutDir: devBundle,
    ...(devBundle ? { minify: false } : {}),
  },
  plugins: [
    vue(),
    vueStyleToShadow(), // 使vue组件样式能注入 ShadowRoot
    monkey({
      entry: 'src/main.js',
      server: { mountGmApi: true }, // dev 下挂载 GM_* 全局变量, 使调试时的表现和构建版一致
      build: { fileName: 'SearchEngineJump++.user.js' },
      userscript: {
        name: 'SearchEngineJump++',
        namespace: 'https://github.com/sherlocknieh/',
        version: '2026.11.14.0502',
        author: 'sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)',
        description: {
          '': 'Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。',
          'zh-CN':
            'Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。',
          en: "Fork of MUTED64's SearchEngineJumpPlus, rebuilt with Vue 3 with numerous fixes and a cleaner, faster UI.",
        },
        license: 'MIT',
        icon, // 自动从 assets/icon.svg 读取图标
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
  server: {
    open: true,
    // .dev 放调试构建产物，构建变动不该触发页面刷新
    watch: { ignored: ['**/.dev/**'] },
  },
});

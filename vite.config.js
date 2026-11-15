import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import vueStyleToShadow from './.dev/vueStyleToShadow.js';

const icon = `data:image/svg+xml;base64,${readFileSync(new URL('./src/assets/icon.svg', import.meta.url)).toString('base64')}`;

// `pnpm dev:csp` 的调试构建：产物给脚本管理器直接拉取执行，不写进随源码提交的 dist
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
      server: { mountGmApi: true }, // dev 下挂载 GM_* 全局变量, 使调试时的表现和构建版一致
      build: { fileName: 'SearchEngineJump++.user.js' },
      userscript: {
        // dev 服务下插件会自动加 `server:` 前缀；调试构建显式同名，两套调试流程只占一条安装位
        name: devBundle ? 'server:SearchEngineJump++' : 'SearchEngineJump++',
        namespace: 'https://github.com/sherlocknieh/',
        version: '2026.11.15.2217',
        author: 'sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)',
        description: {
          '': '多引擎快捷跳转：划词即搜、长按/右键图片与链接、以图搜图，内置复制与打开操作；支持一键打开多个引擎、中英界面与配置导入导出。Vue3 重构。',
          'zh-CN':
            '多引擎快捷跳转：划词即搜、长按/右键图片与链接、以图搜图，内置复制与打开操作；支持一键打开多个引擎、中英界面与配置导入导出。Vue3 重构。',
          en: 'One-click engine switching with selection search, long-press/right-click actions on images and links, reverse image search, built-in copy/open actions, multi-engine open, bilingual UI and config import/export. Rebuilt with Vue 3.',
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
  server: {
    open: true,
    // .dev 放调试构建产物，构建变动不该触发页面刷新
    watch: { ignored: ['**/.dev/**'] },
  },
});

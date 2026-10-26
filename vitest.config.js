import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // 油猴 API 在运行时由脚本管理器注入，测试时用内存实现替代
      $: fileURLToPath(new URL('./test/stubs/gm.js', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
  },
});

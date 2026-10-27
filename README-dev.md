
## 开发环境

- 基本环境:
  - [Node.js](https://nodejs.org/)
  - [pnpm](https://pnpm.io/installation)

- 用到的库 (无需手动安装, `pnpm dev` 会自动安装):
  - Vue3
  - [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

- 开始调试

  ```bash
  pnpm dev
  ```

  浏览器打开 `http://localhost:5173` 可实时查看效果。
  开发脚本 (`server:SearchEngineJump++`) 可以和已安装的正式版同时运行，开发版会排在正式版下方，互不遮挡；菜单里开发版显示为「设置菜单（开发版）」。

- 打包构建

  ```bash
  pnpm build
  ```

  构建完成后, 会在 `dist` 目录下找到生成的脚本文件。

- 代码检查与测试
  ```bash
  pnpm lint          # ESLint
  pnpm format        # Prettier 格式化
  pnpm test          # Vitest 单元测试
  ```
  提交前请确保 `pnpm lint && pnpm format:check && pnpm test && pnpm build` 全部通过；
  `dist/` 由源码构建生成，修改源码后需要一并提交重新构建的产物。

## TODO

- [ ] 支持弹窗打开某些搜索引擎, 例如词典引擎
- [ ] 已经显示搜索条的页面也开启划词搜索/利用现有搜索条优先搜索划词选中的内容;


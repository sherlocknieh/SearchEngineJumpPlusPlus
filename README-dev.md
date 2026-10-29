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
  pnpm dev --host

  # 浏览器打开 `http://localhost:5173` 可实时查看效果。
  # 使用 `--host` 将开发环境开放到外部网络，实现远程调试。
  ```

- 打包构建与发布

  ```bash
  # 每次提交都先到 vite.config.js 中修改版本号 (YYYY.MM.DD.N), 然后执行:
  pnpm lint && pnpm test
  pnpm build
  ```

  构建完成后, 会在 `dist` 目录下找到生成的脚本文件。

  本仓库按「每次提交即发布」执行: 源码、版本号与 `dist` 产物放在同一个提交里,
  提交信息注明发布版本号, 再打 `vYYYY.MM.DD.N` 标签并推送分支与标签。

- 代码检查与测试
  ```bash
  pnpm lint          # ESLint
  pnpm format        # Prettier 格式化
  pnpm test          # Vitest 单元测试
  ```

## TODO

- [ ] 支持弹窗打开某些搜索引擎, 例如词典引擎
- [ ] 已经显示搜索条的页面也开启划词搜索/利用现有搜索条优先搜索划词选中的内容;
- [ ] 一键搜索按钮的触发区域太小, 需要扩大
- [ ] 增加一类特殊引擎栏, 提供非搜索类快捷功能: 复制/打开链接/翻译

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

  本仓库按「每次提交即发布」执行。版本号由 `scripts/release.mjs` 按系统日期时间
  自动生成 (`YYYY.MM.DD.HHmm`), 无需手工修改; 同一分钟内重复发布或系统时间回拨时,
  会顺延到更大的分钟, 保证版本号始终递增。

  ```bash
  # 一键发布: 升版本号 -> lint -> test -> build -> commit -> tag
  pnpm release "feat: 本次改动说明"

  # 发布并推送分支与标签到 origin
  pnpm release "fix: 本次改动说明" --push

  # 只预览将要使用的版本号, 不做任何修改
  pnpm release --dry-run
  ```

  发布成功后, 源码、`vite.config.js` 中的版本号与 `dist/SearchEngineJump++.user.js`
  在同一个提交里, 并附带 `vYYYY.MM.DD.HHmm` 标签。

  单独执行 `pnpm build` 只重新构建产物, 不会改动版本号, 仅供调试或本地验证使用。

- 代码检查与测试
  ```bash
  pnpm lint          # ESLint
  pnpm format        # Prettier 格式化
  pnpm test          # Vitest 单元测试
  ```

## TODO

- [ ] 支持弹窗打开某些搜索引擎, 例如词典引擎
- [ ] 已经显示搜索条的页面也支持划词搜索/利用现有搜索条优先搜索划词选中的内容;
- [x] 一键搜索按钮的触发区域太小, 需要扩大
- [x] 增加一类特殊引擎栏, 提供非搜索类快捷功能: 复制/打开链接

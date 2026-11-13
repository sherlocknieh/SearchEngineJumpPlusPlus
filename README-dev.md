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

- dev 版的注入方式与构建版不同：它往页面插入外部 module 脚本
  (`http://localhost:5173/__vite-plugin-monkey.entry.js`)。
  站点 CSP 的 `script-src` 不含该地址时浏览器会直接拒绝加载，脚本完全不运行
  （控制台报 `Loading the script ... violates the following Content Security Policy directive`）。

- 严格 CSP 站点用 `pnpm dev:csp` 调试

  这套流程页面不加载任何外部脚本：`pnpm dev:csp` 一边 watch 构建自包含产物到 `.dev/`，
  一边起本地服务（默认 `http://127.0.0.1:5180`，可用 `--port` 或 `SEJ_DEV_PORT` 改），
  由脚本管理器直接拉取产物并在自己的沙箱里执行，因此不受站点 CSP 限制。

  ```bash
  pnpm dev:csp            # watch 构建 + 本地服务
  pnpm dev:csp --port 5181
  ```

  1. 首次打开 `http://127.0.0.1:5180/install.user.js` 安装 `SearchEngineJump++ (dev)`。
     脚本名带 (dev)，与正式版共存；两者共用同一份配置，宿主 id 也不冲突。
  2. 之后任意页面都会自动加载最新产物，代码改动会重建并整页刷新（替代 HMR）。
  3. 脚本管理器需允许 eval（Tampermonkey / Violentmonkey 默认允许）；
     把注入方式设成“页面上下文”会重新受站点 CSP 限制。

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

## 项目索引

模块职责、启动/跳转/设置/图标等调用链路，以及「常见任务 → 该读哪些文件」，见根目录 [AGENTS.md](./AGENTS.md)。

## TODO

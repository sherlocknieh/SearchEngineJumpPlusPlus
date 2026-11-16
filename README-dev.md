## 开发环境

- 基本环境:
  - [Node.js](https://nodejs.org/)
  - [nub](https://nubjs.com/)（包管理与脚本运行，已替代 pnpm）

- 用到的库 (由 `nub install` 安装):
  - Vue3
  - [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)

- 开始调试

  ```bash
  nub run dev
  nub run dev --host

  # 浏览器打开 `http://localhost:5173` 可实时查看效果。
  # 使用 `--host` 将开发环境开放到外部网络，实现远程调试。
  ```

- dev 版的注入方式与构建版不同：它往页面插入外部 module 脚本
  (`http://localhost:5173/__vite-plugin-monkey.entry.js`)。
  管理器里装的是 `server:SearchEngineJump++`，和 `nub run dev:csp` 同名，切换调试方式只会替换这一条。
  站点 CSP 的 `script-src` 不含该地址时浏览器会直接拒绝加载，脚本完全不运行
  （控制台报 `Loading the script ... violates the following Content Security Policy directive`）。

- 严格 CSP 站点用 `nub run dev:csp` 调试

  这套流程页面不加载任何外部脚本：`nub run dev:csp` 一边 watch 构建自包含产物到 `.dev/build/`，
  一边起本地服务（默认 `http://127.0.0.1:5180`，可用 `--port` 或 `SEJ_DEV_PORT` 改），
  由脚本管理器直接拉取产物并在自己的沙箱里执行，因此不受站点 CSP 限制。

  ```bash
  nub run dev:csp            # watch 构建 + 本地服务，并自动用系统默认浏览器打开安装页
  nub run dev:csp --port 5181
  nub run dev:csp --no-open  # 不自动开浏览器
  ```

  1. 服务就绪后会自动用系统默认浏览器打开 `http://127.0.0.1:5180/install.user.js`
     （不是 VS Code 内部浏览器），脚本管理器接管后直接弹出安装框，
     确认安装 `server:SearchEngineJump++` 即可。
     两套调试流程共用这个脚本名，管理器里只保留一条；它与正式版共存，共用同一份配置，宿主 id 也不冲突。
  2. 之后每次打开/刷新页面都会拉取最新产物；改完代码等重建完成后手动刷新即可（不再自动刷新）。
  3. 脚本管理器需允许 eval（Tampermonkey / Violentmonkey 默认允许）；
     把注入方式设成“页面上下文”会重新受站点 CSP 限制。

  插件官方给的办法是装 [Disable-CSP](https://github.com/lisonge/Disable-CSP) 扩展全局关掉 CSP，
  会对所有站点生效、有安全代价；本地服务方案只影响调试脚本自己的加载路径。
  Chrome 142 起，这个加载请求会被算在当前页面来源上，每个站点首次会弹一次
  「本地网络访问」授权（弹窗里显示的是站点名），点「允许」后该站点不再提示；
  点「屏蔽」会导致拉取产物失败、调试脚本不工作。

- 打包构建与发布

  本仓库按「每次提交即发布」执行。版本号由 `.dev/release.mjs` 按系统日期时间
  自动生成 (`YYYY.MM.DD.HHmm`), 无需手工修改; 同一分钟内重复发布或系统时间回拨时,
  会顺延到更大的分钟, 保证版本号始终递增。

  ```bash
  # 一键发布: 升版本号 -> lint -> test -> build -> commit -> tag
  nub run release "feat: 本次改动说明"

  # 发布并推送分支与标签到 origin
  nub run release "fix: 本次改动说明" --push

  # 只预览将要使用的版本号, 不做任何修改
  nub run release --dry-run
  ```

  发布成功后, 源码、`vite.config.js` 中的版本号与 `dist/SearchEngineJump++.user.js`
  在同一个提交里, 并附带 `vYYYY.MM.DD.HHmm` 标签。

  每次提交都必须走这条命令: 发布脚本本身就是提交入口, 不要先 `git commit` 再补发布。
  推送到远端时带上 `--push`, 让分支与标签同步。

  单独执行 `nub run build` 只重新构建产物, 不会改动版本号, 仅供调试或本地验证使用。

- 代码检查与测试
  ```bash
  nub run lint          # ESLint
  nub run format        # Prettier 格式化
  nub run test          # Vitest 单元测试
  ```

## 项目索引

模块职责、启动/跳转/设置/图标等调用链路，以及「常见任务 → 该读哪些文件」，见根目录 [AGENTS.md](./AGENTS.md)。

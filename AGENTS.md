# SearchEngineJump++ 项目索引

面向后续改动的速查表：先看这里定位文件，再按需读源码，避免每次从头扫全仓库。
结构变化时同步更新本文件。

## 快速命令

```bash
pnpm dev            # 开发调试（浏览器打开 http://localhost:5173）
pnpm dev:csp        # 严格 CSP 站点的调试（watch 构建 + 本地服务，管理器直连拉取产物）
pnpm build          # 只重新构建 dist，不动版本号
pnpm lint           # ESLint
pnpm test           # Vitest（happy-dom，仅测 JS 模块，不编译 .vue）
pnpm release "feat: xxx" --push   # 每次提交即发布：升版本 → lint → test → build → commit → tag → push

# 版本号由 scripts/release.mjs 按系统时间生成，不要手改 vite.config.js
```

## 运行链路（启动 → 挂载）

```
src/main.js                 只做装配
└─ app/start.js             顶栏页面才运行；initStorage → registerMenu → armStart
   ├─ 命中站点规则 → boot()（延迟站点见 app/delay.js）
   └─ 未命中 → 只开启划词懒启动（首次划词/菜单才 boot）
   └─ app/lifecycle.js      boot(): teardown → Shadow DOM → 全局样式 → 暗色 → 挂 App
      ├─ App(role=main)     JumpBar + SettingPanel(v-if) + Toast，挂在 sej-shadow-host
      └─ App(role=float)    ensureFloatBar() 单独挂载划词条，挂在 sej-shadow-host-float
         └─ JumpBar.vue     role 决定挂载位置：main 找输入框/插入点，float 固定浮层
```

- **SPA 路由**：`app/urlChange.js` 监听 `urlchange`，规则未变且 `barMounted` 时不重建，只刷新 `settings.activeRule`。
- **重启**：设置保存后 `core/appControl.js` → `lifecycle.restart()`（整棵 Vue 应用重建）。
- **多实例**：开发版/正式版用不同 host id 共存，层叠偏移在 `core/shadowDom.js`；
  同一版本被重复安装时（如 dev 与 dev:csp 并存），后启动的实例检测到同 id 宿主来自别的安装，直接跳过挂载。
- **划词条独立**：`float` 宿主是独立 Vue 应用，划词/长按操作模式只影响它，站点内嵌条保持原位。

## 设置数据链路

| 层         | 文件                                                           | 职责                                                                                         |
| ---------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 唯一形状   | `core/configSchema.js`                                         | `createDefaultConfig` / `normalizeConfig` / `serializeConfig` / `readConfig` / `OPTION_KEYS` |
| 字段规范化 | `core/configData.js`                                           | `normalizeEngine`、`normalizeCategories`、动作引擎 `copy/open`、内置分类                     |
| 存储       | `core/storage.js`                                              | 读写、变更监听、时间戳、`pullLatest`                                                         |
| 存储后端   | `core/storageBackend.js`                                       | GM API 与 localStorage 探测/读写                                                             |
| 运行时单例 | `stores/settings.js`                                           | `useSettings()`：`settingData`、`getMatchedRule()`、`savePartial()`、`reload()`              |
| 面板       | `components/SettingPanel.vue`                                  | 外壳：草稿、自动保存、拖拽、弹窗、快捷键                                                     |
| 跨标签页   | `app/settingsSync.js` + `composables/useRemoteSettingsSync.js` | 其他页面保存后同步/冲突提示                                                                  |

设置面板拆分的 composable（都在 `src/composables/`）：

- `useSettingsDraft` 草稿树（分类/引擎 + `_id`），保存时 `serializeConfig`
- `useAutoSave` 节流自动保存（文本输入仍显式提交）
- `useConfigIO` 配置文件编辑器：文本预览、文件导入、合并预览、导出
- `useSettingsDialogs` 分类/引擎弹窗的增删改
- `useUndoDelete` 删除后可撤销（最多 20 条，Ctrl+Z）
- `useDragSort` + `composables/drag/*` 拖拽排序（几何/FLIP/幽灵/自动滚动）
- `useRemoteSettingsSync` 跨标签页草稿同步

## 跳转链路

- 取词：`core/selection.js`（文档选区 + 输入框 `selectionStart/End`）
- 划词时机：`core/selectionGesture.js` 记录左键是否按住，拖动过程中不弹条，松手后才显示
- 执行：`core/jump.js`
  - `prepareJump`：`%s` 全量替换为 `encodeURIComponent(关键词)`；`$post$` 走表单提交
  - `performJump` / `openAllEngines`
  - 打开方式：引擎未配置 `target` 时跟随设置项 `defaultOpenTarget`（默认新标签页）；
    批量打开始终强制新标签页
  - 动作引擎：`action: 'copy' | 'open'`
- 当前站点适配：`data/matchRule.js` 按 host 建索引 → `JumpBar` 决定输入框与插入点

## 长按 / 右键操作（图片搜图、链接操作）

- 入口：`app/contextMenu.js` 在 `document` 捕获阶段识别长按手势（`LONG_PRESS_MS` 内无位移），
  只注册一次；懒启动时先 `openContextAction()` 再 `requestBoot`，保证挂载时能读到命中状态
- 右键：同样弹出跳转条，但**不拦截原生菜单**（不 `preventDefault`），两者并存；
  跳转条自身的右键直接放行，避免浮层里再弹一次
- 命中优先级：图片优先于链接（链接里常包着图片）；
  链接只接受 http(s)、mailto、tel，页内锚点与 `javascript:` 不接管
- 判定：`core/contextAction.js` 汇总模式配置与长按判定（`isLongPressMove` 位移超阈值取消）；
  图片解析在 `core/imageSearch.js`（`<img>` 的 `currentSrc` → `src` → 懒加载 `data-*`，
  再向上 4 层找 `background-image`），链接解析在 `core/linkAction.js`（返回 `{ url, text, element }`）
- 引擎来源：`getContextEngines(settingData, mode)` 过滤隐藏项与空项；
  图片模式取「搜图」分类（`IMAGE_CATEGORY_KEY = 'image'`），链接模式取「操作」分类
  （复制 / 打开）；没有可用引擎时该模式不接管
- 呈现：复用跳转条，`stores/contextAction.js` 提供 `{ active, mode, keyword, url, element }`；
  开启「跟随选区」时与划词条共用简洁/极简形态（极简下收起为图标），关闭时整条展开；
  点击外部/Escape 关闭，滚动时继续跟随命中的元素，跳转或「一键打开」后自动收起
- 动作目标：`contextActionTarget(mode, action, hit)` 统一决定复制内容与打开地址——
  图片模式「复制」复制图片本身（取不到时回退地址）、「打开」新标签打开图片；
  链接模式「复制」复制为 Markdown 链接 `[标题](链接)`、「打开」新标签打开链接（纯图片链接没有标题时只复制地址）
- 可见性：`isBarCategoryVisible` 决定分类是否上跳转条——图片模式显示「搜图」分类，
  并允许「操作」分类按显示开关出现；链接模式只显示「操作」；
  普通模式按显示开关决定且永不显示「搜图」分类
- 模式切换：长按可能发生在跳转条已挂载之后，`JumpBar` 监听命中模式的变化，
  切换时刷新关键词、锚点与显隐，无需重建 Vue 应用

## 站点适配（新增站点只改这里）

- `src/data/sites/*.js` 被 `import.meta.glob` 自动收录，文件名参与排序，无需注册
- 规则字段：`enabled` / `url`(RegExp) / `hosts` / `hostSuffixes` / `hostPattern` /
  `insertIntoDoc{keyword,target,where}` / `style` / `stylish` / `patches` / `wrapperClass` /
  `selectSearchPriority`
- 选择器与样式解析：`core/applyRule.js`
- 命中失败或站点改版 → 内嵌条不渲染，划词交给独立的划词条（`float` 宿主）

## 引擎链接解析（自动补 `%s`）

- `core/engineUrl.js`
  - URL 推断：`withProtocol` / `titleFromUrl` / `faviconFromUrl` / `hostFromUrl` / `registrableDomain` / `normalizeKeywordUrl`
  - 模板解析：`analyzeSearchUrl(raw)` → `{ url, status }`，`status`：
    `ready`（已是 `%s`/`$post$`）、`replaced`（本次替换成功）、`manual`（未能自动替换，提示手动）、`plain`（空输入）
  - `searchTemplateFromUrl()` = `analyzeSearchUrl().url`
  - 识别顺序：站点规则（`SITE_RULES`）→ 通用搜索路径 + 参数名 → 路径规则（`PATH_RULES`）
- `components/EngineEditDialog.vue`：仅在链接输入框失焦时套用，Toast 提示（`stores/ui.js showToast`）
- 回归用例在 `test/engineUrl.test.js`，含「默认引擎模板往返解析」批量检查；新增默认引擎若解析不出会失败

## 图标

- `core/favicon.js`：`resolveFavicon` / `embedFavicon` / `toWebpIcon`（超 64KB 先压缩）
- `composables/useEngineIcons.js`：设置面板批量内嵌、保存后后台补图标
- `composables/useEngineIconPreview.js`：编辑弹窗多来源并行预览/取消/上传
- `core/configSchema.js` 的 `configToText`：导出/预览时剔除 `faviconData`，只保留图标地址

## Shadow DOM 与样式

- `core/shadowDom.js`：按角色（`main` / `float`）多宿主、`addStyle` 广播、层叠偏移、`reset`；
  子组件通过 `inject(HOST_ROLE_KEY)` 取所属宿主（`getDropRoot` / `getHost`）
- 划词条定位：`core/floatPlacement.js` 的 `placeAboveRect`（锚点正上方，放不下翻到下方；
  文字/链接左对齐贴文字开头、图片居中）、`placeInlineIcon`（极简模式收起时图标贴在同一行开头，
  左侧放不下压住开头），
  跟随选区时由 JumpBar 写入内联坐标；
  滚动时重新量锚点矩形继续跟随，锚点消失（选区清空/图片移除）才回到顶部居中
- `.build/vueStyleToShadow.js`：把 SFC `<style>` 改写为 `addStyle()`（脚本在 Shadow Root 内，document 样式不生效）
- 面板样式：`components/settingPanelStyles.js` 按 shell → list → footer → controls → dialogs 顺序拼接
- `composables/useEventIsolation.js`：面板内的指针/键盘事件在 mask 处截断，避免触发页面自身监听器
- 需要监听 document 时注意：阴影事件会重定向，用 `e.composedPath()`；面板已截断冒泡，必要时用捕获阶段
- 判断事件是否属于 UI 内用 `isEventInsideUi(el, e)`：下拉面板 Teleport 到 `#sej-drop-lists`，不在 `el` 子树内，只能按 Shadow Root 归属判断

## UI 状态与提示

- `stores/ui.js`：`ui` 响应式状态、`showToast(text, duration, action, { priority })`、`openSettingPanel`
- `components/Toast.vue` 挂在 `App.vue`，用 popover 进入 top layer：页面把 z-index 拉满（广告层）时提示仍可见可点
- 所有文案走 `assets/i18n.js` 的 `t(key, params)`（`{name}` 插值），中英文在 `assets/messages.js`

## 常见任务 → 先读哪些文件

| 任务                | 阅读顺序                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| 改跳转条外观/交互   | `JumpBar.vue` → `composables/useBarViewport` / `useScrollDrag` / `useStackSync` → `components/EngineCategory.vue` |
| 改设置面板          | `SettingPanel.vue` → 对应 `composables/useSettings*` → `components/styles/*.css`                               |
| 加站点适配          | `data/sites/<站名>.js`（照抄 `bing.js`/`zhihu.js`）→ `core/applyRule.js`                                       |
| 改跳转/取词         | `core/jump.js` → `core/selection.js` → `core/selectionGesture.js` → `JumpBar.getCurrentKeyword`                |
| 改配置格式/导入导出 | `core/configSchema.js` → `configData.js` → `useConfigIO.js` → `configMerge.js`                                 |
| 改存储/同步         | `core/storage.js` → `storageBackend.js` → `app/settingsSync.js`                                                |
| 改引擎链接解析      | `core/engineUrl.js` → `EngineEditDialog.vue` → `test/engineUrl.test.js`                                        |
| 改图标获取          | `core/favicon.js` → `useEngineIcons` / `useEngineIconPreview`                                                  |
| 改弹窗行为          | `composables/useModalA11y.js` + 对应 `*Dialog.vue`                                                             |
| 改长按/右键操作    | `app/contextMenu.js` → `core/contextAction.js` → `core/imageSearch.js` / `core/linkAction.js` → `JumpBar.vue` |
| 发布                | `scripts/release.mjs`；构建入口 `vite.config.js`（userscript 元数据在这里）                                    |

## 测试索引（`test/`，纯 JS）

`applyRule` `configMerge` `configSchema` `csp` `darkMode` `dragGeometry` `dragGhost` `dragOrder`
`engineUrl` `eventIsolation` `favicon` `imageSearch` `contextAction` `linkAction` `jump` `matchRule` `performJump` `selection` `sharedPointer`
`selectionGesture` `shadowDom` `storage` `storageBackend` `ui` `urlChange` `useAutoSave` `useEngineIconPreview` `useEngineIcons`
`useBarViewport` `useModalA11y` `vueStyleToShadow` `jumpBarComposables` `settingPanelComposables`

> Vitest 未接入 Vue 插件，`.vue` 组件不能直接挂载测试；可测试逻辑请放 `core/` 或 `composables/`。

## 约定与坑

- `%s` 是关键词占位符（可多次出现），不要做 URL 编码，否则替换逻辑失效
- 所有配置读写必须经过 `configSchema` / `configData`，避免多处解释不一致
- 新增默认引擎：`src/data/engines.json`；新增站点适配：`src/data/sites/`
- 内置分类（`actions` / `image`）不可删除，`isBuiltinCategory` 统一判断；`image` 分类缺失时由 `normalizeConfig` 补回，
  且始终视为显示、只出现在图片模式（`isBarCategoryVisible`）
- 删除操作默认走 `useUndoDelete`（可撤销）
- 站点用 `user-select: none` 禁止选字时（如 sex.com 的 `select-none md:select-auto`，窄视口整体不可选），
  浏览器压根不产生选区，脚本只能读到空文本；这类「划词没反应」先查目标元素的 `user-select` 计算值
- `pnpm dev` 靠页面加载 `localhost:5173` 的模块脚本注入，严格 CSP 的站点会直接拦掉
  （控制台报 violates CSP）；这类站点改用 `pnpm dev:csp`，产物输出到 `.dev/`，
  由脚本管理器拉取执行，页面不加载外部脚本
- 版本号、`dist/` 产物由 `pnpm release` 统一生成，手动构建后不要把 dist 混进无关提交
- 发布前会跑 lint/test，改完先本地 `pnpm test`

# SearchEngineJump++ 项目索引

面向后续改动的速查表：先看这里定位文件，再按需读源码，避免每次从头扫全仓库。
结构变化时同步更新本文件。

## 快速命令

```bash
pnpm dev            # 开发调试（浏览器打开 http://localhost:5173）
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
      └─ App.vue            JumpBar + SettingPanel(v-if) + Toast
         └─ JumpBar.vue     initTargets（找输入框/插入点）→ injectHost（移动 shadow host）
```

- **SPA 路由**：`app/urlChange.js` 监听 `urlchange`，规则未变且 `barMounted` 时不重建，只刷新 `settings.activeRule`。
- **重启**：设置保存后 `core/appControl.js` → `lifecycle.restart()`（整棵 Vue 应用重建）。
- **多实例**：开发版/正式版用不同 host id 共存，层叠偏移在 `core/shadowDom.js`。

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
- 执行：`core/jump.js`
  - `prepareJump`：`%s` 全量替换为 `encodeURIComponent(关键词)`；`$post$` 走表单提交
  - `performJump` / `openAllEngines`
  - 打开方式：引擎未配置 `target` 时跟随设置项 `defaultOpenTarget`（默认新标签页）；
    批量打开始终强制新标签页
  - 动作引擎：`action: 'copy' | 'open'`
- 当前站点适配：`data/matchRule.js` 按 host 建索引 → `JumpBar` 决定输入框与插入点

## 站点适配（新增站点只改这里）

- `src/data/sites/*.js` 被 `import.meta.glob` 自动收录，文件名参与排序，无需注册
- 规则字段：`enabled` / `url`(RegExp) / `hosts` / `hostSuffixes` / `hostPattern` /
  `insertIntoDoc{keyword,target,where}` / `style` / `stylish` / `patches` / `wrapperClass` /
  `selectSearchPriority`
- 选择器与样式解析：`core/applyRule.js`
- 命中失败或站点改版 → `JumpBar.initTargets` 自动回退到划词模式

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

## Shadow DOM 与样式

- `core/shadowDom.js`：host id、`addStyle`、层叠偏移、`reset`
- `.build/vueStyleToShadow.js`：把 SFC `<style>` 改写为 `addStyle()`（脚本在 Shadow Root 内，document 样式不生效）
- 面板样式：`components/settingPanelStyles.js` 按 shell → list → footer → controls → dialogs 顺序拼接
- `composables/useEventIsolation.js`：面板内的指针/键盘事件在 mask 处截断，避免触发页面自身监听器
- 需要监听 document 时注意：阴影事件会重定向，用 `e.composedPath()`；面板已截断冒泡，必要时用捕获阶段

## UI 状态与提示

- `stores/ui.js`：`ui` 响应式状态、`showToast(text, duration, action, { priority })`、`openSettingPanel`
- `components/Toast.vue` 挂在 `App.vue`，z-index 高于设置面板遮罩
- 所有文案走 `assets/i18n.js` 的 `t(key, params)`（`{name}` 插值），中英文在 `assets/messages.js`

## 常见任务 → 先读哪些文件

| 任务                | 阅读顺序                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| 改跳转条外观/交互   | `JumpBar.vue` → `composables/useFixedTop` / `useScrollDrag` / `useStackSync` → `components/EngineCategory.vue` |
| 改设置面板          | `SettingPanel.vue` → 对应 `composables/useSettings*` → `components/styles/*.css`                               |
| 加站点适配          | `data/sites/<站名>.js`（照抄 `bing.js`/`zhihu.js`）→ `core/applyRule.js`                                       |
| 改跳转/取词         | `core/jump.js` → `core/selection.js` → `JumpBar.getCurrentKeyword`                                             |
| 改配置格式/导入导出 | `core/configSchema.js` → `configData.js` → `useConfigIO.js` → `configMerge.js`                                 |
| 改存储/同步         | `core/storage.js` → `storageBackend.js` → `app/settingsSync.js`                                                |
| 改引擎链接解析      | `core/engineUrl.js` → `EngineEditDialog.vue` → `test/engineUrl.test.js`                                        |
| 改图标获取          | `core/favicon.js` → `useEngineIcons` / `useEngineIconPreview`                                                  |
| 改弹窗行为          | `composables/useModalA11y.js` + 对应 `*Dialog.vue`                                                             |
| 发布                | `scripts/release.mjs`；构建入口 `vite.config.js`（userscript 元数据在这里）                                    |

## 测试索引（`test/`，纯 JS）

`applyRule` `configMerge` `configSchema` `csp` `darkMode` `dragGeometry` `dragGhost` `dragOrder`
`engineUrl` `eventIsolation` `favicon` `jump` `matchRule` `performJump` `selection` `sharedPointer`
`storage` `storageBackend` `ui` `urlChange` `useAutoSave` `useEngineIconPreview` `useEngineIcons`
`useFixedTop` `useModalA11y` `vueStyleToShadow` `jumpBarComposables` `settingPanelComposables`

> Vitest 未接入 Vue 插件，`.vue` 组件不能直接挂载测试；可测试逻辑请放 `core/` 或 `composables/`。

## 约定与坑

- `%s` 是关键词占位符（可多次出现），不要做 URL 编码，否则替换逻辑失效
- 所有配置读写必须经过 `configSchema` / `configData`，避免多处解释不一致
- 新增默认引擎：`src/data/engines.json`；新增站点适配：`src/data/sites/`
- 删除操作默认走 `useUndoDelete`（可撤销）
- 版本号、`dist/` 产物由 `pnpm release` 统一生成，手动构建后不要把 dist 混进无关提交
- 发布前会跑 lint/test，改完先本地 `pnpm test`

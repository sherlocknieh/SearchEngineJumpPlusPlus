# 项目约定

## 提交与发布流程

本仓库按「每次提交即发布」执行，提交前必须按顺序完成：

1. **先更新版本号**：修改 [vite.config.js](../vite.config.js) 中 `userscript.version`，格式为 `YYYY.MM.DD.N`；同一天多次发布时递增末位 `N`。
2. **校验**：执行 `pnpm lint` 与 `pnpm test`。
3. **构建**：执行 `pnpm build`（或 `npx vite build`），生成 [dist/SearchEngineJump++.user.js](../dist/SearchEngineJump++.user.js)。
4. **核对产物**：确认构建产物头部 `@version` 与 `vite.config.js` 中的版本号一致。
5. **单次提交**：源码、`vite.config.js`、`dist/SearchEngineJump++.user.js` 放在同一个提交里，提交信息使用 Conventional Commits（如 `feat: ...`、`fix: ...`），并在正文注明发布版本号。
6. **打标签并推送**：创建 `vYYYY.MM.DD.N` 形式的标签，推送分支与标签到 `origin`。

注意：

- `dist` 目录随源码提交，必须与源码同一次提交更新，不要单独提交或遗漏。
- 不要手工编辑 `dist` 构建产物。
- 发布流程或构建方式变更时，同步更新 [README-dev.md](../README-dev.md)。

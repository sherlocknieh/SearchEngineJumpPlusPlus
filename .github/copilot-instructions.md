# 项目约定

## 提交与发布流程

本仓库按「每次提交即发布」执行，功能改动完成后一律通过发布脚本提交：

```bash
pnpm release "feat: 改动说明"          # 升版本号 -> lint -> test -> build -> commit -> tag
pnpm release "fix: 改动说明" --push    # 额外推送分支与标签到 origin
```

脚本 [scripts/release.mjs](../scripts/release.mjs) 会依次完成：

1. **生成版本号**：按系统本地日期时间写入 [vite.config.js](../vite.config.js) 的 `userscript.version`，格式为 `YYYY.MM.DD.HHmm`（如 `2026.10.29.1547`）；同一分钟重复发布或系统时间回拨时自动顺延，保证递增。
2. **校验**：执行 `pnpm lint` 与 `pnpm test`。
3. **构建**：执行 `pnpm build`，生成 [dist/SearchEngineJump++.user.js](../dist/SearchEngineJump++.user.js)。
4. **核对产物**：确认构建产物头部 `@version` 与 `vite.config.js` 一致，不一致则失败并还原配置。
5. **单次提交**：源码、`vite.config.js`、`dist` 产物放在同一个提交里，提交信息遵循 Conventional Commits（`feat: ...`、`fix: ...`），正文注明发布版本号。
6. **打标签**：创建 `vYYYY.MM.DD.HHmm` 标签；`--push` 时推送分支与标签。

注意：

- 不要手工修改版本号，也不要手工编辑 `dist` 构建产物。
- 脚本任一步失败都会还原 `vite.config.js`，修复后重新执行即可。
- `dist` 目录随源码提交，必须与源码同一次提交更新，不要单独提交或遗漏。
- 发布流程或构建方式变更时，同步更新 [README-dev.md](../README-dev.md)。

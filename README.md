# SearchEngineJumpPlusPlus 搜索引擎快捷跳转++

多搜索引擎快捷跳转的最佳脚本, 现在焕然一新。

本项目 Fork 自 MUTED64 的 [SearchEngineJumpPlus](https://github.com/MUTED64/SearchEngineJumpPlus)。

用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。

安装地址: 

- [GitHub](https://github.com/sherlocknieh/SearchEngineJumpPlusPlus/raw/main/dist/SearchEngineJump++.user.js)

## 新版效果

### 主界面

![主界面](images/jumpbar.png)

### 设置界面

![设置界面](images/settings.png)

### 导出设置

![设置导出界面](images/export.png)


## TODO
- [x] 设置保存优化: 发生重要编辑时自动保存, 比如添加/删除/修改搜索引擎, 或调整排序时, 但是不在每次修改输入框内容时保存, 以减少频繁的写入操作
- [x] 优化拖动排序: 设置界面拖动元素到目标位置时展示其他元素被挤到新位置的过程
- [ ] 设置界面优化: 调整设置按钮位置, 增加设置按钮的图标, 增加设置按钮的悬浮提示
    - [ ] 分类面板的标题应居中显示
- [ ] 配置文件优化: 精简不必要的字段, 版本字段改用日期格式, 导出文件名固定为 `SearchEngineJump.json`
- [ ] 优化图标获取逻辑: 支持本地上传, 辅助用户搜索图标(https://convertico.com/)
    - [ ] 图标默认填写的链接不必包含 www 前缀

- [ ] 支持复刻已存在的搜索引擎: 用户可以在设置界面复制已存在的搜索引擎, 以快速添加新的搜索引擎


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
# Project Structure

```text
image-sifter/
  README.md
  CHANGELOG.md
  LICENSE
  package.json
  package-lock.json
  docs/
    PRD.md
    TECH_ARCHITECTURE.md
    PROJECT_STRUCTURE.md
    DEV_LOG.md
    superpowers/
      plans/
        2026-05-31-image-sifter-mvp.md
  src/
    main/
      main.js
      preload.js
    renderer/
      index.html
      styles.css
      app.js
    shared/
      imageFiles.js
      navigator.js
  tests/
    imageFiles.test.js
    navigator.test.js
```

## 根目录

- `README.md`：项目介绍、安装、运行和使用说明。
- `CHANGELOG.md`：面向用户的变更记录。
- `LICENSE`：MIT 开源许可证。
- `package.json`：项目脚本和依赖声明。
- `package-lock.json`：依赖锁定文件，保证安装结果可复现。

## docs

- `PRD.md`：产品需求说明。
- `TECH_ARCHITECTURE.md`：技术实现说明。
- `PROJECT_STRUCTURE.md`：目录和关键文件用途说明。
- `DEV_LOG.md`：开发过程记录。
- `superpowers/plans/`：实现计划。

## src/main

Electron 主进程代码。负责窗口、本地文件系统访问、文件夹选择、回收站删除。

## src/renderer

用户界面代码。负责展示图片、按钮状态、快捷键、进度和错误提示。

## src/shared

主进程和测试都可以复用的纯逻辑。这里不依赖 Electron，便于测试。

## tests

核心逻辑测试，覆盖图片格式筛选和浏览索引变化。

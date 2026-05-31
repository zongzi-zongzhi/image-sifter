# Image Sifter MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Windows desktop image sifting tool that lets the user choose a folder, browse one image at a time, and press Enter to send the current image to the system recycle bin.

**Architecture:** Use Electron with a secure preload bridge. Main process handles local file access and recycle-bin deletion; renderer process handles UI state and keyboard controls; shared modules hold testable pure logic.

**Tech Stack:** Electron, plain HTML/CSS/JavaScript, Node.js built-in test runner.

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `CHANGELOG.md`
- Create: `README.md`

- [ ] Create npm scripts for `start` and `test`.
- [ ] Document install, run, shortcuts, and MVP limits.

### Task 2: Shared Logic

**Files:**
- Create: `src/shared/imageFiles.js`
- Create: `src/shared/navigator.js`
- Create: `tests/imageFiles.test.js`
- Create: `tests/navigator.test.js`

- [ ] Implement supported image extension filtering.
- [ ] Implement natural filename sorting.
- [ ] Implement previous, next, and post-delete index behavior.
- [ ] Verify with `npm test`.

### Task 3: Electron Main Process

**Files:**
- Create: `src/main/main.js`
- Create: `src/main/preload.js`

- [ ] Create the application window.
- [ ] Open folder picker from the main process.
- [ ] Read selected folder and return image metadata.
- [ ] Send image file to recycle bin with `shell.trashItem`.
- [ ] Expose only safe APIs through preload.

### Task 4: Renderer UI

**Files:**
- Create: `src/renderer/index.html`
- Create: `src/renderer/styles.css`
- Create: `src/renderer/app.js`

- [ ] Build single-image layout.
- [ ] Add choose-folder, previous, next, and trash controls.
- [ ] Add keyboard shortcuts: Left, Right, Enter.
- [ ] Add first Enter-delete warning.
- [ ] Show empty, progress, success, and error states.

### Task 5: Verification

**Files:**
- Modify: `docs/DEV_LOG.md`
- Modify: `CHANGELOG.md`

- [ ] Run tests.
- [ ] Launch the Electron app.
- [ ] Record verification notes.

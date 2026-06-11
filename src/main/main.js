const fs = require("node:fs/promises");
const path = require("node:path");
const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const { toImageItems } = require("../shared/imageFiles");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 920,
    height: 560,
    minWidth: 920,
    minHeight: 560,
    title: "Image Sifter",
    backgroundColor: "#f7f6f1",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
}

function showMainWindow() {
  if (!mainWindow) {
    createWindow();
    return;
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.show();
  mainWindow.focus();
}

async function readImagesFromFolder(folderPath) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  return toImageItems(folderPath, fileNames);
}

ipcMain.handle("folder:select", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "选择图片文件夹",
  });

  if (result.canceled || result.filePaths.length === 0) {
    return {
      canceled: true,
      folderPath: "",
      images: [],
    };
  }

  const folderPath = result.filePaths[0];
  const images = await readImagesFromFolder(folderPath);

  return {
    canceled: false,
    folderPath,
    images,
  };
});

ipcMain.handle("image:trash", async (_event, filePath) => {
  if (!filePath || typeof filePath !== "string") {
    throw new Error("图片路径无效。");
  }

  await shell.trashItem(filePath);

  return {
    ok: true,
  };
});

const hasSingleInstanceLock = app.requestSingleInstanceLock();

if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    showMainWindow();
  });

  app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
      showMainWindow();
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

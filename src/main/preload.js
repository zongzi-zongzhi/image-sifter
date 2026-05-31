const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("imageSifter", {
  selectFolder: () => ipcRenderer.invoke("folder:select"),
  trashImage: (filePath) => ipcRenderer.invoke("image:trash", filePath),
});

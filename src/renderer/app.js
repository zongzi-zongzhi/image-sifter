const state = {
  folderPath: "",
  images: [],
  currentIndex: -1,
  hasConfirmedEnterTrash: false,
};

const elements = {
  chooseFolderButton: document.querySelector("#chooseFolderButton"),
  previousButton: document.querySelector("#previousButton"),
  nextButton: document.querySelector("#nextButton"),
  trashButton: document.querySelector("#trashButton"),
  folderLabel: document.querySelector("#folderLabel"),
  fileName: document.querySelector("#fileName"),
  progressLabel: document.querySelector("#progressLabel"),
  message: document.querySelector("#message"),
  emptyState: document.querySelector("#emptyState"),
  imageStage: document.querySelector("#imageStage"),
  currentImage: document.querySelector("#currentImage"),
};

function currentImage() {
  if (state.currentIndex < 0) {
    return null;
  }

  return state.images[state.currentIndex] ?? null;
}

function canNavigate() {
  return state.images.length > 0 && state.currentIndex >= 0;
}

function setMessage(text) {
  elements.message.textContent = text;
}

function render() {
  const image = currentImage();
  const hasImages = Boolean(image);

  elements.folderLabel.textContent = state.folderPath || "选择一个图片文件夹开始。";
  elements.fileName.textContent = image?.name || "未选择图片";
  elements.progressLabel.textContent = hasImages
    ? `${state.currentIndex + 1} / ${state.images.length}`
    : "0 / 0";

  elements.previousButton.disabled = !hasImages || state.currentIndex === 0;
  elements.nextButton.disabled = !hasImages || state.currentIndex === state.images.length - 1;
  elements.trashButton.disabled = !hasImages;

  elements.emptyState.classList.toggle("hidden", hasImages);
  elements.imageStage.classList.toggle("hidden", !hasImages);

  if (hasImages) {
    elements.currentImage.src = image.url;
    elements.currentImage.alt = image.name;
  } else {
    elements.currentImage.removeAttribute("src");
  }
}

async function chooseFolder() {
  setMessage("正在选择文件夹...");

  try {
    const result = await window.imageSifter.selectFolder();

    if (result.canceled) {
      setMessage("已取消选择。");
      return;
    }

    state.folderPath = result.folderPath;
    state.images = result.images;
    state.currentIndex = result.images.length > 0 ? 0 : -1;

    setMessage(result.images.length > 0 ? "图片已加载。" : "这个文件夹里没有支持的图片。");
    render();
  } catch (error) {
    setMessage(`选择失败：${error.message}`);
  }
}

function goPrevious() {
  if (!canNavigate() || state.currentIndex === 0) {
    return;
  }

  state.currentIndex -= 1;
  setMessage("");
  render();
}

function goNext() {
  if (!canNavigate() || state.currentIndex >= state.images.length - 1) {
    return;
  }

  state.currentIndex += 1;
  setMessage("");
  render();
}

async function trashCurrentImage() {
  const image = currentImage();

  if (!image) {
    return;
  }

  if (!state.hasConfirmedEnterTrash) {
    const confirmed = window.confirm("Enter 会把当前图片送到系统回收站。之后本次启动期间不再提示。");

    if (!confirmed) {
      setMessage("已取消删除。");
      return;
    }

    state.hasConfirmedEnterTrash = true;
  }

  elements.trashButton.disabled = true;
  setMessage("正在送到回收站...");

  try {
    await window.imageSifter.trashImage(image.path);
    state.images.splice(state.currentIndex, 1);

    if (state.images.length === 0) {
      state.currentIndex = -1;
      setMessage("这个文件夹看完了。");
    } else if (state.currentIndex >= state.images.length) {
      state.currentIndex = state.images.length - 1;
      setMessage("已送到回收站，显示上一张。");
    } else {
      setMessage("已送到回收站，显示下一张。");
    }

    render();
  } catch (error) {
    setMessage(`删除失败：${error.message}`);
    render();
  }
}

function handleKeydown(event) {
  const tagName = event.target.tagName.toLowerCase();

  if (tagName === "input" || tagName === "textarea") {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrevious();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    trashCurrentImage();
  }
}

elements.chooseFolderButton.addEventListener("click", chooseFolder);
elements.previousButton.addEventListener("click", goPrevious);
elements.nextButton.addEventListener("click", goNext);
elements.trashButton.addEventListener("click", trashCurrentImage);
document.addEventListener("keydown", handleKeydown);
elements.currentImage.addEventListener("error", () => {
  setMessage("图片加载失败，可以切换到下一张。");
});

render();

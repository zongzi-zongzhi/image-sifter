const path = require("node:path");
const { pathToFileURL } = require("node:url");

const SUPPORTED_IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".bmp",
  ".avif",
]);

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

function isSupportedImage(fileName) {
  return SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function sortImageNames(fileNames) {
  return [...fileNames].sort((left, right) => collator.compare(left, right));
}

function createImageItem(folderPath, fileName) {
  const fullPath = path.join(folderPath, fileName);

  return {
    path: fullPath,
    url: pathToFileURL(fullPath).toString(),
    name: fileName,
  };
}

function toImageItems(folderPath, fileNames) {
  return sortImageNames(fileNames)
    .filter(isSupportedImage)
    .map((fileName) => createImageItem(folderPath, fileName));
}

module.exports = {
  SUPPORTED_IMAGE_EXTENSIONS,
  isSupportedImage,
  sortImageNames,
  toImageItems,
};

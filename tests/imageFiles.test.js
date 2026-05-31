const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const { isSupportedImage, sortImageNames, toImageItems } = require("../src/shared/imageFiles");

test("detects supported image extensions case-insensitively", () => {
  assert.equal(isSupportedImage("photo.JPG"), true);
  assert.equal(isSupportedImage("avatar.webp"), true);
  assert.equal(isSupportedImage("notes.txt"), false);
});

test("sorts image names naturally", () => {
  assert.deepEqual(sortImageNames(["10.png", "2.png", "1.png"]), [
    "1.png",
    "2.png",
    "10.png",
  ]);
});

test("creates image items from supported files only", () => {
  const folderPath = "D:\\Pictures";
  const items = toImageItems(folderPath, ["b.txt", "2.png", "1.jpg"]);

  assert.deepEqual(
    items.map((item) => item.name),
    ["1.jpg", "2.png"],
  );
  assert.equal(items[0].path, path.join(folderPath, "1.jpg"));
  assert.equal(items[0].url.startsWith("file:///"), true);
});

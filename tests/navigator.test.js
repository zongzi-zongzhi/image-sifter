const assert = require("node:assert/strict");
const test = require("node:test");
const {
  getPreviousIndex,
  getNextIndex,
  getIndexAfterRemoval,
} = require("../src/shared/navigator");

test("previous index does not move before the first image", () => {
  assert.equal(getPreviousIndex(0, 5), 0);
  assert.equal(getPreviousIndex(3, 5), 2);
});

test("next index does not move past the last image", () => {
  assert.equal(getNextIndex(4, 5), 4);
  assert.equal(getNextIndex(1, 5), 2);
});

test("index after removal points to next image when possible", () => {
  assert.equal(getIndexAfterRemoval(1, 4), 1);
});

test("index after removing last image points to previous image", () => {
  assert.equal(getIndexAfterRemoval(3, 4), 2);
});

test("index after removing only image becomes empty state", () => {
  assert.equal(getIndexAfterRemoval(0, 1), -1);
});

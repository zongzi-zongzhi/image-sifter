function getPreviousIndex(currentIndex, total) {
  if (total <= 0) {
    return -1;
  }

  return Math.max(0, currentIndex - 1);
}

function getNextIndex(currentIndex, total) {
  if (total <= 0) {
    return -1;
  }

  return Math.min(total - 1, currentIndex + 1);
}

function getIndexAfterRemoval(currentIndex, totalBeforeRemoval) {
  const totalAfterRemoval = totalBeforeRemoval - 1;

  if (totalAfterRemoval <= 0) {
    return -1;
  }

  return Math.min(currentIndex, totalAfterRemoval - 1);
}

module.exports = {
  getPreviousIndex,
  getNextIndex,
  getIndexAfterRemoval,
};

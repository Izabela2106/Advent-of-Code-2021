const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day9\\measurements9.txt", "utf8")
  .split("\r\n");

const length = array[0].length;
const heigth = array.length;

let heights = [];

array.forEach((entry) => {
  heights.push(...entry);
});

heights = heights.map((entry) => {
  return parseInt(entry);
});

let riskLevel = 0;
let lowPoints = [];

for (let i = 0; i < heights.length; i++) {
  if (i % length === 0) {
    if (i < length) {
      if (heights[i] < heights[i + length] && heights[i] < heights[i + 1]) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    } else if (i > heigth * length - length - 1) {
      if (heights[i] < heights[i - length] && heights[i] < heights[i + 1]) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    } else {
      if (
        heights[i] < heights[i + length] &&
        heights[i] < heights[i + 1] &&
        heights[i] < heights[i - length]
      ) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    }
  } else if (i % length === length - 1) {
    if (i < length) {
      if (heights[i] < heights[i + length] && heights[i] < heights[i - 1]) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    } else if (i > heigth * length - length - 1) {
      if (heights[i] < heights[i - length] && heights[i] < heights[i - 1]) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    } else {
      if (
        heights[i] < heights[i + length] &&
        heights[i] < heights[i - 1] &&
        heights[i] < heights[i - length]
      ) {
        riskLevel += heights[i] + 1;
        lowPoints.push(i);
      }
    }
  } else if (i < length) {
    if (
      heights[i] < heights[i + length] &&
      heights[i] < heights[i + 1] &&
      heights[i] < heights[i - 1]
    ) {
      riskLevel += heights[i] + 1;
      lowPoints.push(i);
    }
  } else if (i > length * heigth - length) {
    if (
      heights[i] < heights[i - length] &&
      heights[i] < heights[i + 1] &&
      heights[i] < heights[i - 1]
    ) {
      riskLevel += heights[i] + 1;
      lowPoints.push(i);
      console.log(i);
    }
  } else if (
    heights[i] < heights[i - 1] &&
    heights[i] < heights[i + 1] &&
    heights[i] < heights[i + length] &&
    heights[i] < heights[i - length]
  ) {
    riskLevel += heights[i] + 1;
    lowPoints.push(i);
  }
}
console.log(lowPoints);

const calculateSizeOfBasin = (i, usedHeights = []) => {
  let basinSize = 0;
  if (!usedHeights.includes(i)) {
    basinSize = 1;
  }

  usedHeights.push(i);
  if (
    heights[i + 1] &&
    !usedHeights.includes(i + 1) &&
    i % length !== length - 1
  ) {
    if (heights[i + 1] < 9) {
      basinSize++;
      usedHeights.push(i + 1);
      basinSize += calculateSizeOfBasin(i + 1, usedHeights);
    }
  }
  if (heights[i - 1] && !usedHeights.includes(i - 1) && i % length !== 0) {
    if (heights[i - 1] < 9) {
      basinSize++;
      usedHeights.push(i - 1);
      basinSize += calculateSizeOfBasin(i - 1, usedHeights);
    }
  }
  if (heights[i + length] && !usedHeights.includes(i + length)) {
    if (heights[i + length] < 9) {
      basinSize++;
      usedHeights.push(i + length);
      basinSize += calculateSizeOfBasin(i + length, usedHeights);
    }
  }
  if (heights[i - length] !== undefined && !usedHeights.includes(i - length)) {
    if (heights[i - length] < 9) {
      basinSize++;
      usedHeights.push(i - length);
      basinSize += calculateSizeOfBasin(i - length, usedHeights);
    }
  }
  return basinSize;
};

lowPoints = lowPoints.map((point) => {
  return calculateSizeOfBasin(point);
});
lowPoints.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
});

console.log(lowPoints[0] * lowPoints[1] * lowPoints[2]);

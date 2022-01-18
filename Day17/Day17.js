// x=20..30, y=-10..-5

const checkIfItPassedArea = (x1, x2, y1, y2, x, y) => {
  if (x > x2 || y < y1) {
    return true;
  }
  return false;
};
const checkIfWithinArea = (x1, x2, y1, y2, x, y) => {
  if (x >= x1 && x <= x2 && y <= y2 && y >= y1) {
    return true;
  }
  return false;
};

const lap = (x, y, xVelocity, yVelocity) => {
  let newX = x + xVelocity;
  let newY = y + yVelocity;
};

const findHigestPosition = (x1, x2, y1, y2) => {
  let maxHeight = 0;
  for (let i = 0; i <= x2; i++) {
    for (let j = -200; j < 200; j++) {
      let height = shootProbe(x1, x2, y1, y2, i, j);
      if (maxHeight < height) {
        maxHeight = height;
      }
    }
  }
  return maxHeight;
};

let velociteiesCounter = 0;

const shootProbe = (x1, x2, y1, y2, xVelocity, yVelocity) => {
  let area = false;
  let x = 0;
  let y = 0;
  let xVel = xVelocity;
  let yVel = yVelocity;
  let maxY = 0;
  while (!checkIfItPassedArea(x1, x2, y1, y2, x, y)) {
    x = x + xVel;
    y = y + yVel;
    if (xVel > 0) {
      xVel--;
    } else if (xVel < 0) {
      xVel++;
    }
    yVel -= 1;
    if (maxY < y) {
      maxY = y;
    }
    if (checkIfWithinArea(x1, x2, y1, y2, x, y)) {
      velociteiesCounter++;
      area = true;
      break;
    }
  }
  if (area) {
    return maxY;
  } else {
    return 0;
  }
};

console.log(findHigestPosition(57, 116, -198, -148));
console.log(velociteiesCounter);

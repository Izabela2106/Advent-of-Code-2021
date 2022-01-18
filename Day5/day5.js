const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day5\\measurements5.txt", "utf8")
  .split("\r\n");

array = array.map((item) => {
  return {
    x1: parseInt(item.split(",")[0]),
    y1: parseInt(item.split(",")[1]),
    x2: parseInt(item.split(",")[1].split(" ")[2]),
    y2: parseInt(item.split(",")[2]),
  };
});

let coordinates1 = array.filter(
  (item) => item.x1 === item.x2 || item.y1 === item.y2
);

const countOverlaps = (array) => {
  let count = 0;
  array.flat().forEach((number) => {
    if (number > 1) {
      count++;
    }
  });
  return count;
};

const map = Array.from(Array(1000), () => new Array(1000).fill(0));

array.forEach((coordiante) => {
  //vertical lines
  if (coordiante.x1 === coordiante.x2) {
    let startPoint =
      coordiante.y1 > coordiante.y2 ? coordiante.y2 : coordiante.y1;
    let endPoint = startPoint === coordiante.y1 ? coordiante.y2 : coordiante.y1;
    let lineLength = endPoint - startPoint + 1;
    for (let i = 0; i < lineLength; i++) {
      map[startPoint + i][coordiante.x1] += 1;
    }
  } else if (coordiante.y1 === coordiante.y2) {
    let startPoint =
      coordiante.x1 > coordiante.x2 ? coordiante.x2 : coordiante.x1;
    let endPoint = startPoint === coordiante.x1 ? coordiante.x2 : coordiante.x1;
    let lineLength = endPoint - startPoint + 1;
    for (let i = 0; i < lineLength; i++) {
      map[coordiante.y1][startPoint + i] += 1;
    }
  } else {
    let startPoint =
      coordiante.y1 > coordiante.y2
        ? { x: coordiante.x2, y: coordiante.y2 }
        : { x: coordiante.x1, y: coordiante.y1 };
    let endPoint =
      startPoint.y === coordiante.y1
        ? { x: coordiante.x2, y: coordiante.y2 }
        : { x: coordiante.x1, y: coordiante.y1 };
    if (startPoint.x < endPoint.x) {
      while (startPoint.x !== endPoint.x) {
        map[startPoint.y][startPoint.x] += 1;
        startPoint.x++;
        startPoint.y++;
      }
      map[startPoint.y][startPoint.x] += 1;
    } else {
      while (startPoint.x !== endPoint.x) {
        map[startPoint.y][startPoint.x] += 1;
        startPoint.x--;
        startPoint.y++;
      }
      map[startPoint.y][startPoint.x] += 1;
    }
  }
});
console.log(countOverlaps(map));

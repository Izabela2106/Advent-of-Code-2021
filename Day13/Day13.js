const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day13\\data13.txt", "utf8")
  .split("\r\n");

const countDots = (array) => {
  let count = 0;
  array.flat().forEach((number) => {
    if (number > 0) {
      count++;
    }
  });
  return count;
};
const dots = [];
let instructions = [];
for (let i = 0; i < array.length; i++) {
  if (array[i] === "") {
    break;
  } else {
    dots.push({
      x: parseInt(array[i].split(",")[0]),
      y: parseInt(array[i].split(",")[1]),
    });
  }
}
for (let i = array.length - 1; i > 0; i--) {
  if (array[i] === "") {
    break;
  } else {
    instructions.push(array[i]);
  }
}

instructions = instructions.map((instr) => {
  return instr.split(" ")[2].split("=");
});
instructions = instructions.reverse();

let maxX = 0;
let maxY = 0;

dots.forEach((dot) => {
  if (dot.x > maxX) {
    maxX = dot.x;
  }
  if (dot.y > maxY) {
    maxY = dot.y;
  }
});

let mapHeigth = maxY + 1;
let mapWidth = maxX + 1;
let map = Array.from(Array(mapHeigth), () => new Array(mapWidth).fill(0));

dots.forEach((dot) => {
  map[dot.y][dot.x] = 1;
});

instructions.forEach((instr) => {
  if (instr[0] === "x") {
    const axis = parseInt(instr[1]);
    for (let i = 0; i < mapHeigth; i++) {
      for (let j = 0; j < (mapWidth - 1) / 2; j++) {
        if (map[i][j] === 0) {
          map[i][j] = map[i][mapWidth - j - 1];
        }
      }
    }
    mapWidth = (mapWidth - 1) / 2;
    map = map.map((row) => {
      row.length = mapWidth;
      return row;
    });
  } else {
    const axis = parseInt(instr[1]);
    for (let i = axis + 1; i < mapHeigth; i++) {
      let rowNumber = Math.abs(i - axis * 2);
      for (let j = 0; j < mapWidth; j++) {
        if (map[rowNumber][j] === 0) {
          map[rowNumber][j] = map[i][j];
        }
      }
    }
    mapHeigth = (mapHeigth - 1) / 2;
    map.length = mapHeigth;
  }
});

console.log(map);

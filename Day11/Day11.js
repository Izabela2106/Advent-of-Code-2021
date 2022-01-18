const fs = require("fs");
let octopuses = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day11\\measurements11.txt", "utf8")
  .split("\r\n");

octopuses = octopuses.map((line) => {
  return line.split("");
});

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    octopuses[i][j]++;
  }
}

let flashes = 0;

const countFlashes = (i, j) => {
  let flashesCount = 0;
  flashesCount++;
  octopuses[i][j] = -1;
  for (let k = i - 1; k <= i + 1; k++) {
    for (let l = j - 1; l <= j + 1; l++) {
      if (!(k === i && j === l) && k < 10 && l < 10 && k >= 0 && l >= 0) {
        if (octopuses[k][l] !== -1) {
          octopuses[k][l]++;
        }
        if (octopuses[k][l] >= 9) {
          octopuses[k][l] = 0;
          flashesCount += countFlashes(k, l);
        }
      }
    }
  }
  return flashesCount;
};
const checkFlash = () => {
  return octopuses.flat().every((octopus) => octopus === 0);
};

const step = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (octopuses[i][j] >= 9) {
        flashes += countFlashes(i, j);
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (octopuses[i][j] !== -1) {
        octopuses[i][j]++;
      } else {
        octopuses[i][j] = 0;
      }
    }
  }
};
let isFlash = 0;
let counter = 0;

while (!isFlash) {
  counter++;
  step();
  isFlash = checkFlash();
}
console.log(counter);

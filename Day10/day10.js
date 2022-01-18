const fs = require("fs");
let brackets = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day10\\measurements10.txt", "utf8")
  .split("\r\n");

brackets = brackets.map((line) => {
  return line.split("");
});
const x = {
  ")": "(",
  "}": "{",
  "]": "[",
  ">": "<",
};
const y = {
  "(": ")",
  "{": "}",
  "[": "]",
  "<": ">",
};
const bracketsToCount = [];
const autocorrectionArrays = [];

brackets.forEach((line) => {
  for (let i = 0; i < line.length; i++) {
    if ([")", "}", "]", ">"].includes(line[i])) {
      let j = i - 1;
      while (line[j] === -1) {
        j--;
      }
      if (line[j] === x[line[i]]) {
        line[j] = -1;
        line[i] = -1;
      } else {
        bracketsToCount.push(line[i]);
        break;
      }
    }
    if (i === line.length - 1) {
      let autocorreactionArray = [];
      for (let j = line.length - 1; j >= 0; j--) {
        if (["(", "{", "[", "<"].includes(line[j])) {
          autocorreactionArray.push(y[line[j]]);
        }
      }
      autocorrectionArrays.push(autocorreactionArray);
    }
  }
});
const countPoints = (bracket) => {
  if (bracket === ")") {
    return 3;
  } else if (bracket === "}") {
    return 1197;
  } else if (bracket === "]") {
    return 57;
  } else if (bracket === ">") {
    return 25137;
  }
};

const countPoints2 = (array) => {
  let points = 0;
  array.forEach((bracket) => {
    points = points * 5;
    if (bracket === ")") {
      points += 1;
    }
    if (bracket === "]") {
      points += 2;
    }
    if (bracket === "}") {
      points += 3;
    }
    if (bracket === ">") {
      points += 4;
    }
  });
  return points;
};

let points = 0;
bracketsToCount.forEach((bracket) => {
  points += countPoints(bracket);
});

let results = [];
autocorrectionArrays.forEach((array) => {
  results.push(countPoints2(array));
});

results.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  } else {
    return 0;
  }
});
console.log(points);
console.log(results[Math.floor(results.length / 2)]);

const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\measurements4.txt", "utf8")
  .split("\r\n");

let boardsCount = 1;
const boardDimension = 5;
const bingoNumbers = [
  14, 30, 18, 8, 3, 10, 77, 4, 48, 67, 28, 38, 63, 43, 62, 12, 68, 88, 54, 32,
  17, 21, 83, 64, 97, 53, 24, 2, 60, 96, 86, 23, 20, 93, 65, 34, 45, 46, 42, 49,
  71, 9, 61, 16, 31, 1, 29, 40, 59, 87, 95, 41, 39, 27, 6, 25, 19, 58, 80, 81,
  50, 79, 73, 15, 70, 37, 92, 94, 7, 55, 85, 98, 5, 84, 99, 26, 66, 57, 82, 75,
  22, 89, 74, 36, 11, 76, 56, 33, 13, 72, 35, 78, 47, 91, 51, 44, 69, 0, 90, 52,
];
array.forEach((item) => {
  if (item === "") {
    boardsCount++;
  }
});

array = array.filter((item) => item !== "");
for (let i = 0; i < array.length; i = i + 5) {
  array[i] =
    array[i] +
    " " +
    array[i + 1] +
    " " +
    array[i + 2] +
    " " +
    array[i + 3] +
    " " +
    array[i + 4];
}

array = array.filter((item, index) => index % boardDimension === 0);
for (let i = 0; i < array.length; i++) {
  array[i] = array[i].split(" ");
  array[i] = array[i].filter((item) => item !== "");
  array[i] = array[i].map((item) => parseInt(item));
}

const checkBingo = (board) => {
  for (
    let i = 0;
    i <= boardDimension * boardDimension;
    i = i + boardDimension
  ) {
    if (
      board[i] === -1 &&
      board[i + 1] === -1 &&
      board[i + 2] === -1 &&
      board[i + 3] === -1 &&
      board[i + 4] === -1
    ) {
      return true;
    }
  }
  for (let i = 0; i <= boardDimension; i++) {
    if (
      board[i] === -1 &&
      board[i + boardDimension] === -1 &&
      board[i + boardDimension * 2] === -1 &&
      board[i + boardDimension * 3] === -1 &&
      board[i + boardDimension * 4] === -1
    ) {
      return true;
    }
  }
  return false;
};

const addNumbers = (board) => {
  let sum = 0;
  board.forEach((number) => {
    if (number !== -1) {
      sum = sum + number;
    }
  });
  return sum;
};

//part1

const determineWinningBoard = () => {
  for (let i = 0; i < bingoNumbers.length; i++) {
    for (let j = 0; j < array.length; j++) {
      array[j] = array[j].map((item) => {
        if (item === bingoNumbers[i]) {
          return -1;
        } else {
          return item;
        }
      });
      if (checkBingo(array[j])) {
        return addNumbers(array[j]) * bingoNumbers[i];
      }
    }
  }
};

//part2

const determineLosingBoard = () => {
  let trackingWonArray = new Array(boardsCount).fill(0);
  let losingArrayIndex = 0;
  for (let i = 0; i < bingoNumbers.length; i++) {
    for (let j = 0; j < array.length; j++) {
      array[j] = array[j].map((item) => {
        if (item === bingoNumbers[i]) {
          return -1;
        } else {
          return item;
        }
      });
      if (checkBingo(array[j])) {
        trackingWonArray[j] = 1;
        if (
          trackingWonArray.reduce(
            (previousValue, value) => previousValue + value,
            0
          ) ===
          boardsCount - 1
        ) {
          trackingWonArray.forEach((number, index) => {
            if (number === 0) {
              losingArrayIndex = index;
            }
          });
        }
        if (
          trackingWonArray.reduce(
            (previousValue, value) => previousValue + value,
            0
          ) === boardsCount
        ) {
          return addNumbers(array[losingArrayIndex]) * bingoNumbers[i];
        }
      }
    }
  }
};
console.log(determineWinningBoard());
console.log(determineLosingBoard());

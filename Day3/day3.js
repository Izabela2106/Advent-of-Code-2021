const fs = require("fs");
const array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\measurements3.txt", "utf8")
  .split("\r\n");
const lenthOfnumber = array[0].length;

const determineMostCommonNumber = (number, length) => {
  if (number >= length - number) {
    return 1;
  } else {
    return 0;
  }
};

const negate = (number) => {
  if (number === 1) {
    return 0;
  } else return 1;
};

//--part1--
let gamma = [];
let epsylon = [];

const toNumber = (array) => {
  let binary = "";
  for (let i = 0; i < array.length; i++) {
    binary += array[i].toString();
  }
  return parseInt(binary, 2);
};

for (let i = 0; i < lenthOfnumber; i++) {
  let numbers = [];
  let reduced = 0;
  for (let j = 0; j < array.length; j++) {
    numbers.push(parseInt(array[j][i]));
    reduced = numbers.reduce((previousNumber, number) => {
      return previousNumber + number;
    }, 0);
  }
  reduced = determineMostCommonNumber(reduced, array.length);
  gamma.push(reduced);
  epsylon.push(negate(reduced));
}

console.log(toNumber(epsylon) * toNumber(gamma));

//part2

const determineRate = (gas) => {
  let newArray = [...array];
  for (let i = 0; i < lenthOfnumber; i++) {
    let currentReduced = [];
    for (let j = 0; j < newArray.length; j++) {
      currentReduced.push(parseInt(newArray[j][i]));
    }
    currentReduced = currentReduced.reduce((previousNumber, number) => {
      return previousNumber + number;
    }, 0);
    if (gas === "oxygen") {
      currentReduced = determineMostCommonNumber(
        currentReduced,
        newArray.length
      );
    } else if (gas === "co2") {
      currentReduced = negate(
        determineMostCommonNumber(currentReduced, newArray.length)
      );
    }
    newArray = newArray.filter((number) => {
      if (parseInt(number[i]) === currentReduced) {
        return number;
      }
    });

    if (newArray.length === 1) {
      return parseInt(newArray[0], 2);
    }
  }
};
console.log(determineRate("oxygen") * determineRate("co2"));

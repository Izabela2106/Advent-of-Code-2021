const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day8\\measurements8.txt", "utf8")
  .split("\r\n");

array = array.map((entry) => {
  return entry.split("| ")[1].split(" ");
});

let uniqueCount = 0;
//part1

array.forEach((entry) => {
  entry.forEach((sequence) => {
    if (
      sequence.length === 7 ||
      sequence.length === 4 ||
      sequence.length === 3 ||
      sequence.length === 2
    ) {
      uniqueCount++;
    }
  });
});

let array2 = fs
  .readFileSync("C:\\JavaScript\\Advencode\\measurements8.txt", "utf8")
  .split("\r\n");

array2 = array2.map((entry) => {
  let newEntry = entry.split("| ");
  return { input: newEntry[0].split(" "), output: newEntry[1].split(" ") };
});
//part2

let sevenDigitLetters = {
  0: ["a", "b", "c", "e", "f", "g"],
  2: ["a", "c", "d", "e", "g"],
  3: ["a", "c", "d", "f", "g"],
  5: ["a", "b", "d", "f", "g"],
  6: ["a", "b", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

const checkCompatibility = (patter, digit) => {
  for (let i = 0; i < patter.length; i++) {
    if (digit.includes(patter[i])) {
    } else {
      return false;
    }
  }
  return true;
};

const determineDigit = (digit) => {
  if (digit.length === 2) {
    return "1";
  } else if (digit.length === 3) {
    return "7";
  } else if (digit.length === 4) {
    return "4";
  } else if (digit.length === 7) {
    return "8";
  } else {
    for (let pattern in sevenDigitLetters) {
      if (sevenDigitLetters[pattern].length === digit.length) {
        if (checkCompatibility(sevenDigitLetters[pattern], digit)) {
          return pattern;
        }
      }
    }
  }
};

let finalCount = 0;

array2.forEach((entry) => {
  let lettersArray = ["a", "b", "c", "d", "e", "f", "g"];
  let one = entry.input.filter((sequence) => sequence.length === 2)[0];
  let four = entry.input.filter((sequence) => sequence.length === 4)[0];
  let eigth = entry.input.filter((sequence) => sequence.length === 7)[0];
  let seven = entry.input.filter((sequence) => sequence.length === 3)[0];

  let sixDigits = entry.input.filter((sequence) => sequence.length === 6);
  let fiveDigits = entry.input.filter((sequence) => sequence.length === 5);

  let letters = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
  };
  //datermine a
  let newSeven = seven;
  for (let i = 0; i < one.length; i++) {
    newSeven = newSeven.replace(one[i], "");
  }
  letters.a = newSeven;

  //determine f,b,e
  lettersArray.forEach((letter) => {
    let count = 0;
    entry.input.forEach((entry) => {
      if (entry.includes(letter)) {
        count++;
      }
    });
    if (count === 9) {
      letters.f = letter;
    }
    if (count === 6) {
      letters.b = letter;
    }

    if (count === 4) {
      letters.e = letter;
    }
  });

  //determine c
  letters.c = one.replace(letters.f, "");
  //determine d

  letters.d = four
    .replace(letters.c, "")
    .replace(letters.f, "")
    .replace(letters.b, "");
  letters.g = eigth
    .replace(letters.a, "")
    .replace(letters.b, "")
    .replace(letters.c, "")
    .replace(letters.d, "")
    .replace(letters.e, "")
    .replace(letters.f, "");
  console.log(letters);
  sevenDigitLetters = {
    0: [letters.a, letters.b, letters.c, letters.e, letters.f, letters.g],
    2: [letters.a, letters.c, letters.d, letters.e, letters.g],
    3: [letters.a, letters.c, letters.d, letters.f, letters.g],
    5: [letters.a, letters.b, letters.d, letters.f, letters.g],
    6: [letters.a, letters.b, letters.d, letters.e, letters.f, letters.g],
    9: [letters.a, letters.b, letters.c, letters.d, letters.f, letters.g],
  };
  let finalDigit = "";

  entry.output.forEach((sequence) => {
    finalDigit += determineDigit(sequence);
  });
  console.log(finalDigit);
  finalCount += parseInt(finalDigit);
});

console.log(finalCount);

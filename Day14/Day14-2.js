const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day14\\data14.txt", "utf8")
  .split("\r\n");

let polymer = array[0];

polymer = polymer.split("");
let instructions = array.splice(2);

instructions = instructions.map((instr) => {
  let newInstr = instr.split("->");
  return [newInstr[0].trim(), newInstr[1].trim()];
});

pairs = instructions.map((instr) => instr[0]);
let pairsCount = {};

for (let i = 0; i < polymer.length - 1; i++) {
  let pair = polymer[i] + polymer[i + 1];
  if (pairsCount[pair]) {
    pairsCount[pair]++;
  } else {
    pairsCount[pair] = 1;
  }
}

const findInstruction = (pair) => {
  const letter = instructions.filter((instr) => {
    if (instr[0] === pair) {
      return instr;
    }
  });
  return letter[0][1];
};

for (let j = 0; j < 40; j++) {
  let newPairsCount = {};
  for (let i in pairsCount) {
    const letter = findInstruction(i);
    const amount = pairsCount[i];
    let newPair1 = i[0] + letter;
    let newPair2 = letter + i[1];
    const objectKeys = Object.keys(pairsCount);

    if (newPairsCount[newPair1]) {
      newPairsCount[newPair1] += amount;
    } else {
      newPairsCount[newPair1] = amount;
    }
    if (newPairsCount[newPair2]) {
      newPairsCount[newPair2] += amount;
    } else {
      newPairsCount[newPair2] = amount;
    }
  }
  pairsCount = newPairsCount;
}

let letters = {};

for (let i in pairsCount) {
  if (letters[i[0]]) {
    letters[i[0]] += pairsCount[i];
  } else {
    letters[i[0]] = pairsCount[i];
  }
  if (letters[i[1]]) {
    letters[i[1]] += pairsCount[i];
  } else {
    letters[i[1]] = pairsCount[i];
  }
}

let max = 0;
for (let i in letters) {
  if (letters.hasOwnProperty(i)) {
    if (letters[i] > max) {
      max = letters[i];
    }
  }
}
let min = max;
for (let i in letters) {
  if (letters.hasOwnProperty(i)) {
    if (letters[i] < min) {
      min = letters[i];
    }
  }
}

console.log((max - min - 1) / 2);

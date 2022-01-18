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
const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];
for (j = 0; j < 10; j++) {
  for (let i = 0; i < polymer.length - 1; i++) {
    let pair = polymer[i] + polymer[i + 1];
    let instruction = null;
    instructions.forEach((instr) => {
      if (instr[0] === pair) {
        instruction = instr;
      }
    });
    if (pair && instruction) {
      polymer = insert(polymer, i + 1, instruction[1]);
      i++;
    }
  }
  console.log(j);
}

const set = new Set(polymer);
const quantities = {};
set.forEach((el) => {
  quantities[el] = 0;
});
polymer.forEach((element) => {
  quantities[element]++;
});

let max = 0;

for (let i in quantities) {
  if (quantities.hasOwnProperty(i)) {
    if (quantities[i] > max) {
      max = quantities[i];
    }
  }
}
let min = max;
for (let i in quantities) {
  if (quantities.hasOwnProperty(i)) {
    if (quantities[i] < min) {
      min = quantities[i];
    }
  }
}

console.log(max - min);

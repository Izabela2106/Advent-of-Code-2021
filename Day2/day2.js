const fs = require("fs");
const array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\measurements2.txt", "utf8")
  .split("\r\n");

//part1

let forward = 0;
let depth = 0;
for (let i = 0; i < array.length; i++) {
  let [direction, number] = array[i].split(" ");
  if (direction === "forward") {
    forward += parseInt(number);
  }
  if (direction === "up") {
    depth -= parseInt(number);
  }
  if (direction === "down") {
    depth += parseInt(number);
  }
}
//console.log(forward*depth)

// --part2--

let horizontal = 0;
let down = 0;
let aim = 0;

for (let i = 0; i < array.length; i++) {
  let [direction, number] = array[i].split(" ");
  if (direction === "forward") {
    horizontal += parseInt(number);
    down += aim * parseInt(number);
  }
  if (direction === "up") {
    aim -= parseInt(number);
  }
  if (direction === "down") {
    aim += parseInt(number);
  }
}
console.log(horizontal * down);

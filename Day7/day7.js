const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day7\\measurements7.txt", "utf8")
  .split(",");

array = array.map((fish) => {
  return parseInt(fish);
});
console.log(array);

const max = Math.max(...array);
const min = Math.min(...array);

let minFuel = 0;
array.forEach((crab) => {
  let pathLength = Math.abs(crab - min);
  minFuel += (pathLength * (pathLength + 1)) / 2;
});

for (let i = 0; i <= max; i++) {
  let usedFuel = 0;
  let pathLength = 0;
  array.forEach((crab) => {
    pathLength = Math.abs(crab - i);
    usedFuel += (pathLength * (pathLength + 1)) / 2;
  });
  if (usedFuel < minFuel) {
    minFuel = usedFuel;
  }
}
console.log(minFuel);

const fs = require("fs");
const array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day1\\measurments1.txt", "utf8")
  .split("\r\n");
const measurements = array.map((number) => parseInt(number));
let numberOfIncrease1 = 0;
let numberOfIncrease2 = 0;

for (i = 1; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 1]) {
    numberOfIncrease1++;
  }
}
for (i = 0; i < measurements.length - 2; i++) {
  let sum1 = measurements[i] + measurements[i + 1] + measurements[i + 2];
  let sum2 = measurements[i + 1] + measurements[i + 2] + measurements[i + 3];
  if (sum2 > sum1) {
    numberOfIncrease2++;
  }
}

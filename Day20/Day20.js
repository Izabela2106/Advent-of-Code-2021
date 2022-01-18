const fs = require("fs");
let array = fs
  .readFileSync("C:\\JavaScript\\Advencode\\Day20\\data20.txt", "utf8")
  .split("\r\n");
let split = 0;
array.forEach((line, index) => {
  if (line === "") {
    split = index;
  }
});

let algorithm = array.slice(0, split);
let image = array.slice(split + 1);
algorithm = algorithm.join("");
console.log(algorithm.length);
let emptyLine = "";

for (let i = 0; i < 100 / 2; i++) {
  emptyLine += ".";
}

image = image.map((row) => {
  return row.split("");
});

const width = image[0].length;
const length = image.length;
console.log(length, width);

for (let a = 1; a < 3; a++) {
  let c = image[0][0];
  console.log(image[0][0]);
  let newImage = new Array(length).fill().map(() => []);
  newImage = image.map((line) => [c, c, ...line, c, c]);
  const e = new Array(image[0].length).fill(c);
  newImage = [e, e, ...image, e, e];
  //console.log(newImage);
  let counter = 0;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
      //console.log(i, j, image[i][j]);
      let binary = "";
      for (let k = i - 1; k < i + 2; k++) {
        for (let l = j - 1; l < j + 2; l++) {
          if (k < 0 || k >= length || l < 0 || l >= width) {
            binary += image[0][0];
          } else {
            let digit = null;
            if (image[k][l] === ".") {
              digit = "0";
            } else {
              digit = "1";
            }
            binary += digit;
            //console.log(i, j, k, l, image[k][l]);
          }
        }
      }
      //console.log(binary, parseInt(binary, 2));

      //console.log(i, j, binary, parseInt(binary, 2));

      //console.log(image[i][j]);
      //console.log(binary);
      //console.log(parseInt(binary, 2));
      newImage[i][j] = algorithm[parseInt(binary, 2)];

      //console.log(image[i][j], algorithm[binary]);
    }
  }

  image = newImage;

  counter = image.flat().filter((x) => x === "#").length;
  console.log(counter);
}

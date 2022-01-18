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

function buffer(image, c) {
  image = image.map((line) => [c, c, ...line, c, c]);
  const e = new Array(image[0].length).fill(c);
  return [e, e, ...image, e, e];
}

function enhance(image, algorithm) {
  const next = new Array(image.length).fill().map(() => []);
  const get = (i, j) => (image[i] && image[i][j]) || image[0][0];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      const area = [
        get(i - 1, j - 1),
        get(i - 1, j + 0),
        get(i - 1, j + 1),
        get(i + 0, j - 1),
        get(i + 0, j + 0),
        get(i + 0, j + 1),
        get(i + 1, j - 1),
        get(i + 1, j + 0),
        get(i + 1, j + 1),
      ].join("");

      const pixel = area.replace("#", "1").replace(".", "0");
      next[i][j] = algorithm[parseInt(pixel, 2)];
    }
  }
  return next;
}
function part1(image, algorithm, times = 2) {
  for (let i = 0; i < times; i++) {
    image = buffer(image, i === 0 ? "." : image[0][0]);
    image = enhance(image, algorithm);
  }
  return image.flat().filter((x) => x === "#").length;
}

console.log(part1(image, algorithm, 4));

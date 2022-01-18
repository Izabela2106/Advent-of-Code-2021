const fs = require("fs");
let paths = fs
    .readFileSync("C:\\JavaScript\\Advencode\\Day12\\data12.txt", "utf8")
    .split("\r\n");

console.log(paths);

console.log(new Date)
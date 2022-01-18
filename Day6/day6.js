const fs = require("fs");
let array = fs
    .readFileSync("C:\\JavaScript\\Advencode\\measurements6.txt", "utf8").split(",")

array=array.map(fish=>{
    return parseInt(fish)
})

const fishByAges={

}
for(let i=0;i<9;i++){
    fishByAges[i]=0;
}

array.forEach(fish=>{
    fishByAges[fish]++;
})


for(let i=0;i<256;i++) {
    let fishByAgeCopy={...fishByAges};
  for(let j=0;j<8;j++){
       fishByAges[j]=fishByAgeCopy[j+1]
  }
  fishByAges[6]+=fishByAgeCopy[0];
  fishByAges[8]=fishByAgeCopy[0];
}

let sumofFishes=0;

for(let age in fishByAges){
    sumofFishes+=fishByAges[age];
}
console.log(sumofFishes)





















let x = [3, 4, 2, 1, 3, 3];
let y = [4, 3, 5, 3, 9, 3];

let sortedX = [...x].sort((a, b) => a - b);
let sortedY = [...y].sort((a, b) => a - b);

console.log("sortedX", sortedX); // [1, 2, 3, 3, 3, 4]
console.log("sortedY", sortedY); // [3, 3, 3, 4, 5, 9]

let distanceArr = [];
for (let i = 0; i < sortedX.length; i++) {
  let distance = Math.abs(sortedX[i] - sortedY[i]);
  distanceArr.push(distance);
}

console.log("distanceArr", distanceArr); // [2, 1, 0, 1, 2, 5]
const total = distanceArr.reduce((acc, currValue) => acc + currValue, 0);
console.log("total", total); // 11

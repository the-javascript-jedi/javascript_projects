console.log("commonly-used-character loaded");
let stringTest = "nithin";

const charMap = {};
// create object with count of string values
for (let stringVal of stringTest) {
  if (charMap[stringVal]) {
    charMap[stringVal]++;
  } else {
    charMap[stringVal] = 1;
  }
}
let max = 0;
let maxChar = "";
// find the max value
for (let char in charMap) {
  if (charMap[char] > max) {
    max = charMap[char];
    maxChar = char;
  }
}

console.log("charMap", charMap);
console.log("max", max);
console.log("maxChar", maxChar);

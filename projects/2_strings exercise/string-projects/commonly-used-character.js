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
// // O/P
// charMap {n: 2, i: 2, t: 1, h: 1}h: 1i: 2n: 2t: 1[[Prototype]]: Object
// commonly-used-character.js:24 max 2
// commonly-used-character.js:25 maxChar n

console.log("commonly-used-character loaded");
let stringTest = "abcccccccd";

const charMap = {};

for (let char of stringTest) {
  if (charMap[char]) {
    charMap[char]++;
  } else {
    charMap[char] = 1;
  }
}

console.log("charMap", charMap);

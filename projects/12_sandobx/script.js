// function constructNote(val1, val2) {
//   let freq = {};

//   // count characters available in val2 (the source)
//   for (let char of val2) {
//     freq[char] = (freq[char] || 0) + 1;
//   }

//   // check if val1 can be built from those characters
//   for (let char of val1) {
//     if (!freq[char]) {
//       // character missing or used up
//       return false;
//     }
//     freq[char]--; // consume one occurrence
//   }

//   return true;
// }

// console.log(constructNote("aa", "abc")); // false
// console.log(constructNote("abc", "dcba")); // true
// console.log(constructNote("aabbcc", "bcabcaddff")); // true

function constructNote(str1, str2) {}

console.log(constructNote("aa", "abc")); // false
console.log(constructNote("abc", "dcba")); // true
console.log(constructNote("aabbcc", "bcabcaddff")); // true

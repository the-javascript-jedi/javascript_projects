console.log(constructNote("aa", "abc")); // false
console.log(constructNote("abc", "dcba")); // true
console.log(constructNote("aabbcc", "bcabcaddff")); // true

function constructNote(str1, str2) {
  let freq2 = {};
  for (let char of str2) {
    if (freq2[char]) {
      freq2[char]++;
    } else {
      freq2[char] = 1;
    }
  }

  for (let char of str1) {
    if (!freq2[char]) {
      return false;
    }
    freq2[char]--;
  }
  console.log("freq2", freq2);
  return true;
}

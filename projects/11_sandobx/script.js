function canFormPalindrome(str) {
  var charCount = {};
  for (let char of str) {
    if (charCount[char]) {
      charCount[char] = charCount[char] + 1;
    } else {
      charCount[char] = 1;
    }
  }
  console.log("charCount", charCount);
  let oddCount = 0;
  Object.values(charCount).forEach((val) => {
    if (val % 2 == 1) {
      oddCount++;
    }
  });
  console.log("oddCount", oddCount);
  if (oddCount > 1) {
    return false;
  } else {
    return true;
  }
}

// Test
console.log(canFormPalindrome("tactcoa")); // true

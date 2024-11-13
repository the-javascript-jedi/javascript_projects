function lengthOfLongestSubstring(str) {
  let maxLength = 0;
  for (let i = 0; i < str.length; i++) {
    let substring = "";
    for (let j = i; j < str.length; j++) {
      const currentChar = str[j];
      if (substring.includes(currentChar)) {
        break;
      }
      substring = substring + currentChar;
      if (substring.length > maxLength) {
        maxLength = substring.length;
      }
    }
    console.log("substring", substring);
    return maxLength;
  }
}

// Example usage:
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
// console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1
// console.log(lengthOfLongestSubstring("pwwkew")); // Output: 3

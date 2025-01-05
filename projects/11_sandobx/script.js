function lengthOfLongestSubstring(s) {
  let maxlength = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      let substring = s.slice(i, j + 1);
      console.log("substring", substring);
      if (substring.indexOf(s[j]) !== substring.lastIndexOf(s[j])) {
        break;
      }
      maxlength = Math.max(maxlength, substring.length);
    }
  }
  return maxlength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3

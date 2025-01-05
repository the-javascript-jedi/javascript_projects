function lengthOfLongestSubstring(str) {
  // Handle empty string
  if (!str) {
    return 0;
  }

  var maxLength = 0;
  var start = 0;
  var charMap = {};

  for (var i = 0; i < str.length; i++) {
    var currentChar = str[i];

    // If we've seen this character before and its index is >= start
    if (charMap[currentChar] >= start) {
      // Move start to the position after the previous occurrence
      start = charMap[currentChar] + 1;
    }

    // Store the current character's position
    charMap[currentChar] = i;

    // Update maxLength if current substring is longer
    var currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  }

  return maxLength;
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Output: 1
console.log(lengthOfLongestSubstring("pwwkew")); // Output: 3
console.log(lengthOfLongestSubstring("")); // Output: 0
console.log(lengthOfLongestSubstring("au")); // Output: 2




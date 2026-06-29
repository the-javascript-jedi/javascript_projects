function findPair(values, n) {
  // Outer loop: pick the first element of the pair (the "left" operand).
  // 'i' walks through every index in the array.
  for (var i = 0; i < values.length; i++) {
    // Inner loop: pick the second element of the pair (the "right" operand).
    // 'j' also walks through every index, so we test values[i] against
    // every other element in the array.
    for (var j = 0; j < values.length; j++) {
      // Two conditions must both be true to count as a valid pair:
      //   1. i !== j  -> the two elements come from DIFFERENT positions,
      //                  so an element can't pair with itself. This is what
      //                  makes n = 0 behave correctly (e.g. [1,2,3] -> false,
      //                  but [5,5] -> true since the 5s are at different indices).
      //   2. values[i] - values[j] == n -> their difference equals the target.
      //                  Checking every (i, j) order means we test both
      //                  a - b and b - a, so negative n values work too.
      if (i !== j && values[i] - values[j] == n) {
        return true; // Found a matching pair -> stop and report success.
      }
    }
  }

  // If we finished both loops without returning, no pair exists.
  return false;
}

// --- Test cases ---
console.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true  (4 - 2 = 2)
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true  (2 - 1 = 1)
console.log(findPair([4, -2, 3, 10], -6)); // true  (4 - 10 = -6)
console.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false (no pair differs by 22)
console.log(findPair([], 0)); // false (empty array)
console.log(findPair([5, 5], 0)); // true  (5 - 5 = 0, different indices)
console.log(findPair([-4, 4], -8)); // true  (-4 - 4 = -8)
console.log(findPair([-4, 4], 8)); // true  (4 - (-4) = 8)
console.log(findPair([1, 3, 4, 6], -2)); // true  (1 - 3 = -2)
console.log(findPair([0, 1, 3, 4, 6], -2)); // true  (1 - 3 = -2)
console.log(findPair([1, 2, 3], 0)); // false (all elements unique)

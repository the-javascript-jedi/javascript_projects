// // Brute force
// function areThereDuplicates(...args) {
//   // Compare every pair with nested loops
//   for (let i = 0; i < args.length; i++) {
//     for (let j = i + 1; j < args.length; j++) {
//       if (args[i] === args[j]) {
//         return true; // found a duplicate pair
//       }
//     }
//   }
//   return false;
// }

// Optimal solution
function sameFrequency(val1, val2) {
  // Convert both numbers to strings so we can loop through each digit
  const str1 = String(val1);
  const str2 = String(val2);

  // If lengths differ, they can't have the same frequency — exit early
  if (str1.length !== str2.length) return false;

  let freq = {};

  // Build a frequency counter from the first number
  // e.g. 182 → { '1': 1, '8': 1, '2': 1 }
  for (let char of str1) {
    if (freq[char]) {
      freq[char]++; // digit already seen, increment count
    } else {
      freq[char] = 1; // digit seen for the first time, set to 1
    }
  }

  // Now check the second number against the counter
  for (let char of str2) {
    if (!freq[char]) {
      // Digit doesn't exist or already used up (0) — mismatch found!
      return false;
    }
    // Digit matched, decrement so it can't be reused
    freq[char]--;
  }

  // All digits matched and consumed — same frequency!
  return true;
}

function areThereDuplicates(...args) {
  for (let i = 0; i < args.length; i++) {
    for (let j = i + 1; j < args.length; j++) {
      if (args[i] === args[j]) {
        return true;
      }
    }
  }
  return false;
}

console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates(1, 2, 2)); // true
console.log(areThereDuplicates("a", "b", "c", "a")); // true

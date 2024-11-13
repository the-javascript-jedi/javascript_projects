function isAnagram(s, t) {
  let first = s.split("").sort().join("");
  let second = t.split("").sort().join("");
  return first == second;
  console.log("first", first);
  console.log("second", second);
}

// Example usage:
console.log(isAnagram("car", "rac")); // Output: 3

function removeDuplicates(arr) {
  // Your code here
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // Output: [1, 2, 3, 4, 5]
console.log(removeDuplicates([1, 1, 1, 1, 1])); // Output: [1]

function flattenArray(arr) {
  let result = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      result = result.concat(flattenArray(element)); // Recursively flatten nested arrays
    } else {
      result.push(element); // Push non-array elements directly
    }
  });
  return result;
}
// Example usage
console.log(flattenArray([1, [2, [3, [4]], 5], 6])); // Output: [1, 2, 3, 4, 5, 6]
// console.log(flattenArray([[1, 2], [3, [4, 5]], [6]])); // Output: [1, 2, 3, 4, 5, 6]

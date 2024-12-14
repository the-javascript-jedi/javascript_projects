function findTwoNumbers(nums, target) {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        result.push(nums[i], nums[j]);
      }
    }
  }
  return result;
}

// Example Usage
console.log(findTwoNumbers([1, 3, 4, 5, 6], 10)); // Output: [2, 7]

//////////////////////////////////////////////////////////////////
// function findTwoNumbers(nums, target) {
//   for (var i = 0; i < nums.length; i++) {
//     for (var j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [nums[i], nums[j]]; // Return the two numbers
//       }
//     }
//   }
//   return null; // Return null if no such pair is found
// }

// // Example Usage
console.log(findTwoNumbers([2, 7, 11, 15], 9)); // Output: [2, 7]
console.log(findTwoNumbers([1, 3, 4, 5, 6], 10)); // Output: [4, 6]
console.log(findTwoNumbers([5, 1, 2, 8], 7)); // Output: [5, 2]
console.log(findTwoNumbers([1, 2, 3], 7)); // Output: null

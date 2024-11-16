var moveZeroes = function (nums) {
  let countZeroes = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      countZeroes++;
    }
  }
  console.log("countZeroes", countZeroes);
};
// Example usage:
console.log(moveZeroes([0, 1, 0, 3, 12])); // Output: 3

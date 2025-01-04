function twoSum(nums, target) {
  // console.log("nums", nums);
  // console.log("target", target);
  let sum = 0;
  let resultArr = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        resultArr.push([i, j]);
      }
    }
  }
  console.log("resultArr", resultArr);
}

console.log(twoSum([2, 7, 11, 15], (target = 9)));

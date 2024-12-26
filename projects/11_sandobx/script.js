function mostFrequentElement(arr) {
  let numCount = {};
  let maxCount = 0;
  let maxElement = "";
  arr.forEach((val) => {
    console.log(val);
    if (numCount[val]) {
      numCount[val] = numCount[val] + 1;
    } else {
      numCount[val] = 1;
    }
  });

  for (let key in numCount) {
    console.log("key", key);
    if (numCount[key] > maxCount) {
      maxCount = numCount[key];
      maxElement = key;
    }
  }
  console.log("numCount", numCount);
  console.log("maxCount", maxCount);
  console.log("maxElement", maxElement);
}

// Test
var arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
console.log(mostFrequentElement(arr)); // 4

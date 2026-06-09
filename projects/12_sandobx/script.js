// // brute force
// function countUniqueValues(arr) {
//   let set = new Set(arr);
//   console.log(set.size);
// }

// function countUniqueValues(arr) {
//   if (arr.length === 0) return 0;

//   let i = 0;

//   for (let j = 1; j < arr.length; j++) {
//     if (arr[i] !== arr[j]) {
//       i++;
//       arr[i] = arr[j];
//     }
//   }
//   // console.log("i", i);
//   return i + 1;
// }

// optimized solution
function countUniqueValues(arr) {
  // i points to the position of the last unique value found
  let i = 0;

  // j scans through the array looking for new unique values
  for (let j = 1; j < arr.length; j++) {
    // If the values at i and j are different,
    // we have found a new unique value
    if (arr[i] !== arr[j]) {
      // Move i forward to the next position
      i++;

      // Store the new unique value at index i
      arr[i] = arr[j];
    }
  }

  // Since i is an index (starting at 0),
  // the number of unique values is i + 1
  return i + 1;
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 2]));
console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13])); // 7
console.log(countUniqueValues([])); // 0
console.log(countUniqueValues([-2, -1, -1, 0, 1])); // 4

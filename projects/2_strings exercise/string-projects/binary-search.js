function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid
    } else if (arr[mid] < target) {
      // 5<7
      left = mid + 1; // Search in the right half
    } else {
      // 2<5
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}

// Example usage:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;
const result = binarySearch(array, target);

if (result !== -1) {
  console.log(`Target found at index: ${result}`);
} else {
  console.log("Target not found in the array.");
}

//  linear search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Return the index if the target is found
    }
  }
  return -1; // Return -1 if the target is not found
}
let arr = [3, 1, 4, 7, 5, 9];
let targetLinear = 5;
let index = linearSearch(arr, targetLinear);
console.log(index); // Output: 4 (index of target value 5 in the array)

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found at index mid
    } else if (arr[mid] < target) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}

// Example usage:
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
const result = binarySearch(array, target);

if (result !== -1) {
  console.log(`Target found at index: ${result}`);
} else {
  console.log("Target not found in the array.");
}

let nestedArr = [1, 2, 3, [4, 5, [6, 7, 8]]];
function flattenNestedArr(arrSource) {
  let resultArr = [];
  function flattenArr(innerArr) {
    for (let i = 0; i < innerArr.length; i++) {
      if (Array.isArray(innerArr[i])) {
        flattenArr(innerArr[i]);
      } else {
        resultArr.push(innerArr[i]);
      }
    }
  }
  flattenArr(arrSource);
  return resultArr;
}
console.log(flattenNestedArr(nestedArr));
/////////////////////////////////////////////////////////////////////////////////////
/*
function bubbleSort(array) {
  const length = array.length;

  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}
*/
// function bubbleSort(arr) {
//   let n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//     // Last i elements are already in place
//     for (let j = 0; j < n - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         // Swap the elements
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

// // Example usage:
// let array = [64, 34, 25, 12, 22, 11, 90];
// console.log("Sorted array:", bubbleSort(array));
// // O/P Sorted array: (7) [11, 12, 22, 25, 34, 64, 90]

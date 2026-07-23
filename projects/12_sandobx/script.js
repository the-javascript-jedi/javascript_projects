/*
 * Problem: Find the Largest of Three Numbers
 * Given three numbers, return the largest of the three.
 *
 * Input:  a = 10, b = 30, c = 90
 * Output: 90
 *
 * Approach: Put the numbers in an array, then scan through it keeping
 * track of the biggest value seen so far.
 * Time complexity: O(1) (always exactly 3 elements to scan)
 *
 * Shortcut: this is exactly what Math.max does.
 * Math.max(a, b, c) - or Math.max(...values) for an array - returns the
 * largest of any number of arguments, so the loop below could be
 * replaced with a single line: `return Math.max(a, b, c);`
 */
function findLargestOfThreeNumbers(a, b, c) {
  let values = [a, b, c];
  let max = values[0];
  for (let i = 0; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  return max;
}

console.log(findLargestOfThreeNumbers(10, 30, 90));

function findLargestOfThreeNumbersUsingMathMax(a, b, c) {
  let values = [a, b, c];
  return Math.max(...values);
}

console.log(findLargestOfThreeNumbersUsingMathMax(10, 30, 90));

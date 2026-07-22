/*
 * Problem: Swap Two Numbers
 * Given two numbers, swap their values without using a third variable
 * to hold both at once (a single temp slot is fine).
 *
 * Input:  a = 10, b = 20
 * Output: [20, 10]
 *
 * Approach: Save a's original value in temp before overwriting a,
 * then assign temp back into b. Saving b first would lose a's value
 * before it's ever read.
 * Time complexity: O(1)
 */
function swapTwoNumbers(a, b) {
  let temp = 0;

  // Preserve a's original value before it gets overwritten below
  temp = a;

  // a now takes b's value
  a = b;

  // b takes a's original value, held in temp
  b = temp;

  return [a, b];
}

console.log(swapTwoNumbers(10, 20)); // [20, 10]

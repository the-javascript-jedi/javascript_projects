function fibonacci(n) {
  let fibSequence = [0, 1];
  for (let i = 2; i < n; i++) {
    fibSequence.push(fibSequence[i - 2] + fibSequence[i - 1]);
  }
  return fibSequence;
}

// Example usage:
console.log(fibonacci(5)); // Output: 5
console.log(fibonacci(10)); // Output: 55
console.log(fibonacci(20)); // Output: 6765

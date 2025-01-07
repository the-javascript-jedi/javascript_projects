function logNumbersOnce(n) {
  let current = 1; // Start from 1
  const intervalId = setInterval(() => {
    console.log(current);
    current++; // Increment the number
    if (current > n) {
      clearInterval(intervalId); // Stop the interval after reaching n
    }
  }, 1000); // Adjust the interval (1000ms = 1 second)
}

// Call the function with the desired value of n
logNumbersOnce(5);

// setInterval(() => {});

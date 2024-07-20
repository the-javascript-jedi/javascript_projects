/*
Debounce Function: Write a function that, when called repeatedly within a certain timeframe, only executes once after that timeframe has elapsed. This is useful for preventing excessive function calls, like for input validation during typing. 
ChatGPT
A debounce function ensures that a given function is only executed after a specified amount of time has passed since the last time it was invoked. This is particularly useful in scenarios like handling input events, where you want to delay the processing until the user has stopped typing.

*/
function debounce(func, delay) {
  // This variable will hold the timeout ID
  let timeoutId;

  // The debounce function returns a new function
  return function (...args) {
    // If there's an existing timeout, clear it
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a new timeout to call the function after the delay
    timeoutId = setTimeout(() => {
      // Call the original function with the provided arguments
      func.apply(this, args);
    }, delay);
  };
}
// Example usage:
// This is the function we want to debounce
function processInput() {
  console.log("Processing input...");
}
// Create a debounced version of the processInput function
const debouncedProcessInput = debounce(processInput, 300);
// Simulate rapid function calls
debouncedProcessInput();
debouncedProcessInput();
debouncedProcessInput();
// Only the last call will actually cause 'Processing input...' to be logged after 300ms

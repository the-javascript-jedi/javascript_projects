function areThereDuplicates(...args) {
  // console.log("args", args);
  let freq = {};
  for (let i = 0; i < args.length; i++) {
    // console.log(args[i]);
    if (freq[args[i]]) {
      freq[args[i]]++;
    } else {
      freq[args[i]] = 1;
    }
  }
  console.log("freq", freq);

  for (let char in freq) {
    // if(freq)
    // console.log("char", char);
    // console.log("freq[char]", freq[char]);
    if (freq[char] > 1) {
      return true;
    } else {
    }
  }
  return false;
}
console.log("areThereDuplicates(1, 2, 3)", areThereDuplicates(1, 2, 3));
console.log("areThereDuplicates(1, 2, 2)", areThereDuplicates(1, 2, 2));
console.log("areThereDuplicates(", areThereDuplicates("a", "b", "c", "a"));

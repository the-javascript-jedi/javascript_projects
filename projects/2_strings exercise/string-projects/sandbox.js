function findVowels(str) {
  // let letters = str.split("");
  // console.log("letters", letters);

  let vowels = ["a", "e", "i", "o", "u"];
  let obj = {};
  str.split("").forEach((val) => {
    // debugger;
    if (obj[val]) {
      obj[val] = obj[val] + 1;
    } else {
      obj[val] = 1;
    }
  });
  console.log("obj", obj);
}

findVowels("Hi There"); //3

// function findVowelsCount(str) {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     let count = 0;

//     for (let char of str.toLowerCase()) {
//         if (vowels.includes(char)) {
//             count++;
//         }
//     }

//     return count;
// }

// // Example usage
// console.log(findVowelsCount("Hi There")); // Output: 3

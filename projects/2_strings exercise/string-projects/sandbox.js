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

  let count=0;
  for (const property in obj) {
    console.log(`${property}: ${obj[property]}`);
    if(vowels.includes(property)){
      count=count+obj[property]
    }
  }
  console.log("count",count)
}

findVowels("Hi Thereeeeee"); //3

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
// console.log(findVowelsCount("Hi Thereeeee")); // Output: 3

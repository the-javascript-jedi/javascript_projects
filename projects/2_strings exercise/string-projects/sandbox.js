const vowels = ["a", "e", "i", "o", "u"];
function findVowels(str) {
  let vowelsFound = "";
  str.split("").forEach((val) => {
    if (vowels.includes(val)) {
      vowelsFound = vowelsFound + val;
    }
  });
  console.log("vowelsFound", vowelsFound);
}

function findVowelsCount(str) {
  let count = 0;
  str.split("").forEach((val) => {
    if (vowels.includes(val)) {
      count++;
    }
  });
  return count;
}
console.log("findVowelsCount", findVowelsCount("abceiddeoo"));
console.log("findVowels", findVowels("abceioo"));

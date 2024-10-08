// function validateIbanCode(input) {
//   const regex =
//     /((FR|Fr|FR|fr)[a-zA-Z0-9]{2}\s?([0-9]{4}\s?){2}[0-9]{2}[a-zA-Z0-9]{2}\s?([a-zA-Z0-9]{4}\s?){2}[a-zA-Z0-9]{1})|((AT|At|aT|at)\d{18})$/;
//   return regex.test(input);
// }
// console.log(validateIbanCode("fr1234567890123456789012345")); // returns true
// console.log(validateIbanCode("AT123456789012345678")); // returns true
// console.log(validateIbanCode("INVALIDCODE")); // returns false
// console.log(validateIbanCode("fr12 3456 7890 1234 56789012 345")); // returns true
function validateIbanCodeNoSpaces(input) {
  //   const regex = /((FR|Fr|FR|fr)\s[0-9]{1}\s([0-9]{4}\s){5}[0-9]{1})|((AT|At|aT|at)\d{18})$/;
  const regex = /^((FR|Fr|FR|fr)\s[0-9]{1}\s([0-9]{4}\s){5}[0-9]{4})$/;
  return regex.test(input);
}
console.log(validateIbanCodeNoSpaces("FR 1 2345 6789 0123 4567 8901 2345")); // returns true

// function regexStringCheck(input) {
//   const regex = /^[a-zA-Z]{5}$/;
//   return regex.test(input);
// }
// console.log(regexStringCheck("abcde"));

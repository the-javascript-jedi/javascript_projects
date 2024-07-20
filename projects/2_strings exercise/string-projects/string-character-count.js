// string character count
let stringText = "apple 1231111";
let splitText = stringText.split("");
let obj = {};

splitText.forEach((val) => {
  if (obj[val]) {
    obj[val] += 1;
  } else {
    obj[val] = 1;
  }
});

console.log("obj", obj);
// expected O/P
/*
{
n:2,
i:2,
t:1,
h:1
}
*/

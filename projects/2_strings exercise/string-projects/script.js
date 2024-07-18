let stringText = "nithin";
let splitText = stringText.split("");
let obj = {};

splitText.forEach((val) => {
  if (obj[val]) {
    obj[val] += 1;
  } else {
    obj[val] = 1;
  }
});

console.log(obj);
// expected O/P
/*
{
n:2,
i:2,
t:1,
h:1
}
*/

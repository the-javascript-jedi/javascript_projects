// source 1 - https://stackoverflow.com/questions/33909443/how-to-order-the-item-categories-in-javascript
// source 2 - https://stackoverflow.com/questions/69399255/how-to-sort-an-array-of-string-per-priority

console.log("script loaded!");
var priorityArray = ["High", "Medium", "Low"];
var points = [
  { Name: "House", Priority: "High" },
  { Name: "Travel", Priority: "Medium" },
  { Name: "Children", Priority: "High" },
  { Name: "Personal Loan", Priority: "Low" },
  { Name: "Car", Priority: "Medium" },
  { Name: "Shopping", Priority: "Low" },
];
console.log("points - before sort", points);
var pointsArraySlice = this.points.slice();
var sortedArray = pointsArraySlice.sort(function (a, b) {
  var firstPrio = priorityArray.indexOf(a.Priority);
  var secPrio = priorityArray.indexOf(b.Priority);
  return firstPrio - secPrio;
});

console.log("points sortedArray- before sort", sortedArray);
/////////////////////////////////////////////////
// example 2
const domainPrecedence = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "hotmail.com",
  "live.com",
];

const personalEmail = [
  "email@yahoo.com",
  "email@live.com",
  "email@other.com",
  "email@gmail.com",
  "email@outlook.com",
];

const sortedEmails = personalEmail.sort((a, b) => {
  let index1 = domainPrecedence.indexOf(a.split("@")[1]);
  let index2 = domainPrecedence.indexOf(b.split("@")[1]);
  return index1 == -1 ? 1 : index2 == -1 ? -1 : index1 - index2;
});

console.log("sortedEmails", sortedEmails);

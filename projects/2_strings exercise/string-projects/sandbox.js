const users = ["ns1234", "winu4321", "rian8524"];

const result = users.map((user) => {
  const name = user.match(/[a-zA-Z]+/)[0]; // Extract the alphabetic part
  console.log("name", name);
  // The 10 in parseInt(user.match(/\d+/)[0], 10) specifies the radix or base for the number conversion.
  const id = parseInt(user.match(/\d+/)[0], 10); // Extract the numeric part and convert to an integer
  return { name, id };
});

console.log(result);
// O/P
// [
//     {"name": "ns","id": 1234 },
//     {"name": "winu","id": 4321},
//     {"name": "rian","id": 8524}
// ]

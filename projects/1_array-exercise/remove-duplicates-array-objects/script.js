const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" }, // Duplicate
  { id: 3, name: "Charlie" },
  { id: 2, name: "Bob" }, // Duplicate
];

// const uniqueStudents = students.filter(
//   (student, index, self) =>
//     index ===
//     self.findIndex((s) => s.id === student.id && s.name === student.name)
// );
// console.log(uniqueStudents);
/*
[
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]
*/
///////////////////////////////////////////////////////////////////////////////
// const uniqueStudents = students.filter((student, index, self) => {
//   return index === self.findIndex((s) => s.id === student.id);
// });
// console.log(uniqueStudents);

const uniqueStudents = students.filter((student, index, self) => {
  return (
    index ===
    self.findIndex((s) => {
      return s.id === student.id;
    })
  );
});
console.log(uniqueStudents);

function reverseString(str) {
  return str.split("").reverse().join("");
}

const originalString = "Hello, world!";
const reversedString = reverseString(originalString);
console.log(reversedString); // Output: "!dlrow ,olleH"

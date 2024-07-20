function groupBy(array, property) {
  return array.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

// Example usage
const users = [
  { name: "Alice", department: "Engineering" },
  { name: "Bob", department: "Engineering" },
  { name: "Charlie", department: "Human Resources" },
  { name: "Dave", department: "Human Resources" },
  { name: "Eve", department: "Marketing" },
];

const groupedByDepartment = groupBy(users, "department");
console.log(groupedByDepartment);

// Output:
// {
//   Engineering: [
//     { name: 'Alice', department: 'Engineering' },
//     { name: 'Bob', department: 'Engineering' }
//   ],
//   'Human Resources': [
//     { name: 'Charlie', department: 'Human Resources' },
//     { name: 'Dave', department: 'Human Resources' }
//   ],
//   Marketing: [
//     { name: 'Eve', department: 'Marketing' }
//   ]
// }

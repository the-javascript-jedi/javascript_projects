console.log("script.js loaded!!!");
const dataWithDuplicates = [
  {
    id: 1, //duplicate id
    name: "steve rodgers",
    alias: "captain america",
    designation: "hero",
  },
  {
    id: 2,
    name: "Eddie Brock", //duplicate name
    alias: "venom",
    designation: "villain",
  },
  {
    id: 1,
    name: "tony stark", //duplicate id
    alias: "iron man",
    designation: "hero",
  },
  {
    id: 4,
    name: "Eddie Brock", //duplicate name
    alias: "venom",
    designation: "villain",
  },
];
console.log("original data--dataWithDuplicates", dataWithDuplicates);
// delete all duplicates
var deleteAllDuplicatesFn = (arr, key) => {
  const duplicates = arr.reduce(
    (seen, obj) => ((seen[obj[key]] = seen.hasOwnProperty(obj[key])), seen),
    {}
  );
  return arr.filter((obj) => !duplicates[obj[key]]);
};

var duplicatesDeleted = deleteAllDuplicatesFn(dataWithDuplicates, "name");
console.log("duplicatesDeleted", duplicatesDeleted);
// remove repeating elements
var removeDuplicatesBasedOnId = (duplicateArray) => {
  var uniqueArray;
  uniqueArray = duplicateArray.filter((value, index, self) => {
    return index === self.findIndex((t) => t.id === value.id);
  });
  return uniqueArray;
};
var removeDuplicates = removeDuplicatesBasedOnId(dataWithDuplicates);
console.log("removeDuplicates", removeDuplicates);

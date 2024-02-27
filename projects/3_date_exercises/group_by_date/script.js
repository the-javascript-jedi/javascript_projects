console.log("script loaded!!!");
// // expected data
// var expected = [
//   {
//     week: "May 1",
//     low_devices: 1000,
//     medium_devices: 500,
//     high_devices: 100,
//   },
// ];
// var data
var testData = [
  {
    Week: "20230817",
    "High Count": 100,
    "Low Count": 10,
    "Medium Count": 5,
  },
  {
    Week: "20230817",
    "High Count": 100,
    "Low Count": 10,
    "Medium Count": 5,
  },
  {
    Week: "20230817",
    "High Count": 100,
    "Low Count": 10,
    "Medium Count": 5,
  },
  {
    Week: "20230817",
    "High Count": 100,
    "Low Count": 10,
    "Medium Count": 5,
  },
  {
    Week: "20230817",
    "High Count": 100,
    "Low Count": 10,
    "Medium Count": 5,
  },
  //2nd date
  {
    Week: "20230824",
    "High Count": 10,
    "Low Count": 20,
    "Medium Count": 30,
  },
  {
    Week: "20230824",
    "High Count": 10,
    "Low Count": 20,
    "Medium Count": 30,
  },
  //   3rd date
  {
    Week: "20230831",
    "High Count": 500,
    "Low Count": 200,
    "Medium Count": 10,
  },
  {
    Week: "20230831",
    "High Count": 500,
    "Low Count": 200,
    "Medium Count": 10,
  },
  {
    Week: "20230831",
    "High Count": 1000,
    "Low Count": 200,
    "Medium Count": 10,
  },
  {
    Week: "20230831",
    "High Count": 1000,
    "Low Count": 0,
    "Medium Count": 10,
  },
  // 4th date
  {
    Week: "20230907",
    "High Count": 20,
    "Low Count": 50,
    "Medium Count": 100,
  },
  {
    Week: "20230907",
    "High Count": 20,
    "Low Count": 50,
    "Medium Count": 100,
  },
  {
    Week: "20230907",
    "High Count": 20,
    "Low Count": 50,
    "Medium Count": 100,
  },
  {
    Week: "20230907",
    "High Count": 20,
    "Low Count": 50,
    "Medium Count": 100,
  },
  {
    Week: "20230907",
    "High Count": 20,
    "Low Count": 50,
    "Medium Count": 100,
  },
];

// group by
// console.log("group by", _.groupBy(testData, "Week"));
// var groupdData = _.groupBy(testData, "Week");
const result = testData.reduce((acc, item) => {
  const itemIndex = acc.findIndex((i) => i.Week === item.Week);
  if (itemIndex !== -1) {
    acc[itemIndex]["High Count"] += item["High Count"];
    acc[itemIndex]["Medium Count"] += item["Medium Count"];
    acc[itemIndex]["Low Count"] += item["Low Count"];
  } else {
    acc.push(item);
  }
  return acc;
}, []);
console.log("result", result);

console.log("script loaded");
var datesWithRiskData = [
  "20230401",
  "20230501",
  "20230301",
  "20230201",
  "20221101",
  "20221201",
  "20220801",
  "20220901",
  "20221001",
  "20230601",
];

// convert date to date format
// console.log("moment();", moment());
let convertedDumpDateValues = [];
datesWithRiskData.forEach(function (data) {
  // conert dumpdate to timestamp
  let dumpdateFromApi = data;
  let yearDumpDate = dumpdateFromApi.substring(0, 4);
  let monthDumpDate = dumpdateFromApi.substring(4, 6);
  let dayDumpDate = dumpdateFromApi.substring(6, 8);
  let dumpDateWithSlash =
    yearDumpDate + "-" + monthDumpDate + "-" + dayDumpDate;
  const convertedDumpDate = moment(dumpDateWithSlash, "YYYY-MM-DD").toDate();
  const dateInMilliseconds = convertedDumpDate.getTime();
  var obj = {
    convertedDumpDate,
    dateInMilliseconds,
  };
  convertedDumpDateValues.push(obj);
});

// console.log("convertedDumpDateValues", convertedDumpDateValues);
let sortedDates = [];
sortedDates = convertedDumpDateValues.sort(function (x, y) {
  return x.dateInMilliseconds - y.dateInMilliseconds;
});
console.log("sortedDates", sortedDates);
const today = new Date();
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(today.getMonth() - 6);
// console.log("sixMonthsAgo", sixMonthsAgo);
const filteredDates = sortedDates.filter(
  (date) => date.convertedDumpDate > sixMonthsAgo
);
console.log("filteredDates", filteredDates);

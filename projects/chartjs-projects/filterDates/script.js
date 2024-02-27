const dates = [
  "2021-11-01",
  "2021-11-02",
  "2021-11-03",
  "2021-11-04",
  "2021-11-05",
  "2021-11-06",
  "2021-11-07",
];
// convert the dates to milliseconds
const convertedDates = dates.map((date) => {
  return new Date(date).setHours(0, 0, 0, 0);
});
// console.log("convertedDates", convertedDates);
const dataPoints = [18, 12, 6, 9, 12, 3, 9];
const data = {
  labels: dates,
  datasets: [
    {
      label: "Weekly Sales",
      data: dataPoints,
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255, 26, 104, 1)"],
      borderWidth: 1,
    },
  ],
};

// config
const config = {
  type: "bar",
  data,
  options: {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

// filter date
function filterDate() {
  const start1 = new Date(document.getElementById("start").value);
  // setHours will convert to milliseconds
  const start = start1.setHours(0, 0, 0, 0);
  const end1 = new Date(document.getElementById("end").value);
  const end = end1.setHours(0, 0, 0, 0);
  console.log("start", start);
  console.log("end", end);
  // filter dates based on the start and end dates
  const filterDates = convertedDates.filter(function (date) {
    return date >= start && date <= end;
  });
  // set chart js data to filtered data
  myChart.config.data.labels = filterDates;
  // working on the data-so x axes data matches y axes data
  // find the start and end of the filtered array
  const startArray = convertedDates.indexOf(filterDates[0]);
  const endArray = convertedDates.indexOf(filterDates[filterDates.length - 1]);
  console.log("startArray-endArray", startArray + "-" + endArray);
  // duplicate the dataPoints array
  const copyDataPoints = [...dataPoints];
  //endArray- means index so we add +1
  copyDataPoints.splice(endArray + 1, filterDates.length);
  console.log("copyDataPoints", copyDataPoints);
  copyDataPoints.splice(0, startArray);
  console.log("copyDataPoints", copyDataPoints);
  myChart.config.data.datasets[0].data = copyDataPoints;
  myChart.update();
}

// reset filter
function resetDate() {
  myChart.config.data.labels = convertedDates;
  myChart.config.data.datasets[0].data = dataPoints;
  myChart.update();
}

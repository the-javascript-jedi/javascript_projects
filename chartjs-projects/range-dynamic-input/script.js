// setup block
const labels = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
const datapoints = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];
const backgroundColor = [
  "rgba(255, 26, 104, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(0, 0, 0, 0.2)",
  "rgba(255, 26, 104, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(0, 0, 0, 0.2)",
  "rgba(255, 26, 104, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(0, 0, 0, 0.2)",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Weekly Sales",
      data: datapoints,
      backgroundColor: backgroundColor,
      borderWidth: 1,
      borderColor: backgroundColor,
    },
  ],
};
//plugin -

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);
const start = document.getElementById("start");
const end = document.getElementById("end");
// range click event
function updateMin(range) {
  console.log("range-updateMin", range.value);
  // slice and create a new array
  const minValue = labels.slice(range.value - 1, end.value); //value specified in second slider
  const dbMinValue = datapoints.slice(range.value - 1, end.value);
  // set the min value of range
  myChart.config.data.labels = minValue;
  myChart.config.data.datasets[0].data = dbMinValue;
  // set the second slider min value
  end.min = range.value;
  myChart.update();
}
function updateMax(range) {
  console.log("range-updateMax", range.value);
  // slice and create a new array
  const maxValue = labels.slice(start.value - 1, range.value);
  const dbMaxValue = datapoints.slice(start.value - 1, range.value);
  // set the max value of range
  myChart.config.data.labels = maxValue;
  myChart.config.data.datasets[0].data = dbMaxValue;
  start.max = range.value;
  myChart.update();
}

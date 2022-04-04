// ;abels
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
// setup block
const data = {
  labels: labels,
  datasets: [
    {
      label: "Weekly Sales",
      data: [
        18, 12, 6, 9, 12, 3, 9, 12, 10, 18, 12, 6, 9, 12, 3, 9, 20, 2, 18, 12,
        6, 9, 12, 3, 9, 10, 0,
      ],
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderWidth: 1,
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

// range function
function updateChart(range) {
  // console.log("range.value", range.value);
  // console.log("myChart.config.data.labels", myChart.config.data.labels);
  const rangeValue = labels.slice(0, range.value);
  console.log("rangeValue", rangeValue);
  // apply the range value
  myChart.config.data.labels = rangeValue;
  myChart.update();
}

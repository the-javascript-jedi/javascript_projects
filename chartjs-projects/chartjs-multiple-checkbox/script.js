// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly of Cost",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Weekly of Revenue",
      data: [28, 22, 26, 29, 22, 23, 29],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Weekly of Profit",
      data: [8, 2, 16, 19, 2, 13, 9],
      backgroundColor: ["rgba(255, 206, 86, 0.2)"],
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 1,
    },
  ],
};
//plugin

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

function updateChart(data) {
  console.log("data", data.value);
  const isDataShown = myChart.isDatasetVisible(data.value);
  if (isDataShown === false) {
    console.log("data is not shown");
    myChart.show(data.value);
  }
  if (isDataShown === true) {
    console.log("data is shown");
    myChart.hide(data.value);
  }
}

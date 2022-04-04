let apiResponse;
let dateChartJs;
function fetchDataFromApi() {
  fetch("http://localhost:5000/chartsData")
    .then((resp) => resp.json())
    .then((obj) => {
      apiResponse = obj;
      console.log("apiResponse", apiResponse);
      // convert data to date
      dateChartJs = apiResponse.map((day, index) => {
        let dayjs = new Date(day);
        return dayjs.setHours(0, 0, 0, 0);
      });
      console.log("dateChartJs", dateChartJs);
    });
}
fetchDataFromApi();
// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [
        18, 12, 6, 9, 12, 3, 9, 0, 0, 5, 18, 12, 6, 9, 12, 3, 9, 0, 0, 5, 18,
        12, 6, 9, 12, 3, 9, 0, 0, 5,
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
      x: {
        min: "2022-04-01",
        max: "2022-04-30",
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
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);
console.log("fetchDataFromApi", fetchDataFromApi());

// getApiData()
function getApiData() {
  myChart.config.data.labels = dateChartJs;
  myChart.config.data.datasets[0].data = [
    18, 12, 6, 9, 12, 3, 9, 20, 20, 5, 10, 5, 16, 12, 7, 7, 9, 22, 2, 15, 35,
    22, 16, 1, 7, 30, 19, 2, 10, 5,
  ];
  myChart.update();
}
// calendar start date
function startDateFilter(date) {
  const startDate = new Date(date.value);
  console.log("startDate", startDate.setHours(0, 0, 0, 0));
  myChart.config.options.scales.x.min = startDate.setHours(0, 0, 0, 0);
  myChart.update();
}
// calendar end date
function endDateFilter(date) {
  const endDate = new Date(date.value);
  console.log("endDate", endDate.setHours(0, 0, 0, 0));
  myChart.config.options.scales.x.max = endDate.setHours(0, 0, 0, 0);
  myChart.update();
}

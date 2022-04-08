// Button Click Event
function updateChart() {
  // fetch block
  async function fetchData() {
    const response = await fetch("http://localhost:5000/chartjsFetchJson");
    // wait untill request is completed
    const datapoints = await response.json();
    console.log("datapoints", datapoints);
    return datapoints;
  }
  fetchData().then((datapoints) => {
    // get months details from api
    const months = datapoints.financialreport[0].financials.map(function (val) {
      return val.date;
    });
    console.log("months", months);
    // get revenue details from api
    const revenue = datapoints.financialreport[0].financials.map(function (
      val
    ) {
      return val.revenue;
    });
    console.log("revenue", revenue);
    // get company name from api
    const companynameArr = datapoints.financialreport.map((val) => {
      return val.companyname;
    });
    console.log("companynameArr", companynameArr);
    // update the chart y axes
    myChart.config.data.labels = months;
    // update the chart x axes
    myChart.config.data.datasets[0].data = revenue;
    // update the legend
    myChart.config.data.datasets[0].label = companynameArr[0];
    // update the data points
    myChart.update();
  });
}
// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9, 0, 0],
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

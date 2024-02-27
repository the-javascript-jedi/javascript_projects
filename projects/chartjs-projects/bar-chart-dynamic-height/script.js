// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
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
      // borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      // bar width
      // barPercentage: 0.5,
    },
  ],
};
//plugin -

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    // used for adjusting the bar chart height and width
    maintainAspectRatio: false,
    // align chart horizontally
    indexAxis: "y",
    scales: {
      // aligns the grid on the grid line when false
      x: {
        grid: {
          offset: true,
          // dont-display-grid lines
          display: true,
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
// addBar
function addBar() {
  myChart.config.data.labels.push("New Bar");
  myChart.config.data.datasets[0].data.push(6);
  myChart.update();
  // css - match with canvas height
  let chartHeight = 350;
  const totalBars = myChart.config.data.labels.length;
  console.log("totalBars", totalBars);
  // adjust height of the div
  const chartBox = document.querySelector(".chartBox");
  chartBox.style.height = newHeight + "px";
  if (totalBars > 15) {
    newHeight = (totalBars - 15) * 20 + chartHeight;
    chartBox.style.height = newHeight + "px";
  }
  console.log("chartBox.style.height", chartBox.style.height);
}

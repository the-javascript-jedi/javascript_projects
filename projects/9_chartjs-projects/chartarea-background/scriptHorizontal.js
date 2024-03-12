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
//plugin - chartAreaPlugin
const chartAreaPlugin = {
  id: "chartAreaPlugin",
  // beforeDraw - before chartjs values are put in canvas
  // afterDraw - after chartjs values are put in canvas
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;
    ctx.save();

    ctx.fillStyle = "black";
    //  ctx.fillRect(left, top, width, height);
    ctx.fillRect(left, top, width / 2, height);
    ctx.fillStyle = "blue";
    // change the starting position of the leftMid value
    const leftMid = width / 2 + left;
    ctx.fillRect(leftMid, top, width / 2, height);
  },
};
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
  plugins: [chartAreaPlugin],
};
// render init block
const myChart = new Chart(document.getElementById("myChartHorizontal"), config);
console.table(myChart.chartArea);

// setup block
const dataVertical = {
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
const chartAreaPluginVertical = {
  id: "chartAreaPluginVertical",
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
    const heightStart = height / 3;
    ctx.fillRect(left, top, width, heightStart);
    ctx.fillStyle = "blue";
    // change the starting position of the heightmid value
    const heightMid = height / 3;
    ctx.fillRect(left, heightMid, width, heightMid);
    // change the starting position of the heightend value
    ctx.fillStyle = "green";
    const heightEnd = heightMid + height / 3;
    ctx.fillRect(left, heightEnd, width, height);
  },
};
// config block
const configVertical = {
  type: "bar",
  data: dataVertical,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [chartAreaPluginVertical],
};

// render init block
const myChartVertical = new Chart(
  document.getElementById("myChartVertical"),
  configVertical
);
console.table(myChartVertical.chartArea);

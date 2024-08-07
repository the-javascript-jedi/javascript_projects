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
      // borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
    },
  ],
};
//plugin - linePlugin
const linePlugin = {
  id: "linePlugin",
  afterDraw(chart) {
    const { ctx } = chart;
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "rgba(255,26,104,1)";
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 100);
    ctx.stroke();
    ctx.closePath();
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
  plugins: [ChartDataLabels, linePlugin],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

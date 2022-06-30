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
      borderColor: [
        "rgba(255, 26, 104, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(0, 0, 0, 0.5)",
      ],
      borderWidth: 2,
      // bar width
      // barPercentage: 0.5,
    },
  ],
};
//plugin - highlightBar
const highlightBar = {
  id: "highlightBar",
  afterDatasetsDraw(chart) {
    const vote = document.getElementById("vote");
    console.log("dropdown value", vote.value);
    const index = chart.data.labels.indexOf(vote.value);
    if (index >= 0) {
      const {
        ctx,
        chartArea: { top, bottom },
      } = chart;
      // calculate x and y coordinate
      const x = chart.getDatasetMeta(0).data[index].x;
      const y = chart.getDatasetMeta(0).data[index].y;
      //// draw circle on top --starts
      //// angle half circle
      const angle = Math.PI / 180;
      ctx.beginPath();
      // color of ball
      ctx.fillStyle = chart.data.datasets[0].borderColor[index];
      // ctx.arc(x,y,radius,angleForStarting,angleForEnding,counterclockwise)
      ctx.arc(x, y, 10, angle * 0, angle * 360, false);
      ctx.fill();
      ctx.closePath();
      //// draw circle on top --ends
      /**/
      //// draw line on --start
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = chart.data.datasets[0].borderColor[index];
      ctx.moveTo(x, bottom);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.save();
      //// draw line on ends
    }
  },
};
// config block
const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      // aligns the grid on the grid line when false
      x: {
        grid: {
          offset: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [highlightBar],
};
// selected vote dropdown
function selectedVote(vote) {
  const index = myChart.data.labels.indexOf(vote.value);
  console.log("dropdown index", index);
  myChart.update();
}
// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

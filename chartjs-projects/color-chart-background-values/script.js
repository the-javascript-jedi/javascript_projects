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
      borderColor: ["rgba(26,26,104,1)"],
      borderWidth: 2,
    },
  ],
};
//plugin -statusTracker
const statusTracker = {
  id: "statusTracker",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    // draw line using function
    drawLines(10, "rgba(255,26,104,1)");
    drawLines(4, "rgba(255,206,86,1)");
    // code to draw line
    function drawLines(yValue, color) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      // ctx.moveTo(XlineStartingPoint, YlineStartingPoint);
      // ctx.lineTo(XlineEndingPoint, YlineEndingPoint);
      ctx.moveTo(left, y.getPixelForValue(yValue));
      ctx.lineTo(right, y.getPixelForValue(yValue));
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    // call the tracker function to update the chart last value status
    tracker();
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [statusTracker],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

//Status Tracker Function
function tracker() {
  const datapoints = myChart.data.datasets[0].data;
  const datapointsLength = datapoints.length - 1;
  const status = document.getElementById("status");
  // console.log("datapoints", datapoints);
  // set status based on last value in dataset
  if (datapoints[datapointsLength] > 10) {
    status.innerText = "Danger";
  } else if (datapoints[datapointsLength] < 4) {
    status.innerText = "Reset System";
  } else {
    status.innerText = "Success";
  }
}
// addValue
function addValue(val) {
  myChart.data.datasets[0].data.push(val);
  myChart.data.labels.push("New Day");
  // update chart
  myChart.update();
}

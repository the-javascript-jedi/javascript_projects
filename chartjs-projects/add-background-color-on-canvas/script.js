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
const canvasBackgroundColor = {
  id: "canvasBackgroundColor",
  // beforeDraw -  draw background color first so grid lines are not hidden behind solid color
  //beforeDatasetsDraw-will remove gridlines with solid colors
  beforeDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, height, width },
      scales: { x, y },
    } = chart;
    // save all upper values
    ctx.save();
    // red background
    bgColors(14, 18, "rgba(255,26,104,0.2)");
    // yellow background
    bgColors(4, 14, "rgba(255,206,86,0.2)");
    // green background
    bgColors(0, 4, "rgba(75,206,86,0.2)");
    // function to add bgColor to canvas
    function bgColors(bracketLow, bracketHigh, color) {
      ctx.fillStyle = color;
      // ctx.fillRect(left, top, width, height);
      ctx.fillRect(
        left,
        y.getPixelForValue(bracketHigh),
        width,
        // we do subtraction for height to exactly target the point
        y.getPixelForValue(bracketLow) - y.getPixelForValue(bracketHigh)
      );
      // restore default values
      ctx.restore();
    }
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
  plugins: [canvasBackgroundColor],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

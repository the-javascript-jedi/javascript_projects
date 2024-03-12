var maxNoPlot;
// setup block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 22, 3],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0,
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBorderColor: "grey",
    },
  ],
};
// Calculate the maximum number in plot
var dataToCalculate = data.datasets[0].data.slice();
console.log("dataToCalculate", dataToCalculate);
var maxNoPlot = dataToCalculate.reduce(
  (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
  0
);

// document.write("indexOfMaxValue = " + indexOfMaxValue);
console.log("maxNoPlot", maxNoPlot);
//plugin
const arbitraryLine = {
  id: "arbitraryLine",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
      // scales identify the point in canvas
      scales: { x, y },
    } = chart;
    ctx.save();
    //1) how to draw a line
    ctx.strokeStyle = "red";
    // ctx.strokeStyle = config.options.plugins.arbitraryLine.arbitraryLineColor;
    //2) where to position the line (xy position on the scale)
    // we can pass 1 or 2 i.e the x position value which we need
    // console.log("x.getPixelForValue", x.getPixelForValue(2));
    // console.log("y.getPixelForValue", y.getPixelForValue(2));
    //ctx.strokeRect(x0, y0, x1, y1);
    // x0-starting point on horizontal line, left/right
    // y0-starting point on vertical line, top/bottom
    // x1-ending point on horizontal line, left/right(length of horizontal line)
    // y1-ending point on vertical line, top/bottom(length of vertical line)
    //working// ctx.strokeRect(x.getPixelForValue(2), top, 0, height);
    // ctx.strokeRect(x.getPixelForValue(2), top, 0, y.getPixelForValue(2));
    // console.log("height", height);
    ctx.strokeRect(x.getPixelForValue(maxNoPlot), top, 0, height);
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
    plugins: {
      arbitraryLine: {
        arbitraryLineColor: "blue",
      },
    },
  },
  plugins: [arbitraryLine],
};
// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

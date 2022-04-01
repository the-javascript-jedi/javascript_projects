// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "# of Votes",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.4,
    },
  ],
};
//plugin
const successTracker = {
  id: "successTracker",
  beforeDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, right, bottom, left, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    console.log("ctx", ctx);
    // success line
    ctx.strokeStyle = "green";
    // x0-starting point on horizontal line, left/right
    // y0-starting point on vertical line, top/bottom
    // x1-ending point on horizontal line, left/right(length of horizontal line)
    // y1-ending point on vertical line, top/bottom(length of vertical line)
    //y.getPixelForValue(12)-specifies the 12th point in y axis
    ctx.strokeRect(left, y.getPixelForValue(12), width, 0);
    //restores the most recently saved canvas state by popping the top entry in the drawing state stack
    ctx.restore();
    // success background
    ctx.fillStyle = "rgba(0,200,0,0.2)";
    // we minus the top value which contains the legend data
    //y.getPixelForValue(12)-specifies the 12th point in y axis
    ctx.fillRect(left, top, width, y.getPixelForValue(12) - top);

    // Success Text
    ctx.font = "12px Arial";
    ctx.fillStyle = "green";
    // ctx.fillText("text", xposition, yposition);
    // we add the left position value to xposition to add the chart y values
    ctx.fillText(
      "Success Tracker Line",
      width / 2 + left,
      y.getPixelForValue(12) - 12
    );
    ctx.textAlign = "center";
    ctx.restore();
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
  plugins: [successTracker],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

// setup block
const data = {
  labels: [
    "Holiday",
    "Holiday",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Closed",
    "Closed",
  ],
  datasets: [
    {
      label: "Weekly Sales",
      data: [0, 0, 18, 12, 6, 9, 12, 3, 9, 0, 0],
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
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.5,
    },
  ],
};
//plugin - backgroundHighLighter
const backgroundHighLighter = {
  id: "backgroundHighLighter",
  beforeDatasetDraw(chart, args, options) {
    // destructure elements from chart
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    // find the starting position where value is greater than 0
    const startValue = data.datasets[0].data.find((value) => value > 0);
    const startIndex = data.datasets[0].data.indexOf(startValue);
    //find the ending where 0 (apply break in for loop to stop at first zero)
    let endIndex;
    for (let i = startIndex; i < data.datasets[0].data.length; i++) {
      if (data.datasets[0].data[i] === 0) {
        endIndex = i;
        break;
      }
    }

    // x.getPixelForValue - gets the position of the x item value//not used in this example
    // console.log("x.getPixelForValue(0)", x.getPixelForValue(2));

    // ctx.fillRect(left, top, width, height); //color the entire chart area
    // we subtract the second value(- x._gridLineItems[2].x1) so that the index colored value starting is not center aligned and starts at the start of bar in canvas
    //first value specifies the right side of square
    const newWidth =
      x._gridLineItems[endIndex].x1 - x._gridLineItems[startIndex].x1;
    // ctx.fillRect(xLeft,yTop,xWidth,yHeight)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(x._gridLineItems[startIndex].x1, top, newWidth, height); //color the particular chart area
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
  plugins: [backgroundHighLighter],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

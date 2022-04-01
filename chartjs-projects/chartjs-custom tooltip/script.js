// setup block
const data = {
  labels: [
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5",
    "Year 1",
    "Year 7",
  ],
  datasets: [
    {
      label: "Buy REd",
      data: [100, 101, 102, 103, 104, 105, 106],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255, 26, 104, 1)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.5,
    },
    {
      label: "Rent Blue",
      data: [20, 40, 60, 80, 100, 120, 140],
      backgroundColor: ["rgba(54, 162, 235, 1)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.5,
    },
  ],
};
// custom tooltip block
//add this tooltip in plugins
const customTooltip = {
  id: "customTooltip",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      tooltip,
      scales: { x, y },
    } = chart;
    // tooltip._active[0]will be undefined if not hoverd over plot
    if (tooltip._active[0]) {
      ctx.fillStyle = "black";
      ctx.fillRect(10, 10, 50, 50);
    }
  },
};

// config block
const config = {
  type: "line",
  data: data,
  options: {
    // show the tooltip with both data
    interaction: {
      mode: "index",
    },
    // plot point color
    hoverBackgroundColor: "green",
    // radius of plot point
    pointRadius: 1,
    // hower plot radius size
    pointHoverRadius: 7,
    // hower plot width
    pointHoverBorderWidth: 3,
    // the plot hit radius when it howers
    pointHitRadius: 10,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [customTooltip],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

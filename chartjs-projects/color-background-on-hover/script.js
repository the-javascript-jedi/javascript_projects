// setup block
// background colors
const bgc = [
  "rgba(255, 26, 104, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(0, 0, 0, 0.2)",
];
// data
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9, 0, 0],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      hoverBackgroundColor: "white",
      pointHoverRadius: 7,
      pointHoverBorderWidth: 3,
    },
  ],
};
//plugin -hoverBackgroundColor
const hoverBackgroundColor = {
  id: "hoverBackgroundColor",
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;

    // if we hover over the dataset point only the tooltip will be active
    if (tooltip._active[0]) {
      const index = tooltip._active[0].index;
      let newWidth;
      //for background color we subtract index because first value does not need color and last background color will be undefined
      ctx.fillStyle = bgc[index - 1];
      // if index is first value dont color the background
      if (index === 0) {
        newWidth = 0;
      } else {
        newWidth = x._gridLineItems[1].x1 - x._gridLineItems[2].x1;
      }
      //  fillRect(x axis rectangle starting point, y axis rectangle starting point, width, height);
      ctx.fillRect(x._gridLineItems[index].x1, top, newWidth, height);
    }
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [hoverBackgroundColor],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

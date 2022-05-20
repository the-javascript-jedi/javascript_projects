// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [9.33, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      fill: {
        target: {
          value: 9.33,
        },
        below: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return belowGradient(ctx, chartArea, data, scales);
        },
        above: (context) => {
          const chart = context.chart;
          const { ctx, chartArea, data, scales } = chart;
          if (!chartArea) {
            return null;
          }
          return aboveGradient(ctx, chartArea, data, scales);
        },
      },
      borderWidth: 1,
      borderColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea, data, scales } = chart;
        if (!chartArea) {
          return null;
        }
        return getGradient(ctx, chartArea, data, scales);
      },
      borderWidth: 2,
      tension: 0.5,
      pointRadius: 0,
      pointHitRadius: 10,
      hoverPointRadius: 10,
    },
  ],
};
//plugin - dottedLine
const dottedLine = {
  id: "dottedLine",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      data,
      chartArea: { left, right, width },
      scales: { x, y },
    } = chart;
    ctx.save();
    ctx.beginPath();
    //ctx.lineWidth- thickness of line -1pixel
    ctx.lineWidth = 1;
    //specify the narrow line
    ctx.setLineDash([1, 5]);
    // color of line
    ctx.strokeStyle = "rgba(102,102,102,1)";
    // line starting point-ctx.moveTo(x,y)
    ctx.moveTo(left, y.getPixelForValue(data.datasets[0].data[0]));
    // line to horizontal
    ctx.lineTo(right, y.getPixelForValue(data.datasets[0].data[0]));
    // drawing command
    ctx.stroke();
    ctx.closePath();
    // to consider as a fully solid line
    ctx.setLineDash([]);
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
      legend: {
        display: false,
      },
    },
  },
  plugins: [dottedLine],
};
// getGradient function
function getGradient(ctx, chartArea, data, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  // ctx.createLinearGradient(x,y,w,h); - Vertical effect gradient top to bottom
  const gradientBorder = ctx.createLinearGradient(0, 0, 0, height);
  // find starting point value to calculate color gradient
  const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
  // add colors to dip and rise
  gradientBorder.addColorStop(0, "rgba(75,192,192,1)");
  gradientBorder.addColorStop(shift, "rgba(75,192,192,1)");
  gradientBorder.addColorStop(shift, "rgba(255,26,104,1)");
  gradientBorder.addColorStop(1, "rgba(255,26,104,1)");
  return gradientBorder;
}
// belowGradient function
function belowGradient(ctx, chartArea, data, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  // ctx.createLinearGradient(x,y,w,h); - Vertical effect background gradient top to bottom
  const gradientBackground = ctx.createLinearGradient(
    0,
    y.getPixelForValue(data.datasets[0].data[0]),
    0,
    height
  );
  gradientBackground.addColorStop(0, "rgba(255, 26, 104, 0)");
  gradientBackground.addColorStop(1, "rgba(255, 26, 104, 0.5)");
  return gradientBackground;
}
// aboveGradient function
function aboveGradient(ctx, chartArea, data, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  // ctx.createLinearGradient(x,y,w,h); - Vertical effect background gradient top to bottom
  const gradientBackground = ctx.createLinearGradient(
    0,
    y.getPixelForValue(data.datasets[0].data[0]),
    0,
    top
  );
  gradientBackground.addColorStop(0, "rgba(75, 192, 192, 0)");
  gradientBackground.addColorStop(1, "rgba(75, 192, 192, 0.5)");
  return gradientBackground;
}

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

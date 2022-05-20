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
      tension: 0.0,
      pointRadius: 0,
      pointHitRadius: 0,
      pointHoverRadius: 10,
      borderWidth: 2,
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
    const startingPoint = data.datasets[0].data[0];
    ctx.save();
    ctx.beginPath();
    //ctx.lineWidth- thickness of line -1pixel
    ctx.lineWidth = 1;
    //specify the narrow line
    ctx.setLineDash([1, 5]);
    // color of line
    ctx.strokeStyle = "rgba(102,102,102,1)";
    // line starting point-ctx.moveTo(x,y)
    ctx.moveTo(left, y.getPixelForValue(startingPoint));
    // line to horizontal
    ctx.lineTo(right, y.getPixelForValue(startingPoint));
    // drawing command
    ctx.stroke();
    ctx.closePath();
    // to consider as a fully solid line
    ctx.setLineDash([]);

    // create a new line
    ctx.beginPath();
    ctx.fillStyle = "rgba(102,102,102,1)";
    ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20);
    ctx.closePath();

    // fill the label
    // ctx,fillRect(x,y,w,h);
    ctx.font = "12px sans-seriff";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    // label text
    ctx.fillText(startingPoint, left / 2, y.getPixelForValue(startingPoint));
    //  label ends
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    layout: {
      padding: {
        left: 10,
      },
    },
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
// mousemove event over chart
myChart.canvas.addEventListener("mousemove", (e) => {
  crosshairLine(myChart, e);
});
// show crosshair when hovering over the chart area grid
function crosshairLine(chart, mousemove) {
  // console.log("mousemove mouse position", mousemove.offsetX, mousemove.offsetY);
  const {
    canvas,
    ctx,
    chartArea: { left, right, top, bottom },
  } = chart;
  const coorX = mousemove.offsetX;
  const coorY = mousemove.offsetY;
  // update chart but don't do any effect
  chart.update("none");
  // restore
  ctx.restore();
  if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
    canvas.style.cursor = "crosshair";
  } else {
    canvas.style.cursor = "default";
  }
  // line for crosshairs
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#666";
  ctx.setLineDash([3, 3]);
  // Horizontal crosshair line starts
  ctx.beginPath();
  // ensure the coordinates are inside the chart grid
  if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
    ctx.moveTo(left, coorY);
    ctx.lineTo(right, coorY);
    ctx.stroke();

    // Horizontal crosshair line ends
    ctx.closePath();
    //  Vertical crosshair line starts
    ctx.beginPath();
    ctx.moveTo(coorX, top);
    ctx.lineTo(coorX, bottom);
    ctx.stroke();
    ctx.closePath();
    //  Vertical crosshair line ends
    // call cross hair label
    crosshairLabel(chart, mousemove);
    // call the cross hair interpolation
    crosshairPoint(chart, mousemove);
  }
}
// cross hair labels
function crosshairLabel(chart, mousemove) {
  const {
    ctx,
    data,
    chartArea: { left, right, top, bottom },
    scales: { x, y },
  } = chart;
  const coorX = mousemove.offsetX;
  const coorY = mousemove.offsetY;
  // find label width
  const textWidth =
    ctx.measureText(data.labels[x.getValueForPixel(coorX)]).width + 10;
  // label attributes
  ctx.font = "12px sans-seriff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // yLabel
  ctx.beginPath();
  ctx.fillStyle = "rgba(132,132,132,1)";
  ctx.fillRect(0, coorY - 10, left, 20);
  ctx.closePath();

  ctx.fillStyle = "white";
  ctx.fillText(y.getValueForPixel(coorY).toFixed(2), left / 2, coorY);

  // xLabel
  ctx.beginPath();
  ctx.fillStyle = "rgba(132,132,132,1)";
  ctx.fillRect(coorX - textWidth / 2, bottom, textWidth, 20);
  ctx.closePath();

  ctx.fillStyle = "white";
  ctx.fillText(data.labels[x.getValueForPixel(coorX)], coorX, bottom + 10);
}
// crosshairPoint interpolation
function crosshairPoint(chart, mousemove) {
  const {
    ctx,
    data,
    chartArea: { left, right, top, bottom, width },
    scales: { x, y },
  } = chart;
  const coorX = mousemove.offsetX;
  const coorY = mousemove.offsetY;

  // create circle interpolation shape
  ctx.beginPath();
  // ctx.fillStyle = "rgba(255,26,104,1)";
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  // 1PI = half circle so we are calculating a single degree
  const angle = Math.PI / 180;
  // specify the grid line items segments
  const segments = x._gridLineItems.length - 1;
  // console.log("x._gridLineItems", x._gridLineItems);
  // using this yOpening value we can declare the ball color whether if it should be green or red
  const yOpening = y.getPixelForValue(data.datasets[0].data[0]);
  // this for loop ensures the hower position is between the tick points in the grid line items
  for (let i = 0; i < segments; i++) {
    if (
      coorX >= x._gridLineItems[i].tx1 &&
      coorX <= x._gridLineItems[i + 1].tx1
    ) {
      // console.log(xValue,i);
      let yStart = y.getPixelForValue(data.datasets[0].data[i]);
      let yEnd = y.getPixelForValue(data.datasets[0].data[i + 1]);

      // yInterpolation- specifies the interpolation pixel
      let yInterpolation =
        yStart +
        ((yEnd - yStart) / (width / segments)) *
          (coorX - x._gridLineItems[i].tx1);
      // console.log("yInterpolation", yInterpolation);
      if (yOpening >= yInterpolation) {
        ctx.fillStyle = "rgba(75,192,192,1)";
      } else {
        ctx.fillStyle = "rgba(255,26,104,1)";
      }
      // draw the circle
      // angleStart,angleEnd, clockwise-false
      // ctx.arc(x,y,radius,angleS,angleE,false);
      // ctx.arc(coorX, yStart, 5, angle * 0, angle * 360, false);
      ctx.arc(coorX, yInterpolation, 5, angle * 0, angle * 360, false);
      // create the circle
      ctx.fill();
      ctx.stroke();
    }
  }
}

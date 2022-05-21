// randomize the stock market data
const dates = [];
const numbers = [];
const volume = [];
for (let i = 0; i < 100; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);
  dates.push(date.setHours(0, 0, 0, 0));
  numbers.push(Math.random() * 10);
  volume.push(Math.random() * 100);
}

// setup block
const data = {
  labels: dates,
  datasets: [
    {
      label: "Weekly Sales",
      data: numbers,
      fill: {
        target: {
          value: numbers[0],
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
      tension: 0.0,
      pointRadius: 0,
      pointHitRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2,
    },
    {
      label: "Stock Volume",
      type: "bar",
      data: volume,
      pointHitRadius: 0,
      pointHoverRadius: 0,
      yAxisID: "volume",
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
    ctx.fillText(
      startingPoint.toFixed(2),
      left / 2,
      y.getPixelForValue(startingPoint)
    );
    //  label ends
  },
};
// plugin - imageLogo
const logo = new Image();
logo.src = "./images/bat-symbol.png";
const imageLogo = {
  id: "imageLogo",
  // beforeDatasetsDraw or afterDatasetsDraw
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
      scales: { x, y },
    } = chart;
    ctx.save();
    const imgWidth = 40;
    const imgHeight = 20;
    // if image is loaded
    if (logo.complete) {
      // ctx.drawImage(url,x,y,imgWidth,imgHeight);
      ctx.drawImage(
        logo,
        right - imgWidth,
        y.getPixelForValue(9),
        imgWidth,
        imgHeight
      );
    } else {
      logo.onload = () => chart.draw();
    }
    ctx.restore();
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
      x: {
        type: "time", //timeseries
        time: {
          unit: "day",
        },
        min: dates[0],
        max: dates[dates.length - 1],
      },
      y: {
        beginAtZero: true,
      },
      volume: {
        type: "linear",
        position: "right",
        min: 0,
        max: 1000,
        // hide the volume grid lines
        grid: {
          display: false,
        },
        // hide the ticks
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  plugins: [dottedLine, imageLogo],
};
// getGradient function
function getGradient(ctx, chartArea, data, scales) {
  const { left, right, top, bottom, width, height } = chartArea;
  const { x, y } = scales;
  // ctx.createLinearGradient(x,y,w,h); - Vertical effect gradient top to bottom
  const gradientBorder = ctx.createLinearGradient(0, 0, 0, height);
  // find starting point value to calculate color gradient
  let shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
  // check shift value because to apply gradien it can only be between 0 and 1
  if (shift > 1) {
    shift = 1;
  }
  if (shift < 1) {
    shift = 0;
  }
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
    // new Date(x.getValueForPixel(coorX)
    ctx.measureText(new Date(x.getValueForPixel(coorX)).toLocaleString())
      .width + 10;
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
  ctx.fillText(
    new Date(x.getValueForPixel(coorX)).toLocaleString(),
    coorX,
    bottom + 10
  );
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
  // const segments = x._gridLineItems.length - 1;
  // length of data points instead of grid lines
  // const segments = width / (dates.length - 1);
  // get segment value
  const segments = width / (dates.indexOf(x.max) - dates.indexOf(x.min));

  // console.log("x._gridLineItems", x._gridLineItems);
  // using this yOpening value we can declare the ball color whether if it should be green or red
  const yOpening = y.getPixelForValue(data.datasets[0].data[0]);
  // index - the point value which we are currently howering on in x coordinate
  // how many pixel we move in comparison with x coordinate - numbers data array index index=(1-100)
  // based on zoom this index value is adjusted to show which value is currently in view
  let index = Math.floor((coorX - left) / segments) + dates.indexOf(x.min);
  // console.log("index", index);
  let yStart = y.getPixelForValue(data.datasets[0].data[index]);
  let yEnd = y.getPixelForValue(data.datasets[0].data[index + 1]);
  let yInterpolation =
    yStart +
    ((yEnd - yStart) / segments) *
      (coorX - x.getPixelForValue(data.labels[index]));
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

// zoom function on scroll
function zoom(chart, mousewheel) {
  const min = chart.config.options.scales.x.min;
  const max = chart.config.options.scales.x.max;
  // get the scrolled timestamp
  const timestamp = chart.scales.x.getValueForPixel(mousewheel.offsetX);
  const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
  // scrollPoint - where we are scrolling for zoom
  const scrollPoint = dates.indexOf(dayTimestamp);
  // scroll down negative value // scroll up for positive value
  // console.log("mousewheel.wheelDeltaY", mousewheel.wheelDeltaY);
  // zoom functionality
  // scroll up
  if (mousewheel.wheelDeltaY >= 0) {
    chart.config.options.scales.x.min = dates[dates.indexOf(min) + 1];
    chart.config.options.scales.x.max = dates[dates.indexOf(max) - 1];
    //dont do zoom movements on the left most edge of chart
    if (
      dates.indexOf(min) >= scrollPoint - 4 &&
      dates.indexOf(min) <= scrollPoint
    ) {
      chart.config.options.scales.x.min = min;
    }
    if (
      dates.indexOf(max) <= scrollPoint + 4 &&
      dates.indexOf(min) >= scrollPoint
    ) {
      chart.config.options.scales.x.max = max;
    }
  }
  // scroll down
  if (mousewheel.wheelDeltaY < 0) {
    chart.config.options.scales.x.min = dates[dates.indexOf(min) - 1];
    chart.config.options.scales.x.max = dates[dates.indexOf(max) + 1];
    // zoom lock out issue fix - when we zoom to last value
    // if range of values zoomed is greater than 14 day values
    const weekms = 86400000 * 14;
    const range = max - min;
    if (range >= weekms) {
      //dont do zoom movements on the right most edge of chart
      if (
        dates.indexOf(min) >= scrollPoint - 4 &&
        dates.indexOf(min) <= scrollPoint
      ) {
        chart.config.options.scales.x.min = min;
      }

      if (
        dates.indexOf(max) <= scrollPoint + 4 &&
        dates.indexOf(min) >= scrollPoint
      ) {
        chart.config.options.scales.x.max = max;
      }
    }
  }
  // check if min value and max value are valid
  if (dates[dates.indexOf(min)] <= 0) {
    chart.config.options.scales.x.min = dates[0];
  }
  if (dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
    chart.config.options.scales.x.max = dates[dates.length - 1];
  }
  // pass the zooming min max values to second
  zoomBox(min, max);
  // will stop animation on change
  chart.update("none");
}
// trigger scroll event
myChart.canvas.addEventListener("wheel", (e) => {
  zoom(myChart, e);
});
// Bottom Chart 2
// setup block
const data2 = {
  labels: dates,
  datasets: [
    {
      label: "Weekly Sales",
      data: numbers,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointHitRadius: 0,
    },
  ],
};
//plugin -

// config block
const config2 = {
  type: "line",
  data: data2,
  options: {
    // animation: false is done for loading the zoombox onload
    animation: false,
    layout: {
      padding: {
        // adjust the padding
        left:
          myChart.chartArea.left - myChart.config.options.layout.padding.left,
        right: myChart.width - myChart.chartArea.right,
      },
    },
    // adjust the aspect to make the sub chart smaller
    aspectRatio: 20,
    scales: {
      x: {
        type: "time", //timeseries
        time: {
          unit: "day",
        },
        min: dates[0],
        max: dates[dates.length - 1],
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [],
};

// render init block
const myChart2 = new Chart(document.getElementById("myChart2"), config2);
// initialize the zoom box
window.onload = function () {
  zoomBox(dates[0], dates[dates.length - 1]);
};
// zoombox - zoom for second chart
function zoomBox(min, max) {
  console.log("onload zoomBox");
  myChart2.update("none");
  const {
    ctx,
    data,
    chartArea: { top, bottom, left, right, width, height },
    scales: { x, y },
  } = myChart2;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "rgba(54,162,235,0.5)";
  // ctx.fillRect(x, y, w, h);
  ctx.fillRect(
    x.getPixelForValue(min),
    top,
    x.getPixelForValue(max) - x.getPixelForValue(min),
    height
  );
  ctx.closePath();
  // calculate angle
  const angle = Math.PI / 180;
  // create swiperButton
  swiperButton(x.getPixelForValue(min));
  swiperButton(x.getPixelForValue(max));
  // swiper button code
  function swiperButton(position) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(54,162,235,1)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FFF";
    // ctx.arc(x,y,radius,startAngle,endAngle,clockwise)
    ctx.arc(position, height / 2, 5, angle * 0, angle * 360, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

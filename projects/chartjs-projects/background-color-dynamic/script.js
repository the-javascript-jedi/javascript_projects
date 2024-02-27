// setup block
const data = {
  labels: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],
  datasets: [
    {
      label: "Weekly Sales",
      data: [
        18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9,
      ],
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
      borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
    },
  ],
};
//plugin -backgroundColorRange
const backgroundColorRange = {
  id: "backgroundColorRange",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    ctx.save();
    ctx.fillStyle = pluginOptions.backgroundColor;
    // pluginOptions.min --config.options.backgroundColorRange.min
    // pluginOptions.max --config.options.backgroundColorRange.max
    ctx.fillRect(
      x.getPixelForValue(pluginOptions.min),
      top,
      x.getPixelForValue(pluginOptions.max) -
        x.getPixelForValue(pluginOptions.min),
      height
    );
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      backgroundColorRange: {
        min: 5,
        max: 7,
        backgroundColor: "rgba(255,26,104,0.2)",
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [backgroundColorRange],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);
//Get Elements
const scaleMin = document.getElementById("scaleMin");
const scaleMax = document.getElementById("scaleMax");
const bgMin = document.getElementById("bgMin");
const bgMax = document.getElementById("bgMax");
// scale range
function scaleRange() {
  myChart.config.options.scales.x.min = parseInt(scaleMin.value);
  myChart.config.options.scales.x.max = scaleMax.value;
  myChart.update();
}
// background range
function bgRange() {
  myChart.config.options.plugins.backgroundColorRange.min = parseInt(
    bgMin.value
  );
  myChart.config.options.plugins.backgroundColorRange.max = parseInt(
    bgMax.value
  );
  myChart.update();
}

// event listeners
//change the scale
scaleMin.addEventListener("change", (e) => {
  scaleRange();
});

scaleMax.addEventListener("change", (e) => {
  scaleRange();
});
// change the background values
bgMin.addEventListener("change", (e) => {
  bgRange();
});
bgMax.addEventListener("change", (e) => {
  bgRange();
});

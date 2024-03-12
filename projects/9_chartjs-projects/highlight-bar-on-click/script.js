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
  plugins: [],
};

// render init block
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, config);
ctx.onclick = clickHandler;
function clickHandler(click) {
  console.log("clicked");
  const color = [
    "rgba(255, 26, 104, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(0, 0, 0, 0.2)",
  ];
  // reset the color
  myChart.config.data.datasets[0].backgroundColor = color;
  // get the clicked dataset intersection point
  const points = myChart.getElementsAtEventForMode(
    click,
    "nearest",
    {
      intersect: true,
    },
    true
  );
  //set color of the data
  if (points[0]) {
    myChart.data.datasets[points[0].datasetIndex].backgroundColor[
      points[0].index
    ] = "black";
    myChart.update();
  }
}

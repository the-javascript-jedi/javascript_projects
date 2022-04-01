// setup block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Blue Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0,
    },
    {
      label: "Black Sales",
      data: [9, 9, 9, 9, 9, 9],
      backgroundColor: ["rgba(0, 0, 0, 0.2)"],
      borderColor: ["rgba(0, 0, 0, 1)"],
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0,
    },
  ],
};
//plugin

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
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);
function clickHandler(click) {
  // console.log("click", click);
  // get only the data point clicked on the canvas chart
  const points = myChart.getElementsAtEventForMode(
    click,
    "nearest",
    {
      intersect: true,
    },
    true
  );
  console.log("points", points);
  if (points[0]) {
    // console.log("points.length", points.length);
    points.forEach((line) => {
      const dataset = line.datasetIndex;
      const datapoint = line.index;
      // clicked message
      console.log(
        `I clicked on Line: ${myChart.data.datasets[dataset].label} with INDEX number of:${datapoint}`
      );
      console.log(
        "clicked the data point",
        myChart.data.datasets[dataset].data[datapoint]
      );
    });
  }
}
// click handler
myChart.canvas.onclick = clickHandler;

// chart 1
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
//plugin -

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
const myChart = new Chart(document.getElementById("myChart"), config);
// chart 2
// setup block
const dataTwo = {
  labels: ["A", "B", "C", "D", "E", "F", "G"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [30, 10, 20, 15, 5, 12, 2, 33, 8],
      backgroundColor: [
        "rgba(0, 26, 104, 0.2)",
        "rgba(200, 162, 235, 0.2)",
        "rgba(60, 206, 86, 0.2)",
        "rgba(150, 192, 192, 0.2)",
        "rgba(15, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(79, 0, 0, 0.2)",
      ],
      borderWidth: 3,
    },
  ],
};
//plugin -

// config block
const configTwo = {
  type: "line",
  data: dataTwo,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [],
};
const myLineChart = new Chart(
  document.getElementById("myLineChart"),
  configTwo
);

function clickHandler(click) {
  //  click.target - specifies the clicked canvas element
  // console.log("click.target", click.target);
  const canvasNode = document.querySelectorAll("canvas");
  // convert nodelist to array
  const canvasArray = [...canvasNode];
  // console.log("canvasArray", canvasArray); //[canvas#myChart, canvas#myLineChart]
  // find the index of the clicked element in the array
  //whether clicked ie the line chart or bar chart
  const canvasIndex = canvasArray.indexOf(click.target);
  // console.log("canvasIndex", canvasIndex); //0 or 1 - #myChart or #myLineChart
  const charts = [myChart, myLineChart];
  // select the canvas clicked points
  canvasNode.forEach((canvas, index) => {
    if (click.target.id === canvas.id) {
      const points = charts[canvasIndex].getElementsAtEventForMode(
        click,
        "nearest",
        {
          intersect: true,
        },
        true
      );
      if (points[0]) {
        // points[0]-will be undefined if we click anywhere outside the plot points
        console.log("points[0]", points[0]);
        // get the clicked index
        const index = points[0].index;
        const dataset = points[0].datasetIndex;
        // get the clicked label - Y axes data
        const label = charts[canvasIndex].data.labels[index];
        // get the clicked value - X axes data
        const value = charts[canvasIndex].data.datasets[dataset].data[index];
        // get the clicked color
        const bgColor =
          charts[canvasIndex].data.datasets[dataset].backgroundColor[index];
        console.log("label", label);
        console.log("value", value);
        console.log("bgColor", bgColor);
        const tr = document.querySelectorAll("tbody tr")[canvasIndex];
        // console.log("tr", tr); //tr=[tr.chart.1, tr.chart.2]
        tr.style.backgroundColor = bgColor;
        tr.children[0].innerText = label;
        tr.children[1].innerText = value;
      }
    }
  });
}

// Click Handlers
myChart.canvas.onclick = clickHandler;
myLineChart.canvas.onclick = clickHandler;

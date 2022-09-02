// pie chart legends
// override the default behaviour
const pieGenerateLabelsLegend =
  Chart.controllers.doughnut.overrides.plugins.legend.labels.generateLabels;
const pieLegendClick =
  Chart.controllers.doughnut.overrides.plugins.legend.onClick;
let others = [];
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
    "Others 1",
    "Others 2",
  ],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9, 1, 1],
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
      // borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      // bar width
      barPercentage: 0.5,
    },
  ],
};
//plugin -

// config block
const config = {
  type: "pie",
  data: data,
  options: {
    plugins: {
      legend: {
        labels: {
          generateLabels(chart) {
            console.log("generateLabels-chart", chart);
            const labels = pieGenerateLabelsLegend(chart);
            console.log("generateLabels-labels", labels);
            const sorted = labels.sort((a, b) => {
              chart.data.datasets[0].data[a.index] <=
                chart.data.datasets[0].data[b.index];
            });
            console.log("sorted", sorted);
            // remove the values other than Monday to Sunday
            const week = sorted.filter((el, index) => index <= 6);
            console.log("week", week);
            //others is a global value
            others = sorted.filter((el, index) => index > 6);
            console.log("others", others);
            // create a new element
            week.push({
              text: "Others",
              fillStyle: "darkGray",
              strokeStyle: "blue",
              hidden: others[0].hidden,
            });
            // return null if you dont want to return any values
            return week;
          },
        },
        // legend click
        onClick(click, legendItem, legend) {
          console.log("legend--onClick", legend);
          console.log("legendItem--onClick", legendItem.text);
          if (legendItem.text === "Others") {
            others.forEach((item) => {
              legend.chart.toggleDataVisibility(item.index);
            });
            legend.chart.update();
            return;
          }
          pieLegendClick(click, legendItem, legend);
        },
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

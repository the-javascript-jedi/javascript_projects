console.log("script.js loaded");
let myChart = document.getElementById("myChart").getContext("2d");

var plugins = {
  options: {
    title: {
      display: true,
      text: "Largest Cities in Massachusetts",
    },
    layout: {
      padding: {
        left: 100,
        right: 0,
        botton: 0,
        top: 0,
      },
    },
  },
  legend: {
    display: true,
    labels: {
      color: "black",
    },
    position: "right",
  },
};
// data
var data = {
  labels: [
    "Boston",
    "Worcester",
    "Springfield",
    "Lowell",
    "Cambridge",
    "New Bedford",
  ],
  datasets: [
    {
      label: "Population",
      data: [617594, 181045, 153060, 106519, 105162, 95072],
      // background color for all bars
      backgroundColor: [
        "rgba(255,99,132,0.6)",
        "rgba(54,162,235,0.6)",
        "rgba(255,206,86,0.6)",
        "rgba(75,192,192,0.6)",
        "rgba(153,102,255,0.6)",
        "rgba(255,159,64,0.6)",
        "rgba(255,99,132,0.6)",
      ],
      borderWidth: 2,
      borderColor: "#777",
      hoverBorderWidth: 3,
      hoverBorderColor: "#000",
    },
  ],
};
// Define the chart
let massPopChart = new Chart(myChart, {
  type: "line", //bar,horizontalBar,pie,line,doughnut,radar,polarArea
  data: data,
  options: {
    plugins: plugins,
  },
});

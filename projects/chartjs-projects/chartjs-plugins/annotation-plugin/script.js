// Register the Annotation Plugin
// Chart.register(chartjs - plugin - annotation);

// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
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
    },
  ],
};
//plugin -

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    // Anotation plugins
    plugins: {
      // for anotations autocolor is off
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: "box",
            xMin: 0.5,
            xMax: 3.5,
            yMin: 0,
            yMax: 18,
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: ["chartjs-plugin-annotation"],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

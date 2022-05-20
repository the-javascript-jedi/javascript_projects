// setup block
const data = {
  labels: ["20220420", "20220421", "20220422", "20220423"],
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
      borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
    },
  ],
};
//plugin -

// config block
const config = {
  type: "line",
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
      x: {
        // coloring the background color for type time will not work
        // type: "time",
        time: {
          unit: "day",
          parser: "yyyyMMdd",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: ["chartjs-plugin-annotation"],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

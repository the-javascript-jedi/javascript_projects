// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderWidth: 1,
      borderColor: ["rgba(255,26,104,1)"],
      tension: 0.4,
      borderWidth: 2,
    },
    {
      label: "Weekly Cost",
      data: [9, 3, 12, 18, 21, 33, 24],
      backgroundColor: ["rgba(0, 0, 0, 1)"],
      borderWidth: 1,
      borderColor: ["rgba(0, 0, 0, 1)"],
      tension: 0.4,
      // default is y
      yAxisID: "percentage",
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
    scales: {
      x: {
        // title on x axis --bottom
        title: {
          display: true,
          text: "Days of the week",
        },
      },
      y: {
        beginAtZero: true,
        // title on y axis --left
        title: {
          display: true,
          text: "Weekly sales in $",
        },
      },
      // y second axis
      percentage: {
        beginAtZero: true,
        position: "right",
        // title on y axis --right
        title: {
          display: true,
          text: "Weekly cost in percentage",
        },
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

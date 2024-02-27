// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255, 26, 104, 0.2)"],
      borderWidth: 1,
      // borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      // bar width
      barPercentage: 0.5,
      yAxisID: "currency",
    },
    {
      label: "Weekly Cost",
      data: [9, 9, 6, 9, 9, 9, 100],
      backgroundColor: ["rgba(0, 0, 0, 0.2)"],
      borderColor: ["rgba(0, 0, 0, 0.2)"],
      borderWidth: 1,
      // borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      // bar width
      barPercentage: 0.5,
      yAxisID: "percentage",
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
      // custom y axis left
      currency: {
        type: "linear",
        position: "left",
        // min to be shown
        min: 2,
        max: 10,
      },
      // custom y axis right
      percentage: {
        type: "linear",
        position: "right",
        // remove grid lines of right y axis
        grid: {
          display: false,
        },
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

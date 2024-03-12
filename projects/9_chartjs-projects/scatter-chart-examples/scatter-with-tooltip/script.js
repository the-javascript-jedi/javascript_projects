// setup block
const data = {
  // labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [
        { x: 1, y: 1, data: 10 },
        { x: 2, y: 2, data: 20 },
        { x: 3, y: 3, data: 30 },
        { x: 4, y: 2, data: 40 },
        { x: 5, y: 1, data: 50 },
        { x: 6, y: 2, data: 60 },
        { x: 7, y: 3, data: 70 },
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
  type: "scatter",
  data: data,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            console.log("context", context);
            return `x:${context.raw.x} and y:${context.raw.y} and Data: ${context.raw.data}`;
          },
        },
      },
    },
    scales: {
      // aligns the grid on the grid line when false
      x: {
        grid: {
          offset: true,
          // dont-display-grid lines
          display: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

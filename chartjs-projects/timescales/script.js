// setup block
const data = {
  // remove the below labels or data will not show
  // labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [
        { x: "2021-06-25", y: 20 },
        { x: "2021-06-26", y: 40 },
        { x: "2021-06-27", y: 20 },
        { x: "2021-06-28", y: 50 },
        { x: "2021-06-29", y: 20 },
        { x: "2021-06-30", y: 60 },
        { x: "2021-07-01", y: 10 },
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
      x: {
        type: "time",
        time: {
          unit: "day", //hour,week,month
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

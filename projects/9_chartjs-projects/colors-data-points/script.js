// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [10, 3, 6, 9, 5, 3, 9],
      backgroundColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 10,
    },
  ],
};
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
// random value
function addValue() {
  const value = Math.random() * 10;
  myChart.data.datasets[0].data.push(value);
  myChart.data.labels.push(value);

  const bgColor = myChart.data.datasets[0].backgroundColor;
  const bColor = myChart.data.datasets[0].borderColor;
  // based on the value push values to the borderColor
  if (value < 3) {
    bgColor.push("green");
    bColor.push("green");
  } else if (value > 7) {
    bgColor.push("red");
    bColor.push("red");
  } else {
    bgColor.push("yellow");
    bColor.push("yellow");
  }
  myChart.update();
}

const dateArray = [
  "03:11:2021",
  "04:11:2021",
  "05:11:2021",
  "06:11:2021",
  "07:11:2021",
  "08:11:2021",
  "09:11:2021",
];
const parsedDateArray = [];
dateArray.forEach(parsedFunction);
function parsedFunction(date) {
  parsedDateArray.push(date.split(":").reverse().join("-"));
}
console.log("dateArray", dateArray);
console.log("parsedDateArray", parsedDateArray);
// setup block
const data = {
  labels: parsedDateArray,
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
      x: {
        type: "time",
        time: {
          unit: "day",
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

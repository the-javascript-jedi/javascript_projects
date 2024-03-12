var totalData = [
  {
    label: "Mon",
    color_info: "low",
  },
  {
    label: "Tue",
    color_info: "low",
  },
  {
    label: "Wed",
    color_info: "med",
  },
  {
    label: "Thu",
    color_info: "med",
  },
  {
    label: "Fri",
    color_info: "high",
  },
  {
    label: "Sat",
    color_info: "high",
  },
  {
    label: "Sat",
    color_info: "high",
  },
];
// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: (color) => {
        console.log("color", color);
        console.log("totalData", totalData);
        // let colors =
        //   color.index > 3 ? "rgba(255, 26, 104, 1)" : "rgba(54, 162, 235, 1)";
        // return colors;
        var calcColor = totalData[color.dataIndex].color_info;
        if (calcColor === "low") {
          return "rgba(75, 192, 192, 0.2)";
        } else if (calcColor === "med") {
          return "rgba(255, 206, 86, 0.2)";
        } else if (calcColor === "med") {
          return "rgba(255, 26, 104, 0.2)";
        }
      },
      borderColor: (color) => {
        console.log("color", color);
        let colors =
          color.index > 3 ? "rgba(255, 26, 104, 1)" : "rgba(54, 162, 235, 1)";
        return colors;
      },
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
  type: "bar",
  data: data,
  options: {
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

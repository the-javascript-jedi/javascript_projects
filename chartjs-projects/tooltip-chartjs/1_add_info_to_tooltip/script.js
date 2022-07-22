// week array
const weekarray = [1, 2, 3, 4, 5, 6, 7];

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
    // tooltip - plugins
    plugins: {
      tooltip: {
        callbacks: {
          beforeTitle: function (context) {
            return "Before the title";
          },
          title: function (context) {
            console.log("context", context);
            // context[0].dataIndex; will give the array value
            console.log("context[0].label", context[0].label);
            return `${context[0].label} Day:${weekarray[context[0].dataIndex]}`;
          },
          afterTitle: function (context) {
            return "After the title";
          },
          beforeBody: function (context) {
            // return "+++beforeBody+++";
            // possible to send array data
            return weekarray;
          },
          afterBody: function (context) {
            return "+++afterBody+++";
          },
          beforeLabel: function (context) {
            return "beforeLabel";
          },
          label: function (context) {
            // no tooltip color is shown
            // return context;
          },
          afterLabel: function (context) {
            return "afterLabel";
          },
          beforeFooter: function (context) {
            return "+++beforefooter+++";
          },
          footer: function (context) {
            return "Footer Item";
          },
          afterFooter: function (context) {
            return "+++afterFooter+++";
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

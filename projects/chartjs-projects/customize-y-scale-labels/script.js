// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [0, 1, 1, 2, 2, 3, 3],
      backgroundColor: ["rgba(0, 0, 0, 1)"],
      borderWidth: 1,
      borderColor: ["rgba(0, 0, 0, 1)"],
      borderWidth: 2,
      tension: 0.4,
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
      y: {
        beginAtZero: true,
        ticks: {
          // 0,1,2,3
          maxTicksLimit: 4,
          callback: (context, index) => {
            console.log("context", context);
            let response;
            if (context === 1) {
              response = "Low";
            } else if (context === 2) {
              response = "Medium";
            } else if (context === 3) {
              response = "High";
            } else {
              response = "Start";
            }
            return response;
          },
        },
      },
    },
  },
  plugins: [],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

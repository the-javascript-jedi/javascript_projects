// setup block
const data = {
  datasets: [
    {
      label: "Scatter Dataset",
      pointBackgroundColor: [
        "yellow",
        "blue",
        "red",
        "green",
        "orange",
        "indigo",
        "pink",
      ],
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 3,
          y: 8,
        },
        {
          x: 1,
          y: 4,
        },
        {
          x: 9,
          y: 1,
        },
        {
          x: -1,
          y: 5,
        },
        {
          x: 6,
          y: 6,
        },
      ],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};
//plugin -

// config block
const config = {
  type: "scatter",
  data: data,
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
    },
  },
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

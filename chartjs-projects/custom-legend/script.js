// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Red Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderWidth: 1,
      borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      tension: 0.3,
    },
    {
      label: "Blue Sales",
      data: [9, 15, 12, 6, 15, 9, 6],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderWidth: 1,
      borderColor: ["rgba(54,162,235,1)"],
      borderWidth: 2,
      tension: 0.3,
    },
  ],
};
//plugin -customLegend
const customLegend = {
  id: "customLegend",
  afterDraw: (chart, args, pluginOptions) => {
    const {
      ctx,
      data,
      chartArea: { left, right, top, bottom, width, height },
      scales: { x, y },
    } = chart;
    // ctx.save();
    //  ctx.font = "bolder 12px sans-seriff";
    //  ctx.fillStyle = data.datasets[0].borderColor;
    //  ctx.textAlign = "right";
    //  // ctx.fillText("Hello", left, y);
    //  // getDatasetMeta to get index of 0 dataset 1 since two datasets are there
    //  // chart.getDatasetMeta(0).data[0] - gets the chart data
    //  ctx.fillText(
    //    data.datasets[0].label,
    //    left - 25,
    //    chart.getDatasetMeta(0).data[0].y
    //  );
    // dynamically display
    data.datasets.forEach((dataset, index) => {
      let color = "transparent";
      // on click of legend dataset is hidden so we will also hide the label
      if (chart.isDatasetVisible(index) === true) {
        color = dataset.borderColor;
      }
      ctx.font = "bolder 12px sans-seriff";
      ctx.fillStyle = data.datasets[index].borderColor;
      ctx.textAlign = "right";

      ctx.fillText(
        dataset.label,
        left - 25,
        chart.getDatasetMeta(index).data[0].y
      );
    });
    ctx.restore();
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    layout: {
      padding: {
        // left: 25,
        left: (context) => {
          console.log("context", context);
          // get the first value text label
          const labelText = context.chart.data.datasets[0].label;
          return context.chart.ctx.measureText(labelText).width + 15;
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [customLegend],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

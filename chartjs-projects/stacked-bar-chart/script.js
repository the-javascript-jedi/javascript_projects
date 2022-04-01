// setup block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Red Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255, 26, 104, 1)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.5,
    },
    {
      label: "Black Sales",
      data: [9, 9, 9, 9, 9, 9, 9],
      backgroundColor: ["rgba(0, 0, 0, 0.2)"],
      borderColor: ["rgba(0, 0, 0, 0.)"],
      borderWidth: 1,
      // tension denotes the curve tension of the line - 0 is for straight line
      tension: 0.5,
    },
  ],
};
//plugin

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      // stack the barchart
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: (value, context) => {
          //console.log("value", value); //displays the bar chart value
          //console.log("context", context); //contains all the context info about the chart
          const datasetArray = [];
          // context.dataIndex - selects the x axis point index i.e(0,1,2,3)
          // console.log("context.dataIndex", context.dataIndex);
          context.chart.data.datasets.forEach((dataset) => {
            // console.log(
            //   "dataset.data[context.dataIndex]",
            //   dataset.data[context.dataIndex]
            // );
            // datasetArray -contains the selected bar both values [18,9]
            if (dataset.data[context.dataIndex] != undefined) {
              datasetArray.push(dataset.data[context.dataIndex]);
            }
            console.log("datasetArray", datasetArray);
          });
          function totalSum(total, datapoint) {
            return total + datapoint;
          }
          //console.log("context.datasetIndex", context.datasetIndex);
          //context.datasetIndex - returns the howered bar index(0 or 1)
          // total the bar chart values
          let sum = datasetArray.reduce(totalSum, 0);
          if (context.datasetIndex === datasetArray.length - 1) {
            return sum;
          } else {
            return "";
          }
        },
      },
    },
  },
  plugins: [ChartDataLabels],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

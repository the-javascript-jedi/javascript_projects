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
    scales: {
      // aligns the grid on the grid line when false
      x: {
        grid: {
          offset: true,
          // dont-display-grid lines
          display: false,
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

// download function
function download() {
  const imageLink = document.createElement("a");
  console.log("imageLink", imageLink);
  const canvas = document.getElementById("myChart");
  imageLink.download = "canvas.png";
  imageLink.href = canvas.toDataURL("image/png", 1); //image/png etc;//0-1 - is quality(1 is highest quality)
  // window.open(imageLink);
  // document.write('<img src="' + imageLink + '"/>');
  // console.log("imageLink.href", imageLink.href);
  imageLink.click();
}

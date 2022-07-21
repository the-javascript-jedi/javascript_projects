// setup block
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
//plugin -
// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const plugin = {
  id: "custom_canvas_background_color",
  // beforedrawing chart set background
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "lightGreen";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
// config block
const config = {
  type: "doughnut",
  data: data,
  plugins: [plugin],
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

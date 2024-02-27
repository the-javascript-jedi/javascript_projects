var options = {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 5,
        borderColor: "green",
      },
      {
        label: "# of Points",
        data: [7, 11, 5, 8, 3, 7],
        borderWidth: 5,
        borderColor: "red",
      },
    ],
  },
  options: {
    scales: {
      yAxes: {
        ticks: {
          reverse: false,
        },
      },
    },
  },
};

var canvas = document.getElementById("chartJSContainer");
var ctx = canvas.getContext("2d");
var chart = new Chart(ctx, options);
var overlay = document.getElementById("overlay");
var startIndex = 0;
overlay.width = canvas.width;
overlay.height = canvas.height;
var selectionContext = overlay.getContext("2d");
var selectionRect = {
  w: 0,
  startX: 0,
  startY: 0,
};
var drag = false;
canvas.addEventListener("pointerdown", (evt) => {
  const points = chart.getElementsAtEventForMode(evt, "index", {
    intersect: false,
  });
  startIndex = points[0].index;
  console.log("startIndex", startIndex);
  const rect = canvas.getBoundingClientRect();
  selectionRect.startX = evt.clientX - rect.left;
  selectionRect.startY = chart.chartArea.top;
  drag = true;
  // save points[0]._index for filtering
});
canvas.addEventListener("pointermove", (evt) => {
  const rect = canvas.getBoundingClientRect();
  if (drag) {
    const rect = canvas.getBoundingClientRect();
    selectionRect.w = evt.clientX - rect.left - selectionRect.startX;
    selectionContext.globalAlpha = 0.5;
    selectionContext.clearRect(0, 0, canvas.width, canvas.height);
    selectionContext.fillRect(
      selectionRect.startX,
      selectionRect.startY,
      selectionRect.w,
      chart.chartArea.bottom - chart.chartArea.top
    );
  } else {
    selectionContext.clearRect(0, 0, canvas.width, canvas.height);
    var x = evt.clientX - rect.left;
    if (x > chart.chartArea.left) {
      selectionContext.fillRect(
        x,
        chart.chartArea.top,
        1,
        chart.chartArea.bottom - chart.chartArea.top
      );
    }
  }
});
canvas.addEventListener("pointerup", (evt) => {
  const points = chart.getElementsAtEventForMode(evt, "index", {
    intersect: false,
  });
  drag = false;
  console.log(
    "implement filter between " +
      options.data.labels[startIndex] +
      " and " +
      options.data.labels[points[0].index]
  );
});

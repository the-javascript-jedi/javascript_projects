// global const
//clicked represents the datasets which are clicked
// 0 mens the dataset point is not clicked - datasets.data
let clicked = [0, 0, 0, 0, 0, 0, 0];

// setup block
const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Weekly Sales",
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ["rgba(255, 26, 104, 0.2)"],
      borderColor: ["rgba(255,26,104,1)"],
      borderWidth: 2,
      // pointRadius: 10, //increase dataset point
      hitRadius: 10,
    },
  ],
};
//plugin - clickableLines
const clickableLines = {
  id: "clickableLines",
  afterEvent(chart, args, pluginOptions) {
    // find the position of mouse cursor
    const xCursor = args.event.x;
    const yCursor = args.event.y;
    // find the event happening on chart - click,mousemove,mouseout etc
    // console.log("args.event.type", args.event.type);
    const click = args.event.type;
    if (click === "click") {
      // console.log("args", args); //args.event contains event type
      // chart._metasets[0].data - specifies the exact datasets position center in chart
      // console.log("chart._metasets[0].data", chart._metasets[0].data);
      //increase the clicked position center radius
      for (let i = 0; i < chart._metasets[0].data.length; i++) {
        const xMin = chart._metasets[0].data[i].x - 10;
        const xMax = chart._metasets[0].data[i].x + 10;
        const yMin = chart._metasets[0].data[i].y - 10;
        const yMax = chart._metasets[0].data[i].y + 10;
        if (
          xCursor >= xMin &&
          xCursor <= xMax &&
          yCursor >= yMin &&
          yCursor <= yMax
        ) {
          console.log("clicked within circle X Y");
          // set value of clicked array position
          //this is done so that the we can redraw the clicked position
          if (clicked[i] === 0) {
            clicked[i] = 1;
          } else {
            clicked[i] = 0;
          }
        }
      }
      chart.update();
    }
    // console.log("clicked", clicked);
  },
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const {
      ctx,
      chartArea: { top, bottom },
    } = chart;
    // create linedraw code
    class Line {
      constructor(xCoor) {
        this.width = xCoor;
      }
      draw(ctx) {
        // console.log("draw called", ctx);
        ctx.restore();
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = "rgba(50,300,20,1)";
        // create the line starting point
        ctx.moveTo(this.width, top);
        ctx.lineTo(this.width, bottom);
        ctx.stroke();
        ctx.save();
        // reset linedash
        ctx.setLineDash([]);
      }
    }
    // draw line based on clicked points
    for (let i = 0; i < clicked.length; i++) {
      if (clicked[i] === 1) {
        // console.log(
        //   "chart._metasets[0].data[i].x",
        //   chart._metasets[0].data[i].x
        // );
        let drawLine = new Line(chart._metasets[0].data[i].x);
        drawLine.draw(ctx);
      }
    }
  },
};
// config block
const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [clickableLines],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

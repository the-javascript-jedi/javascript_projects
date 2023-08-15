console.log("script loaded");
var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
// add colors to rectangle -- fillStyle
c.fillStyle = "rgba(255,0,0,0.5)";
// c.fillRect(x, y, width, height);
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(0,255,0,0.5)";
// change color of each element by specifying the particular color before fillRect
c.fillRect(400, 100, 100, 100);
c.fillStyle = "rgba(0,0,255,0.5)";
c.fillRect(300, 300, 100, 100);

console.log(canvas);

// line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
// add colors to line -- strokeStyle
c.strokeStyle = "#fa34a3";
c.stroke();
c.closePath();
// Arc / Circle - single circle
// always add beginPath before starting a new stroke, else old stroke will connect to newly added stroke
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// create multiple circles using for loops
let circles = 6;
for (y = 0; y < circles; y++) {
  for (var i = 0; i < circles; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    // c.strokeStyle = "blue";
    // add random colors
    c.strokeStyle = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    // c.fillStyle = randomColor();
    c.stroke();
    c.closePath();
  }
}

function randomColor() {
  var color = [];
  for (var i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return "rgb(" + color.join(",") + ")";
}

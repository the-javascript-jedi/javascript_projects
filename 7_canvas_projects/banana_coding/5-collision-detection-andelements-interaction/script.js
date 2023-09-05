console.log("script loaded");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// initialize canvas width and height
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

class Circle {
  constructor(xpos, ypos, radius, color, text, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    // animation
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    // fill text
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.xpos, this.ypos);
    // circle style
    context.lineWidth = 5;
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update() {
    // update text onw indow side contact
    this.draw(context);
    if (this.xpos + this.radius > window_width) {
      this.dx = -this.dx;
    }
    if (this.xpos - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.ypos - this.radius < 0) {
      this.dy = -this.dy;
    }
    if (this.ypos + this.radius > window_height) {
      this.dy = -this.dy;
    }
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

// define multiple circles
// moving circle
let my_circle1 = new Circle(500, 800, 50, "black", "A", 6);
// static circle
let my_circle2 = new Circle(300, 300, 200, "black", "B", 0);

// get distance between 2 points
let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  var result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  // console.log("result", result);
  return result;
};
console.log(
  "getDistance",
  getDistance(
    my_circle1.xpos,
    my_circle1.ypos,
    my_circle2.xpos,
    my_circle2.ypos
  )
);

// draw multiple circles
my_circle1.draw(context);
my_circle2.draw(context);

// update circle for animation
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  // clear previous position of drawn canvas to simulate movement
  context.clearRect(0, 0, window_width, window_height);
  // update the circle
  my_circle1.update();
  my_circle2.update();
  // if the distance between 2 points is less than radius change color of moving circle 2
  if (
    getDistance(
      my_circle1.xpos,
      my_circle1.ypos,
      my_circle2.xpos,
      my_circle2.ypos
    ) <
    my_circle2.radius + my_circle1.radius
  ) {
    my_circle2.color = "red";
  }
  // change color back to black
  if (
    getDistance(
      my_circle1.xpos,
      my_circle1.ypos,
      my_circle2.xpos,
      my_circle2.ypos
    ) >=
    my_circle2.radius + my_circle1.radius
  ) {
    my_circle2.color = "black";
  }
};
updateCircle();

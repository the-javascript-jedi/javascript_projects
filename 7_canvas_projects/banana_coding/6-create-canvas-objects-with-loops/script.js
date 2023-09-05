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
// dynamically do all circles
var all_circles = [];

let randomNumber = function (min, max) {
  var result = Math.random() * (max - min) + min;
  console.log("result", result);
  return result;
};

for (var i = 0; i < 10; i++) {
  var radius = 50;
  var random_x = randomNumber(radius, window_width - radius);
  var random_y = randomNumber(radius, window_height - radius);
  let my_circle = new Circle(random_x, random_y, radius, "black", "A", 2);
  all_circles.push(my_circle);
}

// get distance between 2 points
let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  var result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  // console.log("result", result);
  return result;
};

// update circle for animation
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  // clear previous position of drawn canvas to simulate movement
  context.clearRect(0, 0, window_width, window_height);
  // update the circle element
  all_circles.forEach((element) => {
    element.update();
  });
};
updateCircle();

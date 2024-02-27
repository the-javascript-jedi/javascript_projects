console.log("script loaded");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// initialize canvas width and height
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

let hit_counter = 0;

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
    this.text = hit_counter;
    // clear previous position of drawn canvas to simulate movement
    context.clearRect(0, 0, window_width, window_height);
    this.draw(context);
    if (this.xpos + this.radius > window_width) {
      this.dx = -this.dx;
      hit_counter++;
    }
    if (this.xpos - this.radius < 0) {
      this.dx = -this.dx;
      hit_counter++;
    }
    if (this.ypos - this.radius < 0) {
      this.dy = -this.dy;
      hit_counter++;
    }
    if (this.ypos + this.radius > window_height) {
      this.dy = -this.dy;
      hit_counter++;
    }
    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

// single circle
let circle_counter = 1;
let my_circle = new Circle(100, 100, 50, "black", circle_counter, 6);
my_circle.draw(context);
// update circle for animation
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  my_circle.update();
};
updateCircle();

// circle dynamically created
// let circle_counter = 1;
// let all_circles = [];
// let createCircle = function (circle) {
//   circle.draw(context);
// };
// for (var numbers = 0; numbers < 1; numbers++) {
//   let random_x = Math.random() * window_width;
//   let random_y = Math.random() * window_height;
//   let my_circle = new Circle(
//     random_x,
//     random_y,
//     50,
//     "black",
//     circle_counter,
//     1
//   );
//   all_circles.push(my_circle);
//   createCircle(all_circles[numbers]);
//   circle_counter++;
// }

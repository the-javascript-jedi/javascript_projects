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
  constructor(xpos, ypos, radius, color) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.lineWidth = 5;
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
}

// single circle
// let my_circle = new Circle(100, 100, 50, "black");
// my_circle.draw(context);

// circle dynamically created
let all_circles = [];
let createCircle = function (circle) {
  circle.draw(context);
};
for (var numbers = 0; numbers < 10; numbers++) {
  let random_x = Math.random() * window_width;
  let random_y = Math.random() * window_height;
  let my_circle = new Circle(random_x, random_y, 50, "black");
  all_circles.push(my_circle);
  createCircle(all_circles[numbers]);
}

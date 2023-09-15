// old syntax for circle
// var circle = {
//   x: 0,
//   y: 200,
//   diameter: 50,
// };

var c = { x: 0, y: 200, diameter: 100 };

function setup() {
  createCanvas(600, 400);
}

var r = 218;
var g = 160;
var b = 221;

function draw() {
  // background
  background(r, g, b);
  // ellipse
  fill(250, 200, 200, 50);
  // old syntax
  // ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
  // new syntax
  ellipse(c.x, c.y, c.diameter, c.diameter);
  // console.log("circle", circle);
  c.x = c.x + 1;
}

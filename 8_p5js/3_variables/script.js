// // Painting App
// function setup() {
//   createCanvas(600, 400);
// background is not redrawn as setup block is executed only once
//   background(250, 250, 100);
// }
// //mouseX - point where mouse is
// function draw() {
//   // background

//   // ellipse
//   noStroke();
//   fill(250, 200, 200, 50);
//   ellipse(mouseX, mouseY, 100, 100);

//   // // rectangle
//   // fill(200, 250, 200);
//   // rect(400, mouseY, 50, 50);
// }
// // click event
// function mousePressed() {
//   background(250, 250, 100);
// }

// Move the circle
var circleX = 0;
function setup() {
  createCanvas(600, 400);
}
//mouseX - point where mouse is
function draw() {
  // background
  background(250, 250, 100);
  // ellipse
  fill(250, 200, 200, 50);
  ellipse(circleX, mouseY, 100, 100);
  // move the circle by 1 n the x position
  circleX = circleX + 1;
}
// click event
function mousePressed() {
  background(250, 250, 100);
}

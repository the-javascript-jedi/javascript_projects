// Painting App
function setup() {
  createCanvas(600, 400);
  background(250, 250, 100);
}
//mouseX - point where mouse is
function draw() {
  // background

  // ellipse
  noStroke();
  fill(250, 200, 200, 50);
  ellipse(mouseX, mouseY, 100, 100);

  // // rectangle
  // fill(200, 250, 200);
  // rect(400, mouseY, 50, 50);
}
// click event
function mousePressed() {
  background(250, 250, 100);
}

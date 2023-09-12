function setup() {
  createCanvas(400, 400);
}
// P5 layers the code one above the other
function draw() {
  // draw background first
  background(255);
  ellipseMode(CENTER);
  rectMode(CENTER);
  // Body
  // color the Body Red
  fill(255, 0, 0);
  rect(240, 145, 20, 100);
  // Head
  // color the Head blue
  fill(0, 0, 255);
  ellipse(240, 115, 60, 60);
  // Eyes
  // color the eyes green
  fill(0, 255, 0);
  ellipse(221, 115, 16, 32);
  ellipse(259, 115, 16, 32);
  //legs
  line(230, 195, 220, 205);
  line(250, 195, 265, 205);
}

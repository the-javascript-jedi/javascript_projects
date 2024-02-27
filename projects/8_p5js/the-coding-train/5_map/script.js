var col = 0;

function setup() {
  createCanvas(600, 400);
}

// map function - performs calculation and resolves to single number
// map(currentVal,min of current range,max of current range,min of new age,max of new age)

function draw() {
  // divides the value based on mouse position
  // col = mouseX / 2;
  col = map(mouseX, 0, 600, 0, 255);
  // background
  background(col);
  // ellipse
  fill(250, 118, 222);
  ellipse(mouseX, 200, 64, 64);
}

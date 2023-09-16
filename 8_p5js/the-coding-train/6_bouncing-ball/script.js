var x = 0;
var speed = 3;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  // bouncing ball
  ellipse(x, 200, 100, 100);
  if (x > width || x < 0) {
    speed = speed * -1;
  }
  x = x + speed;

  // if else - mouse between area change color
  if (mouseX > 300 && mouseX < 400) {
    fill(255, 0, 200);
  }
  rect(300, 200, 100, 100);
}

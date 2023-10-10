// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
  b1 = new Bubble(250, 200);
  b2 = new Bubble(350, 200);
}

function draw() {
  background(0);
  // go in reverse
  b1.update();
  b2.update();
  b1.display();
  b2.display();
  if (b1.intersects(b2)) {
    b1.changeColor();
    b2.changeColor();
  }
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

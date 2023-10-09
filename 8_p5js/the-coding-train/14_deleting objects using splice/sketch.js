// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  // go in reverse
  for (var i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    // if the lifespan(alpha color) specified is less than 0 remove val from array
    if (bubbles[i].isFinished()) {
      bubbles.splice(i, 1);
    }
  }
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

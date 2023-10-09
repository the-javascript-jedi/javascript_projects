// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

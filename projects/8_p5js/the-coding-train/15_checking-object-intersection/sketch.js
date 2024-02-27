// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 5; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
}

function draw() {
  background(0);
  // loop over all bubbles
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    // check each bubble if it does not intersect itself and it intersects with other bubbles
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      }
    }
  }
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

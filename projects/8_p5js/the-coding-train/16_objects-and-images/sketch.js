// array of bubbles
var bubbles = [];
var flowers = [];
// constructor for p5js - called before setup()
function preload() {
  for (var i = 0; i < 4; i++) {
    flowers[i] = loadImage("images/flower" + i + ".jpg");
  }
}

function setup() {
  createCanvas(1600, 1400);
}

function draw() {
  background(0);
  // go in reverse
  for (var i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].display();
  }
}
// randomly display an image on click
function mousePressed() {
  var r = floor(random(0, flowers.length));
  bubbles.push(new Bubble(mouseX, mouseY, flowers[r]));
}

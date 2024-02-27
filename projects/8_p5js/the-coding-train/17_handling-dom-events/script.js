var bgcolor;
var button;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  button = createButton("go go go go");
  // changeColor is the callback function
  button.mousePressed(changeColor);
}

function changeColor() {
  bgcolor = color(random(255));
}
// canvas draw
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  rect(100, 100, 50, 50);
}

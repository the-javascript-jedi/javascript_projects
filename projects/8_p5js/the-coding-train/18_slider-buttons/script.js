var bgcolor;
var button;
var slider;
var input;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  nameP = createP("Your name!");
  button = createButton("go go go go");
  // changeColor is the callback function
  button.mousePressed(changeColor);
  // create slider - (min,max,starting value)
  slider = createSlider(10, 100, 86);
  // create input
  input = createInput("type your name");
}

function changeColor() {
  bgcolor = color(random(255));
}
// canvas draw
function draw() {
  background(bgcolor);
  fill(255, 0, 175);
  // change ellipse size
  ellipse(100, 100, slider.value(), slider.value());
  // change value from input
  nameP.html(input.value());
  text(input.value(), 10, 20);
}

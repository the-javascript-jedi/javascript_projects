var bgcolor;
var button;
var slider;
var nameInput;
var nameP;

function setup() {
  canvas = createCanvas(200, 200);
  bgcolor = color(200);
  nameP = createP("Your name!");
  // add hover for the p tag
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  button = createButton("go go go go");
  // changeColor is the callback function
  button.mousePressed(changeColor);
  // create slider - (min,max,starting value)
  slider = createSlider(10, 100, 86);
  // create input
  nameInput = createInput("type your name");
  // when enter is pressed the input value is changed
  nameInput.changed(updateText);
}
function updateText() {
  nameP.html(nameInput.value());
}
function overpara() {
  nameP.html("Your mouse is over me");
}
function outpara() {
  nameP.html("Your mouse is out");
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
  // nameP.html(nameInput.value());
  text(nameInput.value(), 10, 20);
}

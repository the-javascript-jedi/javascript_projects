function setup() {
  txt = createP("some txt");
  txt.mouseOver(changeStyle);
  txt.mouseOut(revertStyle);
  button = createButton("go");
}

function changeStyle() {
  txt.style("background-color", "pink");
  txt.style("padding", "24px");
}

function revertStyle() {
  txt.style("background-color", "pink");
  txt.style("padding", "10px");
}

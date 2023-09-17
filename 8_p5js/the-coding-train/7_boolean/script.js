// function setup() {
//   createCanvas(600, 400);
// }

// function draw() {
//   background(0);
//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   // change backfground if certain part of the mouse is clicked
//   if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
//     fill(255, 0, 200);
//     // mouse pressed event
//     if (mouseIsPressed) {
//       background(0, 255, 0);
//     }
//   }
//   rectMode(CENTER);
//   rect(300, 200, 100, 100);
// }

var on = true;
function setup() {
  createCanvas(600, 400);
}

function draw() {
  // change background based on flag
  if (on) {
    background(0, 255, 0);
  } else {
    background(0);
  }
  stroke(255);
  strokeWeight(4);
  noFill();
  if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
    fill(255, 0, 200);
  }
  rectMode(CENTER);
  rect(300, 200, 100, 100);
}

// click event
function mousePressed() {
  // when inside rectangle toggle the variable
  if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
    on = !on;
  }
}

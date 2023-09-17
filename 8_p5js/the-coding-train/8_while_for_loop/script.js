function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(255);

  var x = 0;
  // draw single row ellipse using while loop
  // while (x <= width) {
  //   fill(0, 200, 255);
  //   ellipse(x, 200, 25, 25);
  //   x = x + 50;
  // }
  // draw single row ellipse using for loop
  // for (var x = 0; x <= innerWidth; x = x + 50) {
  //   fill(random(255), 0, 200);
  //   ellipse(x, 300, 25, 25);
  // }

  // fill the page with blinking circles
  for (var x = 0; x <= width; x += 50) {
    for (var y = 0; y <= width; y += 50) {
      fill(random(255), 0, random(255));
      ellipse(x, y, 25, 25);
    }
  }
}

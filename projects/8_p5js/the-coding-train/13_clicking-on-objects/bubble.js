function Bubble(x, y) {
  // this.x = random(0, width);
  // this.y = random(0, height);
  this.x = x;
  this.y = y;
  this.col = color(255, 100);

  this.display = function () {
    stroke(255);
    // noFill();
    fill(this.col);
    ellipse(this.x, this.y, 24, 24);
  };
  this.move = function () {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
  // calculate the clicked circle and change only that color
  this.clicked = function () {
    // calculate the distance between clicked point and point of circle
    var d = dist(mouseX, mouseY, this.x, this.y);
    // if the calculated width is less than the radius of the sphere
    if (d < 24) {
      this.col = color(255, 0, 200);
    }
  };
}

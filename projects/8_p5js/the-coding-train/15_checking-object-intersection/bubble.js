function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.r = 48;
  this.col = color(255);
  this.lifespan = 255;

  this.display = function () {
    stroke(255);
    fill(this.col, this.lifespan);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };
  this.update = function () {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
  // change color
  this.changeColor = function () {
    this.col = color(random(255), random(255), random(255));
  };
  // check if two bubbles intersect
  this.intersects = function (other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  };
}

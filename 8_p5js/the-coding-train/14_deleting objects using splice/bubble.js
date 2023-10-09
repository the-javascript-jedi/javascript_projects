function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.lifespan = 255;

  this.display = function () {
    stroke(255);
    fill(255, this.lifespan);
    ellipse(this.x, this.y, 48, 48);
  };
  this.update = function () {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
    // remove the fill color for each circle
    this.lifespan = this.lifespan - 1;
  };
  // if the lifespan(alpha color) specified is less than 0 remove val from array
  this.isFinished = function () {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };
}

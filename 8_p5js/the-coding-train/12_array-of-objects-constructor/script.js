// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (var i = 0; i < 20; i++) {
    bubbles[i] = new Bubble();
  }
  console.log("bubbles", bubbles);
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

function Bubble() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.display = function () {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  };
  this.move = function () {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  };
}
// beow literal object is converted to constructor function
/*
{
      x: random(0, width),
      y: random(0, height),
      display: function () {
        stroke(255);
        noFill();
        ellipse(this.x, this.y, 24, 24);
      },
      move: function () {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);
      },
    };
*/

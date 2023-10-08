// array of bubbles
var bubbles = [];

function setup() {
  createCanvas(600, 400);
  // console.log("bubbles", bubbles);
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  if (bubbles.length > 50) {
    bubbles.splice(0, 1);
  }
}
// function mousePressed() {
//   bubbles.push(new Bubble(mouseX, mouseY));
// }

function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function Bubble(x, y) {
  // this.x = random(0, width);
  // this.y = random(0, height);
  this.x = x;
  this.y = y;
  this.display = function () {
    stroke(255);
    // noFill();
    fill(255, 0, 150, 50);
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

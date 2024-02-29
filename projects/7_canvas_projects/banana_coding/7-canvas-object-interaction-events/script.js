console.log("script loaded");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// initialize canvas width and height
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#bbf";

class Circle {
  constructor(xpoint, ypoint, radius, color) {
    this.xpoint = xpoint;
    this.ypoint = ypoint;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    // create a circle
    context.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = "grey";
    context.lineWidth = 3;
    context.fillStyle = this.color;
    // fill the circle color
    context.fill();
    context.stroke();
    context.closePath();
  }

  changeColor(newColor) {
    this.color = newColor;
    this.draw(context);
  }
  // function to find if circle is clicked
  clickCircle(xmouse, ymouse) {
    // console.log("xmouse,ymouse", xmouse, ymouse);
    // calculate if the clicked point is inside the circle
    //  i)calculate the distance from the clicked point to the center of circle
    // ii)make sure the distance is less than radius to say that the clicked point is within circle
    const distance = Math.sqrt(
      (xmouse - this.xpoint) * (xmouse - this.xpoint) +
        (ymouse - this.ypoint) * (ymouse - this.ypoint)
    );
    if (distance < this.radius) {
      // change color of circle when clicked outside
      this.changeColor("#56f");
      return true;
    } else {
      this.changeColor("#f56");
      return false;
    }
  }
}

let circle = new Circle(200, 200, 100, "#F56");
circle.draw(context);

// Get the clicked point of canvas
canvas.addEventListener("click", (event) => {
  console.log("event", event);
  // BoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport. - canvas is always relative so we need to mention BoundingClientRect
  const rect = canvas.getBoundingClientRect();
  console.log("rect", rect);
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log("x: " + x + "y:" + y);
  // call the circle class function to get the info if circle is clicked
  console.log("circle.clickCircle(x, y)", circle.clickCircle(x, y));
});

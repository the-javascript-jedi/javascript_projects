console.log("script loaded");
const canvas = document.getElementById("canvas");
// initialize canvas width and height
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white";

// fill canvas with white color
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

// array for storing drawpath
let restore_array = [];
// on each draw the index is incremented
let index = -1;

// events - starting and drawing
// mobile/ipad events
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
// pc events
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
// events - stoping
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// canvas start beginpath
function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(
    event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop
  );
  event.preventDefault();
}

// drawing
function draw(event) {
  if (is_drawing) {
    context.lineTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    context.strokeStyle = draw_color;
    context.lineWidth = draw_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

// canvas closepath
function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  console.log(
    "context.getImageData(0, 0, canvas.width, canvas.height)",
    context.getImageData(0, 0, canvas.width, canvas.height)
  );
  if (event.type != "mouseout") {
    // create a copy of the drawpath
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    // increment index
    // index += 1;
    index = index + 1;
  }
  console.log("restore_array", restore_array);
}

// change color of pen
function change_color(element) {
  // console.log("change_color - element", element);
  draw_color = element.style.background;
}

// clear the canvas
function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  // reset the index array
  restore_array = [];
  index = -1;
}

// create an array that saves every draw path
function undo_last() {
  if (index <= 0) {
    clear_canvas();
  } else {
    // index -= 1; //index = index - 1
    index = index - 1;
    restore_array.pop();
    // remove the previous draw
    context.putImageData(restore_array[index], 0, 0);
  }
}

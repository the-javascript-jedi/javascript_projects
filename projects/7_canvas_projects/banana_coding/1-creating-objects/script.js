console.log("script loaded");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// initialize canvas width and height
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#ff8";

// draw rectangle at corner
// context.fillRect(x, y, width, height);
context.fillRect(100, 200, 100, 100);
context.fillStyle = "red";
context.fillRect(100, 500, 100, 200);

// create circle
context.beginPath();
context.lineWidth = 20;
context.strokeStyle = "blue";
context.arc(200, 100, 50, 0, Math.PI * 2);
context.stroke();

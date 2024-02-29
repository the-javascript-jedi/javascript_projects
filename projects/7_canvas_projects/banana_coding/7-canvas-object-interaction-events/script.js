console.log("script loaded");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
// initialize canvas width and height
var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#bbf";

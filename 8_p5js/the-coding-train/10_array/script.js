var nums = [100, 25, 46, 72];
var num = 23;
function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(0);
  // ellipse(100, 200, num, num);
  // ellipse(200, 200, nums[2], nums[2]);
  let x = 100;
  nums.forEach((val, index) => {
    stroke(255);
    noFill();
    // index = index + 100; to move circles position
    ellipse(index * 100 + 100, 200, nums[index], nums[index]);
  });
}

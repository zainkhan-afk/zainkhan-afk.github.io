function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-container"); // attach to the wrapper div
}

function draw() {
  background(0);
  ellipse(width / 2, height / 2, 50, 50);
}

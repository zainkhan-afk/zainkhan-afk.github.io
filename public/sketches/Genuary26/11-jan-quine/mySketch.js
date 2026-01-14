let title = "A Quine In P5js";

let lines, cnv;
let dim = 20;
let numRows;
let numCols;

function preload() {
  lines = loadStrings('mySketch.js');
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    cnv = createCanvas(minDim, minDim*1.5);

    numRows = int(height / dim) + 1;
    numCols = int(width / dim) + 1;

    frameRate(60);
}

function draw()
{
  background(220);
  textAlign(LEFT, TOP);

  noStroke();
  fill(100, 100);
  for (let r = 0; r < numRows; r++){
    for (let c = 0; c < numCols; c++){
      let x = dim*c;
      let y = dim*r;

      circle(x, y, 3);
    }
  }

  fill(0);
  stroke(0);
  
  let offsetY = 10;
  let offsetX = 50;
  // textSize(25);
  for (let i = 0; i < lines.length; i++) {
    if (i == 0){textSize(30);}
    else{textSize(15);}

    text(lines[i], offsetX, i*20 + offsetY);
    if (i == 0) {offsetY += 20;}
    if (i == 6 || i == 21) {offsetY += 0; offsetX += 300; }
    if (i == 10 || i == 55) {offsetY += 0; offsetX -= 300; }
  }
}


function keyPressed() {
  if (key === 's') {
    saveCanvas(cnv, '11-jan-quine.jpg');

  }
}
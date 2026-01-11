let title = "A Quine In P5js";

let dim = 20;
let numRows;
let numCols;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);

    numRows = int(height / dim) + 1;
    numCols = int(width / dim) + 1;

    frameRate(60);
}

function draw()
{
  background(220);

  noStroke();
  fill(100, 100);
  for (let r = 0; r < numRows; r++){
    for (let c = 0; c < numCols; c++){
      let x = dim*c;
      let y = dim*r;

      circle(x, y, 3);
    }
  }

}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10, { delay: 0 });
  }
}
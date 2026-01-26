
let cnv;
let div = 100;
let numRows;
let numCols;

let frameNum = 0;
let gridCtr = 0;

let colors = [];

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);

  colors = [color(200, 0, 0), color(0, 0, 200), color(200, 170, 0), color(0, 0, 0)];

  numRows = int(height / div) + 1;
  numCols = int(width / div) + 1;

  frameRate(60);
}



function draw()
{
  // background(0);
  for (let i = 0; i < 10; i++){
    if (frameNum < numRows*numCols){
      let colorIdx = int(random(colors.length));
      let r = int(frameNum / numCols);
      let c = frameNum % numCols;

      fill(colors[gridCtr%colors.length]);
      rect(c*div, r*div, div, div);
    }
    else{
      div = int(div / 2);
      numRows = int(height / div) + 1;
      numCols = int(width / div) + 1;
      frameNum = 0;
    }

    frameNum += 1;
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '21-jan.jpg');
    // saveGif("Gen25", 10);
  }
}

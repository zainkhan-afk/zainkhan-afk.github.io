
let cnv;
let div = 200;
let numRows;
let numCols;

let frameNum = 0;
let gridCtr = 0;

let den = 1;
let capStarted = false;

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
  if (!capStarted){
    saveGif("Gen26", 15);
    capStarted = true;
  }
  // background(0);
  noStroke();
  if (div <= 1) {return; }
  for (let i = 0; i < numCols; i++){
    if (frameNum < numRows*numCols){
      // let colorIdx = int(random(colors.length));
      let r = int(frameNum / numCols);
      let c = frameNum % numCols;

      let n = noise(r/den, c/den);
      let colorIdx = int(map(n, 0, 1, 0, colors.length));

      // fill(colors[frameNum%colors.length]);
      fill(colors[colorIdx]);
      rect(c*div, r*div, div, div);
    }
    else{
      div = int(div / 2);
      den *= 2;
      numRows = int(height / div) + 1;
      numCols = int(width / div) + 1;
      frameNum = 0;
      break;
    }

    frameNum += 1;
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '21-jan.jpg');
    saveGif("Gen27", 10);
  }
}

let hexagonPoints = [];
let hexagonLength = 10;
let numRows;
let numCols;
let cnv;
let angle = 0;


function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);

  for (let i = 0; i<6; i++){
    let x = hexagonLength*cos(TWO_PI/6*i);
    let y = hexagonLength*sin(TWO_PI/6*i);
    append(hexagonPoints, [x, y]);
  }
  numRows = minDim / (4*hexagonLength);
  numCols = minDim / (4*hexagonLength);
  
  frameRate(60);
}

function draw()
{
  background(200, 150, 0);
  fill(200, 0, 0);
  stroke(0);
  strokeWeight(5);

  for (let r = 0; r < numRows; r++){
    for (let c = 0; c < numCols; c++){
      let y = r*hexagonLength*4;
      let x = c*hexagonLength*4 + r%2*hexagonLength*2;

      line(0, y + hexagonLength*2, width, y + hexagonLength*2);
      line(x, y, x, y + (c%2 == 0 ? -hexagonLength*2:hexagonLength*2))

      push();
      translate(x, y);
      rotate(PI/6 + angle);
      beginShape();
      for (let hexPt of hexagonPoints){
        vertex(hexPt[0], hexPt[1]);
      }
      endShape(CLOSE);
      pop();
    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveCanvas(cnv, '17-jan.jpg');
  }
}
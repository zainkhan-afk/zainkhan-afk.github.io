function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);

    frameRate(60);
}

function draw()
{
  background(220);
}


function keyPressed() {
  if (key === 's') {
    saveCanvas(cnv, '11-jan-quine.jpg');

  }
}
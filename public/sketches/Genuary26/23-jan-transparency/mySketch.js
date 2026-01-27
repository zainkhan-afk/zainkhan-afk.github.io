let cnv;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  frameRate(60);
}



function draw()
{
  background(0);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '24-jan.jpg');
    // saveGif("Gen27", 10);
  }
}

let cnv;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
}



function draw()
{
  background(0);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '24-jan.jpg');
    // saveGif("Gen23", 10);
  }
}

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim, WEBGL);
  frameRate(60);
}

function draw()
{
  background(200);
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}
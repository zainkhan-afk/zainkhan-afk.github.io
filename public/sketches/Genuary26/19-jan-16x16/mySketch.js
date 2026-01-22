let cnv;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  frameRate(60);
}

function draw()
{
  background(200);
}

function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '17-jan.jpg');
    saveGif("Gen19", 10);
  }
}
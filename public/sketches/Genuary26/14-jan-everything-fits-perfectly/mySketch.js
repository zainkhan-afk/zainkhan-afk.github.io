let cnv;

function setup() 
{
    cnv = createCanvas(windowWidth, windowHeight);
    frameRate(60);
}

function draw()
{
    background(200);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
    saveCanvas(cnv, '14-jan.jpg');

  }
}
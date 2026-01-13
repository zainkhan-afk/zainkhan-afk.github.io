let img;
let cnv;

function preload(){
    img = loadImage('img.jpg');
    // img = loadImage('sample_resized.jpg');
}

function setup() 
{
    cnv = createCanvas(img.width*2, img.height);
    frameRate(60);
}

function draw()
{
    background(200);
    image(img, 0, 0);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
    saveCanvas(cnv, '13-jan-self-portrait_b.jpg');

  }
}
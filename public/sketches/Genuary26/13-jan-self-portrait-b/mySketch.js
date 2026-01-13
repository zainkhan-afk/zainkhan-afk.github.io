let img;
let cnv;
let polygonPaint;
function preload(){
    img = loadImage('img.jpg');
    // img = loadImage('sample_resized.jpg');
}

function setup() 
{
    cnv = createCanvas(img.width*2, img.height);
    polygonPortrait = new PolygonPortrait();
    frameRate(60);
}

function draw()
{
    background(200);
    // image(img, 0, 0);
    translate(width/2, 0);
    polygonPortrait.drawPortrait();
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
    saveCanvas(cnv, '13-jan-self-portrait_b.jpg');

  }
}
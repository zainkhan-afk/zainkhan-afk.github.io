let cnv;
let font;

let ever = "EVER";
let y = "Y";
let t = "T";
let hing = "HING";

let perfectly = "PERFECTLY";

function preload() {
  font = loadFont('Ultra-Regular.ttf');
}

function setup() 
{
    cnv = createCanvas(650, 550);
    frameRate(60);
}

function draw()
{
  let hOff = 100;
  translate(0, hOff);
  let fontSize1 = 200;
  background(200);
  noStroke();
  fill(0);
  textFont(font);
  textSize(fontSize1);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  let everW = textWidth(ever);
  let yW = textWidth(y);
  let tW = textWidth(t);
  let hingW = textWidth(hing);
  text(ever, width/2, height/2-fontSize1*1.5);
  text(y, width/2 + (everW/2 - yW/2) , height/2-fontSize1*0.75);
  text(t, width/2 - (everW/2 - tW/2) , height/2-fontSize1*0.75);
  text(hing, width/2 , height/2);

  let fontSize2 = 45;
  textSize(fontSize2);
  fill(200, 0, 0);
  text(perfectly, width/2, height/2 - (fontSize1/2+fontSize2/3));
  noLoop();
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
    saveCanvas(cnv, '14-jan.jpg');

  }
}
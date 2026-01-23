let wallpaper1;
let wallpaper2;
let cnv;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  wallpaper1 = new Wallpaper1();
  wallpaper2 = new Wallpaper2();
  
  frameRate(60);
}

function draw()
{
  wallpaper2.Render(); 
  // saveCanvas(cnv, '17-jan.jpg');
  // noLoop();
}

function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '17-jan.jpg');
    saveGif("Gen18", 10);
  }
}
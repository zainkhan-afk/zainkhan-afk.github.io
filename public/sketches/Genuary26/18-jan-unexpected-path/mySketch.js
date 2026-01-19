let div = 10;
let grid;
let lightSource;
let ghost;
let renderer;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim);
  grid = new Grid(int(width/div), int(height/div), div);
  renderer = new Renderer();
  frameRate(60);
}

function draw()
{
  background(200);
  renderer.Render(grid);
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}
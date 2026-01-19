let div = 10;
let grid;
let lightSources = [];
let ghost;
let renderer;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim);
  append(lightSources, new Light(createVector(500, 500)));
  grid = new Grid(int(width/div), int(height/div), div);
  renderer = new Renderer();
  frameRate(60);
}

function draw()
{
  background(200);
  grid.CalculateGrid(lightSources);
  renderer.Render(grid);
  noLoop();
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}
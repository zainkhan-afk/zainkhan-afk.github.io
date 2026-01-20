let div = 10;
let grid;
let lightSources = [];
let numLightSources = 5;
let ghost;
let renderer;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim);
  
  for (let i = 0; i < numLightSources; i++){
    append(lightSources, new Light(createVector(random(0, width), random(0, height))));
  }

  grid = new Grid(int(width/div), int(height/div), div);
  renderer = new Renderer();
  frameRate(60);
}

function draw()
{
  background(200);
  for (let lightSource of lightSources){
    lightSource.Step(deltaTime/1000);
  }
  grid.CalculateGrid(lightSources);
  renderer.Render(grid);
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}
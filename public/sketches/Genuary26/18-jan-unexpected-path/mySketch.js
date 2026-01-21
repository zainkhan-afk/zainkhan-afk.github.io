let div = 5;
let grid;
let lightSources = [];
let numLightSources = 10;
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
  ghost = new Ghost(createVector(width/2, height/2));
  frameRate(60);
}

function draw()
{
  background(200);
  for (let lightSource of lightSources){
    lightSource.Step(deltaTime/1000, div);
  }
  grid.CalculateGrid(lightSources);
  
  let darkest = grid.FindDarkestCell(ghost);
  let lightest = grid.FindLightestCell(ghost);
  if (darkest.length > 0){
    let r = darkest[0];
    let c = darkest[1];
    let cart = grid.GridCoordsToCart(r, c);
    let x = cart[0];
    let y = cart[1];

    let lightestVal = grid.grid[lightest[0]][lightest[1]];

    console.log(lightestVal);

    let f = p5.Vector.sub(createVector(x, y), ghost.pos);
    f.mult(lightestVal*50);

    ghost.ApplyForce(f);
  }
  
  ghost.Step(deltaTime/1000);
  renderer.Render(grid, ghost);
  // noLoop();
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}
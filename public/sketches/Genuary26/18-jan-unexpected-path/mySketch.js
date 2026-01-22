let div = 15;
let grid;
let lightSources = [];
let numLightSources = 10;
let philicGhost;
let phobicGhost;
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

  grid = new Grid(int(width/div)+1, int(height/div)+1, div);
  renderer = new Renderer();
  philicGhost = new Ghost(createVector(random(width), random(height)));
  phobicGhost = new Ghost(createVector(random(width), random(height)));
  frameRate(60);
}

function draw()
{
  background(200);
  for (let lightSource of lightSources){
    lightSource.Step(deltaTime/1000, div);
  }
  grid.CalculateGrid(lightSources);
  
  
  updatePhilic();
  updatePhobic();
  philicGhost.Step(deltaTime/1000);
  phobicGhost.Step(deltaTime/1000);
  renderer.Render(grid, philicGhost, phobicGhost);
  // noLoop();
}

function keyPressed() {
  if (key === 's') {
    saveGif("Gen17", 10);

  }
}



function updatePhilic(){
  let darkest = grid.FindDarkestCell(philicGhost);
  let lightest = grid.FindLightestCell(philicGhost);

  let lightestVal = grid.grid[lightest[0]][lightest[1]];
  
  let r = lightest[0];
  let c = lightest[1];
  let cart = grid.GridCoordsToCart(r, c);
  let x = cart[0];
  let y = cart[1];
  
  let f = p5.Vector.sub(createVector(x, y), philicGhost.pos);
  // let centerF = p5.Vector.sub(philicGhost.pos, createVector(width/2, height/2));
  let centerF = p5.Vector.sub(createVector(width/2, height/2), philicGhost.pos);
  f.mult(lightestVal*25);
  f.add(centerF);

  
  philicGhost.ApplyForce(f);
}


function updatePhobic(){
  let darkest = grid.FindDarkestCell(phobicGhost);
  let lightest = grid.FindLightestCell(phobicGhost);
  if (darkest.length > 0){
    let r = darkest[0];
    let c = darkest[1];
    let cart = grid.GridCoordsToCart(r, c);
    let x = cart[0];
    let y = cart[1];

    let lightestVal = grid.grid[lightest[0]][lightest[1]];

    console.log(lightestVal);

    let f = p5.Vector.sub(createVector(x, y), phobicGhost.pos);
    // let centerF = p5.Vector.sub(phobicGhost.pos, createVector(width/2, height/2));
    let centerF = p5.Vector.sub(createVector(width/2, height/2), philicGhost.pos);



    f.mult(lightestVal*50);
    f.add(centerF);

    phobicGhost.ApplyForce(f);
  }
}
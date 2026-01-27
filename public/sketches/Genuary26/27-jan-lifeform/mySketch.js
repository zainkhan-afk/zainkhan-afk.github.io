let cnv;
let sim;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  sim = new Simulation(100);
  frameRate(60);
}



function draw()
{
  background(0);
  sim.render();
  sim.step(deltaTime/1000);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '21-jan.jpg');
    saveGif("Gen27", 20);
  }
}

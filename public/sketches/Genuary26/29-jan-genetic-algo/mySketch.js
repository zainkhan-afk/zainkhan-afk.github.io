let cnv;
let sim;
let dt = 0.1;

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
  sim.step(dt);
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '21-jan.jpg');
    saveGif("Gen27", 20);
  }
}

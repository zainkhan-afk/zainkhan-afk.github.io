let cnv;
let sim;
let dt = 0.05;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(windowWidth, windowHeight);
  sim = new Simulation(200, 0.01);
  frameRate(6000);
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
    saveGif("Gen29", 20);
  }
}

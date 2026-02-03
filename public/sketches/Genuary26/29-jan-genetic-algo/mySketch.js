let cnv;
let sim;
let dt = 0.1;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(windowWidth, windowHeight);
  sim = new Simulation(700, 0.01);
  frameRate(30);
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
    saveGif("GenGA", 20);
  }
}

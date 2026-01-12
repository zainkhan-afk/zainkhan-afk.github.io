let dt = 0.1;
let sim;
let sunShader;
let planetShader;

function preload(){
  sunShader = loadShader('shaders/sun.vert', 'shaders/sun.frag');
  planetShader = loadShader('shaders/planet.vert', 'shaders/planet.frag');
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight, WEBGL);
    // Create a p5.Camera object.
    cam = createCamera();

    // Place the camera at the top-center.
    // cam.setPosition(400, -400, 400);
    cam.camera(1800, 1800, 1800, 0, 0, 0, 0, 0, -1);


    // Point the camera at the origin.
    cam.lookAt(0, 0, 0);
    setCamera(cam);

    sim = new Simulation(dt);

    sim.AddPlanet(new Planet(createVector(0, -300, 0), 10000, planetShader = planetShader));
    // sim.AddPlanet(new Planet(createVector(100, 0, 0), 100));
    sim.AddPlanet(new Planet(createVector(0, 300, 0), 100000, planetShader = planetShader));
    sim.AddPlanet(new Planet(createVector(600, 0, 0), 100000, planetShader=sunShader));
    // sim.AddPlanet(new Planet(createVector(0, 0, 100), 100));

    frameRate(60);
}

function draw()
{
  background(0, 0, 35);
  sim.Step();
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
  }
}
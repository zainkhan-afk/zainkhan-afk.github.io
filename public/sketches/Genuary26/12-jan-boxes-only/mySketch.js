let dt = 0.1;
let sim;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim, WEBGL);
    // Create a p5.Camera object.
    cam = createCamera();

    // Place the camera at the top-center.
    // cam.setPosition(400, -400, 400);
    cam.camera(800, 800, 800, 0, 0, 0, 0, 0, -1);


    // Point the camera at the origin.
    cam.lookAt(0, 0, 0);
    setCamera(cam);

    sim = new Simulation(dt);

    sim.AddPlanet(new Planet(createVector(0, 0, 0), 100));
    sim.AddPlanet(new Planet(createVector(100, 0, 0), 100));
    sim.AddPlanet(new Planet(createVector(0, 100, 0), 100));
    sim.AddPlanet(new Planet(createVector(0, 0, 100), 100));

    frameRate(60);
}

function draw()
{
  background(220);
  sim.Step();
  // randomSeed(1);
  // for (let i = 0; i < 5; i++){
  //   for (let j = 0; j < 5; j++){
  //     fill(random(100, 200), random(100, 200), random(100, 200));
  //     push();
  //     translate(-width / 3 + j*150, -height / 3 + i*150, 0);
  //     rotateX((i+j)*PI/3 + ang);
  //     rotateY((i+j)*PI/3 + ang);
  //     rotateX(ang);
  //     box(50, 50, 50);
  //     pop();
  //   }
  // }
  // ang += 0.01;
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
  }
}
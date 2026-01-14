let dt = 1;
let sim;
let sunShader;
let planetShader;
let cameraPos;
let cameraLookAtPos;
let buttonPressStarted;
let buttonPressp1;
let buttonPressp2;

let cameraPhi = 0;
let cameraTheta = 0.0001;
let cameraMag = 3500;


function preload(){
  sunShader = loadShader('shaders/sun.vert', 'shaders/sun.frag');
  planetShader = loadShader('shaders/planet.vert', 'shaders/planet.frag');
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim, WEBGL);
    cameraPhi = -PI/3;
    cameraTheta = -PI/2;
    
    cameraLookAtPos = createVector(0, 0, 0);
    // Create a p5.Camera object.
    calculateAndSetCameraPosition();
    AdjustCamera();
    calculateAndSetCameraPosition();


    // Point the camera at the origin.
    // cam.lookAt(0, 0, 0);

    sim = new Simulation(dt); 
    SpawnPlanets();
    frameRate(60);
}

function draw()
{
  background(0, 0, 35);
  sim.Step();
  if (buttonPressStarted){
    let mousePosVec = createVector(mouseX, mouseY);
    let mouseDiff = p5.Vector.sub(buttonPressp1, mousePosVec);
    cameraLookAtPos.x += mouseDiff.x;
    cameraLookAtPos.y += mouseDiff.y;
    buttonPressp1 = mousePosVec.copy();//.sub(mouseDiff);

    // cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
    cam.lookAt(cameraLookAtPos.x, cameraLookAtPos.y, cameraLookAtPos.z);
  }
  // noLoop();
  // console.log(sim.planets[2].vel);
  cameraPhi += 0.01;
  // if (cameraPhi > PI){cameraPhi = 0;}
  cameraTheta += 0.01;
  calculateAndSetCameraPosition();
}

function calculateAndSetCameraPosition(){
  cam = createCamera();

  let z = cameraMag*cos(cameraPhi);
  let p = cameraMag*sin(cameraPhi);
  let x = p*cos(cameraTheta);
  let y = p*sin(cameraTheta);

  // let x = cameraMag * cos(cameraPhi) * sin(cameraTheta);
  // let z = cameraMag * sin(cameraPhi);
  // let y = cameraMag * cos(cameraPhi) * cos(cameraTheta);


  
  cameraPos = createVector(x, y, -z);

  // console.log(cameraPos);

  cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  cam.lookAt(cameraLookAtPos.x, cameraLookAtPos.y, cameraLookAtPos.z);
  setCamera(cam);
}


function SpawnPlanets(){
  let sun = new Planet(createVector(0, 0, 0), 10000, sunShader);
  sun.dim *= 0.1;
  sun.rotation.set(0);
  sun.omega.set(0, 0, -0.01);
  sim.AddPlanet(sun);
  
  for (let i = 1; i < 7; i++){
    let m = random(50, 100);
    let p = new Planet(createVector(0, 500 + i*300, 0), m, planetShader);
    p.dim *= 3;
    let pSunPlanet = p5.Vector.sub(sun.pos, p.pos);
		let v = sqrt((sim.physics.gravitationalConstant * (sun.mass)) / pSunPlanet.mag());
		// let v = (sim.physics.gravitationalConstant * (sun.mass)) / pSunPlanet.mag();
    pSunPlanet.normalize();
    pSunPlanet.setMag(v);
    pSunPlanet.rotate(-PI/2);
    
    
    p.vel.set(pSunPlanet);// = pSunPlanet.copy();
    sim.AddPlanet(p);
    
    pSunPlanet.rotate(PI);
    let p2 = new Planet(createVector(0, -(500 + i*300), 0), m, planetShader);
    p2.vel.set(pSunPlanet);// = pSunPlanet.copy();
    p2.dim *= 3;


    sim.AddPlanet(p2);
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
    saveGif("Gen12", 10);
  }
}

function mouseWheel(event) {
  if (event.delta != 0){
    let posLookAt = p5.Vector.sub(cameraPos, cameraLookAtPos);
    posLookAt.normalize();
    if (event.delta > 0) {
      posLookAt.setMag(event.delta);
    } else {
      posLookAt.setMag(event.delta);
    }
    
    cameraPos.add(posLookAt);
    cameraMag = cameraPos.mag();
    cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  }
}

function mousePressed(event) {
	if(mouseButton === LEFT) 
	{
    // console.log("PRessed");
		buttonPressp1 = createVector(mouseX, mouseY);
		buttonPressStarted = true;
  }
}

function mouseReleased(event) {
	if(mouseButton === LEFT && buttonPressStarted) 
	{
		buttonPressp2 = createVector(mouseX, mouseY);
		buttonPressStarted = false;
  }
}



function AdjustCamera(){
  cam = createCamera();

  // Place the camera at the top-center.
  // cam.setPosition(400, -400, 400);
  // cam.camera(800, 800, 800, 0, 0, 0, 0, 0, -1);
  cam.camera(cameraPos.x, cameraPos.y, cameraPos.z, cameraLookAtPos.x, cameraLookAtPos.y, cameraLookAtPos.z, 0, 0, 1);
  setCamera(cam);
}
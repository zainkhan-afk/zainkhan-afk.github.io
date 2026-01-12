let dt = 0.1;
let sim;
let sunShader;
let planetShader;
let cameraPos;
let cameraLookAtPos;
let buttonPressStarted;
let buttonPressp1;
let buttonPressp2;

function preload(){
  sunShader = loadShader('shaders/sun.vert', 'shaders/sun.frag');
  planetShader = loadShader('shaders/planet.vert', 'shaders/planet.frag');
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(windowWidth, windowHeight - 50, WEBGL);
    cameraPos = createVector(0, 1, -3000);
    cameraLookAtPos = createVector(0, 0, 0);
    // Create a p5.Camera object.
    AdjustCamera();

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
    cameraPos.x -= mouseDiff.x;
    cameraPos.y += mouseDiff.y;
    buttonPressp1.sub(mouseDiff);

    cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  }
  // console.log(sim.planets[2].vel);
}


function SpawnPlanets(){
  let sun = new Planet(createVector(0, 0, 0), 1000, sunShader);
  sim.AddPlanet(sun);
  
  for (let i = 1; i < 4; i++){
    let m = random(50, 100);
    let p = new Planet(createVector(0, 500 + i*100, 0), m, planetShader);
    let pSunPlanet = p5.Vector.sub(sun.pos, p.pos);
		let v = sqrt((sim.physics.gravitationalConstant * (sun.mass)) / pSunPlanet.mag());
    pSunPlanet.normalize();
    pSunPlanet.setMag(v);
    pSunPlanet.rotate(-PI/2);
    
    
    p.vel = pSunPlanet.copy();
    sim.AddPlanet(p);
    
    pSunPlanet.rotate(PI);
    let p2 = new Planet(createVector(0, -(500 + i*100), 0), m, planetShader);
    p2.vel = pSunPlanet.copy();

    sim.AddPlanet(p2);
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
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
      // posLookAt.rotate(PI);
    }
    
    cameraPos.add(posLookAt);
    cam.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);
  }
}

function mousePressed(event) {
	if(mouseButton === LEFT) 
	{
    console.log("PRessed");
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
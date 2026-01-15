let cam;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim, WEBGL);
  AdjustCamera();
  
  frameRate(60);
}

function draw()
{
  background(200);
  // ambientLight(200, 200, 100);
  directionalLight(200, 200, 100, 0.5, 0.5, -1);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the plane.
  noStroke();
  fill(100);
  plane(1000);
  translate(0, 0, 10);
  fill(100, 0, 0);
  box(10, 10, 10);
}




function AdjustCamera(){
  cam = createCamera();
  cam.camera(500, 500, 500, 
             0, 0, 0, 
             0, 0, -1);
  setCamera(cam);
}
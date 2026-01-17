let cam;
let units = [];
let sideColor = [];
let boxDim = 25;
let frameCounter = 0;
let initSteppingAt = 100;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim, WEBGL);
  AdjustCamera();

  sideColor = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(255, 255, 0),
    color(255, 80, 0),
    color(255, 255, 255)
  ];

  for (let x = 0; x < 3; x++){
    for (let y = 0; y < 3; y++){
      for (let z = 0; z < 3; z++){
        let xDim = x*boxDim;
        let yDim = y*boxDim;
        let zDim = z*boxDim + boxDim/2;

        let goalPos = createVector(xDim*5, yDim*5, zDim*5);
        let goalRot = createVector(random(-5, 5), random(-5, 5), random(-5, 5))

        let b = new Box(createVector(xDim, yDim, zDim), 
                createVector(0, 0, 0),
                goalPos,
                goalRot,
                boxDim, 
                sideColor);
        b.goalPos.set
        b.goalRot.set;
        append(units, b)
      }
    }
  }

  frameRate(60);
}

function draw()
{
  noStroke();

  lights();

  background(200);
  ambientLight(200, 200, 200);
  directionalLight(200, 200, 200, -0.5, -0.5, -0.5);
  orbitControl();

  fill(40, 40, 40);
  plane(1000);

  for (let unit of units){
    unit.RenderBox();
  }

  let reachedGoalCount = 0;

  if (frameCounter > initSteppingAt){  
    for (let unit of units){
      unit.Step(deltaTime/1000);
      if (unit.ReachedGoal()){
        reachedGoalCount += 1;
        
      }
    }
  }

  if (reachedGoalCount == units.length){
    for (let unit of units){
      unit.ResetGoal();
    }
  }

  frameCounter += 1;
}

function AdjustCamera(){
  cam = createCamera();
  cam.camera(800, 800, 600, 
             0, 0, 0, 
             0, 0, -1);

  cam.ortho();
  perspective(0.9, 1.0, 1, 12000);
  setCamera(cam);

}


function keyPressed() {
  if (key === 's') {
    saveGif("Gen16", 10);

  }
}
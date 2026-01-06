
// let ghost;
let dt = 0.5;

let lightAnchor;
// let lightsOn = true;
let lightWireLength = 400;
let lastGhostPos;
let applyRectionForce = false;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    lightAnchor = createVector(width/2, 0);
    // ghost = new Ghost();
    lamp = new Lamp(createVector(width/2, 0), 300);
    lamp.Step(dt);
    frameRate(60); 
}

function draw()
{
    background(100, 100, 100, 255);
    for (let i = 0; i<10; i++){
        line(i*width/10, 0, i*width/10, height);
    }
    lamp.Render();
    lamp.Step(dt);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
  if (key === 's') {
    lamp.lightsOn = !lamp.lightsOn;
    lamp.applyRectionForce = true;
  }
}
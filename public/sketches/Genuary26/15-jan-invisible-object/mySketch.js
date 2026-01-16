let cam;
let boids = [];
let numBoids = 10;
let avoidFactor = 0.1;
let matchingFactor = 2;
let visibleDistance = 50;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim, WEBGL);
  AdjustCamera();

  
  for (let i = 0; i < numBoids; i++){
    append(boids, new Boid(createVector(random(-10, 10), random(-10, 10), random(80, 120))));
  }
  
  frameRate(60);
}

function draw()
{
  perspective(0.9, 1.0, 1, 12000);

  lights();

  background(200);
  ambientLight(200, 200, 100);
  directionalLight(200, 200, 100, -0.5, -0.5, -0.5);
  orbitControl();
  
  
  
  noStroke();
  fill(100);
  plane(1000);

  for (let boid of boids){
    fill(100, 0, 0);
    push();
    translate(boid.pos.x, boid.pos.y, boid.pos.z);
    box(10);
    pop();
    fill(0);

    push();
    translate(boid.pos.x, boid.pos.y, 1);
    rect(0, 0, 10, 10);
    pop();
  }

  for (let boid of boids){
    boid.Update(deltaTime/1000);
  }

  BoidUpdate();
}

function BoidUpdate(){
  let index1 = 0;
  for (let boid1 of boids){
    let close = createVector(0, 0, 0);
    let velAvg = createVector(0, 0, 0);

    let neighbors = 0;

    let index2 = 0;
    for (let boid2 of boids){
      if (index1 === index2){index2 += 1; continue;}
      close.add(p5.Vector.sub(boid1.pos, boid2.pos));

      if (p5.Vector.dist(boid1.pos, boid2.pos) < visibleDistance){
        velAvg.add(boid2.vel);
        neighbors += 1;
      }

      index2 += 1;
    }
    close.mult(avoidFactor);
    
    if (neighbors > 0){
      velAvg.mult(1/neighbors);
      velAvg.sub(boid1.vel);
      velAvg.mult(matchingFactor)
    }
    
    boid1.vel.add(velAvg);
    boid1.vel.add(close);
    index1 += 1;
  }
}


function AdjustCamera(){
  cam = createCamera();
  cam.camera(500, 500, 500, 
             0, 0, 0, 
             0, 0, -1);

  cam.ortho();
  setCamera(cam);
}
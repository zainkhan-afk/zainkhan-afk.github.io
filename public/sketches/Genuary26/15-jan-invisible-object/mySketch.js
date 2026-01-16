let cam;
let boids = [];
let numBoids = 300;

let visibleDistance = 50;
let protectedDistance = visibleDistance*0.8;

let avoidFactor = 1;
let matchingFactor = 0.3;
let centeringfactor = 0.1;

let invisibleObjectDims = 500;

let offset = 0;

function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  createCanvas(minDim, minDim, WEBGL);
  AdjustCamera();

  
  for (let i = 0; i < numBoids; i++){
    append(boids, new Boid(createVector(random(-300, 300), random(-300, 300), random(80, 120))));
  }
  
  frameRate(60);
}

function draw()
{
  // let val = sin(offset);
  // matchingFactor = map(val, -1, 1, 0.1, 1.3);
  // avoidFactor = map(-val, -1, 1, 1, 2);
  // offset += 0.01;
  perspective(0.9, 1.0, 1, 12000);

  lights();

  background(200);
  ambientLight(200, 200, 100);
  directionalLight(200, 200, 100, -0.5, -0.5, -0.5);
  orbitControl();
  
  push();
  translate(0, 0, invisibleObjectDims/2);
  noFill();
  stroke(0);
  strokeWeight(3);
  box(invisibleObjectDims);
  pop();
  
  
  noStroke();
  fill(100);
  plane(1000);

  for (let boid of boids){
    if (boid.pos.x > invisibleObjectDims/2 ||
       boid.pos.x < -invisibleObjectDims/2 || 
       boid.pos.y > invisibleObjectDims/2 || 
       boid.pos.y < -invisibleObjectDims/2){
      fill(100, 0, 0);
      noStroke();
    }
    else{
      stroke(0);
      noFill();
    }
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
  let turnFactor = 10;
  let index1 = 0;
  for (let boid1 of boids){
    let close = createVector(0, 0, 0);
    let velAvg = createVector(0, 0, 0);
    let posAvg = createVector(0, 0, 0);
    let turnVel = createVector(0, 0, 0);

    let neighbors = 0;

    let index2 = 0;
    for (let boid2 of boids){
      if (index1 === index2){index2 += 1; continue;}
      let boidDist = p5.Vector.dist(boid1.pos, boid2.pos);
      if ( boidDist < visibleDistance){
        if (boidDist < protectedDistance){
          close.add(p5.Vector.sub(boid1.pos, boid2.pos));
        }
        else{
          velAvg.add(boid2.vel);
          posAvg.add(boid2.pos);
          neighbors += 1;
        }
      }

      index2 += 1;
    }
    
    if (neighbors > 0){
      velAvg.mult(1/neighbors);
      posAvg.mult(1/neighbors);
      
      velAvg.sub(boid1.vel);
      posAvg.sub(boid1.pos);
      
    }
    velAvg.mult(matchingFactor)
    posAvg.mult(centeringfactor)
    close.mult(avoidFactor);
    
    if (boid1.pos.x < -400){
      turnVel.x = turnFactor; 
    }
    else if (boid1.pos.x > 400){
      turnVel.x = -turnFactor; 
    }

    if (boid1.pos.y < -400){
      turnVel.y = turnFactor; 
    }
    else if (boid1.pos.y > 400){
      turnVel.y = -turnFactor; 
    }


    if (boid1.pos.z < 50){
      turnVel.z = turnFactor; 
    }
    else if (boid1.pos.z > 300){
      turnVel.z = -turnFactor; 
    }
    
    boid1.vel.add(velAvg);
    boid1.vel.add(close);
    boid1.vel.add(posAvg);
    
    // boid1.vel.limit(boid1.maxVel);

    boid1.vel.add(turnVel);
    index1 += 1;
  }
}


function AdjustCamera(){
  cam = createCamera();
  cam.camera(800, 800, 600, 
             0, 0, 0, 
             0, 0, -1);

  cam.ortho();
  setCamera(cam);
}


function keyPressed() {
  if (key === 's') {
    saveGif("Gen15", 10);

  }
}
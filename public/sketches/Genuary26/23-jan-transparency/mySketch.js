let cnv;
let things = [];
let numThings = 10;
let dt = 0.1;
let margin = 100;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);

  for (let  i = 0; i < numThings; i++){
    append(things, new Thing(createVector(random(width), random(height))))
  }
  frameRate(60);
}



function draw()
{
  background(0);
  noStroke();
  for (let thing of things){
    fill(thing.color);
    circle(thing.pos.x, thing.pos.y, 300);
  }

  for (let thing of things){
    if (thing.pos.x < margin){
      let f = createVector(
        margin - thing.pos.x, 
        0
      );
      thing.applyForce(f);
    }
    else if (thing.pos.x > (width - margin)){
      let f = createVector(
        (width - margin) - thing.pos.x, 
        0
      );
      thing.applyForce(f);
    }

    if (thing.pos.y < margin){
      let f = createVector(
        0,
        margin - thing.pos.y, 
      );
      thing.applyForce(f);
    }
    else if (thing.pos.y > (height - margin)){
      let f = createVector(
        0,
        (height - margin) - thing.pos.y
      );
      thing.applyForce(f);
    }

    thing.step(dt);
  }
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '24-jan.jpg');
    saveGif("Gen23", 10);
  }
}

let cnv;
let ang;
let size;
let otherUnitSize;
let firstUnitSize;
let units = [];
let combinedRect;
let numCombined = 0;
let repositioned = false;
let flag = false;


function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim, WEBGL);
  ang = -HALF_PI;

  size = minDim / 25;
  otherUnitSize = size;
  firstUnitSize = size;

  for (let r = 0; r<16; r++){
    for (let c = 0; c<16; c++){
      // idx = r*16+c;
      // let p = createVector((size+size/2)*c + size/2, (size+size/2)*r + size/2);
      let p = createVector((size)*c + size/2, (size)*r + size/2);
      let g = createVector((c*size + size/2), r*size + size/2);
      append(units, new Unit(p, g));
      // console.log(p);
    }
  }

  AdjustCamera();

  frameRate(60);
}

function draw()
{
  background(255);
  // strokeWeight(0.5);


  let idx = 0;
  if (numCombined == units.length-1){
    for (let unit of units){
      let r = int(idx/16);
      let c = idx % 16;
      // let g = createVector((c*size + size/2), r*size + size/2);
      if (!flag){
        unit.goal = createVector((size+size/2)*c + size/2, (size+size/2)*r + size/2);
      }
      else{
        unit.goal = createVector((c*size + size/2), r*size + size/2);
      }
      unit.skip = false;
      idx += 1;
    }
    numCombined = 0;
    flag = !flag;
  }
  console.log(numCombined, units.length);

  ang += 0.007;
  idx = 0;

  for (let unit of units){
    let r = int(idx/16);
    let c = idx % 16;

    let n = noise(r / 8, c / 8, ang);
    push();
    fill(n*200, 0, (1 - n)*200);
    translate(unit.pos.x, unit.pos.y);
    box(otherUnitSize, otherUnitSize, otherUnitSize + (n*10)*otherUnitSize);
    idx += 1;
    pop();
  }

  // let firstUnit = units[0];
  // idx = 0;
  // for (let unit of units){
  //   unit.Step(deltaTime/1000);
  //   if (idx > 0 && !unit.skip){
  //     let diff = p5.Vector.sub(unit.pos, unit.goal);
  //     let d = diff.mag();
  //     if (d < otherUnitSize/10){
  //       unit.skip = true;
        
  //       let r = int(idx/16);
  //       let c = idx % 16;

  //       numCombined += 1;
  //     }
  //   }
  //   idx += 1;
  // }
}

function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '17-jan.jpg');
    saveGif("Gen19", 10);
  }
}

function AdjustCamera(){
  cam = createCamera();
  cam.camera(1000, 1000, 600, 
             0, 0, 0, 
             0, 0, -1);

  cam.ortho(-width/2, width/2, -height/2, height/2, 10, 10000);
  setCamera(cam);
}
let cnv;
let ang;
let size;
let otherUnitSize;
let firstUnitSize;
let units = [];
let combinedRect;
let numCombined = 0;
let repositioned = false;


function preload(){
}

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  ang = -HALF_PI;

  size = minDim / 25;
  otherUnitSize = size;
  firstUnitSize = size;

  for (let r = 0; r<16; r++){
    for (let c = 0; c<16; c++){
      // idx = r*16+c;
      let p = createVector((size+size/2)*c + size/2, (size+size/2)*r + size/2);
      let g = createVector(c*size + size/2, r*size + size/2);
      append(units, new Unit(p, g));
      // console.log(p);
    }
  }

  frameRate(60);
}

function draw()
{
  background(200);
  noStroke();

  // if (numCombined == units.length-1){
  //   otherUnitSize = firstUnitSize;
  //   console.log("size", size, firstUnitSize, 16*(size+size/2)+size/2);
  //   scale(map(sin(ang), -1, 1, 1, 1/24), map(sin(ang), -1, 1, 1, 1/24));
  //   if (ang < HALF_PI){
  //     ang += 0.01;
  //   }
  // }


  let idx = 0;
  for (let unit of units){
    if (idx == 0){
      rect(unit.pos.x, unit.pos.y, firstUnitSize, firstUnitSize);
    }else{
      rect(unit.pos.x, unit.pos.y, otherUnitSize, otherUnitSize);
    }

    idx += 1;
  }

  let firstUnit = units[0];
  idx = 0;
  for (let unit of units){
    unit.Step(deltaTime/1000);
    if (idx > 0 && !unit.skip){
      let diff = p5.Vector.sub(unit.pos, unit.goal);
      let d = diff.mag();
      if (d < otherUnitSize/10){
        unit.skip = true;
        // firstUnitSize += (16*(size+size/2) - size ) / 255;
        let r = int(idx/16);
        let c = idx % 16;
        
        unit.pos.x = c*otherUnitSize + otherUnitSize/2;
        unit.pos.y = r*otherUnitSize + otherUnitSize/2;

        numCombined += 1;
      }
    }
    idx += 1;
  }
}

function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '17-jan.jpg');
    saveGif("Gen19", 10);
  }
}

let cnv;
let numSquares = 10;
let sqSize = 900;
let finalSqSize = 20;
let noiseMaxScale = 25;

function setup() 
{
  let minDim = min(windowWidth, windowHeight);
  cnv = createCanvas(minDim, minDim);
  frameRate(60);
}



function draw()
{
  background(0);
  rectMode(CENTER);
  noFill();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < numSquares; i++){
    let size = sqSize - i*(sqSize - finalSqSize)/numSquares;
    if (i == 3){
      beginShape();
      for (let x = width/2 - size/2; x < width/2 + size/2; x++){
        let y = height/2 - size/2;
        let n = noise(x/100, y/100);
        vertex(x, y+n*noiseMaxScale);
      }
      endShape();

      beginShape();
      for (let x = width/2 - size/2; x < width/2 + size/1.9; x++){
        let y = height/2 + size/2;
        let n = noise(x/100, y/100);
        vertex(x, y+n*noiseMaxScale);
      }
      endShape();


      beginShape();
      for (let y = height/2 - size/2; y < height/2 + size/2; y++){
        let x = width/2 - size/2;
        let n = noise(x/100, y/100);
        vertex(x+n*noiseMaxScale, y);
      }
      endShape();

      beginShape();
      for (let y = height/2 - size/2; y < height/2 + size/1.8; y++){
        let x = width/2 + size/2;
        let n = noise(x/100, y/100);
        vertex(x+n*noiseMaxScale, y);
      }
      endShape();
    }
    else{
      rect(width/2, height/2, size, size);
    }
  }
}


function keyPressed() {
  if (key === 's') {
    saveCanvas(cnv, '24-jan.jpg');
    // saveGif("Gen27", 10);
  }
}

let ang = 0;
function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim, WEBGL);

    frameRate(60);
}

function draw()
{
  background(220);
  randomSeed(1);
  for (let i = 0; i < 5; i++){
    for (let j = 0; j < 5; j++){
      fill(random(100, 200), random(100, 200), random(100, 200));
      push();
      translate(-width / 3 + j*150, -height / 3 + i*150, 0);
      rotateX((i+j)*PI/3 + ang);
      rotateY((i+j)*PI/3 + ang);
      rotateX(ang);
      box(50, 50, 50);
      pop();
    }
  }
  ang += 0.01;
}


function keyPressed() {
  if (key === 's') {
    // saveCanvas(cnv, '12-jan-boxes-only.jpg');
  }
}
function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    frameRate(60);
}

function draw()
{
    background(150, 150, 200);
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 5, { delay: 0 });
  }
}
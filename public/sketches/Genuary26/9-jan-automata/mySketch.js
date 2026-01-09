function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    frameRate(30);
}

function draw()
{
    background(150, 150, 200);
    
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 20, { delay: 0 });
  }
}
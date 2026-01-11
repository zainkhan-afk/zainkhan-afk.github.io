let polarBodies = [];
let z = 0;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    frameRate(60);

    append(polarBodies, new PerlinEllipse(createVector(50, -250), 0, 5, 5, numPts = 100, noiseOffset = 100, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(-50, -250), 0, 5, 5, numPts = 100, noiseOffset = 100, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(0, -200), 0, 50, 30, numPts = 100, noiseOffset = 100, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(-110, -120), PI/3, 30, 10, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(110, -10), PI/3, 30, 10, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(0, 0), 0, 80, 150, numPts = 100, noiseOffset = 0, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(80, 130), 0, 10, 30, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(-80, 130), 0, 10, 30, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5));
    append(polarBodies, new PerlinEllipse(createVector(25, -210), 0, 0, 0, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5, fillColor = color(0, 0, 0)));
    append(polarBodies, new PerlinEllipse(createVector(-25, -210), 0, 0, 0, numPts = 100, noiseOffset = 10, noiseMaxAmp = 0.5, fillColor = color(0, 0, 0)));
}

function draw()
{
    background(150, 150, 200);
    translate(width/2, height/2);
    
    for (let pb of polarBodies){
      push();
      pb.Render(z);
      pop();
    }

    z += 0.01;
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 10, { delay: 0 });
  }
}
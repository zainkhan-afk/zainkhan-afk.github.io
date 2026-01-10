let noiseMaxAmp = 1;
let numPts = 50;
let z = 0;
function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    frameRate(60);
}

function draw()
{
    background(150, 150, 200);
    translate(width/2, height/2);
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += TWO_PI / numPts){
        let x = map(cos(angle), -1, 1, 0, noiseMaxAmp);
        let y = map(sin(angle), -1, 1, 0, noiseMaxAmp);

        let additionalMag = 0; 
        if ((angle > PI/3 && angle < HALF_PI) || (angle > HALF_PI && angle < (HALF_PI + PI/3))){additionalMag = 100;}

        console.log(additionalMag);

        let mag1 = map(noise(x, y, z), 0, 1, 150 + additionalMag, 200 + additionalMag);
        let mag2 = map(noise(x, y, z), 0, 1, 150, 200);

        let ptX = mag1*cos(angle);
        let ptY = mag1*sin(angle);
        vertex(ptX, ptY);
    }
    endShape(CLOSE);
    z += 0.01;
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 5, { delay: 0 });
  }
}
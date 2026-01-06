
// let ghost;
let dt = 0.5;

let lightAnchor;
// let lightsOn = true;
let lightWireLength = 400;
let lastGhostPos;
let applyRectionForce = false;
let lightTriggered = false;
let lightTriggerFrameCounter = 1;
let brickH = 50;
let brickW = 100;
let lamp;

function drawBackground(){
    stroke(0);
    strokeWeight(1);
    fill(139, 79, 57, 255);
    let i = 0;
    for (let y = 0; y < height; y += brickH){
        for (let x = -brickW; x < width + brickW; x += brickW){
            rect(x + i%2 * brickW / 2, y, brickW, brickH);
        }
        i += 1;
    }
}

function drawOverlays(){
    if (lightTriggered){
        fill(0);
        rect(0, 0, width, height);
        if (lightTriggerFrameCounter % 20 == 0){
            lightTriggered = false;
        }
        lightTriggerFrameCounter += 1;
    }
    else if (!lamp.lightsOn && !lightTriggered){
        fill(0, 100);
        // fill(0, 50, 0, 200);
        rect(0, 0, width, height);
        stroke(255);
        fill(255);
        
        let minY = height*0.05;
        let minX = width*0.05;
        let maxY = height*0.95;
        let maxX = width*0.95;
        let lineLength = 50;
        
        textSize(22);
        text("REC.", minX*1.2, minY*1.7);
        text("Night Vision: ON", width/2 - 10, minY*1.7);
        text("00:" + nf(minute(), 2) + ":" + nf(second(), 2), minX*1.2, maxY*0.98);
        
        strokeWeight(3);
        line(minX, minY, minX, minY + lineLength);
        line(minX, minY, minX + lineLength, minY);

        line(minX, maxY, minX, maxY - lineLength);
        line(minX, maxY, minX + lineLength, maxY);

        line(maxX, minY, maxX, minY + lineLength);
        line(maxX, minY, maxX - lineLength, minY);

        line(maxX, maxY, maxX, maxY - lineLength);
        line(maxX, maxY, maxX - lineLength, maxY);
        strokeWeight(0);
        fill(255, 0, 0, 200);
        circle(minX*3, minY*1.5, 20)
    }else{
        fill(200, 10);
        rect(0, 0, width, height);
    }
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    lightAnchor = createVector(width/2, 0);
    // ghost = new Ghost();
    lamp = new Lamp(createVector(width/2, 0), 300);
    // lamp.Step(dt);
    console.log(lamp.lightsOn);
    frameRate(60); 
}

function draw()
{
    background(100, 100, 100, 255);
    drawBackground();
    if (!lightTriggered){
        lamp.Render();
    }
    drawOverlays();
    lamp.Step(dt);
}


function windowResized(){
    let minDim = min(windowWidth, windowHeight);
    resizeCanvas(minDim, minDim);
}


function keyPressed() {
  if (key === 's') {
    lamp.lightsOn = !lamp.lightsOn;
    lamp.applyRectionForce = true;
    lightTriggerFrameCounter = 1;
    lightTriggered = true;
  }

  if (key === 'c') {
    saveGif('jan6', 20, { delay: 1 });
  }
}

// let ghost;
let dt = 0.5;

let lightAnchor;
// let lightsOn = true;
let lightWireLength = 400;
let lastGhostPos;
let applyRectionForce = false;
let lightTriggered = false;
let lightTriggerFrameCounter = 1;


function drawOverlays(){
    for (let i = 0; i<10; i++){
        line(i*width/10, 0, i*width/10, height);
    }

    if (lightTriggered){
        fill(0);
        rect(0, 0, width, height);
        if (lightTriggerFrameCounter % 10 == 0){
            lightTriggered = false;
        }
        lightTriggerFrameCounter += 1;
    }
    else if (!lamp.lightsOn && !lightTriggered){
        fill(0, 100, 0, 50);
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

        textSize(22);
        text("00:" + nf(minute(), 2) + ":" + nf(second(), 2) + ":" + nf(millis(), 5), width/2, maxY);
        
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
        circle(minX*2, minY*1.5, 20)
    }else{
        fill(200, 50);
        rect(0, 0, width, height);
    }
}

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    lightAnchor = createVector(width/2, 0);
    // ghost = new Ghost();
    lamp = new Lamp(createVector(width/2, 0), 300);
    lamp.Step(dt);
    frameRate(60); 
}

function draw()
{
    background(100, 100, 100, 255);

    drawOverlays();
    if (!lightTriggered){
        lamp.Render();
    }
    lamp.Step(dt);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
  if (key === 's') {
    lamp.lightsOn = !lamp.lightsOn;
    lamp.applyRectionForce = true;
    lightTriggerFrameCounter = 1;
    lightTriggered = true;
  }
}
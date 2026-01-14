let mem = {};
let numBranches = 100;
let n = [];
let prevN = [];
let segLen = 20;
let frameNum = [];

let endPosX = [];
let endPosY = [];

let startPosX = [];
let startPosY = [];

let ang = [];
let angleOffset = [];

let randomColorStep = 0;
let bgColored = false;
let captureStarted = false;

function setup() 
{
    createCanvas(600, 600);
    initParams();
    frameRate(60);
}

function resetParamsAt(i){
    endPosX[i] = 0;
    endPosY[i] = 0;
    startPosX[i] = width / 2 + random(- width * 0.01, width * 0.01);
    startPosY[i] = height - 100;

    ang[i] = -PI / 2;
    frameNum[i] = 0;
    angleOffset[i] *= -1;
}

function initParams(){
    endPosX = [];
    endPosY = [];
    startPosX = [];
    startPosY = [];

    ang = [];
    frameNum = [];


    for (let i = 0; i<numBranches; i++){
        append(endPosX, 0);
        append(endPosY, 0);

        append(startPosX, width / 2 + random(- width * 0.01, width * 0.01));
        append(startPosY, height - 100);
        
        append(ang, -PI / 2);
        append(frameNum, 0);
        append(angleOffset, PI / 3);

        append(n, 1);
        append(prevN, 0);
        if (random() < 0.5){
            angleOffset[i] *= -1;
        }
    }

    // let xMargin = width*0.1;
    // startPosX = random(xMargin,  width - xMargin);
    // startPosX = width / 2 + random(- width * 0.01, width * 0.01);
    // startPosY = height - 100;
    randomColorStep = random(-1, 1);
}

function fibonacci(num)
{
    if (num == 0) { return 0;}
    else if (num == 1) {return 1;}

    let a;
    let b;
    if ((num - 1) in mem) {
        a = mem[num-1];
    }
    else{
        a = fibonacci(num - 1);
    }

    if ((num - 2) in mem) {
        b = mem[num - 2];
    }
    else{

        b = fibonacci(num - 2);
    }

    return  a + b;
}

function draw()
{
    if (bgColored && !captureStarted){captureStarted = true;}
    if(!bgColored){background(0); bgColored = true;}
    // background(200);
    // blendMode(SUBTRACT);
    noStroke();
    strokeCap(SQUARE);
    for (let i = 0; i < numBranches; i++){
        let res = fibonacci(n[i]);
        if (!(n[i] in mem)){
            mem[n[i]] = res;
        }
        
        let multiplier = 1;
        if (frameNum[i] > 2) {
            multiplier = 1 / log(frameNum[i]);
        }

        if (n[i] != prevN[i])
        {
            let angle;
            if (res % 2 == 0){
                angle = n[i]/100*angleOffset[i];
            }
            else{
                angle = n[i]/100*-angleOffset[i];
            }

            ang[i] += angle;
            endPosX[i] = startPosX[i] + multiplier * segLen*cos(ang[i]);
            endPosY[i] = startPosY[i] + multiplier * segLen*sin(ang[i]);
            
            stroke((80 - n[i] + randomColorStep)/106 * 200, (n[i] + 60 + randomColorStep)/106*200, 0);
            strokeWeight(multiplier * 20);
            line(startPosX[i], startPosY[i], endPosX[i], endPosY[i]);
            startPosX[i] = endPosX[i];
            startPosY[i] = endPosY[i];
            
        }
        
        frameNum[i] += 1;
        if (frameNum[i] % 2 == 0){ prevN[i] = n[i]; n[i] += int(random(1, 5));} 
        if (n[i] >= 106) { 
            n[i] = 1;
            resetParamsAt(i);
        }
    }


}

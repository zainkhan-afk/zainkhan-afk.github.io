let mem = {};
let freq = {};
let n = 1;
let prevN = 0;
let segLen = 20;
let vals = [];
let frameNum = 0;

let endPosX = 0;
let endPosY = 0

let startPosX = 0;
let startPosY = 0;

let ang = 0;
let angleOffset;

let lastTenValues = [];

let randomColorStep = 0;
let bgColored = false;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    resetLineParams();
    angleOffset = PI / 3;
    freq["even"] = 0;
    freq["odd"] = 0;
    frameRate(60);
    background(0);
}

function resetLineParams(){
    endPosX = 0;
    endPosY = 0;
    let xMargin = windowWidth*0.1;
    // startPosX = random(xMargin,  windowWidth - xMargin);
    startPosX = windowWidth / 2 + random(- windowWidth * 0.01, windowWidth * 0.01);
    startPosY = windowHeight - 100;
    ang = -PI / 2;
    frameNum = 0;
    angleOffset *= -1;
    randomColorStep = random(-1, 1);
}

function fibonacci(n)
{
    if (n == 0) { return 0;}
    else if (n == 1) {return 1;}

    let a;
    let b;
    if ((n - 1) in mem) {
        a = mem[n-1];
    }
    else{
        a = fibonacci(n - 1);
    }

    if ((n - 2) in mem) {
        b = mem[n - 2];
    }
    else{

        b = fibonacci(n - 2);
    }

    return  a + b;
}

function draw()
{
    if(!bgColored){background(150);bgColored=true;}
    // blendMode(SUBTRACT);
    noStroke();
    // if (frameNum == 0){
    //     console.log("HERE");
        // fill(200, 200, 200, 1);
        // rect(0, 0, width, height);
    // }
    // text("Even: " + freq["even"], 100, 50);
    // text("Odd: " + freq["odd"], 100, 75);
    // translate(windowWidth/2, windowHeight);
    strokeCap(SQUARE);
    // n = int(random(1, 50));
    let res = fibonacci(n);
    if (!(n in mem)){
        mem[n] = res;
    }

    // if (!vals.includes(res)){
    //     append(vals, res);
    // }
    // if (n != prevN){
    //     if (res % 2 == 0) {
    //         append(vals, [n, 0]);
    //     }
    //     else{
    //         append(vals, [n, 1]);
    //     }
    // }
    // console.log(vals.length);
    let multiplier = 1;
    if (frameNum > 2) {
        multiplier = 1 / log(frameNum);
    }

    if (n != prevN)
    {
        let angle;
        if (res % 2 == 0){
            freq["even"] += 1;
            angle = n/100*angleOffset;
        }
        else{
            freq["odd"] += 1;
            angle = n/100*-angleOffset;
        }

        ang += angle;
        endPosX = startPosX + multiplier * segLen*cos(ang);
        endPosY = startPosY + multiplier * segLen*sin(ang);
        
        
        // stroke(0);
        // strokeWeight(multiplier * 20 + 1);
        // line(startPosX, startPosY, endPosX, endPosY);
        stroke((80 - n + randomColorStep)/106 * 200, (n + 60 + randomColorStep)/106*200, 50);
        strokeWeight(multiplier * 20);
        line(startPosX, startPosY, endPosX, endPosY);
        startPosX = endPosX;
        startPosY = endPosY;
        
    }

    // if ( startPosX > windowWidth){startPosX = -0;}
    // else if ( startPosX < 0){startPosX = windowWidth;}
    // if ( startPosY > windowHeight){startPosY = 0;}
    // else if ( startPosY < 0){startPosY = windowHeight;}

    frameNum += 1;
    if (frameNum % 2 == 0){ prevN = n; n += int(random(1, 5));} 
    if (n >= 106) { 
        n = 1; 
        // let numPetals = 5;
        // fill(255, 0, 0);
        // stroke(random(255), random(255), random(255));
        // strokeWeight(2);
        // for (let i = 0; i < numPetals; i++){
        //     let flowerN = 1;
        //     push();
        //     translate(endPosX, endPosY);
        //     rotate(ang + i / numPetals * TWO_PI);
        //     while (flowerN < 12){
        //         let val = fibonacci(flowerN)*0.2;
        //         flowerN += 1;
        //         translate(0, val*0.5);
        //         rotate(PI/6);
        //         line(0, 0, 0, val);
        //     }
        //     pop();
        // }
        resetLineParams();
    }
}

let cnv;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    cnv = createCanvas(minDim, minDim);
    frameRate(60);
}

function resetParamsAt(i){
    endPosX[i] = 0;
    endPosY[i] = 0;
    startPosX[i] = width / 2 + random(- width * 0.01, width * 0.01);
    startPosY[i] = height - 100;

    ang[i] = -PI / 2;
    frameNum[i] = 0;
    // angleOffset[i] *= -1;
}

function draw()
{
    background(240, 240, 200);
}

let cnv;
let red;
let blue;
let yellow;
let black;

let div = 50;
let numRows;
let numCols;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    cnv = createCanvas(minDim, minDim);

    numRows = int(height / div) + 1;
    numCols = int(width / div) + 1;

    red = color(250, 0, 0);
    blue = color(0, 0, 255);
    yellow = color(255, 204, 0);
    black = color(0, 0, 0);

    frameRate(60);
}

function draw()
{
    background(240, 240, 200);
    stroke(0);
    for(let c = 0; c < numCols; c++){
        line(c*div, 0, c*div, height);
    }
    
    noStroke();

    fill(red);
    circle(random(200, width - 200), random(200, height - 200), 200);

    fill(blue);
    circle(random(200, width - 200), random(200, height - 200), 200);

    fill(yellow);
    circle(random(200, width - 200), random(200, height - 200), 200);

    fill(black);
    circle(random(200, width - 200), random(200, height - 200), 200);

    noLoop();
}

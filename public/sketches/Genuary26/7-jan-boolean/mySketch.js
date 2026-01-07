let dim = 15;
let numRows;
let numCols;
let ang = 0;
let rect1Pos;
let rect2Pos;
let circ1Pos;
let rect1Vel;
let rect2Vel;
let circ1Vel;
let rect1Dim = 100;
let rect2Dim = 300;
let circ1Dim = 800;

function CalculateIntersectionArea(x1, y1, w1, h1, x2, y2, w2, h2) {
    const left   = max(x1, x2);
    const right  = min(x1 + w1, x2 + w2);
    const top    = max(y1, y2);
    const bottom = min(y1 + h1, y2 + h2);

    const intersectionWidth  = right - left;
    const intersectionHeight = bottom - top;

    if (intersectionWidth <= 0 || intersectionHeight <= 0) {
        return 0; // no overlap
    }

    return intersectionWidth * intersectionHeight;
}

function IsBoxIntersectingBox(x1, y1, w1, h1, x2, y2, w2, h2){
    let b2Center = createVector(x2+w2/2, y2+h2/2); 
    if (b2Center.x < (x1+w1) && b2Center.x > x1){
        if (b2Center.y < (y1+h1) && b2Center.y > y1){
            return true;
        }
    }
    return false;
}

function IsBoxIntersectingCircle(x1, y1, r, x2, y2, w2, h2){
    let x2w2 = x2 + w2;
    let y2h2 = y2 + h2;
    let rsq = pow(r/2, 2);
    if (((pow(x1 - x2w2, 2) + pow(y1 - y2h2, 2)) < rsq) && ((pow(x1 - x2, 2) + pow(y1 - y2, 2)) < rsq)){return true;}
    // if ((Math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2)) < r/2)){return true;}
    return false;
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    numRows = int(height / dim);
    numCols = int(width / dim);
    rect1Pos = createVector(width/2, height/2);
    rect2Pos = createVector(width/2, height/2);
    circ1Pos = createVector(width/2, height/2);
    rect1Vel = createVector(-5, 3);
    rect2Vel = p5.Vector.mult(rect1Vel, -0.5);
}

function draw()
{
    noStroke();
    fill(200);
    rect(0, 0, width, height);
    background(150, 150, 200);
    // fill(0);
    // stroke(0);
    noFill();
    // strokeWeight(3);
    rect(rect2Pos.x- rect2Dim /2, rect2Pos.y - rect2Dim /2, rect2Dim, rect2Dim);
    rect(rect1Pos.x- rect1Dim /2, rect1Pos.y - rect1Dim /2, rect1Dim, rect1Dim);
    circle(circ1Pos.x, circ1Pos.y, circ1Dim);
    noStroke();
    for (let r = 0; r<numRows; r++){
        for (let c = 0; c<numCols; c++){
            let a = Math.sqrt(pow(r - numRows/2, 2) + pow(c - numCols/2, 2));
            // let a = pow(r - numRows/2, 2) + pow(c - numCols/2, 2);
            let w = map(cos(ang - a), -1, 1, dim/2, dim);
            let h = map(cos(ang - a), -1, 1, dim/2, dim);
            // w = dim;
            // h = dim;
            
            let x = c*dim - w/2;
            let y = r*dim - h/2;
            let waveInsideSmallRect = IsBoxIntersectingBox(rect1Pos.x - rect1Dim/2, rect1Pos.y - rect1Dim/2, rect1Dim, rect1Dim, x, y, w, h);// >= (w*h);
            let waveInsideBigRect = IsBoxIntersectingBox(rect2Pos.x - rect2Dim/2, rect2Pos.y - rect2Dim/2, rect2Dim, rect2Dim, x, y, w, h);// >= (w*h);
            let waveInsideCircle = IsBoxIntersectingCircle(circ1Pos.x, circ1Pos.y, circ1Dim, x, y, w, h);// >= (w*h);
            // if (IsBoxIntersectingBox(rect1Pos.x - rect1Dim/2, rect1Pos.y - rect1Dim/2, rect1Dim, rect1Dim, x, y, w, h)){
            if ((waveInsideSmallRect ^ waveInsideBigRect) ^ !waveInsideCircle){
            // if (waveInsideCircle){
            // noStroke();
                // fill(255*noise(c/numCols, r/numRows, ang/10.2), 
                //     255*noise(100+c/numCols, r/numRows, ang/10.2), 
                //     255*noise(c/numCols, 100+r/numRows, ang/10.2));
                // rect(c*dim - dim/2, r*dim - dim/2, dim, dim)
                fill(255*noise(c/numCols, r/numRows, ang/10), 
                    255*noise(100+c/numCols, r/numRows, ang/10), 
                    255*noise(c/numCols, 100+r/numRows, ang/10));
                    // stroke(0);
                rect(x, y, w, h);
            }
        }
    }
    // ang += 0.05;
    rect1Pos.add(rect1Vel);
    rect2Pos.add(rect2Vel);

    
    if (rect1Pos.x > rect2Pos.x+rect2Dim/2 || rect1Pos.x < rect2Pos.x-rect2Dim/2){
        rect1Vel.x *= -1;
        if (rect1Pos.x > rect2Pos.x+rect2Dim/2){
            rect1Pos.x = rect2Pos.x+rect2Dim/2;
        }
        else{
            rect1Pos.x = rect2Pos.x-rect2Dim/2;
        }
    }
    if (rect1Pos.y > rect2Pos.y+rect2Dim/2 || rect1Pos.y < rect2Pos.y-rect2Dim/2){
        rect1Vel.y *= -1;
        if (rect1Pos.y > rect2Pos.y+rect2Dim/2){
            rect1Pos.y = rect2Pos.y+rect2Dim/2;
        }
        else{
            rect1Pos.y = rect2Pos.y-rect2Dim/2;
        }
    }
    
    if (rect2Pos.x + rect2Dim/2 > width || rect2Pos.x - rect2Dim/2 < 0){rect2Vel.x *= -1;}
    if (rect2Pos.y + rect2Dim/2> height || rect2Pos.y - rect2Dim/2< 0){rect2Vel.y *= -1;}

    // ang = TWO_PI/2;
    ang += 0.1;
}

let dim = 50;
let numRows;
let numCols;
let ang = 0;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    numRows = int(height / dim);
    numCols = int(width / dim);
}

function draw()
{
    noStroke();
    background(0);
    for (let r = 0; r<numRows; r++){
        for (let c = 0; c<numCols; c++){
            let a = Math.sqrt(pow(r - numRows/2, 2) + pow(c - numCols/2, 2));
            let w = map(cos(ang - a), -1, 1, 0, dim);
            let h = map(cos(ang - a), -1, 1, 0, dim);
            // let h = map(sin(ang + r/numRows), -1, 1, 0, dim);
            // h = dim;
            
            let x = c*dim - w/2;
            let y = r*dim - h/2;
            fill(255*noise(c/numCols, r/numRows, ang/10), 
                255*noise(100+c/numCols, r/numRows, ang/10), 
                255*noise(c/numCols, 100+r/numRows, ang/10));
            rect(x, y, w, h);
        }
    }
    ang += 0.05;
    // ang = TWO_PI/2;
}

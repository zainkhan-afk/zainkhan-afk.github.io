let divH;
let divW;
let grid = [];
let numRows = 50;
let numCols = 50;
let numStates = 5;
let frameNum = 0;

function setup() 
{
    randomSeed(1);
    let minDim = min(windowWidth, windowHeight)*2;
    createCanvas(minDim, minDim);
    divH = height / numRows;
    divW = width / numCols;
    
    for (let r = 0; r < numRows; r++){
        let row = [];
        for (let c = 0; c < numCols; c++){
            append(row, int(random(0, numStates-1)));
        }
        append(grid, row);
    }
    frameRate(2);
}

function drawGrid(){
    noStroke();
    for (let r = 0; r < numRows; r++){
        for (let c = 0; c < numCols; c++){
            let x = c*divW;
            let y = r*divH;
            // console.log("drawing", c, r);
            // fill(0, 0, grid[r][c] / numStates * 200)
            fill(255, grid[r][c] / numStates * 200, 0);
            push();
            translate(x, y);

            let vertices = VertexMaker.GetVertices(grid[r][c], divH/2);
            
            beginShape();
            for (let v of vertices){
                vertex(v[0], v[1]);
            }
            endShape();
            // fill(200);
            rect(0, 0, divH, divW);
            // fill(0);
            // textSize(25);
            // text(grid[r][c], divW/2, divH/2);
            pop();
        }
    }
}

function getHighestDiffNeighbor(R, C, D){
    let diff = 0;
    let highestDiffNeighbor = [];
    let currentValue = grid[R][C];
    // console.log(R, C, currentValue);
    for (let r = max(R - 1, 0); r < min(R + 1, numRows); r++){
        if (r == R){continue;}
        // console.log(r, C);
        let d = abs(grid[r][C] - currentValue);
        if (d > diff){diff = d; highestDiffNeighbor = [r, C]; }
    }
    for (let c = max(C - 1, 0); c < min(C + 1, numCols); c++){
        if (c == C){continue;}
        let d = abs(grid[R][c] - currentValue);
        if (d > diff){diff = d; highestDiffNeighbor = [R, c];}
    }
    return highestDiffNeighbor;
}

function updateGrid(){
    let newGrid = [];
    for (let r = 0; r < numRows; r++){
        let row = [];
        for (let c = 0; c < numCols; c++){
            let newVal;
            if ((r + c) % (1 + frameNum%2) == 0){
                let highestDiffNeighbor = getHighestDiffNeighbor(r, c);
                if (highestDiffNeighbor.length > 0){
                    let diff = grid[r][c] - grid[highestDiffNeighbor[0]][highestDiffNeighbor[1]]
                    newVal = grid[r][c] + (diff < 0 ? 1 : -1);
                    // if (r == 0 && c==4){
                    //     console.log("diff", diff, "neighbor", highestDiffNeighbor);
                    // }
                    // console.log("Old Val: ", grid[r][c], " New Val: ", newVal);
                }
                else{
                    // console.log("Zero Diff", r, c);
                    newVal = (grid[r][c] + 1) % numStates;
                }
            }
            else{
                newVal = grid[r][c];
            }
            append(row, newVal);
        }
        append(newGrid, row);
    }   
    grid = newGrid;
}

function draw()
{
    background(150, 150, 200);
    drawGrid();
    updateGrid();

    // push();
    // scale(0.5, 0.5);
    // drawGrid();
    // pop();
    // updateGrid();
    // push();
    // translate(width/2, 0);
    // scale(0.5, 0.5);
    // stroke(255, 0, 0);
    // strokeWeight(10);
    // line(0, 0, 0, height);
    // stroke(0);
    // strokeWeight(1);
    // drawGrid();
    // pop();
    // noLoop();
    frameNum += 1;
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 20, { delay: 0 });
  }
}
let divH;
let divW;
let grid = [];
let numRows = 50;
let numCols = 50;
let numStates = 6;

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    divH = height / numRows;
    divW = width / numCols;
    frameRate(30);

    for (let r = 0; r < numRows; r++){
        let row = [];
        for (let c = 0; c < numCols; c++){
            append(row, int(random(0, numStates-1)));
        }
        append(grid, row);
    }
}

function drawGrid(){
    for (let r = 0; r < numRows; r++){
        for (let c = 0; c < numCols; c++){
            let x = c*divW;
            let y = r*divH;
            // console.log("drawing", c, r);
            fill(0, 0, grid[r][c] / numStates * 200)
            push();
            translate(x, y);
            rect(0, 0, divH, divW);
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
            if ((r + c) % 2 == 0){
                let highestDiffNeighbor = getHighestDiffNeighbor(r, c);
                if (highestDiffNeighbor.length > 0){
                    let diff = grid[r][c] - grid[highestDiffNeighbor[0]][highestDiffNeighbor[1]]
                    newVal = grid[r][c] + (diff < 0 ? -1 : 1);
                    console.log("Old Val: ", grid[r][c], " New Val: ", newVal)
                }
                else{
                    console.log("Zero Diff", r, c);
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
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 20, { delay: 0 });
  }
}
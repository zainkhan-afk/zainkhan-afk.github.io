let divH;
let divW;
let grid = [];
let numRows = 200;
let numCols = 200;
let numStates = 3;
let frameNum = 0;
let recordingStarted = false;

function setup() 
{
    randomSeed(1);
    let minDim = min(windowWidth, windowHeight);
    createCanvas(minDim, minDim);
    divH = height / numRows;
    divW = width / numCols;
    
    for (let r = 0; r < numRows; r++){
        let row = [];
        for (let c = 0; c < numCols; c++){
            if (random() > 0.75){
                append(row, int(random(0, numStates)));
            }
            else{
                append(row, 0);
            }
        }
        append(grid, row);
    }
    frameRate(60);
}

function drawGrid(){
    noStroke();
    for (let r = 0; r < numRows; r++){
        for (let c = 0; c < numCols; c++){
            let x = c*divW;
            let y = r*divH;
            
            
            
            
            push();
            translate(x, y);
            










            
            fill(255, grid[r][c] / numStates * 200, 0);
            fill(0, 0, 0);
            if (grid[r][c] == 1){
                fill(0, 0, 200);
            }
            else if (grid[r][c] == 2){
                fill(250, 100, 150);
            }
            // let vertices = VertexMaker.GetVertices(grid[r][c], divH/2);
            
            // beginShape();
            // for (let v of vertices){
            //     vertex(v[0], v[1]);
            // }
            // endShape();
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
            if ((r + c) % (1+frameNum%2) == 0){
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

function neightborhoodCheck(R, C){
    let numNeighbors = 0;
    let populationCounter = 0;
    let numMales = 0;
    let numFemales = 0;
    for (let r = max(R - 1, 0); r < min(R + 2, numRows); r++){
        for (let c = max(C - 1, 0); c < min(C + 2, numCols); c++){
            if (c == C && r == R){continue;}
            numNeighbors += 1;
            if (grid[r][c] != 0){ populationCounter += 1; }
            if (grid[r][c] == 1) { numMales += 1; }
            if (grid[r][c] == 2) { numFemales += 1; }
        }
    }
    if (populationCounter > (numNeighbors*0.7)  && grid[R][C] != 0){return {kill : true, spawn : false};}
    if (numFemales > 0 && numMales > 0 && grid[R][C] == 0){return {kill : false, spawn : true};}
    // if (numMales > 0 && grid[R][C] == 1){
    //     if (random() < 0.1){
    //         return {kill : true, spawn : false};
    //     }
    //     else{
    //         return {kill : false, spawn : false};
    //     }
    // }
    // if (numFemales > 0 && grid[R][C] == 2){
    //     if (random() < 0.1){
    //         return {kill : true, spawn : false};
    //     }
    //     else{
    //         return {kill : false, spawn : false};
    //     }
    // }
    return {kill : false, spawn : false};

    // return sum;
}

function updateGrid2(){
    let newGrid = [];
    for (let r = 0; r < numRows; r++){
        let row = [];
        for (let c = 0; c < numCols; c++){
            let newVal;

            let res = neightborhoodCheck(r, c);
            if (res.spawn){
                if (random() < 0.2){
                    newVal = random() > 0.5 ? 1 : 2;
                }
                else{
                    newVal = 0;
                }
            }
            else if (res.kill){
                newVal = 0;
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
    if (!recordingStarted){
        recordingStarted = true;
        saveGif('automata', 30, { delay: 0 });
    }
    background(150, 150, 200);
    drawGrid();
    updateGrid2();

    frameNum += 1;
}


function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 0 });
  }
}
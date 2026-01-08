let renderer;
let buildings = [];
let numRows;
let numCols;
let blockSize = 5;
let noiseOffset = 0.05;
let grid;


function createBuildingsOnGrid(){
    for (let c = 0; c < grid.numCols; c++){
        for (let r = 0; r < grid.numRows; r++){
            let x = c*grid.size + blockSize/2;
            let y = r*grid.size + blockSize/2;
            let val = grid.grid[r][c];
            
            if (val > 0.55 && val < 0.8 && random() > val){
                let angle = map(val, 0.5, 1.0, 0, TWO_PI)*0;
                append(buildings, new Building(createVector(x/width, y/height), angle))
            }
        }
    }
}

function setup()
{
    let minDim = min(windowWidth, windowHeight)*2;
    createCanvas(minDim, minDim, WEBGL);
    
    numRows = int(height/blockSize) + 1;
    numCols = int(width/blockSize) + 1;
    
    
    renderer = new Renderer();
    ShapeGenerator.SetShapeMinMaxSize(blockSize/minDim*0.5, blockSize/minDim*0.8);
    grid = new Grid(numRows, numCols, blockSize);
    grid.MakeNoiseGrid();
    // grid.MakeRoads();


    // append(buildings, new Building(createVector(0.5, 0.5), 0))
    createBuildingsOnGrid();

    frameRate(30);
}

function draw()
{
    background(250, 213, 178);

    fill(200);
    
    renderer.Render(grid, buildings);
    noLoop();
}


function keyPressed() {
  if (key === 's') {
    // saveGif('mySketch', 20, { delay: 0 });
  }
}
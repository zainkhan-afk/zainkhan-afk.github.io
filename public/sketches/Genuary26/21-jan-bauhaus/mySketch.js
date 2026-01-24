let cnv;
let font;

let red;
let blue;
let yellow;
let black;

let div = 10;
let numRows;
let numCols;

let bauhaus1;
let bauhaus2;

let genuary = ['G', 'E', 'N', 'U', 'A', 'R', 'Y', '', '2', '6'];

function preload() {
  font = loadFont('Anta-Regular.ttf');
}

function setup() 
{
    let minDim = min(windowWidth, windowHeight);
    cnv = createCanvas(minDim, minDim);

    numRows = int(height / div) + 1;
    numCols = int(width / div) + 1;

    

    frameRate(60);

    bauhaus1 = new BauhausPlanet(numRows, numCols, div);
}





function draw()
{
    background(240, 240, 200);
    textFont(font);
    // background(40);
    // drawBG();
    // drawPlanet();

    bauhaus1.Render();

    // drawFont();
    
    noLoop();
}

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

    red = color(200, 0, 0);
    blue = color(0, 0, 200);
    yellow = color(200, 170, 0);
    black = color(0, 0, 0);

    frameRate(60);

    bauhaus1 = new BauhausPlanet(red, blue, yellow, black, 10);
    bauhaus2 = new BauhausCircles(red, blue, yellow, black);
}



function draw()
{
    background(240, 240, 200);
    // textFont(font);

    bauhaus1.Render();
    // bauhaus2.Render();
    
    noLoop();
}


function keyPressed() {
  if (key === 's') {
    saveCanvas(cnv, '21-jan.jpg');
    // saveGif("Gen18", 10);
  }
}

let principles = [];
let currentPrinciple = 4;

function setup() 
{	
    let minDim = min(windowWidth, windowHeight); 
    createCanvas(minDim, minDim);
    append(principles, new One());
    append(principles, new Four());
    append(principles, new Six());
    append(principles, new Eight());
    append(principles, new Eleven());
    append(principles, new Twelve());
    frameRate(60);
}

function draw()
{
    background(200);
    principles[currentPrinciple].Step();
    principles[currentPrinciple].Render(width, height);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
let principles = [];
let currentPrinciple = 6;

function setup() 
{	
    let minDim = min(windowWidth, windowHeight); 
    createCanvas(minDim, minDim);
    append(principles, new One());
    append(principles, new Two());
    append(principles, new Three());
    append(principles, new Four());
    append(principles, new Five());
    append(principles, new Six());
    append(principles, new Seven());
    append(principles, new Eight());
    append(principles, new Nine());
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
    let minDim = min(windowWidth, windowHeight); 
    resizeCanvas(minDim, minDim);
}
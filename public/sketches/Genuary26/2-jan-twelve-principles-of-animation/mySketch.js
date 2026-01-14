let principles = [];
let principleNames = [];
let currentPrinciple = 0;
let frameNum = 1;
let captureStarted = false;
let totalFrames = 0;


function setup() 
{	
    let minDim = min(windowWidth, windowHeight); 
    createCanvas(minDim, minDim);
    append(principles, new One("1. Squash and Stretch", 300));
    append(principles, new Two("2. Anticipation", 530));
    append(principles, new Three("3. Staging", 400));
    append(principles, new Four("4. Straight ahead action and pose to pose", 300));
    append(principles, new Five("5. Follow through and overlapping action", 480));
    append(principles, new Six("6. Slow in Slow Out", 480));
    append(principles, new Seven("7. Arc", 300));
    append(principles, new Eight("8. Secondary Action", 480));
    append(principles, new Nine("9. Timing", 400));
    append(principles, new Ten("10. Exaggeration", 400));
    append(principles, new Eleven("11. Solid drawing", 200));
    append(principles, new Twelve("12. Appeal", 300));

    for (let i = 0; i<principles.length; i++){
        totalFrames += principles[i].duration;
    }
    frameRate(60);
}

function draw()
{
    background(200);
    console.log("currentPrinciple",currentPrinciple, principles.length);
    principles[currentPrinciple].Step();
    principles[currentPrinciple].Render(width, height);
    if (frameNum % principles[currentPrinciple].duration == 0){
        principles[currentPrinciple].Reset();
        frameNum = 0;
        currentPrinciple += 1;
    }
    // console.log("currentPrinciple",currentPrinciple);

    if (currentPrinciple >= principles.length){
        currentPrinciple = 0;
        console.log("currentPrinciple dec",currentPrinciple);
    }
    frameNum += 1;
}


function windowResized(){
    let minDim = min(windowWidth, windowHeight); 
    resizeCanvas(minDim, minDim);
}
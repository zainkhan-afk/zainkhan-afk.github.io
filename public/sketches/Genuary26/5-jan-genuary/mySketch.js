let people = [];
let sim;
let numPeople = 1;
let renderer;
let dt = 0.2;
let frameCtr = 0;
let img;
let areaDim = 10;
let destPoints = [];
let currentDestIndex = 0;

function findDestPoints(){
    img.loadPixels();
    for (let y = 0; y < int(img.height/areaDim); y++){
        for (let x = 0; x < int(img.width/areaDim); x++){
            let areaColorAvg = createVector(0,0,0);
            for (let yImgVal = 0; yImgVal < areaDim; yImgVal++){
                for (let xImgVal = 0; xImgVal < areaDim; xImgVal++){
                    let c = img.get(x*areaDim + xImgVal, y*areaDim + yImgVal);
                    areaColorAvg.add(createVector(c[0], c[1], c[2]));
                }
            }
            areaColorAvg.mult(1/(areaDim*areaDim));
            if (areaColorAvg.mag() < 50){
                append(destPoints, createVector((x*areaDim + areaDim / 2) / img.width * width, (y*areaDim + areaDim / 2) / img.height * height));   
            }
        }
    }
}

function preload(){
    img = loadImage("image.jpg");
}

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    sim = new Simulation();
    renderer = new Renderer();
    findDestPoints();

    console.log(destPoints.length);
	
    // for (let i = 0; i < 10; i++)
    // {
    //     let pos;
    //     let headingAngle;
    //     let chance = random();

    //     if (change < )
    //     // append(people, new Person(createVector(random(100, windowWidth - 100), random(100, windowHeight - 100)), destPoints[i]));
    //     sim.AddPerson(new Person(createVector(random(100, windowWidth - 100), random(100, windowHeight - 100)), destPoints[i]));
    // }
    noStroke();
    frameRate(1000);
}

function draw()
{
    clear();
    background(100);
    
    sim.Update(dt);
    renderer.render(sim);
    // image(img, 0, 0);
    // fill(0);
    // for (let i = 0; i<destPoints.length; i++){
    //     rect(destPoints[i].x, destPoints[i].y, areaDim, areaDim);
    // }

    if (random() < 0.2 && sim.people.length < destPoints.length){
        let pos;
        let headingAngle;
        let chance = random();

        if (chance < 0.25){
            pos = createVector(0, height/2);
            headingAngle = 0;
        }
        else if (chance >= 0.25 && chance < 0.5){
            pos = createVector(width/2, 0);
            headingAngle = PI / 2;
        }
        else if (chance >= 0.5 && chance < 0.75){
            pos = createVector(width, height/2);
            headingAngle = -PI;
        }
        else
        {
            pos = createVector(width/2, height);
            headingAngle = PI/2;
        }
        
        sim.AddPerson(new Person(pos, destPoints[currentDestIndex], headingAngle));
        currentDestIndex += 1;
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
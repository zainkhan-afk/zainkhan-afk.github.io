let numPts = 500;
let z = 0;
let noiseMaxAmp = 2;
let bubbles = [];
let dropletPos;
let dropletVel;

class Bubble{
    constructor(tl, br){
        let xMid = (tl.x+br.x)/2;
        let yMid = (tl.y+br.y)/2;
        let xRange = br.x - tl.x;
        let yRange = br.y - tl.y;
        let rangeFraction = 0.25;
        this.pos = createVector(random(xMid - xRange*rangeFraction, xMid + xRange*rangeFraction), random(yMid, yMid + yRange*rangeFraction));
        this.maxRadius = 10;
        this.radius = 1;
    }

    Step(){
        this.pos.y -= 2;
        this.radius = (200 - abs(this.pos.y)) / 200 * this.maxRadius;
    }
}


function setup()
{
    createCanvas(windowWidth, windowHeight);
    dropletPos = createVector(width/2, height/2);
    dropletVel = createVector(random(3, 8), random(3, 8));
}

function draw()
{
    translate(dropletPos.x, dropletPos.y);
    background(250);

    fill(28,163,236);
    stroke(100, 0, 0);
    beginShape();
    let maxX = 0;
    let minX = 10000;
    let maxY = 0;
    let minY = 10000;
    for (let angle = 0; angle < TWO_PI; angle += TWO_PI / numPts){
        let x = map(cos(angle), -1, 1, 0, noiseMaxAmp);
        let y = map(sin(angle), -1, 1, 0, noiseMaxAmp);

        let mag = map(noise(x, y, z), 0, 1, 150, 300);
        let ptX = mag*cos(angle);
        let ptY = mag*sin(angle);
        if (ptX > maxX) { maxX = ptX;}
        if (ptX < minX) { minX = ptX;}
        if (ptY > maxY) { maxY = ptY;}
        if (ptY < minY) { minY = ptY;}

        vertex(ptX, ptY);
    }
    endShape(CLOSE);

    if (random() < 0.2){
        append(bubbles, new Bubble(createVector(minX, minY), createVector(maxX, maxY)));
    }

    fill(200);
    for (let  i = 0; i<bubbles.length; i++){
        bubbles[i].Step();
        ellipse(bubbles[i].pos.x, bubbles[i].pos.y, bubbles[i].radius, bubbles[i].radius);
        
        if(bubbles[i].pos.y < minY){bubbles.splice(i,1);}
    }

    dropletPos.add(dropletVel);
    z += 0.005;
    if (dropletPos.x + 300 > width || dropletPos.x - 300 < 0){
        dropletVel.x *= -1;
    }
    if (dropletPos.y + 300 > height || dropletPos.y - 300 < 0){
        dropletVel.y *= -1;
    }
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 1 });
  }
}
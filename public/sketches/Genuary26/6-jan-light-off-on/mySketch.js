
let ghost;
let dt = 0.5;

let lightAnchor;
let lightOn = true;
let lightWireLength = 400;

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    lightAnchor = createVector(width/2, 0);
    ghost = new Ghost();
    lamp = new Lamp(createVector(width/2, 0), 400);
    lamp.ApplyForce(createVector(1000, 0));
    lamp.Step(dt);
}

function draw()
{
    background(100);
    lamp.Render();
    ghost.Render();
    if (!lightOn){
        ghost.ApplyForce(createVector(mouseX - ghost.pos.x, mouseY - ghost.pos.y).mult(0.1));
    }
    else{
        ghost.pos = lamp.pos;
        // let diff = p5.Vector.sub(lightAnchor, ghost.pos);
        
        // let fVal = ghost.mass*dt*sin(diff.heading());
        // let f = p5.Vector.rotate(diff, diff.x > 0 ? HALF_PI:-HALF_PI);
        // f.normalize();
        // f.setMag(fVal);
        // ghost.ApplyForce(f);
        
        // if (diff.mag() > lightWireLength){
        //     let diffVec = p5.Vector.fromAngle(diff.heading(), diff.mag() - lightWireLength);
        //     ghost.pos.add(diffVec);
        // }
        // stroke(0);
        // strokeWeight(3);
        // line(lightAnchor.x, lightAnchor.y, ghost.pos.x, ghost.pos.y);
        // strokeWeight(1);
    }
    ghost.Step(dt);
    lamp.Step(dt);
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
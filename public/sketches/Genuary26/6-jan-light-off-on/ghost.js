class Ghost{
    constructor(){
        this.pos = createVector(random(100, 500), random(100, 500));
        this.vel = p5.Vector.fromAngle(PI/2, 0);
        this.acc = createVector();

        this.preVel = this.vel.copy();
        
        this.maxVel = 10;
        this.radius = 50;
        this.eyeRadius = 15;
        this.len = 100;

        this.pts = [];
        this.eyePts = []

        append(this.pts, createVector(-this.radius, this.len));
        
        for (let ang = PI; ang < 2*PI; ang += PI / 20){
            let x = this.radius*cos(ang);
            let y = this.radius*sin(ang);
            // console.log(x, y, ang);
            append(this.pts, createVector(x, y));
        }
        append(this.pts, createVector(this.radius, this.len));

        for (let ang = PI/6; ang < PI; ang += PI / 10){
            let x = this.eyeRadius*cos(ang);
            let y = this.eyeRadius*sin(ang);
            // console.log(x, y, ang);
            append(this.eyePts, createVector(x, y));
        }

        this.eyelidAng = 0;

    }
    ApplyForce(f){
        this.acc.add(f);
    }
    Render(){
        push();
        translate(this.pos);
        rotate(this.vel.heading() + PI / 2);
        fill(255, 200);
        noStroke();

        beginShape();
        for (let i = 0; i<this.pts.length; i++){
            vertex(this.pts[i].x, this.pts[i].y);
        }
        endShape();

        push();
        translate(-this.radius/3, 0);
        scale(1, 1*abs(sin(this.eyelidAng)));
        fill(255, 255);
        beginShape();
        for (let i = 0; i<this.eyePts.length; i++){
            vertex(this.eyePts[i].x, this.eyePts[i].y);
        }
        endShape();
        fill(0);
        circle(0, 10, 8);
        pop();

        push();
        translate(this.radius/3, 0);
        scale(-1, 1*abs(sin(this.eyelidAng)));
        fill(255, 255);
        beginShape();
        for (let i = 0; i<this.eyePts.length; i++){
            vertex(this.eyePts[i].x, this.eyePts[i].y);
        }
        endShape();
        fill(0, 255);
        circle(0, 10, 8);
        pop();

        pop();
    }
    Step(dt){
        let maxTurn = PI / 100;
        
        const newVal = p5.Vector.add(this.vel, p5.Vector.mult(this.acc, dt));

        let diff = newVal.heading() - this.vel.heading();
        while (diff > PI) diff -= TWO_PI;
        while (diff < -PI) diff += TWO_PI;

        diff = constrain(diff, -maxTurn, maxTurn) + random(-0.01, 0.01);

        let newAngle = this.vel.heading() + diff;
        this.vel = p5.Vector.fromAngle(newAngle).setMag(newVal.mag());
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);


        this.preVel = this.vel.copy();

        if (abs(this.eyelidAng - PI) < 0.01 || abs(this.eyelidAng) < 0.01){
            if (random() < 0.1){
                this.eyelidAng += PI / 6;
            }
        }
        else{
            if (random() < 0.01){
                this.eyelidAng += PI / 6;
            }
        }

        if (this.eyelidAng > PI){
            this.eyelidAng = 0;
        }
    }
}
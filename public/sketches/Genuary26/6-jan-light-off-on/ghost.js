class Ghost{
    constructor(){
        this.pos = createVector(random(100, 500), random(100, 500));
        this.vel = p5.Vector.fromAngle(PI/2, 0);
        this.acc = createVector();

        this.preVel = this.vel.copy();
        
        this.maxVel = 10;
        this.radius = 30;
        this.len = 50;

        this.pts = [];

        append(this.pts, createVector(-this.radius, this.len));
        
        for (let ang = PI; ang < 2*PI; ang += PI / 20){
            let x = this.radius*cos(ang);
            let y = this.radius*sin(ang);
            // console.log(x, y, ang);
            append(this.pts, createVector(x, y));
        }
        append(this.pts, createVector(this.radius, this.len));

    }
    ApplyForce(f){
        this.acc.add(f);
    }
    Render(){
        push();
        translate(this.pos);
        rotate(this.vel.heading() + PI / 2);
        fill(255);

        beginShape();
        for (let i = 0; i<this.pts.length; i++){
            vertex(this.pts[i].x, this.pts[i].y);
        }
        endShape();

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
    }
}
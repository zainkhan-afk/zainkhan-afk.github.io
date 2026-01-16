class Boid{
    constructor(pos){
        this.pos = pos;
        // this.vel = createVector(random(-30, 30), random(-30, 30), random(-30, 30));
        this.maxVel = 100;
        this.minVel = this.maxVel * 0.7;
        this.vel = p5.Vector.fromAngle(random()*TWO_PI, random(0.7*this.maxVel, this.maxVel))
    }

    Update(dt){
        this.vel.limit(this.maxVel);
        if (this.vel.mag() < this.minVel){
            this.vel.setMag(this.minVel);
        }
        // console.log(this.vel.mag());
        this.pos.add(p5.Vector.mult(this.vel, dt));
    }
}
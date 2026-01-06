class Lamp{
    constructor(anchor, wireLength){
        this.anchor = anchor;
        this.wireLength = wireLength;

        this.pos = createVector(anchor.x, anchor.y + this.wireLength);
        this.vel = createVector();
        this.acc = createVector();

        this.bulbMass = 100;
    }

    ApplyForce(f){
        this.acc.add(f.mult(1/this.bulbMass));
    }

    Render(){
        strokeWeight(3);
        line(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y);
        strokeWeight(1);
    }

    CheckPendulumEffect(dt){
        let diff = p5.Vector.sub(this.anchor, this.pos);
        
        let fVal = this.bulbMass*dt*sin(diff.heading());
        let f = p5.Vector.rotate(diff, diff.x > 0 ? -HALF_PI:HALF_PI);
        f.normalize();
        f.setMag(fVal);
        this.ApplyForce(f);
        // console.log(f);
        
        if (diff.mag() > this.wireLength){
            let diffVec = p5.Vector.fromAngle(diff.heading(), diff.mag() - this.wireLength);
            this.pos.add(diffVec);
        }
    }

    Step(dt){
        this.CheckPendulumEffect(dt);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
    }
}
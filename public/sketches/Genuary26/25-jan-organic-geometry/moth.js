
class Moth {
    constructor(pos) {
        this.pos = pos;
        this.heading = 0;
        this.desiredHeading = this.heading;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.gravity = createVector(0, 9.8);
        this.flapAcc = createVector(0, -60);
        this.acc.set(this.gravity);

        this.step = 0;

        this.flapFrequency = 3;
    }

    Adjust(lightPos) {
        let diff = p5.Vector.sub(lightPos, this.pos);
        this.desiredHeading = diff.heading() + HALF_PI;

        if (this.step%this.flapFrequency == 0){
            this.acc.add(p5.Vector.rotate(this.flapAcc, this.heading));
        } 
    }

    Step(dt) {
        console.log(this.heading*180/PI, this.desiredHeading*180/PI)
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(50);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(this.gravity);

        let angleDiff = this.desiredHeading - this.heading;
        this.heading += angleDiff*0.1;

        this.step += 1;
    }
}
class Ghost{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    ApplyForce(f){
        this.acc.add(f);
    }

    Step(dt){
        this.vel.limit(500);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
    }
}
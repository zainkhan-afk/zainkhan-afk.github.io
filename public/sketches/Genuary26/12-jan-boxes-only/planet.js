class Planet{
    constructor(pos, mass){
        this.pos = pos;
        this.mass = mass;
        this.dim = mass / 100;
        this.vel = createVector(random(-10, 10), 0, 0);
        this.acc = createVector(0, 0, 0);

    }

    ApplyForce(f){
        this.acc.add(p5.Vector.mult(f, 1/this.mass));
    }

    Step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
    }
}
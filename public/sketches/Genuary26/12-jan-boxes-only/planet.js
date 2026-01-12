class Planet{
    constructor(pos, mass, planetShader = null){
        this.pos = pos;
        this.mass = mass;
        this.planetShader = planetShader;
        this.dim = this.mass/200;
        this.vel = createVector(0, 0, 0);
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
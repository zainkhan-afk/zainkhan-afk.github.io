class Boid{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 1, 0);
    }

    Update(dt){
        this.pos.add(p5.Vector.mult(this.vel, dt));
    }
}
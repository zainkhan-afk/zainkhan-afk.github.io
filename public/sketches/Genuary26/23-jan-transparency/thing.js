class Thing{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.color = color(random(100, 255), random(100, 255), random(100, 255), random(100, 255));
        this.t =  0;
    }

    applyForce(f){
        this.acc.add(f);
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt))
        this.pos.add(p5.Vector.mult(this.vel, dt));

        this.acc.set(0);

        this.acc.set(
            map(noise(this.pos.x/100, this.pos.y/100, this.t), 0, 1, -10, 10),
            map(noise(this.pos.y/100, this.pos.x/100, this.t), 0, 1, -10, 10),
        )

        this.t += dt;
    }
}
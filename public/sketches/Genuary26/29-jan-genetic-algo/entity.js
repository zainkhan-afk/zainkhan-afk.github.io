class Entity{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0.1, 1);
        this.acc = createVector(0, 0);

        this.genome = {
            "numlimbs" : 0,
            "limbsemgent" : 0,
            "segmentlength" : 0,
            "numeyes" : 0,
        }

        this.t = 0;
    }

    randomizeGenome(){
        this.genome.numlimbs = int(random(1, 10));
        this.genome.limbsemgent = int(random(1, 10));
        this.genome.segmentlength = int(random(3, 20));
        this.genome.eyes = int(random(1, 5));
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
        this.t += dt/1;
    }
}
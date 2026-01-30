class Entity{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0.1, 1);
        this.acc = createVector(0, 0);
        this.margin = 100;

        this.genome = {
            "numlimbs" : 0,
            "limbsemgent" : 0,
            "segmentlength" : 0,
            "numeyes" : 0,
        }
        this.mass = 1;

        this.t = 0;
    }

    randomizeGenome(){
        this.genome.numlimbs = int(random(1, 10));
        this.genome.limbsemgent = int(random(1, 10));
        this.genome.segmentlength = int(random(3, 30));
        this.genome.eyes = int(random(1, 5));
        this.mass = this.genome.numlimbs*this.genome.limbsemgent*this.genome.segmentlength/10;
    }

    applyForce(f){
        let fC = f.mult(1/this.mass);
        this.acc.add(fC);
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(100);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
        this.t += dt/1;


        if (this.pos.x < -this.margin){this.pos.x = width + this.margin;}
        else if (this.pos.x > width+this.margin){this.pos.x = -this.margin;}
        if (this.pos.y < -this.margin){this.pos.y = height + this.margin;}
        else if (this.pos.y > height+this.margin){this.pos.y = -this.margin;}
    }
}
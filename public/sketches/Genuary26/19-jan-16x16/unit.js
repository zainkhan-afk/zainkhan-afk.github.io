class Unit{
    constructor(pos, goal){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.goal = goal;
        this.skip = false;
    }

    Step(dt){
        if (!this.skip){
            this.acc = p5.Vector.sub(this.goal, this.pos);
            this.vel.add(p5.Vector.mult(this.acc, dt));
            this.vel.limit(100);
            this.pos.add(p5.Vector.mult(this.vel, dt));
        }
        else{
            this.vel = createVector(0, 0);
        }
    }
}
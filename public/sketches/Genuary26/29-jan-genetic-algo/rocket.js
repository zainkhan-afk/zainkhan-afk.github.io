class Rocket{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.heading = -PI;
        this.ray = new Ray(pos, this.heading);
        this.brain = new NeuralNetwork(8, 2, 1, 15);
    }

    applyForce(f){
        this.acc.add(f);
    }

    control(sense){
        let out = this.brain.feedforward(sense);
        let fControl = p5.Vector.fromAngle(this.heading + map(out[0], 0, 1, -PI/3, PI/3), out[1]); 
        this.acc.add(fControl);
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.heading = this.vel.heading() - PI/2 ;
        this.acc.set(0);    
    }

}
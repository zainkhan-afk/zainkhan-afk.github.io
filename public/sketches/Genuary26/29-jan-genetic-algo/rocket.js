class Rocket{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.heading = -PI;
        this.fov = HALF_PI
        this.fovDiv = this.fov/7;
        this.rays = [];
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
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
        
        let i = 0;
        let angle = this.heading+PI/2 - this.fovDiv*3;
        for (let ray of this.rays){
            ray.pos.set(this.pos);
            ray.dir = p5.Vector.fromAngle(angle);
            angle += this.fovDiv;
            i += 1;
        }
    }

}
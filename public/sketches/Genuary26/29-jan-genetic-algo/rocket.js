class Rocket{
    constructor(pos, goal){
        this.initPos = pos.copy();
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.rHeight = 20;
        this.rWidth = 10;
        this.heading = -PI;
        this.prevHeading = -PI;
        this.fov = HALF_PI
        this.fovDiv = this.fov/7;
        this.rays = [];
        this.goal = goal;
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        append(this.rays, new Ray(pos, 0));
        this.brain = new NeuralNetwork(13, 2, 1, 15);
        this.timeAlive = 0;
        this.deltaRotationSum = 1;
        this.dead = false;
    }

    reset(){
        this.pos = this.initPos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.timeAlive = 0;
        this.dead = false;
        this.heading = -PI;
        this.prevHeading = -PI;
        this.deltaRotationSum = 1;
    }

    applyForce(f){
        this.acc.add(f);
    }

    control(sense){
        sense.push(this.heading);
        let out = this.brain.feedforward(sense);
        let angleRotate = map(out[0], 0, 1, -PI/62, PI/62);
        this.prevHeading = this.heading;
        this.heading += angleRotate;
        this.deltaRotationSum += abs(this.heading - this.prevHeading);
        // this.deltaRotationSum += abs(angleRotate);
        if (this.heading > TWO_PI){this.heading = 0;}
        if (this.heading < -TWO_PI){this.heading = 0;}
        this.propulsion = map(out[1], 0, 1, 2, 10);
        let fControl = p5.Vector.fromAngle(this.heading + PI/2 , this.propulsion); 
        this.acc.add(fControl);
    }

    copyBrain(fittset){
        this.brain.copyNN(fittset.brain);
    }

    mutate(mutationRate){
        this.brain.mutate(mutationRate);   
    }

    getFitness(){
        let goalDist = p5.Vector.sub(this.pos, this.goal).mag();
        return 10/goalDist;
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(50);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        // this.heading = this.vel.heading() - PI/2 ;
        this.acc.set(0);

        // if (this.pos.x < 0){this.pos.x = width - 1;}
        // else if (this.pos.x > width){this.pos.x = 1;}
        // if (this.pos.y < 0){this.pos.y = height - 1;}
        // else if (this.pos.y > height){this.pos.y = 1;}

        
        let i = 0;
        let angle = this.heading+PI/2 - this.fovDiv*3;
        for (let ray of this.rays){
            ray.pos.set(this.pos);
            ray.dir = p5.Vector.fromAngle(angle);
            angle += this.fovDiv;
            if (i == (this.rays.length-1)){
                ray.dir = p5.Vector.fromAngle(this.heading+PI/2+PI);
            }
            i += 1;
        }

        this.timeAlive += 1;
    }

}
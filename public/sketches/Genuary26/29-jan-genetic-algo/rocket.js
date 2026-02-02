class Rocket{
    constructor(pos, goal){
        this.initPos = pos.copy();
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.rHeight = 20;
        this.rWidth = 10;
        this.rotationDelta = PI / 32;
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
        this.brain = new NeuralNetwork(14, 2, 1, 16);
        this.genotype = new Genotype();

        this.timeAlive = 0;
        this.deltaRotationSum = 1;
        this.velSum = 0;
        this.dead = false;
        this.totalForceApplied = 0;
    }

    randomize(size){
        this.genotype.randomize(size);
    }

    reset(){
        this.pos = this.initPos.copy();
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.velSum = 0;
        this.timeAlive = 0;
        this.totalForceApplied = 0;
        this.dead = false;
        this.heading = -PI;
        this.prevHeading = -PI;
        this.deltaRotationSum = 1;
    }

    applyForce(f){
        this.totalForceApplied += abs(f.mag());
        this.acc.add(f);
    }

    control(sense){
        sense.push(this.heading);
        sense.push(1);
        let out = this.brain.feedforward(sense);
        let angleRotate = map(out[0], 0, 1, -this.rotationDelta, this.rotationDelta);
        // this.prevHeading = this.heading;
        this.heading += angleRotate;
        // this.deltaRotationSum += abs(this.heading - this.prevHeading);
        this.deltaRotationSum += angleRotate;
        if (this.heading > TWO_PI){this.heading = 0;}
        if (this.heading < -TWO_PI){this.heading = 0;}
        // let propulsionY = map(out[1], 0, 1, -50, 50);
        // let propulsionX = map(out[0], 0, 1, -50, 50);
        let propulsion = map(out[1], 0, 1, -50, 50);

        let fControl = p5.Vector.fromAngle(this.heading + PI/2 , propulsion); 
        // let fControl = createVector(propulsionX, -propulsionY); 
        
        this.applyForce(fControl);
    }

    controleGenotype(){
        let angleRotate = this.genotype.values[this.timeAlive][0];
        this.heading += angleRotate;
        this.deltaRotationSum += angleRotate;
        
        if (this.heading > TWO_PI){this.heading = 0;}
        if (this.heading < -TWO_PI){this.heading = 0;}
        
        let propulsion = this.genotype.values[this.timeAlive][1];

        let fControl = p5.Vector.fromAngle(this.heading + PI/2 , propulsion); 
        // let fControl = createVector(propulsionX, -propulsionY); 
        
        this.applyForce(fControl);
    }

    copyBrain(fittset){
        this.brain.copyNN(fittset.brain);
    }

    getFitness(maxFrames){
        let goalDist = p5.Vector.sub(this.pos, this.goal).mag();
        goalDist /= Math.sqrt(pow(width, 2) + pow(height, 2));
        let mult = 1;
        if (this.dead) {mult = 0.9;}

        let timeAliveReward = this.timeAlive/maxFrames;
        let goalDistReward = (1 - goalDist);
        let velocityReward = this.velSum/(50*maxFrames);
        let rotationSuppressionReward = (1 - abs(this.deltaRotationSum)/(this.rotationDelta*maxFrames));

        return mult*(0.1*timeAliveReward + 0.7*goalDistReward + 0.15*velocityReward + 0.05*rotationSuppressionReward);
    }

    step(dt){
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(50);
        this.velSum += this.vel.mag();
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
            // ray.dir = p5.Vector.fromAngle(angle);
            // angle += this.fovDiv;
            // if (i == (this.rays.length-1)){
            //     ray.dir = p5.Vector.fromAngle(this.heading+PI/2+PI);
            // }
            // i += 1;
        }
        this.rays[0].dir = p5.Vector.fromAngle(this.heading+PI/2+PI);
        
        this.rays[1].dir = p5.Vector.fromAngle(this.heading+this.fovDiv);
        this.rays[2].dir = p5.Vector.fromAngle(this.heading-this.fovDiv);
        
        this.rays[3].dir = p5.Vector.fromAngle(this.heading+PI+this.fovDiv);
        this.rays[4].dir = p5.Vector.fromAngle(this.heading+PI-this.fovDiv);

        this.rays[5].dir = p5.Vector.fromAngle(this.heading+PI/2-this.fovDiv/2);
        this.rays[6].dir = p5.Vector.fromAngle(this.heading+PI/2);
        this.rays[7].dir = p5.Vector.fromAngle(this.heading+PI/2+this.fovDiv/2);

        this.timeAlive += 1;
    }

}
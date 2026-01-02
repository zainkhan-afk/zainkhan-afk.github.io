// Follow through and overlapping action
class Five{
	constructor()
    {
        this.balls = [];
        append(this.balls, new Ball(createVector(0.3, 0.2), 10, 1.0, createVector(0, 0)));
        append(this.balls, new Ball(createVector(0.3, 0.7), 20, 1.0, createVector(0, 0)));
        this.lengthString = 0.5;

        this.goalPos = createVector(0.25+random()*0.5, 0.2);
        this.prevVel = createVector(0, 0);

	}

    Render(viewerW, viewerH)
    {
        let animationSize = createVector(viewerW, viewerH);
        let scaledGoalPos = p5.Vector.mult(this.goalPos, animationSize);
        
        stroke(0);
        strokeWeight(3);
        line(this.balls[0].pos.x*viewerW, this.balls[0].pos.y*viewerH, this.balls[1].pos.x*viewerW, this.balls[1].pos.y*viewerH);
        strokeWeight(1);
        ellipse(scaledGoalPos.x, scaledGoalPos.y, this.balls[0].radius*viewerW * 0.1, this.balls[0].radius*viewerW * 0.1);
        fill(255, 0, 0);
        for (let i = 0; i < this.balls.length; i++){
            let ball =this.balls[i];
            let scaledPos = p5.Vector.mult(ball.pos, animationSize);
            let scaledRadius = ball.radius*viewerW;

            push();
            translate(scaledPos.x, scaledPos.y);
            let r1, r2;
            r2 = scaledRadius;
            r1 = scaledRadius;
            ellipse(0, 0, r1, r2);
            pop();
        }

        fill(200, 200, 0);

    }

    Step()
    {
        let dt = 0.1;

        for (let i = 0; i < this.balls.length; i++){
            let ball =this.balls[i];
            ball.Step(dt);
        }

        let diff = p5.Vector.sub(this.balls[0].pos, this.balls[1].pos);

        let fVal = this.balls[1].mass*0.01*sin(diff.heading());
        let f = p5.Vector.rotate(diff, diff.x > 0 ? -HALF_PI:HALF_PI);
        f.normalize();
        f.setMag(fVal);
        this.balls[1].ApplyForce(f);
        

        if (diff.mag() > this.lengthString){
            let diffVec = p5.Vector.fromAngle(diff.heading(), diff.mag() - this.lengthString);
            this.balls[1].pos.add(diffVec);
        }

        let posDiff = p5.Vector.sub(this.goalPos, this.balls[0].pos);
        let newVel = p5.Vector.mult(posDiff, 0.5);
        
        if (abs(newVel.mag() - this.prevVel.mag()) >= this.balls[0].maxVel/10) {
            this.balls[0].vel = p5.Vector.fromAngle(newVel.heading(), min(this.prevVel.mag(), newVel.mag()) + this.balls[0].maxVel/100);
        }
        
        if (posDiff.mag() < 0.01) {
            if (random() < 0.01){
                this.goalPos = createVector(0.25+random()*0.5, 0.2);
            }
        }
        this.prevVel = this.balls[0].vel.copy();
    }
}
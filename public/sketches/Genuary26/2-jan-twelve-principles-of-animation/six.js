// Slow in Slow Out
class Six{
	constructor()
    {
        this.pos = createVector(0.3, 0.5);
        this.vel = createVector(0, 0);
        this.acc = createVector(0.001, 0);
        
        this.size = createVector(0.1, 0.1);
        this.goalPos = createVector(0.25+random()*0.5, 0.25+random()*0.5);
        
        this.maxVel = 0.1;
        
        this.prevVel = createVector(0, 0);
	}

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledGoalPos = p5.Vector.mult(this.goalPos, animationSize);
        let scaledSize = p5.Vector.mult(this.size, animationSize);
        
        fill(200, 0, 0);
        stroke(0);
        strokeWeight(1);
        ellipse(scaledPos.x, scaledPos.y, scaledSize.x, scaledSize.y);
        noFill();
        ellipse(scaledGoalPos.x, scaledGoalPos.y, scaledSize.x, scaledSize.y);

        translate(scaledPos.x, scaledPos.y);
        stroke(0, 0, 200);
        strokeWeight(2);
        line(0, 0, min(500*this.vel.x, 100), min(500*this.vel.y, 100));
    }

    Step()
    {
        // this.vel.mult(0.1);
        let dt = 0.1;
        // this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        // this.acc.x = 0.1*(0.5 - this.pos.x);
        let posDiff = p5.Vector.sub(this.goalPos, this.pos);
        let newVel = p5.Vector.mult(posDiff, 0.5);
        
        // console.log(newVel.mag() - this.prevVel.mag());
        if (abs(newVel.mag() - this.prevVel.mag()) >= this.maxVel/10) {
            this.vel = p5.Vector.fromAngle(newVel.heading(), min(this.prevVel.mag(), newVel.mag()) + this.maxVel/100);
        }
        
        if (posDiff.mag() < 0.01) {this.goalPos = createVector(0.25+random()*0.5, 0.25+random()*0.5);}
        this.prevVel = this.vel.copy();
        // if (this.pos.x > 0.8 || this.pos.x < 0.2) { this.acc.x *= -1;}
        // if (this.pos.y > 0.8 || this.pos.y < 0.2) { this.acc.y *= -1;}
    }
}
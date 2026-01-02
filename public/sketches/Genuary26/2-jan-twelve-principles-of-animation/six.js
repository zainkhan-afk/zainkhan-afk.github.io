// Slow in Slow Out
class Six extends Principle{
	constructor(name, duration)
    {
        super(name, duration);
        this.pos = createVector(0.3, 0.5);
        this.vel = createVector(0, 0);
        this.acc = createVector(0.001, 0);
        this.tail = [];
        this.tailLength = 10;
        
        this.size = createVector(0.1, 0.1);
        this.goalPos = createVector(0.25+random()*0.5, 0.25+random()*0.5);
        
        this.maxVel = 0.1;
        
        this.prevVel = createVector(0, 0);
        this.frameNum = 0;
	}

    Reset(){
        this.pos = createVector(0.3, 0.5);
        this.vel = createVector(0, 0);
        this.acc = createVector(0.001, 0);
        this.tail = [];
        this.tailLength = 10;
        
        this.size = createVector(0.1, 0.1);
        this.goalPos = createVector(0.25+random()*0.5, 0.25+random()*0.5);
        
        this.maxVel = 0.1;
        
        this.prevVel = createVector(0, 0);
        this.frameNum = 0;
    }

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        strokeWeight(1);fill(0);textSize(22);
        text(this.name, 20, 30);
        textSize(12);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledGoalPos = p5.Vector.mult(this.goalPos, animationSize);
        let scaledSize = p5.Vector.mult(this.size, animationSize);
        
        stroke(0);
        strokeWeight(0.4);
        noFill();
        
        for (let i = 0; i < this.tail.length; i++){
            let p = p5.Vector.mult(this.tail[i], animationSize);
            ellipse(p.x, p.y, scaledSize.x, scaledSize.y);
        }
        fill(200, 200, 0);
        ellipse(scaledGoalPos.x, scaledGoalPos.y, scaledSize.x * 0.1, scaledSize.y* 0.1);
        fill(200, 0, 0);
        ellipse(scaledPos.x, scaledPos.y, scaledSize.x, scaledSize.y);
        

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
        
        if (abs(newVel.mag() - this.prevVel.mag()) >= this.maxVel/10) {
            this.vel = p5.Vector.fromAngle(newVel.heading(), min(this.prevVel.mag(), newVel.mag()) + this.maxVel/100);
        }
        
        if (posDiff.mag() < 0.01) {this.goalPos = createVector(0.25+random()*0.5, 0.25+random()*0.5);}
        this.prevVel = this.vel.copy();
        if (this.frameNum % 10 == 0){
            append(this.tail, this.pos.copy());
        }
        while (this.tail.length > this.tailLength){
            this.tail = this.tail.reverse();
            this.tail.splice(this.tailLength, 1);
            this.tail = this.tail.reverse();
        }
        this.frameNum += 1;
        // if (this.pos.x > 0.8 || this.pos.x < 0.2) { this.acc.x *= -1;}
        // if (this.pos.y > 0.8 || this.pos.y < 0.2) { this.acc.y *= -1;}
    }
}
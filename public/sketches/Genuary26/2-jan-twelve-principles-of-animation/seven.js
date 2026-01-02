// Arc
class Seven{
	constructor()
    {
        this.ball = new Ball(createVector(0.3, 0.5), 10, 1.0, createVector(0.0, 0.02));
        this.ball.vel.x = 0.05;
        this.pastPositions = [];
        this.maxPastPositions = 300;
	}

    Render(viewerW, viewerH)
    {
        let animationSize = createVector(viewerW, viewerH);
        let scaledPos = p5.Vector.mult(this.ball.pos, animationSize);
        let scaledRadius = this.ball.radius*viewerW;

        stroke(0);
        noFill();
        beginShape();
        for (let i = 0; i < this.pastPositions.length; i++){
            let p = p5.Vector.mult(this.pastPositions[i], animationSize);
            vertex(p.x, p.y);
            console.log(p);
        }
        endShape();
        
        fill(255, 0, 0);
        translate(scaledPos.x, scaledPos.y);
        let r1, r2;
        
            r2 = scaledRadius;
            r1 = scaledRadius;
        ellipse(0, 0, r1, r2);
        strokeWeight(1);

    }

    Step()
    {
        let dt = 0.1;
        
        this.ball.Step(dt);
        
        if ((this.ball.pos.x + this.ball.radius/2) > 1.0 || (this.ball.pos.x - this.ball.radius / 2) < 0) { 
            this.ball.FlipVelocity(0); 
            this.ball.pos.x = min(max(0, this.ball.pos.x), 1.0 - this.ball.radius / 2); 
        }
        if ((this.ball.pos.y + this.ball.radius/2) > 1.0 || (this.ball.pos.y - this.ball.radius / 2) < 0) { 
            this.ball.FlipVelocity(1); 
            this.ball.pos.y = min(max(0, this.ball.pos.y), 1.0 - this.ball.radius / 2); 
        }

        // if (random() < 0.05){
        //     this.ball.ApplyForce(createVector(random(-1, 1), 0));
        // }

        append(this.pastPositions, this.ball.pos.copy());

        while (this.pastPositions.length > this.maxPastPositions){
            this.pastPositions.splice(0, 1);
        }
    }
}
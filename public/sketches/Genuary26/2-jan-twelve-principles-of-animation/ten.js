// Exaggeration
class Ten{
	constructor()
    {
        this.ball = new Ball(createVector(0.3, 0.5), 20, 0.2);
	}

    Render(viewerW, viewerH)
    {
        let animationSize = createVector(viewerW, viewerH);
        let scaledPos = p5.Vector.mult(this.ball.pos, animationSize);
        let scaledRadius = this.ball.radius*viewerW;

        stroke(0);
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
    }
}
// Squash and Stretch
class One{
	constructor()
    {
        this.balls = [];
        this.numBalls = 5;
        for (let i = 0; i <this.numBalls; i++){
            append(this.balls, new Ball(createVector(0.1 + i / this.numBalls, 0.4), 10, 1.0 - 0.5*(i / this.numBalls)));
        }
        this.groundLevel = 0.8;
	}

    Render(viewerW, viewerH)
    {
        let animationSize = createVector(viewerW, viewerH);
        
        stroke(0);
        
        line(0, this.groundLevel*viewerH, viewerW, this.groundLevel*viewerH);
        
        strokeWeight(1);
        for (let i = 0; i < this.balls.length; i++){
            let ball = this.balls[i];
            push();
            let scaledPos = p5.Vector.mult(ball.pos, animationSize);
            let scaledRadius = ball.radius*viewerW;
            translate(scaledPos.x, scaledPos.y);
            let r1, r2;
            r2 = scaledRadius;
            r1 = scaledRadius;
            fill(0);
            text("Restitution (e): " + str(round(ball.restitution, 3)), -50, -100);
            rotate(ball.vel.heading());
            r1 += 500*(ball.vel.y+abs(ball.vel.x));
            r2 -= 500*(ball.vel.y-abs(ball.vel.x));
            fill(255, 0, 0);
            ellipse(0, 0, r1, r2);
            pop();
        }
    }

    Step()
    {
        let dt = 0.5;
        
        for (let i = 0; i < this.balls.length; i++){
            let ball  = this.balls[i];
            ball.Step(dt);
            
            if ((ball.pos.x + ball.radius/2) > 1.0 || (ball.pos.x - ball.radius / 2) < 0) { 
                ball.FlipVelocity(0); 
                ball.pos.x = min(max(0, ball.pos.x), 1.0 - ball.radius / 2); 
            }
            if ((ball.pos.y + ball.radius/2) > this.groundLevel || (ball.pos.y - ball.radius / 2) < 0) { 
                ball.FlipVelocity(1); 
                ball.pos.y = min(max(0, ball.pos.y), this.groundLevel - ball.radius / 2);
            }
        }
    }
}
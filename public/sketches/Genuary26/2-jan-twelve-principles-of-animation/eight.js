// Secondary Action

class Eight{
	constructor()
    {
        this.numBalls = 10;
        this.balls = [];

        for (let i = 0; i < this.numBalls; i++){
            if (i == 0){
                append(this.balls, new Ball(createVector(0.3, 0.5), 10, 0.8));
            }
            else{
                append(this.balls, new Ball(createVector(random(), 1.0), random(1, 6), random(0.01, 0.01)));
            }
        }

        this.groundBarHeight = 0.8;
        this.shakeMagnitude = 0;
	}

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        if (this.shakeMagnitude > 0){
            translate(this.shakeMagnitude*random(10), this.shakeMagnitude*random(10));
            this.shakeMagnitude *= 0.9;
        }

        stroke(0);
        strokeWeight(1);
        fill(200, 0, 0);
        for (let i = 0; i < this.numBalls; i++){
            let ball = this.balls[i];
            let scaledPos = p5.Vector.mult(ball.pos, animationSize);
            let scaledRadius = ball.radius * width;

            ellipse(scaledPos.x, scaledPos.y, scaledRadius, scaledRadius);
        }
        

        stroke(0);
        strokeWeight(3);
        line(0, this.groundBarHeight*height, width, this.groundBarHeight*height);
    }

    Step()
    {
        let dt = 0.1;
        for (let i = 0; i < this.numBalls; i++){
            let ball = this.balls[i];
            ball.Step(dt);
        }

        for (let i = 0; i < this.numBalls; i++){
            let ball = this.balls[i];
            if ((ball.pos.y + ball.radius / 2) > this.groundBarHeight || (ball.pos.y - ball.radius / 2) < 0) { 
                ball.pos.y = min(max(0, ball.pos.y), this.groundBarHeight - ball.radius / 2);
                ball.vel.y *= -1;
                let shakeFactor = ball.vel.mag() * ball.mass;
                this.shakeMagnitude +=  shakeFactor;
                for (let j = 0; j < this.numBalls; j++){
                    if (i == j) {continue;}
                    let ball2 = this.balls[j];
                    if ((ball2.pos.y + ball2.radius / 1.8) > this.groundBarHeight || (ball2.pos.y - ball2.radius / 1.8) < 0) { 
                        ball2.ApplyForce(createVector(0, -shakeFactor));
                    }
                }
            }
        }
        // this.vel.mult(0.1);
        // this.vel.add(p5.Vector.mult(this.acc, dt));
        // this.vel.limit(this.maxVel);
        // this.pos.add(p5.Vector.mult(this.vel, dt));
        
    }
}
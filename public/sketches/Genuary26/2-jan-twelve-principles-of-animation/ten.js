// Exaggeration
class Ten{
	constructor()
    {
        this.ball = new Ball(createVector(0.3, 0.9), 20, 0.2, createVector(0.01, 0.0));
        this.smallBalls = [];
        this.numSmallBalls = 50;

        for (let i = 0; i < this.numSmallBalls; i++)
        {
            append(this.smallBalls, new Ball(createVector(random(), random()), 2, 0.2));
        }

        this.frameNum = 0;
        this.poked = false;
        this.tension = 0.0;
        this.numPts = 100;
        this.noiseMaxStep = 10;
        this.kaboom = false;
	}

    RenderBigBall(viewerW, viewerH){
        if (this.poked){
            translate(random()*this.tension*0.1, random()*this.tension*0.1);
        }
        let animationSize = createVector(viewerW, viewerH);
        let scaledPos = p5.Vector.mult(this.ball.pos, animationSize);
        let scaledRadius = this.ball.radius*viewerW;

        stroke(0);

        fill(255, 0, 0);
        translate(scaledPos.x, scaledPos.y);
        // ellipse(0, 0, scaledRadius, scaledRadius);

        
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += TWO_PI / this.numPts){
            let x = map(cos(angle), -1, 1, 0, this.tension);
            let y = map(sin(angle), -1, 1, 0, this.tension);

            let mag = map(noise(x, y, this.tension), 0, 1, scaledRadius*0.5, scaledRadius*1.0);
            let ptX = mag*cos(angle);
            let ptY = mag*sin(angle);

            vertex(ptX, ptY);
        }
        endShape(CLOSE);
    }

    RenderSmallBalls(viewerW, viewerH){
        let animationSize = createVector(viewerW, viewerH);
        fill(255, 0, 0);
        for (let i = 0; i < this.smallBalls.length; i++){
            let ball = this.smallBalls[i];
            let scaledPos = p5.Vector.mult(ball.pos, animationSize);
            let scaledRadius = ball.radius * width;

            ellipse(scaledPos.x, scaledPos.y, scaledRadius, scaledRadius);
        }

    }

    Render(viewerW, viewerH)
    {   
        fill(100);
        beginShape();
        vertex(viewerW, 0.895*viewerH);
        vertex(viewerW*0.7, 0.9*viewerH);
        vertex(viewerW, 0.905*viewerH);
        endShape();
        push();
        if(!this.kaboom){
            this.RenderBigBall(viewerW, viewerH);
        }
        else{
            this.RenderSmallBalls(viewerW, viewerH);
        }
        pop();

    }

    StepBigBall(dt){

        if (this.ball.pos.x + this.ball.radius/2.5 >= 0.7) {
            this.ball.vel.x = 0;
            this.ball.gravity.set(0);
            this.ball.ApplyForce(createVector(-1, 0))
            this.poked = true;
        }

        if (this.poked){
            this.ball.vel.x *= 0.99;
            this.tension += 0.1;
        }

        if (this.tension > 10){
            this.kaboom = true;
            for (let i = 0; i < this.smallBalls.length; i++){
                let ball = this.smallBalls[i];
                ball.pos = createVector(
                                            random(this.ball.pos.x - this.ball.radius*0.5, this.ball.pos.x + this.ball.radius*0.5),
                                            random(this.ball.pos.y - this.ball.radius*0.5, this.ball.pos.y + this.ball.radius*0.5)
                                        );
                let diff = p5.Vector.sub(ball.pos, this.ball.pos);
                diff.mult(50);
                ball.ApplyForce(diff);
                ball.Step(dt);
                ball.ApplyForce(diff);
                ball.Step(dt);                
            }
        }

        this.ball.Step(dt);
    }

    StepSmallBalls(dt){
        for (let i = 0; i < this.smallBalls.length; i++){
            let ball = this.smallBalls[i];
            ball.Step(dt);
            if ((ball.pos.y + ball.radius / 2) > 1.0 || (ball.pos.y - ball.radius / 2) < 0) { 
                    ball.pos.y = min(max(0, ball.pos.y), 1.0 - ball.radius / 2);
                    ball.vel.y *= -1;
            }
            if ((ball.pos.x + ball.radius / 2) > 1.0 || (ball.pos.x - ball.radius / 2) < 0) { 
                    ball.pos.x = min(max(0, ball.pos.x), 1.0 - ball.radius / 2);
                    ball.vel.x *= -1;
            }
        }
    }



    Step()
    {
        let dt = 0.1;

        if (!this.kaboom){
            this.StepBigBall(dt)
        }
        else{
            this.StepSmallBalls(dt)
        }

        this.frameNum += 1;
    }
}
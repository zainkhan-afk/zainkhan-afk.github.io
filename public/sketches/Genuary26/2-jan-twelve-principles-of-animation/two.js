// Anticipation
class Two{
	constructor()
    {
        this.ball = new Ball(createVector(0.3, 0.5), 20, 0.2);
        this.applyForce = false;
        this.forceAngle = -PI / 6;
        this.maxForceAmp = 20;
        this.currentForce = 0;
        this.forceDelta = this.maxForceAmp / 100;
	}

    Render(viewerW, viewerH)
    {
        if (this.applyForce){
            translate(random()*this.currentForce*0.5, random()*this.currentForce*0.5);
        }
        let animationSize = createVector(viewerW, viewerH);
        let scaledPos = p5.Vector.mult(this.ball.pos, animationSize);
        let scaledRadius = this.ball.radius*viewerW;

        stroke(0);
        fill(255, 0, 0);
        translate(scaledPos.x, scaledPos.y);
        let r1, r2;
        push();
        if (this.applyForce){
            rotate(this.forceAngle);
            r2 = scaledRadius + this.currentForce;
            r1 = scaledRadius - this.currentForce;
        }
        else{
            r2 = scaledRadius;
            r1 = scaledRadius;
        }
        ellipse(-abs(this.currentForce), -abs(this.currentForce), r1, r2);
        strokeWeight(1);
        fill(0);
        if (this.applyForce){
            line(-abs(this.currentForce), -abs(this.currentForce), 5*this.currentForce, 0);
            text("Force: " + str(round(this.currentForce, 2)), 5*this.currentForce, 0)
        }
        pop();
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
        if (abs((this.ball.pos.y + this.ball.radius / 2 ) - 1.0) < 0.001){
            this.ball.vel.x *= 0.99;
        }
        if (abs((this.ball.pos.y + this.ball.radius / 2 ) - 1.0) < 0.001 && this.ball.vel.mag() < 0.001 && !this.applyForce){
            this.applyForce = true;
            this.forceAngle = p5.Vector.sub(createVector(0.5, 0), this.ball.pos).heading();
        }
        if (this.applyForce){
            this.currentForce += this.forceDelta;
            if (this.currentForce > this.maxForceAmp){
                let f = p5.Vector.fromAngle(this.forceAngle, this.currentForce);
                this.currentForce = 0;
                this.applyForce = false;
                this.ball.ApplyForce(f);
            }
        }
    }
}
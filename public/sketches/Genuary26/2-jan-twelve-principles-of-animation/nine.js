// Timing
class Nine{
	constructor()
    {
        this.anchor = createVector(0.5, 0.0);
        this.lengthString = 0.4;
        let lightBallPos = p5.Vector.fromAngle(PI / 3);
        lightBallPos.setMag(this.lengthString+0.01);
        lightBallPos.add(this.anchor);
        let heavyBallPos = p5.Vector.fromAngle(PI / 3);
        heavyBallPos.setMag(2*this.lengthString);
        heavyBallPos.add(this.anchor);

        this.lightBall = new Ball(lightBallPos, 10, 1.0, createVector(0.0, 0.0));
        this.heavyBall = new Ball(heavyBallPos, 10, 1.0, createVector(0.0, 0.0));

	}

    Sigmoid(x){
        return Math.tanh(x);
        return 1 / (1 + exp(-x));
    }

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        let scaledPosLight = p5.Vector.mult(this.lightBall.pos, animationSize);
        let scaledPosHeavy = p5.Vector.mult(this.heavyBall.pos, animationSize);
        let scaledAnchorPos = p5.Vector.mult(this.anchor, animationSize);
        
        fill(200, 0, 0);
        stroke(0);
        strokeWeight(1);

        line(scaledAnchorPos.x, scaledAnchorPos.y, scaledPosLight.x, scaledPosLight.y);
        line(scaledAnchorPos.x, scaledAnchorPos.y, scaledPosHeavy.x, scaledPosHeavy.y);
        
        ellipse(scaledPosLight.x, scaledPosLight.y, this.lightBall.radius*width, this.lightBall.radius*width);
        ellipse(scaledPosHeavy.x, scaledPosHeavy.y, this.heavyBall.radius*width, this.heavyBall.radius*width);


        let diffLight = p5.Vector.sub(this.lightBall.pos, this.anchor);
        let diffHeavy = p5.Vector.sub(this.anchor, this.heavyBall.pos);

        stroke(100);
        push();
        translate(scaledPosLight.x, scaledPosLight.y);
        rotate(diffLight.heading());
        line(0, 0, 0, 100);
        line(0, 100, -this.lengthString*width, 100);
        text("Length: " + str(this.lengthString) + " Mass: " + str(this.lightBall.mass), -this.lengthString*width/2, 120);
        pop();

        push();
        translate(scaledPosHeavy.x, scaledPosHeavy.y);
        rotate(PI+diffHeavy.heading());
        line(0, 0, 0, -100);
        line(0, -100, -2*this.lengthString*width, -100);
        text("Length: " + str(2*this.lengthString) + " Mass: " + str(this.lightBall.mass), -this.lengthString*width/2, -120);
        pop();

    }

    Step()
    {
        let fVal;
        let dt = 0.1;
          
        
        let diffLight = p5.Vector.sub(this.anchor, this.lightBall.pos);
        let diffHeavy = p5.Vector.sub(this.anchor, this.heavyBall.pos);
        


        fVal = this.lightBall.mass*0.005*sin(diffLight.heading());
        let fLight = p5.Vector.rotate(diffLight, diffLight.x > 0 ? -HALF_PI:HALF_PI);
        fLight.normalize();
        fLight.setMag(fVal);
        this.lightBall.ApplyForce(fLight);
        
        fVal = this.heavyBall.mass*0.005*sin(diffHeavy.heading());
        let fHeavy = p5.Vector.rotate(diffHeavy, diffHeavy.x > 0 ? -HALF_PI:HALF_PI);
        fHeavy.normalize();
        fHeavy.setMag(fVal);
        this.heavyBall.ApplyForce(fHeavy);
        
        this.lightBall.Step(dt);
        this.heavyBall.Step(dt);

        if (diffLight.mag() > this.lengthString){
            let diffVec = p5.Vector.fromAngle(diffLight.heading(), diffLight.mag() - this.lengthString);
            this.lightBall.pos.add(diffVec);
        }
        if (diffHeavy.mag() > 2*this.lengthString){
            let diffVec = p5.Vector.fromAngle(diffHeavy.heading(), diffHeavy.mag() - 2*this.lengthString);
            this.heavyBall.pos.add(diffVec);
        }

    }
}
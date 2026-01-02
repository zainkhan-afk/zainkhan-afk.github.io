// Staging
class Three extends Principle{
	constructor(name, duration)
    {
        super(name, duration);
        this.ball = new Ball(createVector(0.3, 0.5), 10, 0.3);
        this.numGroundPts = 100;
        this.noiseOffset = 0;
        this.groundPts = [];

        for (let i = 0; i < this.numGroundPts; i++){
            this.AddNewGroundPoint();
        }

	}

    Reset(){
        this.ball.Reset(createVector(0.3, 0.5));
        this.noiseOffset = 0;
        this.groundPts = [];
        for (let i = 0; i < this.numGroundPts; i++){
            this.AddNewGroundPoint();
        }
    }

    AddNewGroundPoint(){

        while(this.groundPts.length > this.numGroundPts){
            this.groundPts.splice(0, 1);
        }
        append(this.groundPts, map(noise(this.noiseOffset), 0, 1, 0.5, 0.8));

        this.noiseOffset += 0.01;
    }

    Render(viewerW, viewerH)
    {
        this.viewerW = viewerW;
        if (this.applyForce){
            translate(random()*this.currentForce*0.5, random()*this.currentForce*0.5);
        }
        strokeWeight(1);fill(0);textSize(22);
        text(this.name, 20, 30);
        textSize(12);
        let animationSize = createVector(viewerW, viewerH);
        let scaledPos = p5.Vector.mult(this.ball.pos, animationSize);
        let scaledRadius = this.ball.radius*viewerW;

        noStroke();
        fill(249, 145, 103);
        ellipse(3*viewerW/4, 2*viewerH/3, 500, 500);

        stroke(0);
        fill(100);
        // translate(scaledPos.x, scaledPos.y);
        beginShape();
        vertex(0, viewerH);
        for(let i = 0; i < this.groundPts.length; i++){
            let x = (i/this.groundPts.length)*viewerW;
            let y = this.groundPts[i]*viewerH;
            vertex(x, y);
        }
        vertex(viewerW, this.groundPts[this.groundPts.length-1]*viewerH);
        vertex(viewerW, viewerH);

        endShape();

        fill(255, 0, 0);
        let r1, r2;
        r2 = scaledRadius;
        r1 = scaledRadius;
        ellipse(scaledPos.x, scaledPos.y, r1, r2);

    }

    Step()
    {
        let dt = 0.1;
        
        this.ball.Step(dt);
        
        if ((this.ball.pos.x + this.ball.radius/2) > 1.0 || (this.ball.pos.x - this.ball.radius / 2) < 0) { 
            this.ball.FlipVelocity(0); 
            this.ball.pos.x = min(max(0, this.ball.pos.x), 1.0 - this.ball.radius / 2); 
        }
        let yPt = this.groundPts[int(this.ball.pos.x*this.groundPts.length)];
        if ((this.ball.pos.y + this.ball.radius/2) > yPt || (this.ball.pos.y - this.ball.radius / 2) < 0) { 
            this.ball.FlipVelocity(1); 
            this.ball.pos.y = min(max(0, this.ball.pos.y), yPt - this.ball.radius / 2); 
        }

        this.AddNewGroundPoint();
    }
}
class One{
	constructor()
    {
        this.pos = createVector(0.1, 0.5);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0.001);
        
        this.baseSize = createVector(0.1, 0.1);
        this.size = this.baseSize.copy();

        this.maxVel = 0.1;
        
        this.velDiff = createVector(0, 0);
	}

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledSize = p5.Vector.mult(this.size, animationSize);
        
        fill(200, 0, 0);
        stroke(0);
        ellipse(scaledPos.x, scaledPos.y, scaledSize.x, scaledSize.y);
    }

    Step()
    {
        // this.vel.mult(0.1);
        let dt = 0.1;
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        if ((this.pos.x + this.baseSize.x / 10) > 1.0 || (this.pos.x - this.baseSize.x / 10) < 0) { 
            this.vel.x *= -1; 
            this.pos.x = min(max(0, this.pos.x), 1.0 - this.baseSize.x / 2); 
        }
        if ((this.pos.y + this.baseSize.y / 2) > 1.0 || (this.pos.y - this.baseSize.y / 2) < 0) { 
            if ((this.pos.y + this.baseSize.y / 10) > 1.0 || (this.pos.y - this.baseSize.y / 10) < 0){
                this.vel.y *= -1; 
                console.log("Flip");
            }
            let minVal = min(min(this.pos.y - this.baseSize.y / 2, 0), 1.0 - (this.pos.y + this.baseSize.y / 2));
            console.log(minVal);
            // let maxVal = min(this.pos.y + this.baseSize.y / 2, 0)
            this.pos.y = min(max(0, this.pos.y), 1.0 - this.size.y / 2); 
            this.size.y = this.baseSize.y + minVal;
            console.log(this.size);
        }
    }
}
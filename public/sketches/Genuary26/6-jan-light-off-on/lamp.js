class Lamp{
    constructor(anchor, wireLength){
        this.anchor = anchor;
        this.wireLength = wireLength;

        this.pos = createVector(anchor.x, anchor.y + this.wireLength);
        this.vel = createVector();
        this.acc = createVector();

        this.bulbMass = 100;
        this.lightsOn = true;

        this.ghost = new Ghost();
        this.applyRectionForce = false;
        this.lastGhostPos;
    }

    ApplyForce(f){
        this.acc.add(f.mult(1/this.bulbMass));
    }

    Render(){
        stroke(0, 0, 0, 255);
        strokeWeight(3);
        line(this.anchor.x, this.anchor.y, this.pos.x, this.pos.y);
        strokeWeight(1);
        let diff = p5.Vector.sub(this.anchor, this.pos);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(diff.heading()+HALF_PI);
        fill(150);
        stroke(0);
        rect(-10, -45, 20, 30);
        fill(25, 100);
        noStroke();
        circle(0, 5, 50);
        
        fill(200, 200, 0, 100);
        if (this.lightsOn){
            beginShape();
            vertex(-250, height);
            vertex(-25, 0);
            vertex(25, 0);
            vertex(250, height);
            endShape();

            fill(255);
            beginShape();
            for (let i = 0; i<this.ghost.pts.length; i++){
                vertex(this.ghost.pts[i].x, this.ghost.pts[i].y);
            }
            endShape();
        }
        pop();
        if (!this.lightsOn){
            this.ghost.Render();
        }
    }

    CheckPendulumEffect(dt){
        let diff = p5.Vector.sub(this.anchor, this.pos);
        
        let fVal = this.bulbMass*dt*sin(diff.heading());
        let f = p5.Vector.rotate(diff, diff.x > 0 ? -HALF_PI:HALF_PI);
        f.normalize();
        f.setMag(fVal);
        this.ApplyForce(f);
        // console.log(f);
        
        if (diff.mag() > this.wireLength){
            let diffVec = p5.Vector.fromAngle(diff.heading(), diff.mag() - this.wireLength);
            this.pos.add(diffVec);
        }
    }

    Step(dt){
        
        if (!this.lightsOn){
            let f = createVector(mouseX - this.ghost.pos.x, mouseY - this.ghost.pos.y);
            this.ghost.ApplyForce(f);
            if (this.applyRectionForce){
                let rectionForce = f.copy();
                rectionForce.x += abs(rectionForce.y);
                rectionForce.y = 0;
                this.ApplyForce(rectionForce);
                this.applyRectionForce = false;
            }
        }
        else{
            this.ghost.pos = this.pos.copy();
            // this.ghost.vel.setHeading(this.vel.heading());// = lamp.vel.copy();
            
            if (this.applyRectionForce){
                let diff = p5.Vector.sub(this.lastGhostPos, this.ghost.pos);
                diff.x += abs(diff.y / 2);
                diff.y = 0;
                lamp.ApplyForce(p5.Vector.mult(diff, 1));
                this.applyRectionForce = false;
                this.ghost.vel.set(0, -0.00001);
            }
        }
        
        this.CheckPendulumEffect(dt);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
        if (!this.lightsOn){
            this.ghost.Step(dt);
        }

        this.lastGhostPos = this.ghost.pos.copy();

    }
}
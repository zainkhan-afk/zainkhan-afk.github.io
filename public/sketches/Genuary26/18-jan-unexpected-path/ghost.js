class Ghost{
    constructor(pos){
        this.pos = pos;
        this.boundaryMargin = 200;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    ApplyForce(f){
        this.acc.add(f);
    }

    ApplyBoundaryForce(){
        let f = createVector(0, 0);

        if (this.pos.x < this.boundaryMargin){
            f.x = this.boundaryMargin - this.pos.x;
        }
        else if (this.pos.x > (width - this.boundaryMargin)){
            f.x = (width - this.boundaryMargin) - this.pos.x;
        }

        if (this.pos.y < this.boundaryMargin){
            f.y = this.boundaryMargin - this.pos.y;
        }
        else if (this.pos.y > height - this.boundaryMargin){
            f.y = (height - this.boundaryMargin) - this.pos.y;
        }
        
        this.ApplyForce(f);
    }

    Step(dt){
        this.ApplyBoundaryForce();
        this.vel.add(p5.Vector.mult(this.acc, dt));

        this.vel.limit(50);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(0);
    }
}
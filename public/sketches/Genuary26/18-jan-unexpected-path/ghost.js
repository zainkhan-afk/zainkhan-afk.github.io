class Ghost{
    constructor(pos){
        this.pos = pos;
        this.boundaryMargin = 200;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.pts = [
            [0, 30],
            [10, -10],
            [0, 0],
            [-10, -10],
        ];

        this.tail = [];
        this.counter = 0;
        this.tailMaxLen = 100;
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

        if (this.counter%10 == 0){
            append(this.tail, [this.pos.x, this.pos.y]);
        }

        if (this.tail.length > this.tailMaxLen){
            this.tail.splice(0, 1);
        }
        this.acc.set(0);

        this.counter += 1;
    }
}
class Box{
    constructor(pos, rot, goalPos, goalRot, size, sideColors){
        this.pos = pos;
        this.initPos = pos.copy();
        this.rot = rot;
        this.initRot = rot.copy();
        
        this.size = size;
        this.sideColors = sideColors;

        this.goalPos = goalPos;
        this.initGoalPos = goalPos.copy();
        this.goalRot = goalRot;
        this.initGoalRot = goalRot.copy();

        this.dispersing = true;
    }


    RenderBox(){
        push();
        translate(this.pos);
        rotateX(this.rot.x);
        rotateY(this.rot.y);
        rotateZ(this.rot.z);
        
        noFill();
        stroke(0);
        box(this.size);
        noStroke();
        for (let i = 0; i < 6; i++){
            push();
            
            if (i == 0){translate(0, 0, this.size/2);}
            if (i == 1){translate(0, this.size/2, 0);rotateX(HALF_PI);}
            if (i == 2){translate(this.size/2, 0, 0);rotateY(HALF_PI);}
            if (i == 3){translate(0, -this.size/2, 0);rotateX(HALF_PI);}
            if (i == 4){translate(-this.size/2, 0, 0);rotateY(HALF_PI);}
            if (i == 5){translate(0, 0, -this.size/2);}
            
            fill(this.sideColors[i]);
            plane(this.size);
            pop();
        }

        pop();
    }

    Step(dt){
        let deltaPos = p5.Vector.sub(this.goalPos, this.pos);
        let deltaRot = p5.Vector.sub(this.goalRot, this.rot);

        this.pos.add(p5.Vector.mult(deltaPos, dt*3));
        this.rot.add(p5.Vector.mult(deltaRot, dt*2));
    }

    ReachedGoal(){
        let deltaPos = p5.Vector.sub(this.goalPos, this.pos);
        let deltaRot = p5.Vector.sub(this.goalRot, this.rot);

        if (deltaPos.mag() < 0.1 && deltaRot.mag() < 0.1){
            return true;
        }
        return false;
    }

    ResetGoal(){
        if (this.dispersing){
            this.SetGoalToInitPos();
            this.dispersing = false;
        }
        else{
            this.SetGoalToInitGoal();
            this.dispersing = true;
        }
    }

    SetGoalToInitPos(){
        this.goalPos = this.initPos.copy();
        this.goalRot = this.initRot.copy();   
    }
    SetGoalToInitGoal(){
        this.goalPos = this.initGoalPos.copy();
        this.goalRot = this.initGoalRot.copy();   
    }
}
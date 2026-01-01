// Straight ahead action and pose to pose
class Four{
    constructor(){
        this.pos = createVector(0.1, 0.25);
        this.vel = createVector(0, 0);
        
        this.size = createVector(0.1, 0.1);
        this.radius = 0.1;
        this.goalPos = this.pos.copy();
        
        this.maxVel = 0.1;
        
        this.prevVel = createVector(0, 0);


        this.numPts = 100;
        this.totalFrames = 300;
        
        this.movementDelta = 0.8 / 3;

        this.totalFramesPerMorph = int(this.totalFrames / 3);
        this.pts = [];
        this.currentPts = [];
        this.refPts = [];

        for (let angle = 0; angle < TWO_PI; angle += TWO_PI/this.numPts){
            let x = this.radius*cos(angle);
            let y = this.radius*sin(angle);
            append(this.pts, [x, y]);
            append(this.currentPts, [x, y]);
            // append(this.refPts, [x, y]);
        }
        this.updateRefPts(this.pts);
        
        this.trianglePtsIndices = [25, 62, 88];
        this.squarePtsIndices = [12, 38, 62, 88];
        
        this.frameNum = 0;
        this.skipIdx = 0;

    }

    Reset(){
        this.pos = createVector(0.1, 0.25);
        this.goalPos = this.pos.copy();
        this.vel = createVector(0, 0);
        this.currentPts = structuredClone(this.pts);
    }

    updateRefPts(newRef){
        this.refPts = structuredClone(newRef);        
    }

    DrawShapeAt(posX, posY, scaleW, scaleH, frameId, numSteps){
        posX *= scaleW;
        posY *= scaleH;
        
        beginShape();
        for (let i = 0; i < this.numPts; i++){
            let goalX, goalY;
            if (frameId % this.totalFramesPerMorph == 0) { this.updateRefPts(this.currentPts); };
            
            if (frameId < this.totalFramesPerMorph){
                let br = this.pts[this.squarePtsIndices[0]];
                let bl = this.pts[this.squarePtsIndices[1]];
                let tl = this.pts[this.squarePtsIndices[2]];
                let tr = this.pts[this.squarePtsIndices[3]];


                if (i >= this.squarePtsIndices[0] && i < this.squarePtsIndices[1]) { goalX = this.pts[i][0]; goalY = br[1];}
                else if (i >= this.squarePtsIndices[1] && i < this.squarePtsIndices[2]) { goalX = bl[0]; goalY = this.pts[i][1];}
                else if (i >= this.squarePtsIndices[2] && i < this.squarePtsIndices[3]) { goalX = this.pts[i][0]; goalY = tl[1];}
                else { goalX = tr[0]; goalY = this.pts[i][1];}
            }
            else if (frameId >= this.totalFramesPerMorph && frameId < 2*this.totalFramesPerMorph) {
                goalX = this.pts[i][0];
                goalY = this.pts[i][1];
            }
            else{
                let bottom = this.pts[this.trianglePtsIndices[0]];
                let left = this.pts[this.trianglePtsIndices[1]];
                let right = this.pts[this.trianglePtsIndices[2]];

                
                

                if (i >= this.trianglePtsIndices[0] && i < this.trianglePtsIndices[1]) { 
                    let m = (bottom[1] - left[1]) / (bottom[0] - left[0]);
                    let c = bottom[1] - m*bottom[0];
                    goalY = this.pts[i][1];
                    goalX = (goalY - c) / m; 
                }
                else if (i >= this.trianglePtsIndices[1] && i < this.trianglePtsIndices[2]) { 
                    goalX = this.pts[i][0];
                    goalY = right[1];
                }
                else { 
                    let m = (right[1] - bottom[1]) / (right[0] - bottom[0]);
                    let c = right[1] - m*right[0];
                    goalY = this.pts[i][1];
                    goalX = (goalY - c) / m; 
                }
            }

            let deltaX = (goalX - this.refPts[i][0]) / numSteps;
            let deltaY = (goalY - this.refPts[i][1]) / numSteps;
            this.currentPts[i][0] += deltaX;
            this.currentPts[i][1] += deltaY;
            console.log(deltaX, deltaY);
            vertex(posX + this.currentPts[i][0]*scaleW, posY + this.currentPts[i][1]*scaleH);
        }
        endShape(CLOSE);


        beginShape();
        for (let i = 0; i < this.numPts; i++){
            vertex(posX + this.currentPts[i][0]*scaleW, posY+0.5*scaleH + this.currentPts[i][1]*scaleH);
        }
        endShape(CLOSE);

    }


    DrawBluePrintShape(posX, posY, scaleW, scaleH, bluePrintMode){
        // bluePrintMode = 0 for drawing circle
        // bluePrintMode = 1 for drawing sqaure
        // bluePrintMode = 2 for drawing triangle
        posX *= scaleW;
        posY *= scaleH;

        beginShape();
        if (bluePrintMode == 0){
            for (let i = 0; i < this.pts.length; i++){
                vertex(posX + this.pts[i][0]*scaleW, posY + this.pts[i][1]*scaleH);
            }
        }
        else if (bluePrintMode == 1){
            for (let i = 0; i < this.squarePtsIndices.length; i++){
                let pt = this.pts[this.squarePtsIndices[i]];
                vertex(posX + pt[0]*scaleW, posY + pt[1]*scaleH);
            }
        } 
        else{
            for (let i = 0; i < this.trianglePtsIndices.length; i++){
                let pt = this.pts[this.trianglePtsIndices[i]];
                vertex(posX + pt[0]*scaleW, posY + pt[1]*scaleH);
            }
        }
        endShape(CLOSE);
    }

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledGoalPos = p5.Vector.mult(this.goalPos, animationSize);
        let scaledSize = p5.Vector.mult(this.size, animationSize);
        
        // Draw Pose To Pose BluePrints
        strokeWeight(1);
        stroke(0);
        noFill();
        this.DrawBluePrintShape(0.1, 0.25, width, height, 0);
        this.DrawBluePrintShape(0.1+this.movementDelta, 0.25, width, height, 1);
        this.DrawBluePrintShape(0.1+2*this.movementDelta, 0.25, width, height, 0);
        this.DrawBluePrintShape(0.1+3*this.movementDelta, 0.25, width, height, 2);

        // Draw Straight Ahead BluePrints
        if (this.frameNum >= 0){
            this.DrawBluePrintShape(0.1, 0.75, width, height, 0);
        }
        if(this.totalFramesPerMorph <= this.frameNum ){
            this.DrawBluePrintShape(0.1+this.movementDelta, 0.75, width, height, 1);
        }
        if(2*this.totalFramesPerMorph <= this.frameNum){
            this.DrawBluePrintShape(0.1+2*this.movementDelta, 0.75, width, height, 0);
        }

        
        fill(225, 172, 150);
        this.DrawShapeAt(this.pos.x, this.pos.y, width, height, this.frameNum, this.totalFramesPerMorph);
    }

    Step()
    {
        let dt = 0.1;
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        
        let posDiff = p5.Vector.sub(this.goalPos, this.pos);
        let newVel = p5.Vector.mult(posDiff, 0.5);
        
        if (abs(newVel.mag() - this.prevVel.mag()) >= this.maxVel/10) {
            this.vel = p5.Vector.fromAngle(newVel.heading(), min(this.prevVel.mag(), newVel.mag()) + this.maxVel/100);
        }
        
        if (this.frameNum % this.totalFramesPerMorph == 0) { 
            this.goalPos.x += this.movementDelta;
        }

        this.prevVel = this.vel.copy();
        this.frameNum += 1;

        if (this.frameNum % 2 == 0) {this.skipIdx += 1;}

        if (this.frameNum >= this.totalFrames) {
            this.frameNum = 0;
            this.updateRefPts(this.pts);
            this.Reset();
        }
    }
}
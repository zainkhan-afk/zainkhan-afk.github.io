
class Simulation{
    constructor(){
        this.obstacles = [];
        this.rockets = [];
        this.numRockets = 10;
        this.numObs = 100;
        this.cellSize = 100;
        this.numRows = int(height/this.cellSize) + 1;
        this.numCols = int(width/this.cellSize) + 1;
        
        this.gridOcc = {};

        
        for (let i = 0; i < this.numCols*this.numRows; i++){
            this.gridOcc[i] = {"obstacles" : [], "rockets" : []};
        }

        for (let i = 0; i < this.numObs; i++){
            let obs = new Food(createVector(random(width), random(height)));
            // let obs = new Food(createVector(width/2 + 100, height/2));
            let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);
        }

        for (let i = 0; i < this.numRockets; i++){
            let rocket = new Rocket(createVector(width/2, height/2));
            let rocketIdx = int(rocket.pos.y/this.cellSize)*this.numCols + int(rocket.pos.x/this.cellSize);
            
            append(this.gridOcc[rocketIdx]["rockets"], rocket);
            append(this.rockets, rocket);
        }

        this.t = 0;
    }


    render(){
        for (let r = 0; r < this.numRows; r++){
            line(0, r*this.cellSize, width, r*this.cellSize);
            
        }
        for (let c = 0; c < this.numCols; c++){
            line(c*this.cellSize, 0, c*this.cellSize, height);
        }


        stroke(200, 0, 0);
        noFill();

        for (let obstacle of this.obstacles){
            push();
            translate(obstacle.pos.x, obstacle.pos.y);
            circle(0, 0, obstacle.size);
            pop();
        }

        for (let rocket of this.rockets){
            if (rocket.daed) {continue;}
            push();
            translate(rocket.pos.x, rocket.pos.y);
            rotate(rocket.heading);

            beginShape();
            vertex(0, rocket.rHeight);
            vertex(rocket.rWidth/2, 0);
            vertex(-rocket.rWidth/2, 0);
            endShape(CLOSE);

            pop();

            for (let ray of rocket.rays){
                ray.show();
            }
        }
    }

    getNeighboringObs(rocket){
        let allObs = [];
        let rocketR = int(rocket.pos.y/this.cellSize);
        let rocketC = int(rocket.pos.x/this.cellSize);
        for (let r = max(rocketR-1, 0); r<min(this.numRows, rocketR+2); r++){
            for (let c = max(rocketC-1, 0); c<min(this.numCols, rocketC+2); c++){
                let idx = r*this.numCols + c;
                allObs.push(...this.gridOcc[idx]["obstacles"]);
            }
        }

        return allObs;
    }

    stepSimulation(dt){
        let numAlive = 0;
        for (let i = 0; i < this.numCols*this.numRows; i++){
            this.gridOcc[i] = {"obstacles" : [], "rockets" : []};
        }

        for (let obs of this.obstacles){
            let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
        }


        for (let rocket of this.rockets){
            if (rocket.dead) {continue;}
            // rocket.control([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]);
            // let rocketIdx = int(rocket.pos.y/this.cellSize)*this.numCols + int(rocket.pos.x/this.cellSize);
            let currentCellObs = this.getNeighboringObs(rocket);
            
            let raysData = [];
            for (let ray of rocket.rays){
                let rayVal = 1.0;
                for (let obs of currentCellObs){
                    let res = ray.cast(obs);
                    if (res){
                        fill(200);
                        circle(res.point.x, res.point.y, 2);
                        rayVal = res.dist/(this.cellSize*2);
                    }
                }
                append(raysData, rayVal);
            }
            rocket.control(raysData);
            rocket.step(dt);

            let rocketIdx = int(rocket.pos.y/this.cellSize)*this.numCols + int(rocket.pos.x/this.cellSize);
            append(this.gridOcc[rocketIdx]["rockets"], rocket);
            for (let obs of currentCellObs){
                let diff = p5.Vector.sub(rocket.pos, obs.pos);
                if (diff.mag() < (obs.size/2 + rocket.rHeight/2)){
                    rocket.dead = true;
                }
            }
            numAlive += 1;
        }

        return numAlive;
    }

    ResetRockets(){
        for (let rocket of this.rockets){
            rocket.reset();
        }
    }

    FindFittestRocket(){
        let fittestRocket;
        let highestFitness = 0;
        for (let rocket of this.rockets){
            if (rocket.timeAlive>highestFitness){
                fittestRocket = rocket;
                highestFitness = rocket.timeAlive;
            }
        }
        return fittestRocket;
    }

    CloneFittest(fittestRocket){
        for (let rocket of this.rockets){
            rocket.copyBrain(fittestRocket);
        }
    }

    step(dt){
        let numAlive = this.stepSimulation(dt);

        if (numAlive == 0){
            let fittestRocket = this.FindFittestRocket();
            this.CloneFittest(fittestRocket);
            this.ResetRockets();
        }
        
        // this.t += dt/10;
    }
}
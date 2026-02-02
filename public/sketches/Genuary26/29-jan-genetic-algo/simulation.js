
class Simulation{
    constructor(populationSize, mutationRate){
        this.obstacles = [];
        this.rockets = [];
        this.numRockets = populationSize;
        this.obsSize = 20;
        this.numObs = 100;
        this.mutationRate = mutationRate;
        this.cellSize = 100;
        this.numRows = int(height/this.cellSize) + 1;
        this.numCols = int(width/this.cellSize) + 1;
        this.maxFrames = 1500;
        this.goalPos = createVector(width - 200, 200);
        
        this.gridOcc = {};

        this.numFixed = 0;

        
        for (let i = 0; i < this.numCols*this.numRows; i++){
            this.gridOcc[i] = {"obstacles" : [], "rockets" : []};
        }

        for (let i = 0; i<width/this.obsSize; i ++){
            let obs = new Food(createVector(i*this.obsSize, 0), this.obsSize);
            let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);

            obs = new Food(createVector(i*this.obsSize, height), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);
            this.numFixed += 2;
        }

        for (let i = 0; i<height/this.obsSize; i ++){
            let obs = new Food(createVector(0, i*this.obsSize), this.obsSize);
            let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);

            obs = new Food(createVector(width, i*this.obsSize), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);
            this.numFixed += 2;
        }

        let empty = 22;
        for (let i = empty; i<height/this.obsSize; i++){
            let obs = new Food(createVector(width*0.15, i*this.obsSize), this.obsSize);
            let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);
            
            obs = new Food(createVector(width*0.3, (i-empty)*this.obsSize), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);

            obs = new Food(createVector(width*0.45, i*this.obsSize), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);

            obs = new Food(createVector(width*0.6, (i-empty)*this.obsSize), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);

            obs = new Food(createVector(width*0.75, i*this.obsSize), this.obsSize);
            obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            append(this.gridOcc[obsIdx]["obstacles"], obs);
            append(this.obstacles, obs);
            this.numFixed += 5;
        }

        // for (let i = 0; i < this.numObs; i++){
        //     let obs = new Food(createVector(random(width), random(height)), this.obsSize);
        //     while (obs.pos.x < this.cellSize*2 && obs.pos.y > this.height - this.cellSize*2){
        //         obs.pos = createVector(random(width), random(height));
        //     }
        //     // let obs = new Food(createVector(width/2 + 100, height/2));
        //     let obsIdx = int(obs.pos.y/this.cellSize)*this.numCols + int(obs.pos.x/this.cellSize);
            
        //     append(this.gridOcc[obsIdx]["obstacles"], obs);
        //     append(this.obstacles, obs);
        // }

        for (let i = 0; i < this.numRockets; i++){
            let rocket = new Rocket(createVector(this.cellSize/2, height-this.cellSize/2), this.goalPos);
            let rocketIdx = int(rocket.pos.y/this.cellSize)*this.numCols + int(rocket.pos.x/this.cellSize);
            
            append(this.gridOcc[rocketIdx]["rockets"], rocket);
            append(this.rockets, rocket);
        }

        this.t = 0;
        this.generation = 0;
        this.fittestYet = 0;
        this.fittestLastGen = 0;
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

        // let i = 0;
        for (let i = this.rockets.length - 1; i>-1; i--){
        // for (let rocket of this.rockets){
            let rocket = this.rockets[i];
            if (rocket.daed) {continue;}
            if (i == 0){
                stroke(0, 200, 0);
            }
            else{
                stroke(0, 0, 200);
            }
            // i+=1;
            push();
            translate(rocket.pos.x, rocket.pos.y);
            rotate(rocket.heading);

            beginShape();
            vertex(0, rocket.rHeight/2);
            vertex(rocket.rWidth/2, -rocket.rHeight/2);
            vertex(0, 0);
            vertex(-rocket.rWidth/2, -rocket.rHeight/2);
            endShape(CLOSE);

            pop();

            // for (let ray of rocket.rays){
            //     ray.show();
            // }
        }

        stroke(200);
        text("Generation: " + str(this.generation), 30, 25);
        text("Fittest Yet: " + str(round(this.fittestYet, 4)), 30, 40);
        text("Fittest Last Gen.: " + str(round(this.fittestLastGen, 4)), 30, 55);
        fill(0, 200, 0);
        circle(this.goalPos.x, this.goalPos.y, 100);

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
                let rayVal = 2.0;
                for (let obs of currentCellObs){
                    let res = ray.cast(obs);
                    if (res){
                        // fill(200);
                        // circle(res.point.x, res.point.y, 2);
                        rayVal = res.dist/(this.cellSize*2);
                    }
                }
                append(raysData, rayVal);
            }
            // append(raysData, rocket.pos.x/width);
            // append(raysData, rocket.pos.y/height);
            // append(raysData, this.goalPos.x/width);
            // append(raysData, this.goalPos.y/height);
            
            rocket.control(raysData);
            rocket.step(dt);

            let rocketIdx = int(rocket.pos.y/this.cellSize)*this.numCols + int(rocket.pos.x/this.cellSize);
            append(this.gridOcc[rocketIdx]["rockets"], rocket);
            for (let obs of currentCellObs){
                let diff = p5.Vector.sub(rocket.pos, obs.pos);
                if (diff.mag() < (obs.size/2 + rocket.rHeight/2)){
                    rocket.dead = true;
                }
                if (rocket.pos.x < 0){rocket.dead = true;}
                else if (rocket.pos.x > width){rocket.dead = true;}
                if (rocket.pos.y < 0){rocket.dead = true;}
                else if (rocket.pos.y > height){rocket.dead = true;}
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
            let fitness = rocket.getFitness(this.maxFrames);
            // let f = int(rocket.pos.x/this.cellSize)*this.numRows+int(rocket.pos.y/this.cellSize)
            // fitness *= f;
            if (fitness>highestFitness){
                fittestRocket = rocket;
                highestFitness = fitness;
            }
        }

        if (highestFitness > this.fittestLastGen){
            this.fittestLastGen = highestFitness;
        }
        if (highestFitness > this.fittestYet){
            this.fittestYet = highestFitness;
        }
        return fittestRocket;
    }

    CloneFittest(fittestRocket){
        for (let rocket of this.rockets){
            rocket.copyBrain(fittestRocket);
        }
    }

    Mutate(){
        for (let i = 1; i<this.rockets.length; i++){
            let mr = this.mutationRate;
            if (i > this.rockets.length*0.6 && i < this.rockets.length*0.8){ mr += 0.3; }
            else if (i >= this.rockets.length*0.8){ mr += 0.9; }

            if (i <= this.rockets.length*0.8){
                this.rockets[i].brain.mutateDelta(mr);
            }else{
                this.rockets[i].brain.mutateComplete(mr);
            }
        }
    }

    RandomiseObstacles(){
        for (let i = 2*int(width/this.obsSize) + 2*int(height/this.obsSize); i < this.obstacles.length; i++){
            let obs = this.obstacles[i];
            obs.pos = createVector(random(width), random(height));
            while (obs.pos.x < this.cellSize*2 && obs.pos.y > this.height - this.cellSize*2){
                obs.pos = createVector(random(width), random(height));
            }
        }
    }

    step(dt){
        let numAlive = this.stepSimulation(dt);

        if (numAlive == 0 || this.t>this.maxFrames){
            let fittestRocket = this.FindFittestRocket();
            this.CloneFittest(fittestRocket);
            this.Mutate();
            this.ResetRockets();
            // this.RandomiseObstacles();
            this.generation += 1;
            this.t = 0;
        }
        
        this.t += 1;
    }
}
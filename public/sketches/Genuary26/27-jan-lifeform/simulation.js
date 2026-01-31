class Simulation{
    constructor(numThings){
        this.numThings = numThings;
        this.things = [];
        this.food = [];
        this.gridDiv = 80;
        this.numRows = int(height / this.gridDiv) + 1;
        this.numCols = int(height / this.gridDiv) + 1;
        this.gridOcc = {};

        this.kd = 2;
        this.kp = 1;

        for (let i = 0; i < this.numCols*this.numRows; i++){
            this.gridOcc[i] = {"food" : [], "things" : []};
        }

        for (let i = 0; i <this.numThings; i++){
            let thing = new Thing(createVector(random(width),random(height)), this.gridDiv);
            let thingIdx = thing.gridPos[0]*this.numCols + thing.gridPos[1]

            append(this.gridOcc[thingIdx]["things"], thing)
            append(this.things, thing);
        }

        for (let i = 0; i <random(30, 40); i++){
            let food = new Food(createVector(random(width),random(height)), this.gridDiv);
            let foodIdx = food.gridPos[0]*this.numCols + food.gridPos[1]
            
            append(this.gridOcc[foodIdx]["food"], food)
            append(this.food, food);
        }

    }

    render(){

        // stroke(200);
        // for (let r = 0; r <this.numRows; r++){
        //     line(0, r*this.gridDiv, width, r*this.gridDiv);
        // }
        // for (let c = 0; c <this.numCols; c++){
        //     line(c*this.gridDiv, 0, c*this.gridDiv, height);
        // }

        noStroke();

        fill(0, 0, 200, 200);
        for (let thing of this.things){
            push();
            translate(thing.pos.x, thing.pos.y);
            circle(0, 0, thing.size*2);
            pop();
        }

        fill(0, 200, 0, 200);
        for (let food of this.food){
            push();
            translate(food.pos.x, food.pos.y);
            circle(0, 0, food.size*2);
            pop();
        }
    }



    thingSteering(){
        for (let thing of this.things){
            let thingIdx = thing.gridPos[0]*this.numCols + thing.gridPos[1]
            let thingForce = createVector(0, 0);
            
            for (let food of this.gridOcc[thingIdx]["food"]){
                let p = p5.Vector.sub(food.pos, thing.pos);
                let d = p5.Vector.mult(thing.vel, -this.kd);
                p.mult(this.kp);

                thingForce.add(p);
                thingForce.add(d);
                thingForce.mult(food.size/10);
            }


            for (let otherThing of this.gridOcc[thingIdx]["things"]){
                let diff = p5.Vector.sub(thing.pos, otherThing.pos);
                diff.mult(otherThing.size/10);
                thingForce.add(diff);
            }
            thingForce.limit(100);

            thing.applyForce(thingForce);
        }
    }

    thingFeeding(){
        for (let thing of this.things){
            let thingIdx = thing.gridPos[0]*this.numCols + thing.gridPos[1]
            let thingForce = createVector(0, 0);
            
            for (let food of this.gridOcc[thingIdx]["food"]){
                let pDiff = p5.Vector.sub(food.pos, thing.pos);
                if (pDiff.mag() < (thing.size + food.size)){
                    thing.eat(food);
                }
            }
        }
    }


    cleanUp(){
        // console.log("this.food", this.food.length);
        for (let i = this.food.length - 1; i >= 0; i--) {
            if (this.food[i].size < 0.1) {
                this.food.splice(i, 1);
            }
        }

        for (let i = this.things.length - 1; i >= 0; i--) {
            if (!this.things[i].alive) {
                let deadThing = this.things.splice(i, 1);
                append(this.food, deadThing[0]);
            }
        }
    }

    reproduce(){
        let offsprings = [];
        for (let thing of this.things){
            let thingIdx = thing.gridPos[0]*this.numCols + thing.gridPos[1]
            for (let otherThing of this.gridOcc[thingIdx]["things"]){
                let diff = p5.Vector.sub(thing.pos, otherThing.pos);
                
                if (diff.mag() < (thing.size + otherThing.size)){
                    if (random() < 0.2){
                        thing.attack(otherThing);
                    }else{
                        let spawn = thing.reproduce(otherThing);
                        if (spawn){
                            append(offsprings, spawn);       
                        }
                    }
                }
            }
        }

        for (let offspring of offsprings){
            append(this.things, offspring);
            let offspringIdx = offspring.gridPos[0]*this.numCols + offspring.gridPos[1]
            append(this.gridOcc[offspringIdx]["things"], offspring)
        }
    }

    step(dt){
        
        // Steering
        this.thingSteering()

        // Feeding
        this.thingFeeding();

        // Repro
        this.reproduce();

        // Cleaning Lists
        this.cleanUp();

        // State stepping
        for (let i = 0; i < this.numCols*this.numRows; i++){
            this.gridOcc[i] = {"food" : [], "things" : []};
        }

        for (let thing of this.things){
            thing.step(dt);

            let thingIdx = thing.gridPos[0]*this.numCols + thing.gridPos[1]
            append(this.gridOcc[thingIdx]["things"], thing)
        }

        for (let food of this.food){
            let foodIdx = food.gridPos[0]*this.numCols + food.gridPos[1]
            append(this.gridOcc[foodIdx]["food"], food)
        }
    }
}
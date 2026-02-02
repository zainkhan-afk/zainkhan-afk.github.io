class Genotype{
    constructor(maxVel, maxTurn){
        this.values = [];
        this.maxVel = maxVel;
        this.maxTurn = maxTurn;
    }
    
    randomize(size){
        this.values = [];
        for (let i = 0; i < size; i++){
            append(this.values, [this.maxVel, random(-this.maxTurn, this.maxTurn)]);
        }
    }

    assignValues(newValues){
        this.values = [];
        for (let val of newValues){
            append(this.values, val);
        }
    }

    mutate(rate){
        // if (random() < rate){
        //     let mutateIdx = int(random(this.values.length-1));
        //     this.values[mutateIdx] = [this.maxVel, random(-this.maxTurn, this.maxTurn)];
        // }
        for (let i = 0; i < this.values.length; i++){
            if (random() < rate){
                // this.values[i] = [random(-this.maxVel, this.maxVel), random(-this.maxTurn, this.maxTurn)];
                this.values[i] = [this.maxVel, random(-this.maxTurn, this.maxTurn)];
            }
        }
    }
}
class Genotype{
    constructor(maxVel, maxTurn){
        this.values = [];
        this.maxVel = maxVel;
        this.maxTurn = maxTurn;
    }

    randomize(size){
        this.values = [];
        for (let i = 0; i < size; i++){
            append(this.values, [random(-this.maxVel, this.maxVel), random(-this.maxTurn, this.maxTurn)]);
        }
    }

    assignValues(newValues){
        this.values = [];
        for (let val in newValues){
            append(this.values, val);
        }
    }

    mutate(rate){
        if (random() < rate){
            let indexToMutate = int(random(this.values.length - 1));
            this.values[indexToMutate] = [random(-this.maxVel, this.maxVel), random(-this.maxTurn, this.maxTurn)];
        }
    }
}
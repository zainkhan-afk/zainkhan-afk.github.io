class Simulation{
    constructor(){
        this.entities = [];
        this.numEntities = 50;

        for (let i = 0; i <this.numEntities; i++){
            let e = new Entity(createVector(random(width), random(height)));
            e.randomizeGenome();
            append(this.entities, e);
        }

        this.t = 0;
    }


    render(){
        stroke(200, 0, 0);
        fill(0);
        let k = 0;
        for (let entity of this.entities){
            push();
            translate(entity.pos.x, entity.pos.y);
            rotate(entity.vel.heading());
            let angleDiv = TWO_PI/entity.genome.numlimbs;
            circle(0, 0, 50);
            for(let i = 0; i < entity.genome.numlimbs; i++){
                push();
                rotate(i*angleDiv);
                translate(0, 25);
                for (let j = 0; j < entity.genome.limbsemgent; j++){
                    let a = -PI/3*sin(this.t + j*PI/2+i*PI/10+k*PI) + map(noise(this.t + j + i*10 + k*100), 0, 1, -PI/3, PI/3);
                    rotate(a);
                    line(0, 0, 0, entity.genome.segmentlength);
                    circle(0, 0, 2);
                    translate(0, entity.genome.segmentlength);
                }
                pop();
            }
            k++;
            pop();
        }
    }

    step(dt){
        let centroid = createVector(0, 0);
        for (let entity of this.entities){
            centroid.add(entity.pos);
        }
        centroid.mult(1/this.entities.length);
        
        this.entities[0].pos.set(centroid);
        
        for (let entity of this.entities){
            let diff = p5.Vector.sub(centroid, entity.pos);
            // diff.mult(0.1)
            entity.applyForce(diff);
        }

        for (let entity of this.entities){
            entity.step(dt);
        }

        this.t += dt/4;
    }
}
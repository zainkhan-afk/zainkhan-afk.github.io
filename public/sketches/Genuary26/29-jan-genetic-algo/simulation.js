class Simulation{
    constructor(){
        this.entities = [];
        this.obstacles = [];
        this.rockets = [];
        this.numEntities = 10;
        this.numRockets = 10;

        for (let i = 0; i <this.numEntities; i++){
            let e = new Entity(createVector(random(width), random(height)));
            e.randomizeGenome();
            append(this.entities, e);
        }

        for (let i = 0; i < 50; i++){
            append(this.obstacles, new Food(createVector(random(width), random(height))));
        }

        for (let i = 0; i < this.numRockets; i++){
            append(this.rockets, new Rocket(createVector(random(width), random(height))));
        }



        this.t = 0;
    }


    render(){
        stroke(200, 0, 0);
        noFill();
        let k = 0;
        for (let entity of this.entities){
            push();
            translate(entity.pos.x, entity.pos.y);
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

        for (let obstacle of this.obstacles){
            push();
            translate(obstacle.pos.x, obstacle.pos.y);
            circle(0, 0, obstacle.size);
            pop();
        }

        for (let rocket of this.rockets){
            push();
            translate(rocket.pos.x, rocket.pos.y);
            rotate(rocket.heading);

            beginShape();
            vertex(0, 20);
            vertex(5, 0);
            vertex(-5, 0);
            endShape(CLOSE);

            pop();

            for (let ray of rocket.rays){
                ray.show();
            }
        }
    }

    step(dt){
        

        for (let rocket of this.rockets){
            rocket.control([0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5])
            for (let ray of rocket.rays){
                for (let obstacle of this.obstacles){
                    let res = ray.cast(obstacle);
                    console.log(res);
                }
            }
            rocket.step(dt);
        }

        for (let entity of this.entities){
            entity.step(dt);
        }

        this.t += dt/10;
    }
}
class Simulation{
    constructor(){
        this.obstacles = [];
        this.rockets = [];
        this.numRockets = 10;

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

        this.t += dt/10;
    }
}
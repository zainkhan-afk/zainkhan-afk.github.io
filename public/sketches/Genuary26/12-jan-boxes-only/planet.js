class Planet{
    constructor(pos, mass, planetShader = null){
        this.pos = pos;
        this.mass = mass;
        this.planetShader = planetShader;
        this.dim = this.mass/2;
        this.vel = createVector(0, 0, 0);
        this.acc = createVector(0, 0, 0);

        this.rotation = createVector(0, 0, 0);
        this.rotationAxis = createVector(int(random(2)), int(random(2)), int(random(2)));
        // this.omega = createVector(this.rotationAxis.x*random(-0.01, 0.01), this.rotationAxis.y*random(-0.01, 0.01), this.rotationAxis.z*random(-0.01, 0.01));
        this.omega = createVector(0, 0, 0);
        this.tail = [];
        this.counter = 0;
    }

    ApplyForce(f){
        this.acc.add(p5.Vector.mult(f, 1/this.mass));
    }

    Step(dt){
        if (this.counter % 10 == 0){
            append(this.tail, this.pos.copy());
            while (this.tail.length > 100){
                this.tail.splice(0, 1);
            }
        }
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.rotation.add(p5.Vector.mult(this.omega, dt))
        this.acc.set(0);


        this.counter += 1;
    }
}
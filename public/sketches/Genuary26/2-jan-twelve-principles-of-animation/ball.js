
class Ball{
    constructor(pos, mass, restitution, gravity = createVector(0.0, 0.01)){
        this.pos = pos;
        this.mass = mass;
        this.restitution = restitution;
        this.gravity = gravity;
        this.radius = this.mass / 100;
        this.vel = createVector(0, 0);
        this.acc = createVector(this.gravity);
        this.maxVel = 0.1;
    }

    ApplyForce(f){
        this.acc.x += f.x / this.mass;
        this.acc.y += f.y / this.mass;
    }

    FlipVelocity(axis){
        if (axis == 0){this.vel.x *= -this.restitution; }
        else if (axis == 1){this.vel.y *= -this.restitution; }
    }

    Step(dt){
        // this.vel.mult(this.restitution);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.vel.limit(this.maxVel);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        this.acc.set(this.gravity);
    }
}
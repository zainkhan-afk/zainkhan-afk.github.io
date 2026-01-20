class Light{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.goal = createVector(random(width), random(height));
        this.lightIntensity = 10;
        this.zOff = 0;
        this.xOff = random(width);
        this.yOff = random(width);
    }

    Step(dt){
        this.vel.limit(500);
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));
        let n = noise(this.pos.x/100 + this.xOff, this.pos.y/100 + this.yOff, this.zOff);
        let a = map(n, 0, 1, -PI, PI);
        this.acc = p5.Vector.fromAngle(a, 300);
        
        if (this.pos.x > width){this.pos.x = 0;}
        if (this.pos.x < 0){this.pos.x = width;}
        if (this.pos.y > height){this.pos.y = 0;}
        if (this.pos.y < 0){this.pos.y = height;}
        // this.acc = p5.Vector.mult(p5.Vector.sub(this.goal, this.pos), 0.5);
        // this.acc.set(0);
        this.zOff += random()/10;
    }
}
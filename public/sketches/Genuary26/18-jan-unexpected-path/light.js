class Light{
    constructor(pos){
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.goal = createVector(random(width), random(height));
        this.lightIntensity = random(1, 20);
        this.zOff = 0;
        this.reverse = random() > 0.5 ? 1:-1;
        this.xOff = random(width);
        this.yOff = random(width);
    }

    Step(dt, div){
        this.vel.add(p5.Vector.mult(p5.Vector.mult(this.acc, this.reverse), dt));
        this.vel.limit(100);
        this.pos.add(p5.Vector.mult(this.vel, dt));
        let r = int(this.pos.y/div);
        let c = int(this.pos.x/div);
        let n = noise(r/10 + this.xOff, c/10 + this.yOff, this.zOff);
        let a = map(n, 0, 1, -TWO_PI, TWO_PI);
        
        this.acc = p5.Vector.fromAngle(a, 100);

        // console.log('light', r, c, "->", n);


        
        if (this.pos.x > width){this.pos.x = 0;}
        if (this.pos.x < 0){this.pos.x = width;}
        if (this.pos.y > height){this.pos.y = 0;}
        if (this.pos.y < 0){this.pos.y = height;}
        // this.acc = p5.Vector.mult(p5.Vector.sub(this.goal, this.pos), 0.5);
        // this.acc.set(0);
        this.zOff += 0.01;//andom()/10;
    }
}
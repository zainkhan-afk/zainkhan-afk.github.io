class Thing{
    constructor(pos, gridDiv){
        this.pos = pos;
        this.gridDiv = gridDiv;
        this.gridPos = [
            int(this.pos.y/this.gridDiv),
            int(this.pos.x/this.gridDiv)
        ];
        this.vel = createVector(0, 0);
        this.prevVel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.size = 10;
        this.age = 0;
        this.alive = true;
        this.health = 100;
        this.damage = 10;
        this.hunger = 0;
        this.hungerThresh = 25;
        this.hungerStep = 0.01;
        this.hungerDamage = 0.5;
        this.feedAmount = 1;
        this.reproCoolDown = 0;
        this.reproCoolDownThresh = 10;
    }

    attack(other){
        other.health -= this.damage*this.size/100;
        // this.health -= other.damage*other.size/100;
    }

    reproduce(other){
        if (random() < 0.1 && this.reproCoolDown > this.reproCoolDownThresh){
            this.reproCoolDown = 0;
            other.reproCoolDown = 0;
            
            this.hunger -= 1;
            other.hunger -= 1;

            return new Thing(this.pos.copy(), this.gridDiv);
        }
    }

    eat(other){
        if (other.size <= 0){return;}
        let amount = min(other.size, this.feedAmount);
        other.size -= amount;
        other.health += amount;
        this.hunger -= amount/10;
        this.size += amount/10;
    }

    applyForce(f){
        this.acc.add(f);
    }

    step(dt){
        if (!this.alive) {return;}
        if (this.health <= 0){
            this.alive = false;   
        }
        this.prevVel = this.vel.copy();
        this.vel.add(p5.Vector.mult(this.acc, dt));
        this.pos.add(p5.Vector.mult(this.vel, dt));

        if (this.pos.x < 0){this.pos.x = width-1;}
        else if (this.pos.x >= width){this.pos.x = 1;}
        if (this.pos.y < 0){this.pos.y = height-1;}
        else if (this.pos.y >= height){this.pos.y = 1;}
        
        this.gridPos = [
            int(this.pos.y/this.gridDiv),
            int(this.pos.x/this.gridDiv)
        ];

        this.acc.set(0);

        this.hunger += this.hungerStep;
        this.age += 0.1;
        if (this.age > 20){
            this.reproCoolDown += 0.1;
        }
        if (this.hunger > this.hungerThresh){
            this.health -= this.hungerDamage;
        }        
    }
}
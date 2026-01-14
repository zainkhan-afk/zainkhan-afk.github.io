class adjustableQuad{
    constructor(pos, rot, color, w1, h1, w2, h2){
        this.pos = pos;
        this.rot = rot;
        this.color = color;


        
        // let baseLen1 = baseLength*verticalLineFraction;
        // let hyp1 = Math.sqrt(pow(baseLen1, 2) + pow(verticalPointHeight, 2));
        // let theta1 = atan2(verticalPointHeight, baseLen1);
        
        // let hyp2 = Math.sqrt(pow(baseLen2, 2) + pow(verticalPointHeight, 2));
        // let x = hyp1*cos(theta1);
        // let y = hyp1*sin(theta1);

        
        this.vertices = [
            [-w1/2, -h1/2],
            [w1/2, -h2/2],
            [w2/2, h2/2],
            [-w2/2, h1/2],
        ];
    }


    Render(){
        push();
        fill(this.color);
        translate(this.pos[0], this.pos[1]);
        rotate(this.rot);

        beginShape();
        for (let v of this.vertices){
            vertex(v[0], v[1]);
        }
        endShape(CLOSE);

        pop();
    }
}
class circ{
    constructor(pos, rot, color, r){
        this.pos = pos;
        this.rot = rot;
        this.color = color;
        this.r = r;

        this.vertices = [];
        for (let ang = 0; ang < TWO_PI; ang += TWO_PI/40){
            let x = this.r*cos(ang);
            let y = this.r*sin(ang);

            append(this.vertices, [x, y]);
        }
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
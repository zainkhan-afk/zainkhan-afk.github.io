class BauhausCircles{
    constructor(red, blue, yellow, black){
        this.red = red;
        this.blue = blue;
        this.yellow = yellow;
        this.black = black;

        this.allColors = [this.red, this.blue, this.yellow, this.black];

        this.numRows = 7;
        this.numCols = 7;
        this.radius = 50;

        this.shapes = ['full', 'semi', 'quarter'];
        this.rotations = [PI, HALF_PI];
    }

    RenderShape(x, y, shapeName){
        push();
        translate(x, y);
        rotate(this.rotations[int(random(this.rotations.length))]);
        if (shapeName === 'full'){
            circle(0, 0, this.radius*2);
        }

        if (shapeName === 'semi'){
            beginShape();
            for (let i = 0; i < PI; i += PI/100 ){
                let px = this.radius*cos(i);
                let py = this.radius*sin(i);
                vertex(px, py);

            }
            endShape();
        }

        if (shapeName === 'quarter'){
            beginShape();
            for (let i = 0; i < HALF_PI; i += PI/100 ){
                let px = this.radius*cos(i);
                let py = this.radius*sin(i);
                vertex(px, py);
            }
            vertex(0, 0);
            endShape();
        }
        pop();
    }
    
    Render(){
        let xOff = (width - this.numCols*this.radius*2) / 2 + this.radius;
        let yOff = (height - this.numRows*this.radius*2) / 2 ;

        noStroke();

        for (let r = 0; r<this.numRows; r++){
            for (let c = 0; c<this.numCols; c++){
                let x = c*this.radius*2 + xOff;
                let y = r*this.radius*2 + yOff;
                
                let i;

                i = r + c;

                let colorIndex = int(random(this.allColors.length))
                let shapeIndex = int(random(this.shapes.length))

                fill(this.allColors[colorIndex]);
                this.RenderShape(x, y, this.shapes[shapeIndex]);
            }
        }

        stroke(0);
        let h = 100;
        fill(this.black);
        textSize(30);
        text("Genuary", 100, height - h/2);
        text("2026", width - 200, height - h/2)
    }
}
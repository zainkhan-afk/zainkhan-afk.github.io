class Wallpaper1{
    constructor(){
        this.hexagonPoints = [];
        this.hexagonLength = 10;
        this.numRows;
        this.numCols;

        for (let i = 0; i<6; i++){
            let x = this.hexagonLength*cos(TWO_PI/6*i);
            let y = this.hexagonLength*sin(TWO_PI/6*i);
            append(this.hexagonPoints, [x, y]);
        }
        this.numRows = height / (4*this.hexagonLength);
        this.numCols = width / (4*this.hexagonLength);
    }

    Render(){
        background(200, 150, 0);
        fill(200, 0, 0);
        stroke(0);
        strokeWeight(5);

        for (let r = 0; r < this.numRows; r++){
            for (let c = 0; c < this.numCols; c++){
            let y = r*this.hexagonLength*4;
            let x = c*this.hexagonLength*4 + r%2*this.hexagonLength*2;

            line(0, y + this.hexagonLength*2, width, y + this.hexagonLength*2);
            line(x, y, x, y + (c%2 == 0 ? -this.hexagonLength*2:this.hexagonLength*2))

            push();
            translate(x, y);
            rotate(PI/6);
            beginShape();
            for (let hexPt of this.hexagonPoints){
                vertex(hexPt[0], hexPt[1]);
            }
            endShape(CLOSE);
            pop();
            }
        }
    }
}
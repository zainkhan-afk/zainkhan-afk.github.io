class Wallpaper2{
    constructor(){
        this.span = 25;
        this.l1 = this.span * 0.5;
        this.l2 = this.span * 0.2;
        this.numRows = height / (2*this.span);
        this.numCols = width / (2*this.span);
        this.ang = 0;
    }

    Render(){
        background(255);
        // background(100, 200, 0);
        // fill(255, 0, 0);
        noFill();
        for (let r = 0; r < this.numRows; r++){
            for (let c = 0; c < this.numCols; c++){
                let y = r*this.span*2;
                let x = c*this.span*2;
                
                let freq1 = PI / 10 + c%3 * PI/10 + this.ang;
                let freq2 = PI / 10 + r%3 * PI/10 + this.ang;
                push();
                translate(x, y);
                // noFill();
                beginShape();
                for (let i = 0; i < 100; i+=5){
                    let px = this.l1*cos(i*freq1) + this.l2*cos(i*freq2);
                    let py = this.l1*sin(i*freq1) + this.l2*sin(i*freq2);
                    console.log(px, py)
                    vertex(px, py);
                }
                endShape();
                pop();

                this.ang += 0.000001;

            }
        }
        // noLoop();
    }
}
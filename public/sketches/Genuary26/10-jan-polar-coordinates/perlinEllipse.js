class PerlinEllipse{
    constructor(pos, rot, r1, r2, numPts = 100, noiseOffset = 0, noiseMaxAmp = 10, fillColor = color(200, 200, 200), strokeLine=false){
        this.pos = pos;
        this.rot = rot;
        this.r1 = r1;
        this.r2 = r2;
        this.numPts = numPts;
        this.noiseOffset = noiseOffset;
        this.noiseMaxAmp = noiseMaxAmp;
        this.fillColor = fillColor;
        this.strokeLine = strokeLine;

        this.angleDiff = TWO_PI / this.numPts;
    }


    Render(z){
        translate(this.pos.x, this.pos.y);
        rotate(this.rot);

        fill(this.fillColor);
        if (this.strokeLine){
            stroke(0);
        }else{
            noStroke();
        }
        // stroke(100, 0, 0);
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += this.angleDiff){
            let x = map(cos(angle), -1, 1, 0, this.noiseMaxAmp);
            let y = map(sin(angle), -1, 1, 0, this.noiseMaxAmp);

            let n = noise(x, y, z+this.noiseOffset);
            
            let m1 = map(n, 0, 1, this.r1, 50 + this.r1);
            let m2 = map(n, 0, 1, this.r2, 50 + this.r2);
            
            let ptX = m1*cos(angle);
            let ptY = m2*sin(angle);
            vertex(ptX, ptY);
        }
        endShape(CLOSE);

    }
}
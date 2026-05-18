class BauhausPoster{
    constructor(red, blue, yellow, black){
        this.red = red;
        this.blue = blue;
        this.yellow = yellow;
        this.black = black;
        this.polygonSides = 8;
        this.numRings = 4;
        this.ringConstantSize = 100;
        this.ringSizeDiff = 40;
        this.orange = color(240, 120, 0);
        this.ringYOffset = 0;
    }

    RenderSquiglyLines(yStart){
        push();
        // rotate(PI/60);
        noFill();
        strokeWeight(0.5);
        // for (let y = -100; y < height+100; y+=5){
        // console.log(height, int(height/2), height%5);
        // for (let y = int((height-height%10)/2); y < height+100; y+=5){
        for (let y = yStart; y < height+100; y+=5){
            if (y%10 == 0){
                stroke(this.blue);
            }
            else if (y%5 == 0){
                stroke(this.black);
            }
            beginShape();
            for (let x = 0; x < width*1.5; x+=1){
                let n = map(noise(x/width*10, y/height*12), 0, 1, -1, 1)*20;
                // let n = noise(x+y);
                vertex(x, y+n);
            }
            endShape();
        }
        strokeWeight(1);
        pop();
    }

    RenderConcentricHexagons(){
        noStroke();
        push();
        translate(width/2, height/2);
        rotate(PI/this.polygonSides);

        fill(200, 210, 200, 220);
        beginShape();
        for (let j = 0; j < this.polygonSides; j++){
            let x = (this.ringConstantSize + this.ringSizeDiff*(this.numRings))*cos(j*TWO_PI/this.polygonSides);
            let y = (this.ringConstantSize + this.ringSizeDiff*(this.numRings))*sin(j*TWO_PI/this.polygonSides);
            vertex(x, y);
        }
        endShape();
        pop();

        for(let i = this.numRings; i > 0; i--){
            push();
            translate(width/2, height/2 - i*this.ringYOffset);
            rotate(PI/this.polygonSides);

            let r = this.orange.levels[0];
            let g = this.orange.levels[1];
            let b = this.orange.levels[2];
            let a = this.orange.levels[3];
            fill(r, g, b, a-(i+1)*40);
            // stroke(0, i*30);
            // circle(0, 0, i*2*50);
            beginShape();
            for (let j = 0; j < this.polygonSides; j++){
                let x = (this.ringConstantSize + this.ringSizeDiff*i)*cos(j*TWO_PI/this.polygonSides);
                let y = (this.ringConstantSize + this.ringSizeDiff*i)*sin(j*TWO_PI/this.polygonSides);
                vertex(x, y);
            }
            
            endShape(CLOSE);
            pop();
        }

        noFill();
        for(let i = this.numRings; i > 1; i--){
            let a = this.orange.levels[3];
            stroke(0, i*30);
            push();
            translate(width/2, height/2 - (i)*this.ringYOffset);
            rotate(PI/this.polygonSides);

            for (let j = 0; j < this.polygonSides; j++){
                let x1 = (this.ringConstantSize + this.ringSizeDiff*i)*cos(j*TWO_PI/this.polygonSides);
                let y1 = (this.ringConstantSize + this.ringSizeDiff*i)*sin(j*TWO_PI/this.polygonSides);
                let x2 = (this.ringConstantSize + this.ringSizeDiff*(i-1))*cos(j*TWO_PI/this.polygonSides);
                let y2 = (this.ringConstantSize + this.ringSizeDiff*(i-1))*sin(j*TWO_PI/this.polygonSides) + this.ringYOffset;
                // line(x1, y1, x2, y2);
            }
            pop();
        }

    }

    RenderFont(){
        stroke(0);
        fill(this.black);
        textSize(40);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        // textFont(this.urduFont)
        for ( let i = 0; i < genuary.length; i ++){
            // text(genuary[i], 120, 50 + 40*i);
            text(this.urduText, 80, 50 + 40*i);
            // break;

        }

        textFont(font);
        let h = 100;
        noFill();
        noStroke();
        fill(240, 240, 200)
        rect(0, height - h, width, h);
        rect(0, 0, h/2, height);
        rect(width-h/2, 0, width, height);
        rect(0, 0, width, h/2);

        stroke(0);
        fill(this.black);
        textSize(30);
        text("Genuary", 100, height - h/2);
        text("2026", width - 100, height - h/2);
    }

    Render(){
        this.RenderSquiglyLines(-100);
        this.RenderConcentricHexagons();
        this.RenderSquiglyLines(int((height-height%10)/2));
        this.RenderFont();
    }
}
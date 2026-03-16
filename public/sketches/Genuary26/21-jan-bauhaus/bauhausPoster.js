class BauhausPoster{
    constructor(red, blue, yellow, black){
        this.red = red;
        this.blue = blue;
        this.yellow = yellow;
        this.black = black;
        this.polygonSides = 8;
        this.numRings = 3;
        this.ringConstantSize = 100;
        this.ringSizeDiff = 40;
        this.orange = color(240, 120, 0);
        this.ringYOffset = 0;
    }

    RenderConcentricCirlces(){
        noStroke();
        for(let i = this.numRings; i > 0; i--){
            let r = this.orange.levels[0];
            let g = this.orange.levels[1];
            let b = this.orange.levels[2];
            let a = this.orange.levels[3];
            fill(r, g, b, a - i*30);
            circle(width/2, height/2, 100*i);
        }
    }

    RenderConcentricHexagons(){
        noStroke();
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
                // beginShape();
                // for(let i = 5; i > 0; i--){
                //     // push();
                //     let x = width/2 + 50*i*cos(j*TWO_PI/6);
                //     let y = height/2 - i*yOff + 50*i*sin(j*TWO_PI/6);
                //     vertex(x, y);
                //     // pop();
                // }
                // endShape();
            }
            pop();
        }



        // fill(180);
        // beginShape();
        // for (let j = 0; j < 6; j++){
        //     let x = 25*cos(j*TWO_PI/6);
        //     let y = 25*sin(j*TWO_PI/6);
        //     vertex(x, y);
        // }
        // endShape(CLOSE);

    }

    RenderLines(){
        stroke(0);
        fill(0);
        for (let i = this.numRings; i>0; i--){
            push();
            translate(width/2, height/2 - i*this.ringYOffset);
            rotate(TWO_PI/(this.polygonSides*1.5));

            for (let j = 0; j<this.polygonSides; j++)
            {
                let angle = j*TWO_PI/this.polygonSides;
                beginShape();
                for (let k = 0; k<4; k++){
                    let offset = 0;
                    let p = 0;
                    if (k == 2 || k==3){offset = TWO_PI/18;}
                    if (k == 1 || k == 2) { p -= 20;}

                    let x = i*((this.ringConstantSize-6)+p)*cos(angle + offset);
                    let y = i*((this.ringConstantSize-6)+p)*sin(angle + offset); 
                    vertex(x, y);
                }
                endShape();
            }
            pop();
        }
    }

    RenderMan(){
        let headDiameter = 30;
        push();
        translate(width/2, height/2);
        fill(200);
        ellipse(0, 0, headDiameter/1.2, headDiameter);

        fill(0);
        beginShape();
        vertex(-headDiameter/3, -headDiameter/5);
        vertex(headDiameter/3, -headDiameter/5);
        vertex(headDiameter/3, headDiameter/5);
        vertex(-headDiameter/3, headDiameter/5);
        endShape();
        pop();
    }

    Render(){
        // this.RenderConcentricCirlces();
        this.RenderConcentricHexagons();
        // this.RenderLines();
        this.RenderMan();
    }
}
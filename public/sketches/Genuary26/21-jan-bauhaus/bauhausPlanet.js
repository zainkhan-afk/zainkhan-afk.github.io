class BauhausPlanet{
    constructor(numRows, numCols, div){
        this.numRows = numRows;
        this.numCols = numCols;
        this.div = div;

        this.red = color(200, 0, 0);
        this.blue = color(0, 0, 200);
        this.yellow = color(200, 170, 0);
        this.black = color(0, 0, 0);
    }

    drawBG(){
        push();
        translate(0, -height/4);
        stroke(100);
        noFill();
        
        let circleXOffset1 = -width/2;
        let circleXOffset2 = width/2;

        let yOff = 0;

        for(let c = 0; c < int(this.numCols/2); c++){
            let diametery = 100 + c*80;
            let diameterx = 100 + c*18;
            let x1 = c*this.div;
            let x2 = ((this.numCols - 1) - c)*this.div; 
            yOff -= 10;
            ellipse(x1 + circleXOffset1, height/2 + yOff, diameterx, diametery);
            ellipse(x2 + circleXOffset2, height/2 - yOff, diameterx, diametery);
        }
        line(width/2 - this.div/4, 0, width/2 - this.div/4, height*2);


        let circleYOffset1 = -height/2;
        let circleYOffset2 = height/2;
        let xOff = 0;

        for(let r = 0; r < int(this.numRows/2); r++){
            let diameterx = 100 + r*80;
            let diametery = 100 + r*18;
            let y1 = r*this.div;
            let y2 = ((this.numRows - 1) - r)*this.div; 
            xOff -= 10;
            ellipse(width/2 + xOff, y1 + circleYOffset1, diameterx, diametery);
            ellipse(width/2 - xOff, y2 + circleYOffset2, diameterx, diametery);
        }
        line(0, height/2 - this.div/4, width, height/2 - this.div/4);
        pop();
    }

    drawPlanet(){
        noStroke();
        fill(this.red);
        circle(width/2, height/4, 200);
        noFill();
        stroke(this.red)
        strokeWeight(3);
        for (let i = 0; i < 21; i++){
            circle(width/2, height/4, i*10);
        }
        
        stroke(0);
        strokeWeight(1);
        noStroke();
        fill(this.yellow);
        beginShape();
        let minRange1 = -PI/3.45; 
        let maxRange1 = (PI + PI/3.34);

        for (let i = minRange1; i < maxRange1; i += PI/100){
            let x = width/2 + 150*cos(i);
            let y = (height/4) + 50*sin(i);
            vertex(x, y);
        }
        let minRange2 = -PI/3.6; 
        let maxRange2 = (PI + PI/3.6);
        for (let i = maxRange2; i > minRange2; i -= PI/100){
            let x = width/2 + 150*cos(i);
            let y = (height/4) + 25*sin(i);
            vertex(x, y);
        }
        endShape();
    }

    drawFont(){
        stroke(0);
        fill(this.black);
        textSize(40);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        for ( let i = 0; i < genuary.length; i ++){
            text(genuary[i], 120, 50 + 40*i);
        }

        let h = 100;
        noFill();
        noStroke();
        fill(240, 240, 200)
        rect(0, height - h, width, h);

        stroke(0);
        fill(this.black);
        textSize(30);
        text("Genuary26", 100, height - h/2);
        text("2026", width - 100, height - h/2);
    }

    drawLine(){
        fill(this.blue);
        noStroke();
        for (let i = 0; i < 10; i ++){
            push();
            translate(0, -i*50);
            beginShape();
            vertex(1.5*width, height/2);
            vertex(-100, height);
            vertex(-500, height);
            endShape();
            pop();
        }
    }

    Render(){
        this.drawBG();
        this.drawLine();
        this.drawPlanet();
        this.drawFont();
    }
}
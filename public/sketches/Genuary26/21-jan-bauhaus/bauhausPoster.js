class BauhausPoster{
    constructor(red, blue, yellow, black){
        this.red = red;
        this.blue = blue;
        this.yellow = yellow;
        this.black = black;
        this.orange = color(240, 120, 0);
    }

    RenderConcentricCirlces(){
        noStroke();
        for(let i = 5; i > 0; i--){
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
        push();
        translate(width/2, height/2);
        for(let i = 5; i > 0; i--){
            let r = this.orange.levels[0];
            let g = this.orange.levels[1];
            let b = this.orange.levels[2];
            let a = this.orange.levels[3];
            fill(r, g, b, a - i*30);
            beginShape();
            for (let j = 0; j < 6; j++){
                let x = 50*i*cos(j*TWO_PI/6);
                let y = 50*i*sin(j*TWO_PI/6);
                vertex(x, y);
            }
            endShape(CLOSE);
        }

        // fill(180);
        // beginShape();
        // for (let j = 0; j < 6; j++){
        //     let x = 25*cos(j*TWO_PI/6);
        //     let y = 25*sin(j*TWO_PI/6);
        //     vertex(x, y);
        // }
        // endShape(CLOSE);

        pop();
    }

    RenderLines(){
        push();
        translate(width/2, height/2);
        rotate(TWO_PI/18);
        stroke(0);
        fill(0);
        for (let i = 5; i>0; i--){
            
            for (let j = 0; j<6; j++)
            {
                let angle = j*TWO_PI/6;
                beginShape();
                for (let k = 0; k<4; k++){
                    let offset = 0;
                    let p = 0;
                    if (k == 2 || k==3){offset = TWO_PI/18;}
                    if (k == 1 || k == 2) { p -= 5;}

                    let x = i*((50-6)+p)*cos(angle + offset);
                    let y = i*((50-6)+p)*sin(angle + offset); 
                    vertex(x, y);
                }
                endShape();
            }
        }
        pop();
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
        this.RenderLines();
        this.RenderMan();
    }
}
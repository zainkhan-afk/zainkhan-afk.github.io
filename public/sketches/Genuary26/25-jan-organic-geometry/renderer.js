class Renderer{
    constructor(){
        this.div = 5;
        this.delta = 20;
    }

    RenderLightPos(lightPos){
        let C = int(lightPos.x/this.div);
        let R = int(lightPos.y/this.div);
        for (let r = R-this.delta; r < R+this.delta+1; r++){
            for (let c = C-this.delta; c < C+this.delta+1; c++){
                let d = Math.sqrt(pow(R - r, 2) + pow(C - c, 2));
                let val = 300/d;
                let x = c*this.div;
                let y = r*this.div;
                fill(val, val*0.8, 0);
                rect(x, y, this.div, this.div);
            }
        }
    }

    RenderMoths(moths){
        fill(100);
        for (let moth of moths){
            push();
            translate(moth.pos.x, moth.pos.y);
            rotate(moth.heading);
            rect(0, 0, 20, 5);
            
            circle(5, moth.step % 3 == 0 ? 8:-5, 10);
            circle(15, moth.step % 3 == 0 ? 8:-5, 10);
            
            pop();
        }
    }

    Render(moths, lightPos){
        noStroke();
        this.RenderLightPos(lightPos);
        this.RenderMoths(moths);
    }
}
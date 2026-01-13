class PolygonPortrait{
    constructor(){
        this.facePolygons = [];
        this.bodyPolygons = [];
        
        append(this.facePolygons, new adjustableTriangle([0, -90], -PI/10, color(165, 126, 110), 250, 0.2, 150));
        append(this.facePolygons, new adjustableTriangle([40, -200], PI/10, color(165, 126, 110), 200, 0, 50));
        append(this.facePolygons, new adjustableTriangle([50, -145], PI/30, color(255, 0, 0, 255), 200, 0.25, 15));
        append(this.facePolygons, new adjustableQuad([40, -125], 0, color(0, 0, 0), 35, 40, 30, 60));
        append(this.facePolygons, new adjustableQuad([40, -125], 0, color(100), 32, 30, 25, 50));
        append(this.facePolygons, new adjustableTriangle([0, 0], -PI/6, color(0, 0, 0), 250, 0.25, 80));
        
        
        append(this.facePolygons, new adjustableQuad([120, -225], -PI/20, color(0), 200, 20, 200, 50));
        append(this.facePolygons, new adjustableQuad([150, -225], PI/20, color(0), 150, 50, 200, 100));
        append(this.facePolygons, new adjustableQuad([250, -150], 0, color(0), 90, 220, 80, 80));
        
        append(this.facePolygons, new circ([200, -95], 0, color(165, 126, 110), 30));



        append(this.bodyPolygons, new adjustableQuad([60, -100], 0, color(165, 126, 110), 120, 300, 100, 550));
        append(this.bodyPolygons, new adjustableQuad([100, 0], 0, color(0), 400, 400, 480, 380));
        append(this.bodyPolygons, new adjustableTriangle([50, -195], PI/2, color(0, 50, 20), 200, 0.1, 20));


    }


    drawFace(){
        push();
        translate(240, 450);
        for (let poly of this.facePolygons){
            poly.Render();
        }
        pop();
    }

    drawBody(){
        push();
        translate(340, 700);
        for (let poly of this.bodyPolygons){
            poly.Render();
        }
        pop();
    }

    drawPortrait(){
        noStroke();
        this.drawBody()
        this.drawFace();
    }
}
class PolygonPortrait{
    constructor(){
        this.facePolygons = [];

        append(this.facePolygons, new adjustableTriangle([0, 0], 0, color(0, 0, 0, 10), 100, 0.25, 5));
        append(this.facePolygons, new adjustableTriangle([-30, 30], -PI/10, color(165, 126, 110), 100, 0.45, 50));
        append(this.facePolygons, new adjustableQuad([-10, 10], 0, color(0, 0, 0), 20, 40, 20, 60));
        append(this.facePolygons, new adjustableQuad([-10, 10], 0, color(100), 18, 30, 18, 50));
        append(this.facePolygons, new adjustableTriangle([0, 70], -PI/6, color(0, 0, 0), 100, 0.25, 30));
    }


    drawFace(){
        push();
        translate(100, 100);
        for (let poly of this.facePolygons){
            poly.Render();
        }
        pop();
    }

    drawPortrait(){
        this.drawFace();
    }
}
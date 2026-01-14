class ShapeGenerator{
    static minShapeRadius = 0.05;
    static maxShapeRadius =  0.15;

    static SetShapeMinMaxSize(minSize, maxSize){
        ShapeGenerator.minShapeRadius = minSize;
        ShapeGenerator.maxShapeRadius = maxSize;
    }

    static GetShape(){
        let n = int(random(4, 4));
        let vertexDistFromCenter = random(ShapeGenerator.minShapeRadius, ShapeGenerator.maxShapeRadius);
        let angleDiff = TWO_PI / n;
        
        let vertices = [];
        let edges = [];
        
        for (let i = 0; i<n; i++){
            let x = vertexDistFromCenter*cos(i*angleDiff + PI/4);
            let y = vertexDistFromCenter*sin(i*angleDiff + PI/4);

            append(vertices, createVector(x, y));
            append(edges, [i, (i+1) % n]);
        }

        return new Shape(vertices, edges);
    }
}
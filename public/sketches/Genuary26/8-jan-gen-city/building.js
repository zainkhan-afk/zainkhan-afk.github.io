class Building{
    constructor(pos, rotation){
        this.pos = pos;
        this.rotation = rotation;
        this.shapes = [];
        append(this.shapes, ShapeGenerator.GetShape());


        for (let i = 0; i<5; i++){
            if (random() < 0.1){
                let shapeToAppendTo = int(random(this.shapes.length-1));
                let sideToAppendTo = int(random(this.shapes[shapeToAppendTo].edges.length))
                let newShape = this.shapes[shapeToAppendTo].TransformShapeAsExtension(sideToAppendTo, ShapeGenerator.GetShape());
                append(this.shapes, newShape);
            }
        }
        console.log("Num Shapes", this.shapes.length);

    }
};
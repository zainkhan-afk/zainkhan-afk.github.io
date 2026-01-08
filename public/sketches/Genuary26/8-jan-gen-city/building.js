class Building{
    constructor(pos, rotation){
        this.pos = pos;
        this.rotation = rotation;
        this.mainShapeVertices = [];
        this.extesions= [];

    }

    Render(){
        push();
        translate(this.pos);
        rotate(this.rotation);
        pop();
    }
};
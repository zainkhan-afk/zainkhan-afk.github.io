class VertexMaker{
    static GetVertices(n, r){
        let angleDiff = TWO_PI / n;
        let vertices = [];

        for (let angle = 0; angle < TWO_PI; angle += angleDiff){
            let x = r*cos(angle);
            let y = r*sin(angle);

            append(vertices, [x, y]);
        }

        return vertices;
    }
};
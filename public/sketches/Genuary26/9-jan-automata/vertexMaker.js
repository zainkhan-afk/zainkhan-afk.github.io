class VertexMaker{
    static GetVertices(n, r){
        let vertices = [];

        if (n == 0){return append(vertices, [0, 0]);}
        else{
            let angleDiff = TWO_PI / n;

            for (let angle = 0; angle < TWO_PI; angle += angleDiff){
                let x = r*cos(angle);
                let y = r*sin(angle);

                append(vertices, [x, y]);
            }
        }

        return vertices;
    }
};
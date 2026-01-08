class Shape{
    constructor(vertices, edges){
        this.vertices = vertices;
        this.edges = edges;
        this.height = random(10, 20);
    }

    Translate(tx){
        for (let pt of this.vertices){
            pt.add(tx);
        }
    }

    Rotate(ang){
        for (let pt of this.vertices){
            pt.rotate(ang);
        }
    }

    GetSize(){
        let minX = 100000;
        let maxX = 0;
        let minY = 100000;
        let maxY = 0;
        for (const v of this.vertices) {
            if (v.x < minX) minX = v.x;
            if (v.x > maxX) maxX = v.x;
            if (v.y < minY) minY = v.y;
            if (v.y > maxY) maxY = v.y;
        }

        return [maxX - minX, maxY - minY];
    }

    GetEdgeMidPoints(){
        let edgeMidPts = [];
        for (let edge of this.edges){
            let midPt = p5.Vector.add(this.vertices[edge[0]], this.vertices[edge[1]]);
            midPt.mult(1/2);
            append(edgeMidPts, midPt);
        }
        return edgeMidPts;
    }

    FindClosestPoint(ptRef, ptList){
        let closestDist = 10000;
        let closestPtIndex = 0;
        let index = 0;
        for (let pt of ptList){
            let d = ptRef.dist(pt);
            if (d < closestDist){
                d = closestDist;
                closestPtIndex = index;
            }
            index += 1;
        }

        return closestPtIndex;
    }

    TransformShapeAsExtension(combineEdgeIdx, dstShape){
        let currentEdgeMidPt = p5.Vector.add(this.vertices[this.edges[combineEdgeIdx][0]], this.vertices[this.edges[combineEdgeIdx][1]]);
        currentEdgeMidPt.mult(1/2);
        dstShape.Translate(currentEdgeMidPt);
        dstShape.Translate(currentEdgeMidPt);

        return dstShape;
    }

    CombineShapes(combineEdgeIdx, dstShape){
        // TODO: Complete this method after the challenge. This will help in creating a combined shape that has accurate vertices.
        let currentEdgeMidPt = p5.Vector.add(this.vertices[this.edges[combineEdgeIdx][0]], this.vertices[this.edges[combineEdgeIdx][1]]);
        currentEdgeMidPt.mult(1/2);
        dstShape.Translate(currentEdgeMidPt);
        // dstShape.Translate(currentEdgeMidPt);

        let dstCombineEdgeIdx = this.FindClosestPoint(currentEdgeMidPt, dstShape.GetEdgeMidPoints());


        let dstEdgeMidPt = p5.Vector.add(dstShape.vertices[dstShape.edges[dstCombineEdgeIdx][0]], dstShape.vertices[dstShape.edges[dstCombineEdgeIdx][1]]);
        dstEdgeMidPt.mult(1/2);

        let newVertices = [];
        let newEdges = [];

        for (let i = 0; i < this.vertices.length; i++){
            if (i in this.edges[combineEdgeIdx] && ((i+1)%this.vertices.length) in this.edges[combineEdgeIdx]){
                append(newVertices, this.vertices[i].copy());
                for (let j = 0; j < dstShape.vertices.length; j++){
                    let adjustedIndex = (dstShape.edges[dstCombineEdgeIdx][0] + j) % dstShape.vertices.length;
                    append(newVertices, dstShape.vertices[adjustedIndex].copy());
                }
            }else{
                append(newVertices, this.vertices[i].copy());
            }
        }

        return new Shape(newVertices, newEdges);
    }
};

class Renderer{
    constructor(){

    }
    ToScreen(pt){
        return p5.Vector.mult(pt, createVector(width, height));
    }

    RenderShape(vertices, edges){
        beginShape();
        // for(let edge of edges){
        for(let vt of vertices){
            let vt_ = this.ToScreen(vt);
            // let pt1 = this.ToScreen(vertices[edge[0]]);
            // let pt2 = this.ToScreen(vertices[edge[1]]);
            vertex(vt_.x, vt_.y);
            // vertex(pt2.x, pt2.y);
        }
        endShape(CLOSE);

        // box(70, 70, 70);
    }

    RenderGrid(grid){
        noStroke();
        for (let c = 0; c < grid.numCols; c++){
            for (let r = 0; r < grid.numRows; r++){
                let x = c*grid.size;
                let y = r*grid.size;
                let val = grid.grid[r][c];
                

                push();
                translate(x, y);
                const roadMap = new Map();
                grid.roadPts.forEach(([r, c]) => roadMap.set(`${r},${c}`, true));
                // if (grid.roadPts.includes([r, c])){
                if(roadMap.has(`${r},${c}`)){
                    fill(0);
                }
                else{    
                    if (val > 0.8) {
                        fill(80, 180 - val * 40, 90);
                    }
                    
                    else if (val > 0.5) {
                        fill(240, 220 - val * 20, 170);
                    }
                    
                    else {
                        fill(50, 110 + val * 30, 200);
                    }
                }


                rect(0, 0, grid.size, grid.size);
                pop();
            }
        }
    }

    RenderBuildings(buildings){
        stroke(0.1);
        for (let building of buildings){
            // noStroke();
            push();
            let pos = this.ToScreen(building.pos);
            translate(pos);
            rotate(building.rotation);
            fill(building.color);
            for (let shape of building.shapes){
                push();
                translate(0, 0, shape.height);
                // this.RenderShape(shape.vertices, shape.edges);
                let size = shape.GetSize();
                box(size[0]*width, size[1]*height, shape.height);
                pop();
            }
            pop();
        }
    }

    Render(grid, buildings){
        translate(-width/2, -height/2);
        this.RenderGrid(grid);
        this.RenderBuildings(buildings);
    }
}
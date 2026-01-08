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
                
                // if (val > 0.5){
                //     if (val > 0.7){
                //         fill(250, 213, 178);
                //     }
                //     else{
                //         // fill(250, 213, 200);
                //         fill(238, 214, 175); 
                //     }
                // }
                // else{
                //     // fill(100, 213, 250);
                //     fill(70, 130, 180);
                // }
                if (val > 0.7) {
    fill(80, 180 - val * 40, 90);
}
else if (val > 0.5) {
    fill(240, 220 - val * 20, 170);
}
else {
    fill(50, 110 + val * 30, 200);
}


                rect(0, 0, grid.size, grid.size);
                // if (val > 0.5){
                //     let angle = map(val, 0.5, 1, 0, TWO_PI);
                //     translate(grid.size/2, grid.size/2);
                //     rotate(angle);
                //     line(0, 0, 0, grid.size/2);
                // }
                pop();
            }
        }
    }

    Render(grid, buildings){
        this.RenderGrid(grid);
        fill(150, 50, 50);
        stroke(0);
        for (let building of buildings){
            // noStroke();
            push();
            let pos = this.ToScreen(building.pos);
            translate(pos);
            rotate(building.rotation);
            for (let shape of building.shapes){
                this.RenderShape(shape.vertices, shape.edges);
            }
            pop();
        }
    }
}
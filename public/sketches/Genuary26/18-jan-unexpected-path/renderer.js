class Renderer{
    constructor(){
        this.zOff = 0;
    }

    RenderGrid(grid){
        noStroke();
        // stroke(255);
        let r = 0;
        for (let row of grid.grid){
            let c = 0;
            for (let val of row){
                let x = c * grid.div;
                let y = r * grid.div;
                fill(val * 200, val * 200, val * 50);
                rect(x, y, grid.div, grid.div);
                // let n = noise((c*grid.div)/1000, (r*grid.div)/1000, this.zOff);
                let n = noise((r)/10, (c)/10, this.zOff);
                let a = map(n, 0, 1, -TWO_PI, TWO_PI);
                // push();
                // translate(x + grid.div/2, y + grid.div/2);
                // rotate(a - PI/2)
                // line(0, 0, 0, grid.div/2);
                // pop();
                
                // if (r == c){
                // }
                // console.log('ren', r, c, "->", n);

                c += 1;
            }
            r += 1;
        }
        this.zOff += 0.01;
    }

    RenderGhost(ghost){
        fill(0, 0, 200);
        rect(ghost.pos.x, ghost.pos.y, 10, 10);
    }

    Render(grid, ghost){
        this.RenderGrid(grid);
        this.RenderGhost(ghost);
    }
}
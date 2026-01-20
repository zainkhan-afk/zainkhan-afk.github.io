class Renderer{
    constructor(){}

    RenderGrid(grid){
        noStroke();
        let r = 0;
        for (let row of grid.grid){
            let c = 0;
            for (let val of row){
                let x = c * grid.div;
                let y = r * grid.div;
                fill(val * 200, val * 200, val * 50);
                rect(x, y, grid.div, grid.div);

                c += 1;
            }
            r += 1;
        }
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
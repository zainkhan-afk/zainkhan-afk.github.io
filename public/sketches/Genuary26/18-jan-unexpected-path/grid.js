class Grid{
    constructor(numRows, numCols, div){
        this.numRows = numRows;
        this.numCols = numCols;
        this.div = div;

        this.grid = [];

        for (let r = 0; r < this.numRows; r++){
            let row = [];
            for (let c = 0; c < this.numCols; c++){
                append(row, 0);
            }
            append(this.grid, row);
        }
    }


    FindLowestValueCell(R, C){
        let lowestValue = 10000;
        let lowestCoords = [];
        for (let r = max(R - 1, 0); r < min(R+2, this.numRows); r++){
            for (let c = max(C - 1, 0); c < min(C+2, this.numCols); c++){
                if (r == R && c == C){ continue; }
                if (this.grid[r][c] < lowestValue){
                    lowestValue = this.grid[r][c];
                    lowestCoords = [r, c];
                }
            }
        }

        return lowestCoords;
    }

    CalculateGrid(lightSources){
        for (let lightSource of lightSources){
            
        }
    }
}
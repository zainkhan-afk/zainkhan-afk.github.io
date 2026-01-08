class Grid{
    constructor(numRows, numCols, size){
        this.numRows = numRows;
        this.numCols = numCols;
        this.size = size;
        this.grid = [];
        this.noiseOffset = 0.05;
    }

    
    MakeNoiseGrid(){
        noiseSeed(234);
        this.grid = [];
        let noiseX = 0;
        for (let c = 0; c < this.numCols; c++){
            let noiseY = 0;
            let row = [];
            for (let r = 0; r < this.numRows; r++){
                let val = noise(noiseX, noiseY);
                append(row, val);
                
                noiseY += this.noiseOffset;
            }
            noiseX += this.noiseOffset;
            append(this.grid, row);
        }
    }


}
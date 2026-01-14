class Grid{
    constructor(numRows, numCols, size){
        this.numRows = numRows;
        this.numCols = numCols;
        this.size = size;
        this.grid = [];
        this.roadPts = [];
        this.noiseOffset = 0.05/4;
        this.seaLevel = 0.5;
    }
    
    MakeNoiseGrid(){
        // noiseSeed(234);
        // noiseSeed(1100);
        // noiseSeed(99);
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

    IsValidRoadStartPoint(startR, startC, window){
        let minR = max(int(startR - window/2), 0);
        let maxR = min(int(startR + window/2), this.numRows-1);
        let minC = max(int(startC - window/2), 0);
        let maxC = min(int(startC + window/2), this.numCols-1);

        let sum = 0;
        for (let r = minR; r<maxR; r++){
            for (let c = minC; c<maxC; c++){
                if (this.grid[r][c] > this.seaLevel){
                    sum += 1;
                }
            }
        }

        if (sum / ((maxR - minR) * (maxC - minC)) > 0.7) {return true;}
        return false;
    }

    IsValidForRoad(r, c){
        if (r < 0 || r >= this.numRows) {return false;}
        if (c < 0 || c >= this.numCols) {return false;}
        if (this.grid[r][c] <= this.seaLevel){return false;}
        return true; 
    }

    MakeRoads(){
        let possibleRoadHeadings = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ];
        while(true){
            let initialRoadHeading = possibleRoadHeadings[0];
            let startR = int(random(this.numRows));
            let startC = int(random(this.numCols));

            let r = startR;
            let c = startC;
            let roadHeading = [initialRoadHeading[0], initialRoadHeading[1]];

            if (this.IsValidRoadStartPoint(startR, startC, 40) && this.IsValidForRoad(startR, startC)){
                append(this.roadPts, [r, c]);
                let newR = r + roadHeading[0];
                let newC = c + roadHeading[1];
                if(this.IsValidForRoad(newR, newC)){
                    r = newR;
                    c = newC;
                }
                else{
                    if (random() < 0.1){break;}
                    let pathFound = false;
                    for (let rh of possibleRoadHeadings){
                        if (rh[0] == roadHeading[0] && rh[1] == roadHeading[1]){continue;}
                        newR = r + rh[0];
                        newC = c + rh[1];
                        if(this.IsValidForRoad(newR, newC)){
                            pathFound = true;
                            roadHeading[0] = rh[0];
                            roadHeading[1] = rh[1];
                            r = newR;
                            c = newC;
                        }
                    }
                    if (!pathFound){break;}
                }
            }
        }   

        console.log(this.roadPts);
    }
}
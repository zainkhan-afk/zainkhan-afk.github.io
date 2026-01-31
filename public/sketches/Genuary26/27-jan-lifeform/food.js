class Food{
    constructor(pos, gridDiv){
        this.pos = pos;
        this.gridDiv = gridDiv;
        this.gridPos = [
            int(this.pos.y/this.gridDiv),
            int(this.pos.x/this.gridDiv)
        ];
        this.size = random(2, 50);
    }
}
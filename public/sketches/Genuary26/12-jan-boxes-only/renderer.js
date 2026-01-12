class Renderer{
    constructor(){
    }

    Render(planets){
        for (let planet of planets){
            push();
            translate(planet.pos.x, planet.pos.y, planet.pos.z);
            box(planet.dim, planet.dim, planet.dim);
            pop();
        }
    }
}
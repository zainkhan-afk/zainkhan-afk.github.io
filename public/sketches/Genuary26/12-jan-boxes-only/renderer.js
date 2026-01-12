class Renderer{
    constructor(){
        this.ang = 0;
    }

    Render(planets){
        for (let planet of planets){
            push();
            translate(planet.pos.x, planet.pos.y, planet.pos.z);
            rotateZ(this.ang);
            if (planet.planetShader){
                shader(planet.planetShader);
            }
            box(planet.dim, planet.dim, planet.dim);
            pop();
        }
        this.ang += 0.01;
    }
}
class Renderer{
    constructor(){
        this.ang = 0;
    }

    Render(planets){
        noStroke();
        for (let planet of planets){
            push();
            translate(planet.pos.x, planet.pos.y, planet.pos.z);
            // rotateY(this.ang);
            if (planet.planetShader){
                planet.planetShader.setUniform("uResolution", [planet.dim, planet.dim]);
                planet.planetShader.setUniform("uTime", millis());
                shader(planet.planetShader);
            }
            box(planet.dim, planet.dim, planet.dim);
            pop();
        }
        this.ang += 0.01;
    }
}
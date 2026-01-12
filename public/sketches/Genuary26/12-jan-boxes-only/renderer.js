class Renderer{
    constructor(){
        this.ang = 0;
    }

    Render(planets){
        for (let planet of planets){
            noStroke();
            fill(0);
            push();
            translate(planet.pos.x, planet.pos.y, planet.pos.z);
            rotateX(planet.rotation.x);
            rotateY(planet.rotation.y);
            rotateZ(planet.rotation.z);
            if (planet.planetShader){
                // planet.planetShader.setUniform("uResolution", [planet.dim, planet.dim]);
                shader(planet.planetShader);
                planet.planetShader.setUniform("uTime", millis());
            }
            box(planet.dim, planet.dim, planet.dim);
            pop();

            stroke(255);
            beginShape();
            strokeWeight(3);
            noFill();
            for (let tailP of planet.tail){
                vertex(tailP.x, tailP.y, tailP.z);
            }
            endShape();
        }
    }
}
class Renderer{
    constructor(){
        this.ang = 0;
    }

    Render(planets){
        let idx = 0;
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
                planet.planetShader.setUniform("seaColor", planet.seaColor);
                planet.planetShader.setUniform("landColor", planet.landColor);
                planet.planetShader.setUniform("landSeaThresh", planet.landSeaThresh);

                if (idx > 0){
                    let lightPos = p5.Vector.sub(planet.pos, planets[0].pos);
                    planet.planetShader.setUniform("lightPos", [lightPos.x, lightPos.y, lightPos.z]);
                    // planet.planetShader.setUniform("landSeaThresh", planet.landSeaThresh);
                }
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
            idx += 1;
        }
    }
}
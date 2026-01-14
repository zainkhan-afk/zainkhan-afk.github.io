class Physics{
    constructor(dt){
        this.dt = dt;
        // this.gravitationalConstant = 6.674*10^-11;
        this.gravitationalConstant = 6.674e-11; 
        this.gravitationalConstant = 10; 

        console.log(this.gravitationalConstant);
    }

    Step(planets){
        let completedPairs = [];
        let p1Idx = 0;
        for (let p1 of planets){
            let p2Idx = 0;
            for (let p2 of planets){
                // if (p1 === p2){continue;}
                if (p1Idx === p2Idx){continue;}
                let currentPair = [p1Idx, p2Idx];
                
                // if (completedPairs.includes(currentPair)){continue;}
                
                const alreadyCompleted = completedPairs.some(subArray => 
                    subArray.length === currentPair.length && 
                    subArray.every((value, index) => value === currentPair[index])
                );
                
                if (alreadyCompleted){
                    continue;
                }
                append(completedPairs, [p1Idx, p2Idx]);
                append(completedPairs, [p2Idx, p1Idx]);
                
                
                let p12 = p5.Vector.sub(p1.pos, p2.pos);
                let p12Mag = p12.mag();


                if (p12Mag < max(p1.dim, p2.dim)){
                    continue;
                }
                
                p12.normalize()

                let f12Mag = (this.gravitationalConstant*(p1.mass*p2.mass)) / pow(p12Mag, 2);
                let f12 = p12.setMag(f12Mag);
                p2.ApplyForce(f12);
                f12.rotate(PI);
                p1.ApplyForce(f12);
            
                
                p2Idx += 1;
            }
            p1Idx += 1;
        }

        for (let p of planets){
            p.Step(this.dt);
        }
    }
}
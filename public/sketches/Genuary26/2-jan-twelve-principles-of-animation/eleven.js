// Solid drawing
class Eleven{
	constructor()
    {
        this.pos = createVector(0.25, 0.5);
        // this.lighPos = createVector(-0.15, 0.15, -1.0);
        this.lighPos = createVector(0.9, -0.9, 0.9);
        this.radius = 0.3;
        this.renderedImage = createImage(800, 800);

        this.lighPos.normalize();

        this.renderedImage.loadPixels();

        for (let x = 0; x < this.renderedImage.width; x += 1) {
            for (let y = 0; y < this.renderedImage.height; y += 1) {
                let p = createVector(x/this.renderedImage.width - 1.0 + this.pos.x, y/this.renderedImage.height - this.pos.y, 0.25);
                let val = this.SDFSphere(p, this.radius);
                let c;
                if (val < 0) {
                    let n = this.CalcNormal(p);
                    let diff = max(p5.Vector.dot(n, this.lighPos), 0.0);
                    let col = 200 * diff;
                    // let col = map(val, 0.0, -0.02, 0, 255);
                    c = color(col, 0, 0);
                }else{
                    c = color(200, 200, 200, 0);
                }
                this.renderedImage.set(x, y, c);
            }
        }

        this.renderedImage.updatePixels();
	}

    SDFSphere(p, r){
        return p.mag() - r;
    }

    CalcNormal(p)
    {
        let eps = 0.001;
        let res = createVector(
            this.SDFSphere(p5.Vector.add(p,  createVector(eps, 0, 0)), this.radius) - this.SDFSphere(p5.Vector.sub(p,  createVector(eps, 0, 0)), this.radius),
            this.SDFSphere(p5.Vector.add(p,  createVector(0, eps, 0)), this.radius) - this.SDFSphere(p5.Vector.sub(p,  createVector(0, eps, 0)), this.radius),
            this.SDFSphere(p5.Vector.add(p,  createVector(0, 0, eps)), this.radius) - this.SDFSphere(p5.Vector.sub(p,  createVector(0, 0, eps)), this.radius)
        )
        res.normalize();
        return res;
    }

    Render(width, height)
    {
        let animationSize = createVector(width, height);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledRadius = this.radius*width;
        
        fill(200, 0, 0);
        stroke(0);
        strokeWeight(1);
        ellipse(scaledPos.x, scaledPos.y, scaledRadius, scaledRadius);


        image(this.renderedImage, 0, 0, width, height);
    }

    Step()
    {
        let dt = 0.1;
    }
}
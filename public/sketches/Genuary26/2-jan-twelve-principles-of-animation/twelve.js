// Appeal
class Twelve extends Principle{
	constructor(name, duration)
    {
        super(name, duration);
        this.pos = createVector(0.5, 0.5);
        this.size = createVector(0.2, 0.2);
        this.eyeSize = createVector(0.05, 0.04);
        
        this.hand = loadImage('hand.png');

        this.angle = 0;
        this.blinkVal = PI / 2;
        this.eyePosVal = 0;
	}

    Reset()
    {
        this.pos = createVector(0.5, 0.5);
        this.size = createVector(0.2, 0.2);
        this.eyeSize = createVector(0.05, 0.04);
        
        this.hand = loadImage('hand.png');

        this.angle = 0;
        this.blinkVal = PI / 2;
        this.eyePosVal = 0;
	}

    Render(width, height)
    {
        fill(0);
        strokeWeight(1);fill(0);textSize(22);
        text(this.name, 20, 30);
        textSize(12);
        let animationSize = createVector(width, height);
        let scaledPos = p5.Vector.mult(this.pos, animationSize);
        let scaledSize = p5.Vector.mult(this.size, animationSize);
        let scaledEyeSize = p5.Vector.mult(this.eyeSize, animationSize);
        
        stroke(0);
        strokeWeight(1);
        
        fill(200, 0, 0);
        ellipse(scaledPos.x, scaledPos.y, scaledSize.x, scaledSize.y);

        let eyeDelta = p5.Vector.mult(scaledSize, createVector(1/5, 1/5));

        fill(240);
        ellipse(scaledPos.x + eyeDelta.x, scaledPos.y - eyeDelta.y, scaledEyeSize.x, scaledEyeSize.y * abs(sin(this.blinkVal)));
        ellipse(scaledPos.x - eyeDelta.x, scaledPos.y - eyeDelta.y, scaledEyeSize.x, scaledEyeSize.y * abs(sin(this.blinkVal)));

        fill(100);
        ellipse(scaledPos.x + eyeDelta.x + 2*sin(this.eyePosVal), scaledPos.y - eyeDelta.y, scaledEyeSize.x * 0.1, scaledEyeSize.y * 0.2 * abs(sin(this.blinkVal)));
        ellipse(scaledPos.x - eyeDelta.x + 2*sin(this.eyePosVal), scaledPos.y - eyeDelta.y, scaledEyeSize.x * 0.1, scaledEyeSize.y * 0.2 * abs(sin(this.blinkVal)));

        imageMode(CENTER);
        push();
        translate(scaledPos.x - scaledSize.x / 1.8, scaledPos.y);
        rotate(cos(this.angle) - PI / 4);
        image(this.hand, 0, 0, 50, 50);
        pop();

        push();
        translate(scaledPos.x + scaledSize.x / 1.8, scaledPos.y);
        rotate(cos(PI - this.angle) + PI / 4);
        scale(-1, 1);
        image(this.hand, 0, 0, 50, 50);
        pop();

    }
    
    Step()
    {
        this.angle += 0.25;
        if (random() < 0.02){
            this.blinkVal += PI / 4;
        }
        if (random() < 0.1){
            this.eyePosVal += PI / 4;
        }
        if (this.angle > TWO_PI) {this.angle = 0;}
    }
}
"use client";
import { useRef, useEffect } from "react";
import p5 from "p5";

export default function HeroSketch() {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let particles = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(sketchRef.current);
        for (let i = 0; i < 100; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            r: p.random(2, 5),
            xSpeed: p.random(-1, 1),
            ySpeed: p.random(-1, 1)
          });
        }
      };

      p.draw = () => {
        p.background(20, 20, 30, 50); // dark with slight trails
        p.noStroke();
        p.fill(255, 0, 100);
        particles.forEach(pt => {
          p.circle(pt.x, pt.y, pt.r * 2);
          pt.x += pt.xSpeed;
          pt.y += pt.ySpeed;
          if (pt.x < 0 || pt.x > p.width) pt.xSpeed *= -1;
          if (pt.y < 0 || pt.y > p.height) pt.ySpeed *= -1;
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    const myP5 = new p5(sketch);
    return () => myP5.remove();
  }, []);

  return <div ref={sketchRef} className="absolute top-0 left-0 w-full h-full z-0"></div>;
}

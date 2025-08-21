"use client";
import { useRef, useEffect, useState } from "react";
import p5 from "p5";

export default function HeroSketch() {
  const sketchRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sketchRef.current) return;

    const sketch = (p) => {
      let particles = [];

      p.setup = () => {
        // const width = 100; //window.innerWidth;
        // const height = 100; //window.innerHeight;
        // const width = window.innerWidth;
        // const height = window.innerHeight;
        const width = sketchRef.current.clientWidth;
        const height = sketchRef.current.clientHeight;

        p.createCanvas(width, height).parent(sketchRef.current);
        // p.createCanvas(sketchRef.current.offsetWidth, sketchRef.current.offsetHeight).parent(sketchRef.current);
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
        particles.forEach((pt) => {
          p.circle(pt.x, pt.y, pt.r * 2);
          pt.x += pt.xSpeed;
          pt.y += pt.ySpeed;
          if (pt.x < 0 || pt.x > p.width) pt.xSpeed *= -1;
          if (pt.y < 0 || pt.y > p.height) pt.ySpeed *= -1;
        });
        // p.stroke(255);
        // p.strokeWeight(1);
        // p.noFill();
        // p.rect(0, 0, p.width, p.height);
      };

      p.windowResized = () => {
        p.resizeCanvas(sketchRef.current.clientWidth, sketchRef.current.clientHeight);
      };
    };

    const myP5 = new p5(sketch);
    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div
      ref={sketchRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}

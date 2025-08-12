"use client"; // needed because p5.js runs in the browser

import { useRef, useEffect } from "react";
import p5 from "p5";

export default function Sketch() {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, 400).parent(sketchRef.current);
        p.background(20); // dark background
      };

      p.draw = () => {
        p.fill(255, 0, 100, 100); // pink circles
        p.noStroke();
        p.ellipse(p.mouseX, p.mouseY, 40, 40);
      };
    };

    const myP5 = new p5(sketch);

    return () => {
      myP5.remove(); // clean up when component unmounts
    };
  }, []);

  return <div ref={sketchRef}></div>;
}

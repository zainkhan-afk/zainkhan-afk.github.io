"use client";
import GlobalP5Wrapper from "./GlobalP5Wrapper";

// Import HeroSketch with SSR disabled
// const HeroSketch = dynamic(() => import("./HeroSketch"), {
//   ssr: false,
// });

export default function Hero() {
  return (
    // <section className="relative flex items-center justify-center min-h-screen text-white">
    <section className="relative w-full h-screen flex items-center justify-center text-white" >
      
      {/* p5.js background */}
      {/* <HeroSketch /> */}
      <div className="absolute top-0 left-0 w-full h-[calc(100%-3rem)] z-0 pointer-events-none">
        {/* <HeroSketch /> */} 
        <GlobalP5Wrapper />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I’m Zain</h1>
        <p className="text-lg max-w-xl mx-auto">
          I’m an AI Developer. I have experience in AI development, robotics, computer vision, creative coding and data visualization.
        </p>
        {/* <p className="text-lg max-w-xl mx-auto pt-6">
          I enjoy building interactive experiences.
        </p> */}
      </div>
    </section>
  );
}
"use client";
// import HeroSketch from "./HeroSketch";



import dynamic from "next/dynamic";

// Import HeroSketch with SSR disabled
const HeroSketch = dynamic(() => import("./HeroSketch"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-screen text-white">
    {/* <section className="min-h-screen flex items-center justify-center bg-gray-900"> */}
      {/* p5.js background */}
      <HeroSketch />

      {/* Text overlay */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I’m Zain</h1>
        <p className="text-lg max-w-xl mx-auto">
          I’m a developer passionate about building interactive experiences.
        </p>
      </div>
    </section>
  );
}

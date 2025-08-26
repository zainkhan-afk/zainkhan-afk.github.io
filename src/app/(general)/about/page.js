import React from "react";
import AboutHead from "@/components/about/Head";
import ProfessionalSummary from "@/components/about/ProfessionalSummary";
import AboutSkills from "@/components/about/Skills";
import AboutWorkExperience from "@/components/about/WorkExperience";
import AboutEducation from "@/components/about/Education";


export const metadata = {
  title: "About | Zain Khan",
  description: "Learn more about me, my skills, work experience, and education.",
};

export default function About() {
  return (
    // <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6"></div>
    <>
      <div className="w-full max-w-6xl">
        <AboutHead/>
        <ProfessionalSummary/>
        <AboutSkills/>
        <AboutWorkExperience/>
        <AboutEducation/>
      </div>
      
      {/* <section className="max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
        <p className="text-lg md:text-xl mb-4">
          Hi! I’m Zain, a passionate developer specializing in building interactive, user-friendly web applications and experiences.
        </p>
        <p className="text-lg md:text-xl mb-4">
          I enjoy combining creativity with technical skills—whether it’s crafting smooth user interfaces, building custom animations, or working on data-driven applications.
        </p>
        <p className="text-lg md:text-xl">
          My goal is to create projects that are not only functional but also engaging, intuitive, and visually appealing.
        </p>
      </section>

      <section className="mt-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Skills & Technologies</h2>
        <ul className="flex flex-wrap justify-center gap-4 text-pink-400 font-medium">
          <li>JavaScript / TypeScript</li>
          <li>React / Next.js</li>
          <li>Python / Machine Learning</li>
          <li>p5.js / Interactive Graphics</li>
          <li>Tailwind CSS</li>
          <li>Django / FastAPI</li>
        </ul>
      </section>

      <section className="mt-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Interests</h2>
        <p className="text-lg md:text-xl">
          Beyond coding, I love exploring creative technologies, generative art, and interactive visualizations. I’m always looking for ways to make digital experiences more engaging and memorable.
        </p>
      </section> */}
      </>
  );
}

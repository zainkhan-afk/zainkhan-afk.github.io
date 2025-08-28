import React from "react";
import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";
import Link from "next/link";


export const metadata = {
  title: "Projects | Zain Khan",
  description: "Learn more about projects.",
};


const projects = [
  {
    title: "Interactive Particle Simulator",
    description:
      "A real-time particle animation using p5.js, showcasing interactive graphics and responsive design.",
    link: "#",
    tech: ["JavaScript", "p5.js", "React"],
  },
  {
    title: "Virality Prediction AI",
    description:
      "A machine learning system that predicts the virality of TikTok videos using computer vision and engagement metrics.",
    link: "#",
    tech: ["Python", "OpenCV", "PyTorch"],
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "A full-featured local e-commerce and accounting dashboard built with Flask, including inventory, sales, and reporting features.",
    link: "#",
    tech: ["Python", "Flask", "SQLite", "Tailwind CSS"],
  },
];

export default function Projects() {
  const projects = getAllProjects();
  return (
    // <div className="min-h-screen bg-gray-900 text-white px-6 flex flex-col items-center">
      <>
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Projects</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 w-full max-w-6xl">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-pink-400 transition-shadow duration-300 flex flex-col h-120"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.metadata.title}</h2>

            {project.metadata.display_graphic && (
              <div className="relative w-full h-60 mb-4 mt-4"> 
                <Image
                  src={project.metadata.display_graphic}
                  alt="Project graphic"
                  fill
                  // className="object-contain"  // keeps aspect ratio
                  className="object-contain rounded-2xl border-gray-600"
                />
              </div>
            )}

            <p className="text-gray-300 mb-4 flex-grow">{project.metadata.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.metadata.tech?.map((tech, i) => (
                <span
                  key={i}
                  className="bg-pink-400 text-gray-900 px-2 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex">
              <div className="flex-auto items-left">
                <div className="flex flex-wrap gap-4 mb-4">
                  {project.metadata.github && (
                    <Link href = {project.metadata.github} target="_blank">
                      <FaGithub size={28} />
                    </Link>
                  )}

                  {project.metadata.link && (
                    <Link href = {project.metadata.link} target="_blank">
                      <FaLink size={28} />
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="flex-auto text-right">
                {project.metadata.further_reading && (
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="mt-auto inline-block text-pink-400 font-semibold hover:underline"
                  >
                    Read More
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

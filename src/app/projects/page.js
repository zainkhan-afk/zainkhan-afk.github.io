import React from "react";

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
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">Projects</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-pink-400 transition-shadow duration-300 flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-pink-400 text-gray-900 px-2 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-pink-400 font-semibold hover:underline"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

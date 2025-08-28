import React from "react";
import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";
import Link from "next/link";

export const metadata = {
  title: "Projects | Zain Khan",
  description: "Learn more about projects.",
};

export default function Projects() {
  const projects = getAllProjects();
  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
        Projects
      </h1>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 w-full max-w-6xl">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-pink-400 transition-shadow duration-300 flex flex-col"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              {project.metadata.title}
            </h2>

            {project.metadata.display_graphic && (
              <div className="relative w-full h-48 sm:h-60 mb-4 mt-4">
                <Image
                  src={project.metadata.display_graphic}
                  alt="Project graphic"
                  fill
                  className="object-contain rounded-2xl border-gray-600"
                />
              </div>
            )}

            <p className="text-gray-300 mb-4 flex-grow leading-relaxed">
              {project.metadata.description}
            </p>

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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-wrap gap-4">
                {project.metadata.github && (
                  <Link href={project.metadata.github} target="_blank">
                    <FaGithub size={24} />
                  </Link>
                )}
                {project.metadata.link && (
                  <Link href={project.metadata.link} target="_blank">
                    <FaLink size={24} />
                  </Link>
                )}
              </div>

              {project.metadata.further_reading && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-pink-400 font-semibold hover:underline"
                >
                  Read More
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

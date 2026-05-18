import { getAllProjects } from "@/lib/projects";
import Image from "next/image";
import { Github } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Projects | Zain Khan",
  description: "AI, robotics, and creative coding projects by Zain Khan.",
};

export default function Projects() {
  const projects = getAllProjects();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-10 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Projects
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="rounded-xl overflow-hidden flex flex-col"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            {project.metadata.display_graphic && (
              <div className="relative w-full h-52">
                <Image
                  src={project.metadata.display_graphic}
                  alt={project.metadata.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
              <h2
                className="font-serif text-xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {project.metadata.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-4 flex-grow"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.metadata.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.metadata.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "var(--bg-surface)",
                      color: "var(--accent)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.metadata.github && (
                  <Link
                    href={project.metadata.github}
                    target="_blank"
                    aria-label="GitHub"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <Github size={18} />
                  </Link>
                )}
                {project.metadata.further_reading && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-mono text-xs uppercase tracking-wider"
                    style={{ color: "var(--accent)" }}
                  >
                    Read more →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

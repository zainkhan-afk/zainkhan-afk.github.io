import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
      {project.metadata.display_graphic && (
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={project.metadata.display_graphic}
            alt={project.metadata.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1
        className="font-serif text-4xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {project.metadata.title}
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          {project.metadata.date}
        </span>
        {project.metadata.github && (
          <Link
            href={project.metadata.github}
            target="_blank"
            className="flex items-center gap-1 font-mono text-xs"
            style={{ color: "var(--accent)" }}
          >
            <Github size={14} /> GitHub
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
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
      <article className="prose prose-stone dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {project.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import Mermaid from "@/components/Mermaid";

// Same look as the cards on /projects. Without an image, a Mermaid `diagram`
// (if given) fills the image slot instead.
export default function ContentCard({ title, description, image, diagram, eyebrow, tech, href, linkLabel, github }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
    >
      {image ? (
        <div className="relative w-full h-52">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      ) : diagram ? (
        <div className="w-full h-52" style={{ background: "var(--bg-primary)" }}>
          <Mermaid chart={diagram} compact />
        </div>
      ) : null}
      <div className="p-5 flex flex-col flex-grow">
        {eyebrow && (
          <p
            className="font-mono text-xs uppercase tracking-wider mb-2"
            style={{ color: "var(--accent)" }}
          >
            {eyebrow}
          </p>
        )}
        <h3
          className="font-serif text-xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-4 flex-grow"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
        {tech?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{
                  background: "var(--bg-surface)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {(github || href) && (
          <div className="flex items-center gap-4">
            {github && (
              <Link
                href={github}
                target="_blank"
                aria-label="GitHub"
                style={{ color: "var(--text-secondary)" }}
              >
                <Github size={18} />
              </Link>
            )}
            {href && (
              <Link
                href={href}
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: "var(--accent)" }}
              >
                {linkLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

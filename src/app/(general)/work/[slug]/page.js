import { getAllWork, getWorkBySlug } from "@/lib/work";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { notFound } from "next/navigation";
import Mermaid from "@/components/Mermaid";

function hastText(node) {
  if (node.type === "text") { return node.value; }
  return (node.children || []).map(hastText).join("");
}

// ```mermaid fenced blocks render as diagrams; other code blocks stay as-is
const markdownComponents = {
  pre({ node, children, ...props }) {
    const code = node?.children?.[0];
    if (code?.tagName === "code" && code.properties?.className?.includes("language-mermaid")) {
      return <Mermaid chart={hastText(code)} />;
    }
    return <pre {...props}>{children}</pre>;
  },
};

export async function generateStaticParams() {
  const params = getAllWork().map((w) => ({ slug: w.slug }));
  // `output: export` requires at least one param. When there are no published
  // case studies yet, emit a placeholder that 404s.
  return params.length ? params : [{ slug: "none" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) { return {}; }
  return {
    title: `${work.metadata.title} | Zain Khan`,
    description: work.metadata.description,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) { return notFound(); }

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
      {work.metadata.display_graphic && (
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={work.metadata.display_graphic}
            alt={work.metadata.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1
        className="font-serif text-4xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {work.metadata.title}
      </h1>
      <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "var(--accent)" }}>
        {work.metadata.company} · {work.metadata.role}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {work.metadata.tech?.map((tech) => (
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
          components={markdownComponents}
        >
          {work.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

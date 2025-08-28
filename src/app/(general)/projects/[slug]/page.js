
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  // const processedContent = await remark().use(html).process(project.content);
  // const contentHtml = processedContent.toString();
  
  return (
    <div className="max-w-5xl w-full mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{project.metadata.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{project.metadata.date}</p>

      <article className="max-w-full prose prose-invert">
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

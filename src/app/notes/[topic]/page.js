import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export default async function NotesTopic({ params }) {
  const { slug } = await params;
  
  return (
    <div className="max-w-5xl w-full mx-auto py-12">  
    </div>
  );
}

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  // const processedContent = await remark().use(html).process(post.content);
  // const contentHtml = processedContent.toString();
  
  return (
    <div className="max-w-5xl w-full mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{post.metadata.date}</p>

      <article className="max-w-full prose prose-invert">
        <ReactMarkdown
         remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </article>
      
    </div>
  );
}

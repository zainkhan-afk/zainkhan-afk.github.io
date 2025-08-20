import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{post.metadata.date}</p>
      <article
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}

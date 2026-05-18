import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import P5Sketch from "@/components/blog/P5Sketch";

const components = { P5Sketch };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
      {post.metadata.thumbnail && (
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.metadata.thumbnail}
            alt={post.metadata.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1
        className="font-serif text-4xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        {post.metadata.title}
      </h1>
      <div className="flex gap-4 mb-10">
        <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          {post.metadata.date}
        </span>
        <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
          {readingTime} min read
        </span>
      </div>
      <article className="prose prose-stone dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={components} />
      </article>
    </div>
  );
}

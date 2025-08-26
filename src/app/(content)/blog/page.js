import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl w-full mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-gray-700 pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.metadata.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-400">{post.metadata.date}</p>
            <p className="mt-2">{post.metadata.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

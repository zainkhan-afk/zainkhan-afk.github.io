import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Zain Khan",
  description: "Writing on AI, creative coding, and building things.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-12">
      <h1
        className="font-serif text-4xl sm:text-5xl font-bold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Blog
      </h1>
      <p
        className="font-serif italic text-center mb-12"
        style={{ color: "var(--text-secondary)" }}
      >
        Writing on AI, creative coding, and building things.
      </p>
      <ul>
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-b py-6"
            style={{ borderColor: "var(--border)" }}
          >
            <Link href={`/blog/${post.slug}`} className="flex gap-5 group">
              <div
                className="flex-shrink-0 w-20 h-14 rounded overflow-hidden"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {post.metadata.thumbnail ? (
                  <Image
                    src={post.metadata.thumbnail}
                    alt={post.metadata.title}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: "var(--bg-surface)" }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2
                  className="font-serif italic text-lg font-semibold mb-1 group-hover:underline"
                  style={{ color: "var(--text-primary)" }}
                >
                  {post.metadata.title}
                </h2>
                <p
                  className="font-mono text-xs uppercase tracking-wider mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {post.metadata.date}
                </p>
                <p
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.metadata.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

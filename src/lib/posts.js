import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export function getPostBySlug(slug) {
  let filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(postsDirectory, `${slug}.md`);
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  if (data.draft) { return null; }
  return { slug, metadata: data, content };
}

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx?)$/, "");
      return getPostBySlug(slug);
    })
    .filter(Boolean);
  return posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}

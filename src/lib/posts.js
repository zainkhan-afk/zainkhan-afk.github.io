import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

// POSTS CALLS
// Get all posts
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const data = getPostBySlug(slug);
    // const filePath = path.join(postsDirectory, fileName);
    // const fileContents = fs.readFileSync(filePath, "utf8");

    // const { data, content } = matter(fileContenxts);

    return data;
  }).filter(Boolean);

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}

// Get single post by slug
export function getPostBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  if (data.draft) { return null; }

  return {
    slug,
    metadata: data,
    content,
  };
}

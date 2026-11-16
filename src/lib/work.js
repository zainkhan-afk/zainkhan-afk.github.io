import fs from "fs";
import path from "path";
import matter from "gray-matter";

const workDirectory = path.join(process.cwd(), "src/content/work");

// Get all published case studies, newest first
export function getAllWork() {
  const fileNames = fs.readdirSync(workDirectory).filter((f) => f.endsWith(".md"));
  const work = fileNames
    .map((fileName) => getWorkBySlug(fileName.replace(/\.md$/, "")))
    .filter(Boolean);
  return work.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}

// Get a single case study; null if missing or draft
export function getWorkBySlug(slug) {
  const filePath = path.join(workDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) { return null; }
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  if (data.draft) { return null; }
  return { slug, metadata: data, content };
}

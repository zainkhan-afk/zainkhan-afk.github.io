import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

// POSTS CALLS
// Get all projects
export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);

  const projects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    // const filePath = path.join(projectsDirectory, fileName)
    const data = getProjectBySlug(slug);

    if (!data) {return null}

    // const { data, content } = matter(fileContents);

    return data;
  }).filter(Boolean);

  // Sort by date (newest first)
  return projects.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}

// Get single project by slug
export function getProjectBySlug(slug) {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  if (data.draft) {return null;}

  return {
    slug,
    metadata: data,
    content,
  };
}

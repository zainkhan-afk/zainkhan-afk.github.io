import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "/src/content/notes");
// const notesDirectory = "src/content/notes";

// NOTES CALLS
// Get all posts
export function getTopicDetails(topicSlug) {
    const topicPath = path.join(notesDirectory, topicSlug);
    const topicIndexPath = path.join(topicPath, "index.md");
    const notesDir = path.join(topicPath, "notes");

    if (!fs.existsSync(notesDir)) {
        return null;
    }

    const topicFileContents = fs.readFileSync(topicIndexPath, "utf8");
    const { data, content } = matter(topicFileContents);
    
    return {
      slug: topicSlug,
      metadata: data,
      content: content,
    };
}

export function getAllTopics() {
  const dirNames = fs.readdirSync(notesDirectory);
  console.log("dirNames", dirNames)
  
  const topics = dirNames.map((dirName) => {
    const topicSlug = dirName;
    
    const topicData = getTopicDetails(topicSlug);

    if (!topicData){
        return null;
    }

    return topicData;
  }).filter(Boolean);

  // Sort by date (newest first)
  return topics.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}


export function getAllChapters(topicSlug) {
  const topicPath = path.join(notesDirectory, topicSlug);
  const notesPath = path.join(topicPath, "notes");
  const fileNames = fs.readdirSync(notesPath);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(notesPath, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data,
      content,
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}
// Get single post by slug
export function getChapterBySlug(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data,
    content,
  };
}
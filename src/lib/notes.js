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
    const topicNotesDirectory = path.join(topicPath, "notes");
    
    if (!fs.existsSync(topicIndexPath) || !fs.existsSync(topicNotesDirectory)) {
        return null;
    }

    const topicFileContents = fs.readFileSync(topicIndexPath, "utf8");
    const { data, content } = matter(topicFileContents);
    
    if (data.draft){
      return null;
    }
    return {
      topic: topicSlug,
      metadata: data,
      content: content,
    };
}


export function getChapterDetails(topicSlug, chapterSlug) {
    const filePath = path.join(notesDirectory, topicSlug, "notes", `${chapterSlug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    if (data.draft) {
      return null;
    }

    return {
        topic: topicSlug,
        chapter: chapterSlug,
        metadata: data,
        content,
    };
}

export function getAllTopics() {
  const dirNames = fs.readdirSync(notesDirectory);
  console.log("dirNames", dirNames)
  
  const topics = dirNames.map((dirName) => {
    const topicSlug = dirName;
    
    const topicData = getTopicDetails(topicSlug);

    return topicData;
  }).filter(Boolean);

  // Sort by date (newest first)
  return topics.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}


export function getAllChapters(topicSlug) {
    console.log("topicSlug", topicSlug);
  const topicPath = path.join(notesDirectory, topicSlug);
  const notesPath = path.join(topicPath, "notes");
  const fileNames = fs.readdirSync(notesPath);
  
  const chapters = fileNames.map((fileName) => {
    const chapterSlug = fileName.replace(/\.md$/, "");
    const chapterData = getChapterDetails(topicSlug, chapterSlug);
    
    return chapterData;
 
  }).filter(Boolean);

  // Sort by date (newest first)
  return chapters.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
}
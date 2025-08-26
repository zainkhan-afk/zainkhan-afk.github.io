import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { getAllTopics, getAllChapters } from "@/lib/notes";
import { getTopicDetails, getChapterDetails } from "@/lib/notes";


export async function generateStaticParams() {
  const notesTopics = getAllTopics();
//   console.log("notesTopics", notesTopics);
  const paths = notesTopics.flatMap((notesTopic) => {
    const topicChapters = getAllChapters(notesTopic.slug);
    return topicChapters.map((topicChapter) => ({
      topic: notesTopic.slug,
      chapter: topicChapter.slug,
    }));
  });

  return paths;
}

export default async function NotesChapter({ params }) {
    const { topic, chapter } = await params;
    let allChapters;
    let chapterData;
    try{
      allChapters = getAllChapters(topic);
      chapterData = getChapterDetails(topic, chapter)
    }
    catch (err){
      return notFound();
    }

    return (
        <div className="max-w-7xl w-full mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      
      {/* Sidebar */}
      <aside className="md:col-span-1 bg-gray-800 bg-opacity-20 rounded-xl h-fit p-4 text-sm">
        <h2 className="text-lg font-semibold mb-4">Chapters</h2>
        <ul className="space-y-2">
          {allChapters.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/notes/${topic}/${c.slug}`}
                className={`hover:underline ${
                  c.slug === chapter ? "font-bold text-blue-400" : ""
                }`}
              >
                {c.metadata.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <div className="md:col-span-3">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {chapterData.metadata.title}
        </h1>

        <article className="max-w-full prose prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {chapterData.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>

    );
}
